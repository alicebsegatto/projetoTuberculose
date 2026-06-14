# Decisões de Preparação dos Dados

Este documento descreve as principais decisões adotadas na etapa de preparação dos dados utilizados para o treinamento dos modelos de predição do abandono do tratamento de tuberculose.

## 1. Origem dos dados

Foram utilizados três conjuntos de dados disponibilizados para o projeto:

- `treino.csv`
- `teste1.csv`
- `teste2.csv`

Os dados são provenientes do SINAN e já estavam separados para as etapas de treinamento e avaliação dos modelos.

## 2. Seleção de variáveis

Foram selecionadas variáveis sociodemográficas, clínicas, territoriais e relacionadas à vulnerabilidade social dos pacientes.

Entre as variáveis utilizadas estão:

- Tipo de entrada no tratamento;
- Situação de rua;
- População privada de liberdade;
- Imigração;
- Recebimento de benefício do governo;
- Alcoolismo;
- Uso de drogas;
- Doença mental;
- AIDS;
- Diabetes;
- HIV;
- Forma clínica da tuberculose;
- Tratamento supervisionado;
- Idade;
- Município;
- Escolaridade;
- Sexo;
- Raça/cor;
- Região de residência.

A variável alvo utilizada foi `ltfu`, indicando abandono do tratamento.

## 3. Tratamento de valores ausentes e inconsistentes

Alguns códigos do SINAN representam respostas como “ignorado”, “não sabe”, “em andamento”, “não realizado” ou “não se aplica”. Esses valores foram convertidos para `NaN`, permitindo que fossem tratados posteriormente pelo pipeline.

As principais regras adotadas foram:

- Valor `9` convertido para ausente nas variáveis onde representa informação ignorada;
- Em `TRATAMENTO`, o valor `4` foi tratado como ausente por representar “não sabe”;
- Em `HIV`, os valores `3` e `4` foram tratados como ausentes;
- Em `TEST_SENSI`, os valores `6` e `7` foram tratados como ausentes;
- Em `BACILOSC_2`, os valores `3` e `4` foram tratados como ausentes;
- Em `BENEF_GOV`, os valores `3`, `4` e `5` foram tratados como inconsistentes;
- Em `AGRAVAIDS`, o valor `3` foi tratado como inconsistente.

## 4. Conversão de variáveis binárias

Variáveis binárias do SINAN originalmente codificadas como:

- `1 = Sim`
- `2 = Não`

foram convertidas para:

- `1 = Sim`
- `0 = Não`

Essa conversão foi aplicada em variáveis como `POP_RUA`, `POP_LIBER`, `POP_IMIG`, `BENEF_GOV`, `AGRAVALCOO`, `AGRAVDROGA`, `AGRAVDOENC`, `AGRAVAIDS`, `AGRAVDIABE` e `TRAT_SUPER`.

## 5. Criação de variáveis derivadas

Foram criadas três variáveis derivadas para representar melhor alguns aspectos dos pacientes.

### score_vulnerabilidade

Criado a partir da soma de variáveis relacionadas à vulnerabilidade social, como situação de rua, privação de liberdade, imigração, alcoolismo, uso de drogas e AIDS.

### qtd_comorbidades

Criada a partir da soma de comorbidades selecionadas, incluindo AIDS, diabetes e doença mental.

### faixa_etaria

Criada a partir da variável `idade_anos`, agrupando os pacientes nas seguintes faixas:

- 18–30;
- 31–45;
- 46–60;
- 60+.

## 6. Tratamento de outliers

Foi criada a classe `OutlierClipper`, integrada ao pipeline do Scikit-Learn.

Essa classe utiliza o método do intervalo interquartil (IQR) para calcular limites inferiores e superiores para as variáveis numéricas. Valores extremos são limitados a esses intervalos, reduzindo o impacto de outliers sem remover registros da base.

## 7. Separação por tipo de variável

As variáveis foram separadas conforme o tipo de tratamento necessário:

- Variáveis numéricas: `idade_anos`, `score_vulnerabilidade`, `qtd_comorbidades`;
- Variáveis binárias: indicadores no formato `0` e `1`;
- Variáveis categóricas: sexo, raça/cor, forma clínica, tratamento, HIV, teste de sensibilidade, baciloscopia, escolaridade e faixa etária;
- Variáveis geográficas: município e região de residência.

## 8. Codificação de variáveis geográficas

Para as variáveis `ID_MUNIC_A` e `ID_RG_RESI`, foi criada a classe `FrequencyEncoder`.

Essa técnica codifica municípios e regiões conforme sua frequência no conjunto de treino. Municípios mais frequentes recebem valores menores, enquanto valores não vistos anteriormente recebem uma categoria adicional.

## 9. Pipeline de pré-processamento

Foi construído um pipeline automatizado utilizando Scikit-Learn, composto por diferentes sub-pipelines.

### Variáveis numéricas

- Imputação pela mediana;
- Tratamento de outliers com `OutlierClipper`;
- Normalização com `StandardScaler`.

### Variáveis binárias

- Imputação pela moda.

### Variáveis categóricas

- Imputação pela moda;
- Codificação com `OrdinalEncoder`.

### Variáveis geográficas

- Imputação de valores ausentes;
- Codificação com `FrequencyEncoder`.

As etapas foram combinadas em um `ColumnTransformer`, garantindo que cada grupo de variáveis recebesse o tratamento adequado.

## 10. Aplicação do pipeline

O pipeline foi ajustado somente no conjunto de treino e depois aplicado aos conjuntos de teste:

- `X_train_proc`;
- `X_test1_proc`;
- `X_test2_proc`.

Após a transformação, os três conjuntos ficaram com 25 variáveis processadas e sem valores ausentes.

## 11. Salvamento dos dados processados

Ao final da preparação, os dados processados foram salvos em arquivos `.csv` para serem utilizados nos notebooks de treinamento dos modelos:

- `X_train_proc.csv`;
- `X_test1_proc.csv`;
- `X_test2_proc.csv`;
- `y_train.csv`;
- `y_test1.csv`;
- `y_test2.csv`.

Também foi salvo o objeto `preprocessor.pkl`, permitindo reutilizar o mesmo pipeline em etapas futuras do projeto.