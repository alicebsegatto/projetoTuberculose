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
├── notebooks/
│   ├── Preparacao_Dados.ipynb
│   ├── Treinamento_RL.ipynb
│   └── Treinamento_RN.ipynb
│
├── Guia.md
└── README.md
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

## Considerações Finais

Este projeto explorou a aplicação de técnicas de Machine Learning na predição do abandono do tratamento de tuberculose, abrangendo desde a preparação dos dados até a avaliação e interpretação dos modelos.

A documentação disponível neste repositório busca garantir transparência, reprodutibilidade e facilitar futuras evoluções do trabalho.