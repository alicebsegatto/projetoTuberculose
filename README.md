# Predição de Abandono do Tratamento de Tuberculose (LTFU)

Projeto de Machine Learning voltado à predição do abandono do tratamento de tuberculose a partir de dados do Sistema de Informação de Agravos de Notificação (SINAN).

O trabalho explora a utilização de modelos preditivos para identificar pacientes com maior risco de interrupção do tratamento, contribuindo para estratégias de acompanhamento e apoio à tomada de decisão em saúde pública.

## Contexto

O abandono do tratamento é um dos principais desafios no controle da tuberculose. Pacientes que interrompem o acompanhamento apresentam maior risco de agravamento da doença, transmissão para outras pessoas e desenvolvimento de resistência aos medicamentos.

Nesse contexto, a identificação precoce de pacientes com maior probabilidade de abandono pode auxiliar profissionais da saúde na priorização de monitoramento, intervenções e ações preventivas.

## Destaques do Projeto

- Mais de **560 mil registros** utilizados para treinamento dos modelos;
- Pipeline automatizado de preparação dos dados utilizando **Scikit-Learn**;
- Desenvolvimento de modelos de **Regressão Logística** e **Rede Neural**;
- Avaliação em cenários de validação interna e externa;
- Aplicação de técnicas de explicabilidade para interpretação dos resultados;
- Foco na maximização do Recall, priorizando a identificação de pacientes em risco.

## Conjunto de Dados

Os dados utilizados neste projeto são provenientes do Sistema de Informação de Agravos de Notificação (SINAN) e foram previamente organizados em conjuntos de treino, teste1 e teste2 para treinamento e avaliação dos modelos.

Os arquivos podem ser acessados pelo link abaixo:

