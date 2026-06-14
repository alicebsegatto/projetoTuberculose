from app.services.outlier_clipper import OutlierClipper
from app.services.frequency_encoder import FrequencyEncoder
import __main__

# registra as classes usadas pelo pickle
__main__.OutlierClipper = OutlierClipper
__main__.FrequencyEncoder = FrequencyEncoder

import joblib
import numpy as np
import os

# Ordem exata das colunas após o preprocessor — definida no notebook Preparacao_Dados.ipynb
COLUNAS_PROCESSADAS = [
    'idade_anos', 'score_vulnerabilidade', 'qtd_comorbidades',          # numéricas
    'POP_RUA', 'POP_LIBER', 'POP_IMIG', 'POP_SAUDE', 'BENEF_GOV',     # binárias
    'AGRAVALCOO', 'AGRAVDROGA', 'AGRAVDOENC', 'AGRAVAIDS', 'AGRAVDIABE', 'TRAT_SUPER',
    'CS_SEXO', 'CS_RACA', 'FORMA', 'TRATAMENTO', 'HIV',                 # categóricas
    'TEST_SENSI', 'BACILOSC_2', 'CS_ESCOL_N', 'faixa_etaria',
    'ID_MUNIC_A', 'ID_RG_RESI'                                          # geográficas
]

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODELS_DIR = os.path.join(BASE_DIR, 'models')

# Thresholds definidos nos notebooks de treinamento
THRESHOLD_RL = 0.40
THRESHOLD_RN = 0.40

# Carregamento lazy para não quebrar a inicialização se os arquivos ainda não existirem
_preprocessor = None
_modelo_rl = None
_modelo_rn = None
_top_features_rn = None


def _load_preprocessor():
    global _preprocessor
    if _preprocessor is None:
        path = os.path.join(MODELS_DIR, 'preprocessor.pkl')
        if not os.path.exists(path):
            raise FileNotFoundError(
                f"Preprocessador não encontrado em '{path}'. "
                "Execute o notebook Preparacao_Dados.ipynb primeiro."
            )
        _preprocessor = joblib.load(path)
    return _preprocessor


def _load_modelo_rl():
    global _modelo_rl
    if _modelo_rl is None:
        # O notebook salva o modelo da rodada 2 (treinado em treino + teste1)
        path = os.path.join(MODELS_DIR, 'modelo_RL_rodada2.pkl')
        if not os.path.exists(path):
            raise FileNotFoundError(
                f"Modelo RL não encontrado em '{path}'. "
                "Execute o notebook Treinamento_RL.ipynb primeiro."
            )
        _modelo_rl = joblib.load(path)
    return _modelo_rl


def _load_modelo_rn():
    global _modelo_rn, _top_features_rn
    if _modelo_rn is None:
        # O modelo RN é salvo no formato Keras (.keras)
        path = os.path.join(MODELS_DIR, 'modelo_RN.keras')
        if not os.path.exists(path):
            raise FileNotFoundError(
                f"Modelo RN não encontrado em '{path}'. "
                "Execute o notebook Treinamento_RN.ipynb primeiro."
            )
        try:
            import keras
        except ImportError:
            raise ImportError(
                "Keras não está instalado. Adicione 'keras' e o backend "
                "(ex: 'torch' ou 'tensorflow') ao requirements.txt."
            )
        _modelo_rn = keras.models.load_model(path)

        # Carrega as top features usadas pela RN (salvas pelo notebook)
        features_path = os.path.join(MODELS_DIR, 'top_features_RN.pkl')
        if os.path.exists(features_path):
            _top_features_rn = joblib.load(features_path)

    return _modelo_rn, _top_features_rn

def _enriquecer_dados(dados: dict) -> dict:
    dados = dados.copy()

    binarias = [
        'POP_RUA', 'POP_LIBER', 'POP_IMIG', 'BENEF_GOV',
        'AGRAVALCOO', 'AGRAVDROGA', 'AGRAVDOENC', 'AGRAVAIDS',
        'AGRAVDIABE', 'TRAT_SUPER'
    ]
    for campo in binarias:
        if campo in dados:
            dados[campo] = 1 if dados[campo] == 1 else 0

    dados['qtd_comorbidades'] = (
        dados.get('AGRAVAIDS', 0) +
        dados.get('AGRAVDIABE', 0) +
        dados.get('AGRAVDOENC', 0)
    )
    dados['score_vulnerabilidade'] = (
        dados.get('POP_RUA', 0) +
        dados.get('POP_LIBER', 0) +
        dados.get('POP_IMIG', 0) +
        dados.get('AGRAVALCOO', 0) +
        dados.get('AGRAVDROGA', 0) +
        dados.get('AGRAVAIDS', 0)
    )

    idade = dados.get('idade_anos', 0)
    if idade <= 30:
        dados['faixa_etaria'] = '18-30'
    elif idade <= 45:
        dados['faixa_etaria'] = '31-45'
    elif idade <= 60:
        dados['faixa_etaria'] = '46-60'
    else:
        dados['faixa_etaria'] = '60+'

    return dados


def prever(dados: dict, tipo_modelo: str = 'rl') -> dict:
    import pandas as pd

    dados = _enriquecer_dados(dados)

    preprocessor = _load_preprocessor()
    df = pd.DataFrame([dados])

    # força float64 nas colunas numéricas e binárias, igual ao treino
    colunas_float = [
        'POP_RUA', 'POP_LIBER', 'POP_IMIG', 'BENEF_GOV',
        'AGRAVALCOO', 'AGRAVDROGA', 'AGRAVDOENC', 'AGRAVAIDS',
        'AGRAVDIABE', 'TRAT_SUPER', 'TRATAMENTO', 'HIV', 'FORMA',
        'POP_SAUDE', 'TEST_SENSI', 'BACILOSC_2', 'CS_RACA',
        'idade_anos', 'qtd_comorbidades', 'score_vulnerabilidade',
        'CS_ESCOL_N', 'ID_MUNIC_A', 'ID_RG_RESI'
    ]
    for col in colunas_float:
        if col in df.columns:
            df[col] = df[col].astype(float)

    X = preprocessor.transform(df)

    if tipo_modelo == 'rl':
        modelo = _load_modelo_rl()
        prob = float(modelo.predict_proba(X)[0][1])
        threshold = THRESHOLD_RL
        predicao = int(prob >= threshold)

    elif tipo_modelo == 'rn':
        modelo, top_features = _load_modelo_rn()

        # A RN foi treinada com todas as 25 colunas.
        # top_features é só explicabilidade (Permutation Importance), não filtra o input.
        prob = float(modelo.predict(X, verbose=0).flatten()[0])
        threshold = THRESHOLD_RN
        predicao = int(prob >= threshold)

    else:
        raise ValueError(f"Tipo de modelo inválido: '{tipo_modelo}'. Use 'rl' ou 'rn'.")

    return {
        'predicao': predicao,
        'probabilidade_abandono': round(prob, 4),
        'threshold_utilizado': threshold,
        'modelo': tipo_modelo,
        'interpretacao': 'Risco de abandono detectado' if predicao == 1 else 'Sem risco de abandono'
    }