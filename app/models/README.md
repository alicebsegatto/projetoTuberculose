## Modelos Treinados

Devido às limitações de tamanho do GitHub, os arquivos de modelos não estão incluídos neste repositório.

Para que a API funcione corretamente, faça o download dos modelos disponíveis na pasta **`models-tuberculose`** no Google Drive e coloque os arquivos dentro do diretório:

```bash
app/models/
```

A estrutura deve ficar da seguinte forma:

```bash
app/
└── models/
    ├── preprocessor.pkl
    ├── modelo_RL_rodada1.pkl
    ├── modelo_RL_rodada2.pkl
    ├── modelo_RN.keras
    └── top_features_RN.pkl
```

### Arquivos necessários

* `preprocessor.pkl` – Pipeline de pré-processamento dos dados.
* `modelo_RL_rodada1.pkl` – Modelo de Regressão Logística (1ª rodada de treinamento).
* `modelo_RL_rodada2.pkl` – Modelo de Regressão Logística (2ª rodada de treinamento).
* `modelo_RN.keras` – Modelo de Rede Neural treinado.
* `top_features_RN.pkl` – Lista das principais variáveis utilizadas pela Rede Neural.

 **Download dos modelos:** https://drive.google.com/drive/folders/1H2a8BYmrIHDHinsnT3khRbZ0OQSygCad?usp=sharing

> **Importante:** Caso não ter um desses arquivos, não irá funcionar corretamente a API.

