# Predição do Abandono do Tratamento de Tuberculose no Sistema Público de Saúde

Projeto desenvolvido para estimar a probabilidade de abandono do tratamento de tuberculose por meio de técnicas de Machine Learning aplicadas aos dados do SINAN.

## Objetivo

Desenvolver modelos capazes de identificar pacientes com maior risco de abandono do tratamento, auxiliando profissionais da saúde na adoção de estratégias de acompanhamento e intervenção.

## Dados

A base utilizada é proveniente do Sistema de Informação de Agravos de Notificação (SINAN) e foi previamente organizada em conjuntos de treino, teste1 e teste2 para avaliação dos modelos.

Os arquivos podem ser acessados pelo link abaixo:

**[Acessar dados do projeto](https://drive.google.com/drive/folders/1KsxNo8jNc3Sq7XtT1LmUAJkI80d-khFE?usp=sharing)**

## Execução

As instruções para reprodução do projeto estão disponíveis em:

[GUIA.md](GUIA.md)

## Documentação

A pasta `docs` reúne materiais de apoio utilizados durante o desenvolvimento do projeto.

### Dicionario_Dados.pdf

Contém a descrição das variáveis presentes na base de dados, incluindo seus significados, codificações e possíveis valores. O documento serviu como referência para a seleção dos atributos e para a interpretação dos resultados obtidos.

## Estrutura do Projeto

```text
├── notebooks/
│   ├── Preparacao_Dados.ipynb
│   ├── Treinamento_RN.ipynb
│   └── Treinamento_RL.ipynb
│
├── docs/
│   └── Dicionario_Dados.pdf
│
├── GUIA.md
└── README.md
```

## Preparação dos Dados

O processamento foi realizado por meio de um pipeline desenvolvido com Scikit-Learn, garantindo consistência e reprodutibilidade na aplicação das transformações.

As principais etapas foram:

- Tratamento de valores ausentes;
- Tratamento de outliers;
- Seleção de variáveis relevantes;
- Criação de novos atributos;
- Correção de inconsistências;
- Normalização de variáveis numéricas;
- Codificação de variáveis categóricas;
- Construção de um pipeline automatizado para futuras atualizações dos dados.

## Modelos

### Rede Neural

Modelo desenvolvido com Keras para estimar a probabilidade de abandono do tratamento. O treinamento foi realizado em duas rodadas de validação, permitindo avaliar o desempenho tanto em dados com distribuição semelhante quanto em dados externos.

### Regressão Logística

Modelo baseline utilizado para comparação de desempenho com a Rede Neural, servindo como referência para avaliar os ganhos obtidos com uma abordagem mais complexa.

## Estratégia de Avaliação

Os modelos foram avaliados em duas etapas:

- Rodada 1: Treino → Teste 1 (validação interna);
- Rodada 2: Treino + Teste 1 → Teste 2 (validação externa).

As métricas adotadas foram:

- Acurácia;
- Precisão;
- Recall;
- F1-Score;
- ROC-AUC.

## Resultados da Rede Neural

Os resultados indicam bom desempenho na identificação de pacientes com risco de abandono, especialmente em termos de Recall e F1-Score.

| Modelo | Acurácia | Precisão | Recall | F1 | ROC-AUC |
|----------|----------|----------|----------|----------|----------|
| Rodada 1 - Teste 1 | 0.7195 | 0.6420 | 0.8159 | 0.7186 | 0.7997 |
| Rodada 2 - Teste 2 | 0.7448 | 0.7953 | 0.8516 | 0.8225 | 0.7675 |

## Tecnologias Utilizadas

- Python
- Pandas
- NumPy
- Scikit-Learn
- Keras
- Matplotlib
- Seaborn
