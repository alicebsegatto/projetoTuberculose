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
- Aplicação web para utilização dos modelos por profissionais da saúde;
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
│   │   ├── rede_neural.md
│   │   └── regressao_logistica.md
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
| regressao_logistica.md | Estratégia de treinamento, ajuste de threshold e decisões adotadas para a Regressão Logística |
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

## Aplicação Web e API

### Aplicação Web

**Principais funcionalidades:**
- Preenchimento das informações do paciente;
- Consulta automática do município a partir do CEP;
- Validação dos campos obrigatórios;
- Exibição da probabilidade estimada de abandono do tratamento;
- Classificação do risco em baixo, moderado ou alto.

---

### API REST

**Principais funcionalidades:**
- Recebimento dos dados enviados pela aplicação web;
- Aplicação automática do pipeline de pré-processamento;
- Execução dos modelos de Regressão Logística e Rede Neural;
- Retorno da probabilidade estimada de abandono do tratamento;
- Disponibilização dos resultados para a interface web.

As instruções para execução da aplicação web e da API encontram-se no arquivo **[Guia.md](Guia.md)**.

## Considerações Finais

Este projeto explorou a aplicação de técnicas de Machine Learning na predição do abandono do tratamento de tuberculose, abrangendo desde a preparação dos dados até a disponibilização dos modelos por meio de uma aplicação web integrada a uma API REST.

A documentação presente neste repositório tem como objetivo facilitar a compreensão, reprodução e manutenção do projeto, permitindo futuras evoluções e adaptações da solução desenvolvida.