- **[Acessar dados do projeto](https://drive.google.com/drive/folders/1KsxNo8jNc3Sq7XtT1LmUAJkI80d-khFE?usp=sharing)**

## Reprodução do Projeto

As instruções para execução completa estão disponíveis em:

- **[Guia de execução](Guia.md)**

## Estrutura do Projeto

```text
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models/
│   │   ├── preprocessor.pkl
│   │   ├── modelo_RL_rodada2.pkl
│   │   ├── modelo_RN.keras
│   │   └── top_features_RN.pkl
│   └── services/
│       ├── modelo.py
│       ├── outlier_clipper.py
│       └── frequency_encoder.py
│
├── docs/
│   ├── decisoes_dados/
│   │   ├── preparacao_dados.md
│   │   └── rede_neural.md
│   │
│   └── dicionario_dados/
│       ├── TUBEN_CADERNO_ANALISE.pdf
│       ├── TUBEN_DIC_DADOS.pdf
│       ├── TUBEN_FICHA_ACOMP.pdf
│       ├── TUBEN_FICHA.pdf
│       └── TUBEN_INSTRUCIONAL.pdf
│
├── frontend-tuberculose/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
├── notebooks/
│   ├── Preparacao_Dados.ipynb
│   ├── Treinamento_RL.ipynb
│   └── Treinamento_RN.ipynb
│
├── .gitignore
├── Guia.md
├── README.md
└── requirements.txt
```

## Documentação

A pasta `docs/` reúne os materiais de apoio utilizados durante o desenvolvimento do projeto.

### Decisões dos Dados

Documentação das escolhas realizadas durante a preparação dos dados e treinamento dos modelos.

| Arquivo | Descrição |
|----------|----------|
| preparacao_dados.md | Tratamento dos dados, engenharia de atributos e pipeline de pré-processamento |
| rede_neural.md | Arquitetura, treinamento e decisões adotadas para a Rede Neural |

---

### Dicionário de Dados

Documentos oficiais utilizados para consulta e interpretação das variáveis presentes na base de dados do SINAN.

| Documento | Descrição |
|------------|------------|
| TUBEN_DIC_DADOS.pdf | Dicionário de dados da base |
| TUBEN_CADERNO_ANALISE.pdf | Caderno de análise da tuberculose |
| TUBEN_FICHA.pdf | Ficha de notificação |
| TUBEN_FICHA_ACOMP.pdf | Ficha de acompanhamento |
| TUBEN_INSTRUCIONAL.pdf | Manual instrucional |

---

### Notebooks

Os notebooks do projeto concentram os scripts utilizados para preparação dos dados, treinamento dos modelos e avaliação dos resultados.

| Notebook | Descrição |
|-----------|-----------|
| Preparacao_Dados.ipynb | Pipeline de preparação e transformação dos dados |
| Treinamento_RL.ipynb | Treinamento e avaliação da Regressão Logística |
| Treinamento_RN.ipynb | Treinamento e avaliação da Rede Neural |


## Preparação dos Dados

O pré-processamento foi realizado por meio de um pipeline automatizado desenvolvido com Scikit-Learn, garantindo consistência e reprodutibilidade em todas as etapas.

Principais transformações aplicadas:

- Tratamento de valores ausentes;
- Correção de inconsistências dos dados do SINAN;
- Tratamento de outliers;
- Criação de variáveis derivadas;
- Normalização de atributos numéricos;
- Codificação de variáveis categóricas;
- Construção de pipeline automatizado para aplicação em novos dados.

## Modelos Desenvolvidos

### Regressão Logística

Modelo linear utilizado como baseline do projeto, servindo como referência para comparação de desempenho e interpretação dos fatores associados ao abandono do tratamento.

### Rede Neural

Modelo multicamadas desenvolvido para capturar relações não lineares entre variáveis clínicas, sociais e demográficas, incorporando técnicas de regularização, ajuste de threshold e análise de importância das variáveis.

## Estratégia de Avaliação

Os modelos foram avaliados em duas etapas:

### Rodada 1

**Treino → Teste1**

Validação em conjunto com distribuição semelhante à utilizada durante o treinamento.

### Rodada 2

**Treino + Teste1 → Teste2**

Validação externa em conjunto com distribuição diferente dos dados de treinamento.

### Métricas Utilizadas

- Recall
- Precisão
- F1-Score
- Acurácia
- ROC-AUC

O **Recall** foi definido como principal métrica de avaliação, pois o objetivo do projeto é minimizar a quantidade de pacientes em risco que deixariam de ser identificados pelos modelos.

# API de Predição — Tuberculose (LTFU)

API REST desenvolvida com Flask para servir os modelos de predição de abandono do tratamento de tuberculose treinados no projeto.

## Tecnologias

- Python 3.10+
- Flask
- Scikit-Learn
- Keras (backend TensorFlow ou PyTorch)
- Joblib

## Estrutura

```text
app/
├── __init__.py
├── main.py                  # Inicialização da aplicação e rotas
├── models/
│   ├── preprocessor.pkl         # Pipeline de pré-processamento
│   ├── modelo_RL_rodada2.pkl    # Modelo de Regressão Logística
│   ├── modelo_RN.keras          # Modelo de Rede Neural
│   └── top_features_RN.pkl      # Features mais importantes (explicabilidade)
└── services/
    ├── modelo.py                # Lógica de predição e enriquecimento dos dados
    ├── outlier_clipper.py       # Classe OutlierClipper (usada pelo pipeline)
    └── frequency_encoder.py     # Classe FrequencyEncoder (usada pelo pipeline)
```

## Pré-requisitos

Os modelos precisam ter sido gerados pelos notebooks antes de rodar a API:

- `preprocessor.pkl` → gerado pelo `Preparacao_Dados.ipynb`
- `modelo_RL_rodada2.pkl` → gerado pelo `Treinamento_RL.ipynb`
- `modelo_RN.keras` → gerado pelo `Treinamento_RN.ipynb`
- `top_features_RN.pkl` → gerado pelo `Treinamento_RN.ipynb`

Consulte o [Guia de Execução](Guia.md) para gerar esses arquivos.

## Instalação

```bash
# Crie e ative o ambiente virtual
python -m venv .venv
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # Linux/macOS

# Instale as dependências
pip install -r requirements.txt
```

## Execução

```bash
flask --app app/main.py run
```

A API ficará disponível em `http://127.0.0.1:5000`.

---

## Endpoints

### `GET /`

Verificação de saúde da API.

**Resposta:**

```json
{ "message": "Hello World, Flask API is running!" }
```

---

### `POST /api/prever`

Realiza a predição de risco de abandono do tratamento para um paciente.

**Content-Type:** `application/json`

#### Campos do body

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `modelo` | string | Modelo a utilizar: `"rl"` (Regressão Logística) ou `"rn"` (Rede Neural) |
| `TRATAMENTO` | int | Tipo de entrada: 1=Caso novo, 2=Recidiva, 3=Reingresso, 5=Transferência |
| `POP_RUA` | int | Situação de rua: 1=Sim, 2=Não |
| `POP_LIBER` | int | Privado de liberdade: 1=Sim, 2=Não |
| `POP_IMIG` | int | Imigrante: 1=Sim, 2=Não |
| `POP_SAUDE` | int | Profissional de saúde: 1=Sim, 2=Não |
| `BENEF_GOV` | int | Recebe benefício do governo: 1=Sim, 2=Não |
| `AGRAVALCOO` | int | Alcoolismo: 1=Sim, 2=Não |
| `AGRAVDROGA` | int | Uso de drogas: 1=Sim, 2=Não |
| `AGRAVDOENC` | int | Doença mental: 1=Sim, 2=Não |
| `AGRAVAIDS` | int | AIDS: 1=Sim, 2=Não |
| `AGRAVDIABE` | int | Diabetes: 1=Sim, 2=Não |
| `HIV` | int | HIV: 1=Positivo, 2=Negativo |
| `FORMA` | int | Forma clínica: 1=Pulmonar, 2=Extrapulmonar, 3=Ambas |
| `TRAT_SUPER` | int | Tratamento supervisionado: 1=Sim, 2=Não |
| `idade_anos` | int | Idade do paciente em anos |
| `ID_MUNIC_A` | int | Código IBGE do município de atendimento |
| `ID_RG_RESI` | int | Código da região de residência |
| `TEST_SENSI` | int | Teste de sensibilidade: 1–5 |
| `BACILOSC_2` | int | Baciloscopia 2º mês: 1=Positiva, 2=Negativa |
| `CS_ESCOL_N` | int | Escolaridade (ordinal): 1=Sem escolaridade … 8=Superior |
| `CS_SEXO` | string | Sexo: `"M"`, `"F"` ou `"I"` |
| `CS_RACA` | int | Raça/cor: 1=Branca, 2=Preta, 3=Amarela, 4=Parda, 5=Indígena |

> **Observação:** os campos `score_vulnerabilidade`, `qtd_comorbidades` e `faixa_etaria` são calculados automaticamente pela API e não precisam ser enviados.

#### Exemplo de requisição

```bash
curl -X POST http://127.0.0.1:5000/api/prever ^
-H "Content-Type: application/json" ^
-d "{\"modelo\":\"rl\",\"TRATAMENTO\":1,\"POP_RUA\":1,\"POP_LIBER\":2,\"POP_IMIG\":2,\"BENEF_GOV\":2,\"AGRAVALCOO\":1,\"AGRAVDROGA\":1,\"AGRAVDOENC\":2,\"AGRAVAIDS\":1,\"AGRAVDIABE\":2,\"HIV\":1,\"FORMA\":1,\"TRAT_SUPER\":2,\"idade_anos\":42,\"ID_MUNIC_A\":355030,\"POP_SAUDE\":2,\"TEST_SENSI\":2,\"BACILOSC_2\":2,\"CS_ESCOL_N\":1,\"CS_SEXO\":\"M\",\"CS_RACA\":1,\"ID_RG_RESI\":1}"
```

#### Resposta de sucesso

```json
{
  "predicao": 1,
  "probabilidade_abandono": 0.7234,
  "threshold_utilizado": 0.4,
  "modelo": "rl",
  "interpretacao": "Risco de abandono detectado"
}
```

| Campo | Descrição |
|-------|-----------|
| `predicao` | `1` = risco de abandono detectado, `0` = sem risco |
| `probabilidade_abandono` | Probabilidade estimada pelo modelo (0 a 1) |
| `threshold_utilizado` | Limiar de classificação aplicado (0.40 para ambos os modelos) |
| `modelo` | Modelo utilizado na predição (`rl` ou `rn`) |
| `interpretacao` | Descrição textual do resultado |

#### Resposta de erro

```json
{ "erro": "Descrição do erro" }
```

---

## Variáveis Derivadas

A API calcula automaticamente três variáveis que o modelo exige mas que não são enviadas diretamente pelo cliente:

| Variável | Cálculo |
|----------|---------|
| `score_vulnerabilidade` | Soma de `POP_RUA + POP_LIBER + POP_IMIG + AGRAVALCOO + AGRAVDROGA + AGRAVAIDS` |
| `qtd_comorbidades` | Soma de `AGRAVAIDS + AGRAVDIABE + AGRAVDOENC` |
| `faixa_etaria` | Faixa derivada de `idade_anos`: `18-30`, `31-45`, `46-60` ou `60+` |

Os campos binários enviados com valor `2` (padrão SINAN para "Não") são convertidos automaticamente para `0` antes do pré-processamento.

---

## Integração com o Front-end

Se o front-end rodar em uma origem diferente da API, configure o CORS:

```bash
pip install flask-cors
```

```python
# app/main.py
from flask_cors import CORS
CORS(app)
```

## Considerações Finais

Este projeto explorou a aplicação de técnicas de Machine Learning na predição do abandono do tratamento de tuberculose, abrangendo desde a preparação dos dados até a avaliação e interpretação dos modelos.

A documentação disponível neste repositório busca garantir transparência, reprodutibilidade e facilitar futuras evoluções do trabalho.
