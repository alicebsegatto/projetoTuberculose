# Guia de Reprodução e Execução

Este documento descreve os procedimentos necessários para reproduzir os experimentos realizados no projeto e executar a aplicação desenvolvida.

## 1. Obter os Dados

Faça o download dos conjuntos de dados disponibilizados para o projeto:

- `treino.csv`
- `teste1.csv`
- `teste2.csv`

Eles podem ser obtidos em:

- [**Acessar dados do projeto**](https://drive.google.com/drive/folders/1KsxNo8jNc3Sq7XtT1LmUAJkI80d-khFE?usp=sharing)

Os arquivos devem ser armazenados no Google Drive ou em um diretório acessível pelos notebooks.

## 2. Executar a Preparação dos Dados

Abra e execute todas as células do notebook:

```text
Preparacao_Dados.ipynb
```

Esta etapa realiza:

- Seleção das variáveis utilizadas pelos modelos;
- Tratamento de valores ausentes;
- Correção de inconsistências dos dados;
- Criação de atributos derivados;
- Tratamento de outliers;
- Normalização de variáveis numéricas;
- Codificação de variáveis categóricas;
- Construção do pipeline de pré-processamento.

Ao final serão gerados os arquivos:

```text
X_train_proc.csv
X_test1_proc.csv
X_test2_proc.csv

y_train.csv
y_test1.csv
y_test2.csv

preprocessor.pkl
```

## 3. Executar o Treinamento da Regressão Logística

Após a preparação dos dados, execute:

```text
Treinamento_RL.ipynb
```

O notebook realiza:

- Treinamento do modelo;
- Avaliação nos conjuntos de teste;
- Geração das métricas de desempenho;
- Análise de importância das variáveis;
- Salvamento dos resultados.

## 4. Executar o Treinamento da Rede Neural

Após a preparação dos dados, execute:

```text
Treinamento_RN.ipynb
```

O notebook realiza:

- Treinamento da Rede Neural;
- Avaliação nos conjuntos de teste;
- Geração das métricas de desempenho;
- Matrizes de confusão;
- Curvas ROC;
- Seleção do threshold de classificação;
- Análise de importância das variáveis (Permutation Importance);
- Salvamento dos resultados.

## Observações

- Os notebooks foram desenvolvidos utilizando Google Colab.
- Os caminhos dos arquivos podem precisar ser ajustados conforme o ambiente utilizado.
- A etapa de preparação dos dados deve ser executada antes do treinamento dos modelos.
- Os resultados e gráficos são gerados automaticamente durante a execução dos notebooks.


# Execução da Aplicação

## 1. Clonar o Repositório

```bash
git clone https://github.com/alicebsegatto/projetoTuberculose.git
cd projetoTuberculose
```

## 2. Criar o Ambiente Virtual

### Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

### Linux / macOS

```bash
python -m venv .venv
source .venv/bin/activate
```

## 3. Instalar as Dependências

```bash
pip install -r requirements.txt
```

## 4. Download dos Modelos

Devido às limitações de tamanho do GitHub, os modelos treinados não estão armazenados no repositório.

Faça o download através do link abaixo:

- [**Baixar arquivos dos modelos**](https://drive.google.com/drive/folders/1Ub_pLeedfFc5naQwlYOgiWMTWDIvuXSS?usp=sharing)

Após o download, copie os arquivos para:

```text
app/models/
```

Estrutura esperada:

```text
app/
└── models/
    ├── preprocessor.pkl
    ├── modelo_RL_rodada2.pkl
    ├── modelo_RN.keras
    └── top_features_RN.pkl
```

## 5. Executar a API

Com o ambiente virtual ativo:

```bash
flask --app app/main.py run
```

A API ficará disponível em:

```text
http://127.0.0.1:5000
```
### Endpoints Disponíveis

#### `GET /`

Endpoint utilizado para verificar se a API está em funcionamento.

**Exemplo:**

```text
http://127.0.0.1:5000/
```

---

#### `POST /api/prever`

Endpoint responsável por realizar a predição da probabilidade de abandono do tratamento de tuberculose.

**Content-Type:** `application/json`

A requisição deve conter as informações clínicas, sociais e demográficas do paciente. A API aplica automaticamente o pipeline de pré-processamento e retorna a probabilidade estimada de abandono do tratamento.

**Resposta de sucesso:**

```json
{
  "predicao": 1,
  "probabilidade_abandono": 0.7234,
  "threshold_utilizado": 0.4,
  "modelo": "rl",
  "interpretacao": "Alto risco"
}
```

**Campos retornados:**

| Campo | Descrição |
|---------|---------|
| `predicao` | Resultado da classificação realizada pelo modelo |
| `probabilidade_abandono` | Probabilidade estimada de abandono do tratamento |
| `threshold_utilizado` | Limiar de classificação utilizado pelo modelo |
| `modelo` | Modelo utilizado na predição (`rl` ou `rn`) |
| `interpretacao` | Classificação textual do risco |

**Observação:** As variáveis `score_vulnerabilidade`, `qtd_comorbidades` e `faixa_etaria` são calculadas automaticamente pela API e não precisam ser enviadas pelo usuário.

## 6. Executar a Aplicação Web

Abra um novo terminal e acesse a pasta:

```bash
cd frontend-tuberculose
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

## 7. Utilização do Sistema

1. Inicie a API Flask;
2. Inicie a aplicação React;
3. Acesse o endereço informado pelo Vite;
4. Preencha os dados do paciente;
5. Clique em **Confirmar**;
6. Visualize a probabilidade estimada e a classificação de risco.
