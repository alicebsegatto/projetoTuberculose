# Guia de Execução

Este documento descreve o processo para reproduzir os experimentos realizados no projeto de predição do abandono do tratamento de tuberculose.

## Pré-requisitos

- Python 3.10+
- Google Colab (recomendado)
- Google Drive
- Bibliotecas utilizadas nos notebooks

## 1. Obter os Dados

Faça o download dos conjuntos de dados disponibilizados para o projeto:

- `treino.csv`
- `teste1.csv`
- `teste2.csv`

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
