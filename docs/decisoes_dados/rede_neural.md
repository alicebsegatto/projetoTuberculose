# Treinamento da Rede Neural

## Objetivo do modelo

Este notebook apresenta o treinamento e a avaliação de uma Rede Neural para prever o risco de abandono do tratamento de tuberculose (LTFU).

Como o objetivo do projeto é identificar o maior número possível de pacientes em risco, o **Recall** foi definido como a principal métrica de avaliação.

## Etapas realizadas

- Tratamento do desbalanceamento das classes;
- Aplicação de pesos adicionais para pacientes reingressos;
- Construção da arquitetura da Rede Neural;
- Aplicação de técnicas de regularização;
- Treinamento e validação do modelo;
- Comparação de diferentes thresholds de classificação;
- Avaliação em conjuntos de teste independentes;
- Análise de importância das variáveis utilizando Permutation Importance.

## Tratamento do desbalanceamento

A variável alvo apresenta distribuição desigual entre pacientes que abandonaram e que não abandonaram o tratamento.

Para minimizar esse problema foram utilizados:

### Class Weights

Os pesos das classes foram calculados automaticamente com base na distribuição dos dados de treinamento.

Essa estratégia aumenta a penalização dos erros cometidos na classe minoritária, incentivando o modelo a identificar pacientes com risco de abandono.

### Sample Weights para reingressos

Pacientes classificados como **reingresso após abandono** receberam peso adicional durante o treinamento.

A decisão foi adotada porque esses pacientes representam um grupo com histórico de interrupção do tratamento e potencial maior risco de novo abandono.

## Arquitetura da Rede Neural

Foi utilizada uma arquitetura totalmente conectada composta por quatro camadas ocultas:

| Camada | Neurônios |
|---------|---------|
| Dense 1 | 256 |
| Dense 2 | 128 |
| Dense 3 | 64 |
| Dense 4 | 32 |

A quantidade de neurônios foi reduzida gradualmente para permitir que a rede extraísse padrões complexos nas primeiras camadas e representações mais compactas nas camadas finais.

A camada de saída utiliza a função de ativação **Sigmoid**, retornando a probabilidade de abandono do tratamento.

## Técnicas de regularização

Para reduzir o risco de overfitting foram utilizadas as seguintes estratégias:

### Regularização L2

Aplicada em todas as camadas densas para evitar dependência excessiva de determinados pesos.

### Batch Normalization

Utilizada após cada camada densa para estabilizar o treinamento e acelerar a convergência do modelo.

### Dropout

Foram aplicadas as seguintes taxas:

- 30% na primeira camada;
- 20% na segunda camada;
- 10% na terceira camada.

O objetivo foi aumentar a capacidade de generalização da rede.

## Estratégia de treinamento

O treinamento foi realizado utilizando:

- Otimizador: Adam
- Função de perda: Binary Crossentropy
- Batch Size: 512
- Métricas monitoradas:
  - ROC-AUC
  - Recall
  - Acurácia

Também foram utilizados dois callbacks:

### EarlyStopping

Interrompe automaticamente o treinamento quando a ROC-AUC de validação deixa de apresentar melhora.

### ReduceLROnPlateau

Reduz a taxa de aprendizado quando o desempenho da validação permanece estável por várias épocas consecutivas.

## Escolha do threshold

Inicialmente o modelo utilizava o threshold padrão de **0,50**.

Entretanto, considerando que o objetivo principal do projeto é identificar pacientes com risco de abandono, foram avaliados diferentes thresholds de classificação.

Foram comparados os valores:

- 0,35;
- 0,40;
- 0,50.

A análise demonstrou que o threshold **0,40** apresentou o melhor equilíbrio entre Recall e Precisão para o contexto do projeto.

Embora o threshold 0,35 apresentasse Recall ligeiramente superior, ele gerava um número significativamente maior de falsos positivos. Já o threshold 0,50 reduzia a capacidade de identificação dos pacientes em risco.

Dessa forma, o threshold **0,40** foi escolhido como configuração final do modelo.

## Explicabilidade do modelo

Para interpretar o comportamento da Rede Neural foi utilizada a técnica **Permutation Importance**.

Essa abordagem mede a redução do desempenho do modelo quando os valores de uma variável são embaralhados.

As variáveis que provocam maior queda no desempenho são consideradas mais importantes para as previsões realizadas pela rede.

## Resultados finais

Após a definição do threshold final de 0,40, o modelo apresentou os seguintes resultados:

| Conjunto | Acurácia | Precisão | Recall | F1-Score | ROC-AUC |
|-----------|----------|----------|----------|----------|----------|
| Teste 1 | 0.6371 | 0.5522 | 0.9170 | 0.6893 | 0.8050 |
| Teste 2 | 0.7480 | 0.7452 | 0.9680 | 0.8421 | 0.7774 |

Os resultados demonstram que o modelo foi eficaz na identificação de pacientes com risco de abandono, alcançando recall superior a 91% em ambos os conjuntos de teste. Dessa forma, o principal objetivo do projeto foi atingido, com boa capacidade de detecção dos casos de abandono.