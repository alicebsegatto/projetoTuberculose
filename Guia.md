# Como Executar o Projeto

## 1. Baixar os dados

Baixe os arquivos do Google Drive:

- treino.csv
- teste1.csv
- teste2.csv


## 2. Abrir os notebooks

O projeto foi desenvolvido utilizando o Google Colab.

Faça upload dos notebooks para o Colab ou abra-os diretamente pelo GitHub.

## 3. Executar a preparação dos dados

Execute todas as células do notebook:

```text
Preparacao_Dados.ipynb
```

Ao final serão gerados os seguintes arquivos:

```text
X_train_proc.csv
X_test1_proc.csv
X_test2_proc.csv

y_train.csv
y_test1.csv
y_test2.csv

preprocessor.pkl
```

## 4. Executar o treinamento da Rede Neural

Após concluir a preparação dos dados, execute:

```text
Treinamento_RN.ipynb
```
O notebook irá:

- Treinar o modelo de Rede Neural;
- Avaliar o desempenho nos conjuntos de teste;
- Gerar métricas de avaliação;
- Gerar matrizes de confusão;
- Gerar curvas ROC;
- Gerar análise de importância das variáveis (Permutation Importance).

## 5. Executar o treinamento da Regressão Logística

Após concluir a preparação dos dados, execute:

```text
Treinamento_RL.ipynb
```

O notebook irá:

- Treinar o modelo de Regressão Logística;
- Avaliar o desempenho nos conjuntos de teste;
- Gerar métricas de avaliação;
- Gerar análise de importância das variáveis.

### Observações

- Os caminhos dos arquivos utilizam o Google Drive e podem precisar ser ajustados conforme o ambiente utilizado.
- A preparação dos dados deve ser executada antes dos treinamentos.