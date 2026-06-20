# Regressão Logística

## Objetivo

A Regressão Logística foi utilizada como modelo de classificação binária para estimar a probabilidade de abandono do tratamento de tuberculose. Sua utilização teve como objetivo fornecer um modelo interpretável e servir como baseline comparativo em relação ao modelo de Rede Neural.

---

## Escolha do Modelo

A Regressão Logística foi escolhida por ser um algoritmo amplamente utilizado em problemas de classificação binária, apresentando boa capacidade de interpretação, baixo custo computacional e facilidade de implementação.

Além disso, seus coeficientes permitem analisar diretamente o impacto das variáveis sobre a probabilidade de abandono do tratamento, característica especialmente relevante para aplicações na área da saúde.

---

## Justificativa da Escolha

A Regressão Logística foi selecionada por apresentar:

* Facilidade de interpretação;
* Baixo custo computacional;
* Boa capacidade de generalização;
* Probabilidades diretamente interpretáveis;
* Ampla utilização em aplicações médicas e epidemiológicas.

Além disso, o modelo serviu como baseline para comparação com abordagens mais complexas, como a Rede Neural Artificial.

---

## Estratégia de Treinamento

Após a disponibilização dos conjuntos treino, teste1 e teste2, foram realizadas duas rodadas de treinamento e avaliação do modelo.

### Rodada 1

Treinamento realizado utilizando o conjunto `treino.csv` e avaliação no conjunto `teste1.csv`.

### Rodada 2

Após a primeira rodada, os conjuntos `treino.csv` e `teste1.csv` foram combinados para formar um novo conjunto de treinamento. O modelo foi então reentrenado e avaliado utilizando o conjunto `teste2.csv`.

Essa abordagem permite avaliar a capacidade de generalização do modelo em diferentes conjuntos de dados.

---

## Estratégia para Dados Desbalanceados

Os dados utilizados apresentavam distribuição desigual entre as classes, podendo favorecer previsões para a classe majoritária. Para reduzir esse efeito foram utilizados:

* Class Weights automáticos (`balanced`);
* Sample Weights personalizados.

Pacientes classificados como reingresso após abandono receberam peso três vezes superior aos demais registros, considerando seu maior risco histórico de reincidência.

Essa estratégia teve como objetivo aumentar a sensibilidade do modelo para casos considerados mais críticos.

---

## Busca de Hiperparâmetros

A seleção dos hiperparâmetros foi realizada utilizando `RandomizedSearchCV` com validação cruzada estratificada.

Foram avaliadas 50 combinações de parâmetros envolvendo:

* `C` (intensidade da regularização);
* `penalty` (tipo de regularização);
* `l1_ratio` (combinação entre regularizações L1 e L2).

A métrica utilizada para seleção do melhor conjunto de hiperparâmetros foi ROC-AUC.

---

## Estratégia de Regularização

Foram avaliadas diferentes estratégias de regularização com o objetivo de reduzir o risco de overfitting e melhorar a capacidade de generalização do modelo.

As regularizações L1 e L2 foram consideradas durante a busca de hiperparâmetros, permitindo controlar a complexidade do modelo e reduzir a influência de variáveis pouco relevantes.

O parâmetro `C` foi utilizado para controlar a intensidade da regularização aplicada.

---

## Validação Cruzada

A busca pelos melhores hiperparâmetros foi realizada utilizando validação cruzada estratificada com três folds.

A estratificação foi adotada para preservar a proporção das classes em cada divisão dos dados, garantindo avaliações mais estáveis e reduzindo possíveis vieses durante a seleção dos parâmetros.

---

## Definição do Threshold

Por padrão, a Regressão Logística utiliza threshold igual a 0,50 para conversão das probabilidades em classes.

Entretanto, o objetivo principal deste projeto consiste em **identificar o maior número possível de pacientes com risco de abandono do tratamento**, minimizando a ocorrência de falsos negativos. Portanto, foi realizada uma análise das curvas de Precisão, Recall e F1-Score para diferentes valores de threshold.

Os resultados demonstraram que o threshold de 0,40 apresentou Recall significativamente superior ao threshold padrão de 0,50, mantendo desempenho satisfatório nas demais métricas.

Por esse motivo, foi adotado o seguinte valor:

```text
Threshold = 0.40
```

Essa decisão prioriza a identificação de pacientes em risco, mesmo que isso resulte em aumento da quantidade de falsos positivos.

---

## Métricas de Avaliação

O desempenho do modelo foi avaliado utilizando:

* Acurácia;
* Precisão;
* Recall;
* F1-Score;
* ROC-AUC.

Embora todas as métricas tenham sido analisadas, o Recall foi definido como principal métrica de negócio do projeto.

---

## Interpretabilidade

Uma das principais vantagens da Regressão Logística é sua capacidade de interpretação.

Para análise dos fatores associados ao abandono do tratamento foram utilizadas duas abordagens complementares.

### Odds Ratio

Os coeficientes do modelo foram convertidos para Odds Ratio, permitindo interpretar o efeito de cada variável sobre a probabilidade de abandono do tratamento.

### Permutation Importance

Também foi aplicada a técnica de Permutation Importance para identificar quais atributos exercem maior influência sobre as previsões realizadas.

Essas abordagens contribuem para a transparência do modelo e auxiliam na compreensão dos fatores relacionados ao abandono do tratamento.

---

## Conclusões

Os resultados demonstram que a Regressão Logística apresentou elevada capacidade de identificação de pacientes com risco de abandono do tratamento, alcançando Recall superior a 98% com o threshold adotado de 0,40.


| Rodada | Threshold | Acurácia | Precisão | Recall | F1 | ROC-AUC |
|---------|---------:|---------:|---------:|---------:|---------:|---------:|
| Rodada 1 - Teste1 | 0.40 | 48.5% | 46.0% | 99.6% | 0.6294 | 0.7676 |
| Rodada 2 - Teste2 | 0.40 | 69.9% | 70.3% | 98.2% | 0.8190 | 0.6812 |
| Rodada 1 - Teste1 | 0.50 | 61.8% | 53.8% | 91.3% | 0.6774 | 0.7676 |
| Rodada 2 - Teste2 | 0.50 | 73.4% | 74.2% | 94.5% | 0.8313 | 0.6812 |
