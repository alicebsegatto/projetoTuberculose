from flask import Blueprint, request, jsonify
from app.services.modelo import prever

bp = Blueprint('predicao', __name__, url_prefix='/api')

# Campos obrigatórios e seus valores válidos
# Baseado em variaveis_selecionadas do notebook Preparacao_Dados.ipynb
CAMPOS_OBRIGATORIOS = {
    "TRATAMENTO":  {"tipo": int, "descricao": "Tipo de entrada (1=Caso novo, 2=Recidiva, 3=Reingresso, 4=Transferência, 5=Não sabe)"},
    "POP_RUA":     {"tipo": int, "descricao": "População em situação de rua (1=Sim, 2=Não, 9=Ignorado)"},
    "POP_LIBER":   {"tipo": int, "descricao": "População privada de liberdade (1=Sim, 2=Não, 9=Ignorado)"},
    "POP_IMIG":    {"tipo": int, "descricao": "Imigrante (1=Sim, 2=Não, 9=Ignorado)"},
    "BENEF_GOV":   {"tipo": int, "descricao": "Benefício governamental (1=Sim, 2=Não, 9=Ignorado)"},
    "AGRAVALCOO":  {"tipo": int, "descricao": "Agravo: alcoolismo (1=Sim, 2=Não, 9=Ignorado)"},
    "AGRAVDROGA":  {"tipo": int, "descricao": "Agravo: drogas (1=Sim, 2=Não, 9=Ignorado)"},
    "AGRAVDOENC":  {"tipo": int, "descricao": "Agravo: doença mental (1=Sim, 2=Não, 9=Ignorado)"},
    "AGRAVAIDS":   {"tipo": int, "descricao": "Agravo: AIDS (1=Sim, 2=Não, 9=Ignorado)"},
    "AGRAVDIABE":  {"tipo": int, "descricao": "Agravo: diabetes (1=Sim, 2=Não, 9=Ignorado)"},
    "HIV":         {"tipo": int, "descricao": "Resultado HIV (1=Positivo, 2=Negativo, 3=Em andamento, 9=Ignorado)"},
    "FORMA":       {"tipo": int, "descricao": "Forma clínica (1=Pulmonar, 2=Extrapulmonar, 3=Pulmonar+Extrapulmonar)"},
    "TRAT_SUPER":  {"tipo": int, "descricao": "Tratamento supervisionado (1=Sim, 2=Não, 9=Ignorado)"},
    "idade_anos":  {"tipo": int, "descricao": "Idade em anos"},
    "ID_MUNIC_A":  {"tipo": int, "descricao": "Código IBGE do município de atendimento"},
    "POP_SAUDE":   {"tipo": int, "descricao": "Profissional de saúde (1=Sim, 2=Não, 9=Ignorado)"},
    "TEST_SENSI":  {"tipo": int, "descricao": "Teste de sensibilidade (1=Sim, 2=Não, 9=Ignorado)"},
    "BACILOSC_2":  {"tipo": int, "descricao": "Baciloscopia 2º mês (1=Positivo, 2=Negativo, 3=Não realizado, 9=Ignorado)"},
    "CS_ESCOL_N":  {"tipo": int, "descricao": "Escolaridade (0=Sem escolaridade, 1=Fund. incompleto, 2=Fund. completo, 3=Médio, 4=Superior, 9=Ignorado)"},
    "CS_SEXO":     {"tipo": str, "descricao": "Sexo (M=Masculino, F=Feminino)"},
    "CS_RACA":     {"tipo": int, "descricao": "Raça (1=Branca, 2=Preta, 3=Amarela, 4=Parda, 5=Indígena, 9=Ignorado)"},
    "ID_RG_RESI":  {"tipo": int, "descricao": "Zona de residência (1=Urbana, 2=Rural, 3=Periurbana, 9=Ignorado)"},
}


def _validar(dados: dict):
    """Retorna lista de erros encontrados nos dados recebidos."""
    erros = []

    # Campos faltando
    faltando = [c for c in CAMPOS_OBRIGATORIOS if c not in dados]
    if faltando:
        erros.append(f"Campos obrigatórios ausentes: {faltando}")

    # Campos com tipo errado
    for campo, regra in CAMPOS_OBRIGATORIOS.items():
        if campo not in dados:
            continue
        valor = dados[campo]
        if not isinstance(valor, (regra["tipo"], type(None))):
            # aceita int onde str é esperado e vice-versa — tenta converter
            try:
                dados[campo] = regra["tipo"](valor)
            except (ValueError, TypeError):
                erros.append(
                    f"Campo '{campo}' inválido: esperado {regra['tipo'].__name__}, "
                    f"recebido '{valor}'"
                )

    return erros


@bp.route('/prever', methods=['POST'])
def endpoint_previsao():
    dados = request.get_json(force=True, silent=True)

    if not dados:
        return jsonify({'erro': 'Corpo da requisição ausente ou inválido (esperado JSON)'}), 400

    tipo = dados.pop('modelo', 'rl')
    if tipo not in ('rl', 'rn'):
        return jsonify({'erro': f"Campo 'modelo' inválido: '{tipo}'. Use 'rl' ou 'rn'"}), 400

    erros = _validar(dados)
    if erros:
        return jsonify({'erro': 'Dados inválidos', 'detalhes': erros}), 422

    try:
        resultado = prever(dados, tipo_modelo=tipo)
        return jsonify(resultado), 200
    except FileNotFoundError as e:
        return jsonify({'erro': str(e)}), 503
    except Exception as e:
        return jsonify({'erro': str(e)}), 500


@bp.route('/campos', methods=['GET'])
def campos():
    """Lista todos os campos esperados com descrição — útil para o front."""
    return jsonify({
        campo: info['descricao']
        for campo, info in CAMPOS_OBRIGATORIOS.items()
    }), 200


@bp.route('/saude', methods=['GET'])
def saude():
    import os
    from app.services.modelo import MODELS_DIR, THRESHOLD_RL, THRESHOLD_RN

    arquivos = {
        'preprocessor.pkl':     os.path.exists(os.path.join(MODELS_DIR, 'preprocessor.pkl')),
        'modelo_RL_rodada2.pkl': os.path.exists(os.path.join(MODELS_DIR, 'modelo_RL_rodada2.pkl')),
        'modelo_RN.keras':      os.path.exists(os.path.join(MODELS_DIR, 'modelo_RN.keras')),
        'top_features_RN.pkl':  os.path.exists(os.path.join(MODELS_DIR, 'top_features_RN.pkl')),
    }

    modelos_disponiveis = []
    if arquivos['preprocessor.pkl'] and arquivos['modelo_RL_rodada2.pkl']:
        modelos_disponiveis.append('rl')
    if arquivos['preprocessor.pkl'] and arquivos['modelo_RN.keras']:
        modelos_disponiveis.append('rn')

    return jsonify({
        'status': 'ok' if modelos_disponiveis else 'sem modelos carregados',
        'modelos_disponiveis': modelos_disponiveis,
        'thresholds': {'rl': THRESHOLD_RL, 'rn': THRESHOLD_RN},
        'arquivos': arquivos,
    }), 200