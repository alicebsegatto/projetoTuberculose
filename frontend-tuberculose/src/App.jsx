import { useState } from "react";
import "./App.css";

const sexoOptions = [
  { value: "", label: "Selecione..." },
  { value: "M", label: "Masculino" },
  { value: "F", label: "Feminino" },
];

const escolaridadeOptions = [
  { value: "", label: "Selecione..." },
  { value: 0, label: "Analfabeto" },
  {
    value: 1,
    label: "1ª a 4ª série incompleta do Ensino Fundamental"
  },
  {
    value: 2,
    label: "4ª série completa do Ensino Fundamental"
  },
  {
    value: 3,
    label: "5ª a 8ª série incompleta do Ensino Fundamental"
  },
  {
    value: 4,
    label: "Ensino Fundamental completo"
  },
  {
    value: 5,
    label: "Ensino Médio incompleto"
  },
  {
    value: 6,
    label: "Ensino Médio completo"
  },
  {
    value: 7,
    label: "Educação Superior incompleta"
  },
  {
    value: 8,
    label: "Educação Superior completa"
  },
  {
    value: 9,
    label: "Ignorado"
  },
  {
    value: 10,
    label: "Não se aplica"
  }
];

const simNaoIgnoradoOptions = [
  { value: "", label: "Selecione..." },
  { value: 1, label: "Sim" },
  { value: 2, label: "Não" },
  { value: 9, label: "Ignorado" },
];

const tpEntradaOptions = [
  { value: "", label: "Selecione..." },
  { value: 1, label: "Caso Novo" },
  { value: 2, label: "Recidiva" },
  { value: 3, label: "Reingresso após Abandono" },
  { value: 4, label: "Não Sabe" },
  { value: 5, label: "Transferência" },
  { value: 6, label: "Pós-óbito" },
];

const tpHivOptions = [
  { value: "", label: "Selecione..." },
  { value: 1, label: "Positivo" },
  { value: 2, label: "Negativo" },
  { value: 3, label: "Em andamento" },
  { value: 4, label: "Não realizado" },
];

const tpFormaOptions = [
  { value: "", label: "Selecione..." },
  { value: 1, label: "Pulmonar" },
  { value: 2, label: "Extrapulmonar" },
  { value: 3, label: "Pulmonar + Extrapulmonar" },
];

const tpSensibilidadeOptions = [
  { value: "", label: "Selecione..." },
  { value: 1, label: "Resistente somente à Isoniazida" },
  { value: 2, label: "Resistente somente à Rifampicina" },
  { value: 3, label: "Resistente à Isoniazida e Rifampicina" },
  { value: 4, label: "Resistente a outras drogas de 1ª linha" },
  { value: 5, label: "Sensível" },
  { value: 6, label: "Em andamento" },
  { value: 7, label: "Não realizado" },
];

const baciloscopiaOptions = [
  { value: "", label: "Selecione..." },
  { value: 1, label: "Positiva" },
  { value: 2, label: "Negativa" },
  { value: 3, label: "Não realizada" },
  { value: 4, label: "Não se aplica" },
];

const zonaOptions = [
  { value: "", label: "Selecione..." },
  { value: 1, label: "Urbana" },
  { value: 2, label: "Rural" },
  { value: 3, label: "Periurbana" },
  { value: 9, label: "Ignorado" },
];

const racaOptions = [
  { value: "", label: "Selecione..." },
  { value: 1, label: "Branca" },
  { value: 2, label: "Preta" },
  { value: 3, label: "Amarela" },
  { value: 4, label: "Parda" },
  { value: 5, label: "Indígena" },
  { value: 9, label: "Ignorado" },
];

function App() {
  const [resultado, setResultado] = useState(null);

  const [formData, setFormData] = useState({
    nome_paciente: "",
    tp_entrada: "",
    tp_pop_rua: "",
    tp_pop_liberdade: "",
    tp_pop_imigrante: "",
    tp_benef_gov: "",
    st_agravo_alcolismo: "",
    st_agravo_drogas: "",
    st_agravo_mental: "",
    st_agravo_aids: "",
    st_agravo_diabete: "",
    tp_hiv: "",
    tp_forma: "",
    tp_tratamento_acompanhamento: "",
    idade: "",
    cep: "",
    nome_municipio: "",
    id_municipio:"",
    tp_pop_saude: "",
    tp_sensibilidade: "",
    st_baciloscopia_2_mes: "",
    escolaridade: "",
    sexo: "",
    raca:"",
    zona: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const buscarCEP = async (cep) => {
  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) return;

  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${cepLimpo}/json/`
    );

    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      cep,
      nome_municipio: data.localidade,
      id_municipio: data.ibge,
    }));
  } catch (error) {
    console.error(error);
    alert("Erro ao consultar CEP");
  }
  };

  const handleCEPChange = (e) => {
  const cep = e.target.value;

  setFormData((prev) => ({
    ...prev,
    cep,
  }));

  buscarCEP(cep);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dados = {
    modelo: "rn",

    TRATAMENTO: Number(formData.tp_entrada),
    POP_RUA: Number(formData.tp_pop_rua),
    POP_LIBER: Number(formData.tp_pop_liberdade),
    POP_IMIG: Number(formData.tp_pop_imigrante),
    POP_SAUDE: Number(formData.tp_pop_saude),
    BENEF_GOV: Number(formData.tp_benef_gov),

    AGRAVALCOO: Number(formData.st_agravo_alcolismo),
    AGRAVDROGA: Number(formData.st_agravo_drogas),
    AGRAVDOENC: Number(formData.st_agravo_mental),
    AGRAVAIDS: Number(formData.st_agravo_aids),
    AGRAVDIABE: Number(formData.st_agravo_diabete),

    HIV: Number(formData.tp_hiv),
    FORMA: Number(formData.tp_forma),
    TRAT_SUPER: Number(formData.tp_tratamento_acompanhamento),

    idade_anos: Number(formData.idade),
    ID_MUNIC_A: Number(formData.id_municipio),
    ID_RG_RESI: Number(formData.zona),

    TEST_SENSI: Number(formData.tp_sensibilidade),
    BACILOSC_2: Number(formData.st_baciloscopia_2_mes),
    CS_ESCOL_N: Number(formData.escolaridade),
    CS_SEXO: formData.sexo,
    CS_RACA: Number(formData.raca),
  };

    try {
      const response = await fetch(
        "http://localhost:5000/api/prever",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

      const data = await response.json();

      setResultado(data.probabilidade);
      

      setResultado(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao consultar API");
    }
  };

const renderSelect = (name, label, options) => (
  <div className="field">
    <label>{label}</label>

    <select
      name={name}
      value={formData[name]}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const formularioCompleto = Object.values(formData).every(
  (valor) => valor !== ""
);

return (
  <div className="container">
    <h1>Predição de Abandono do Tratamento da Tuberculose</h1>

    <p className="subtitulo">
      Sistema de apoio à decisão para estimar o risco de abandono do tratamento
      de tuberculose com base em informações clínicas, sociais e demográficas
      do paciente.
    </p>

    <form onSubmit={handleSubmit}>

      <div className="field">
        <label>Nome do paciente</label>

        <input
          name="nome_paciente"
          type="text"
          value={formData.nome_paciente}
          onChange={handleChange}
          placeholder="Digite o nome do paciente"
        />
      </div>

      <div className="field">
        <label>Idade</label>

        <input
          name="idade"
          type="number"
          min="0"
          max="120"
          value={formData.idade}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
        />
      </div>

{renderSelect(
  "sexo", 
  "Sexo", 
  sexoOptions
)}

{renderSelect(
  "raca",
  "Raça/Cor",
  racaOptions
)}

{renderSelect(
  "tp_entrada", 
  "Tipo de entrada no tratamento", 
  tpEntradaOptions
  )}

{renderSelect(
  "tp_pop_rua",
  "Situação de rua",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "tp_pop_liberdade",
  "Privado de liberdade",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "tp_pop_imigrante",
  "Imigrante",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "tp_benef_gov",
  "Benefício governamental",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "st_agravo_alcolismo",
  "Histórico de alcoolismo",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "st_agravo_drogas",
  "Histórico de uso de drogas",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "st_agravo_mental",
  "Transtorno Mental",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "st_agravo_aids",
  "Diagnóstico de AIDS",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "st_agravo_diabete",
  "Diagnóstico de diabetes",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "tp_hiv", 
  "Diagnóstico de HIV", 
  tpHivOptions)}

{renderSelect(
  "tp_forma",
  "Forma clínica da tuberculose",
  tpFormaOptions
)}

{renderSelect(
  "tp_tratamento_acompanhamento",
  "Tratamento supervisionado",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "tp_pop_saude",
  "Profissional de saúde",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "tp_sensibilidade",
  "Teste de sensibilidade",
  tpSensibilidadeOptions
)}

{renderSelect(
  "st_baciloscopia_2_mes",
  "Baciloscopia após 2 meses",
  baciloscopiaOptions
)}

{renderSelect(
  "escolaridade",
  "Escolaridade",
  escolaridadeOptions
)}

{renderSelect(
  "zona",
  "Zona de Residência",
  zonaOptions
)}


<div className="field">
  <label>CEP</label>

  <input
    type="text"
    name="cep"
    value={formData.cep}
    onChange={handleCEPChange}
    placeholder="00000-000"
    maxLength={9}
  />
</div>

<div className="field">
  <label>Município</label>

  <input
    type="text"
    name="nome_municipio"
    value={formData.nome_municipio}
    disabled
  />
</div>

      <div className="button-container">
    <button
    type="submit"
    disabled={!formularioCompleto} >
    Confirmar
    </button>
</div>

       </form>

{resultado && (
  <div className="resultado">
    <h2>Resultado da análise</h2>

    <p>
      Probabilidade de abandono:{" "}
      <strong>
        {(resultado.probabilidade_abandono * 100).toFixed(2)}%
      </strong>
    </p>

    <div
      className={
        resultado.probabilidade_abandono >= 0.7
          ? "risco risco-alto"
          : resultado.probabilidade_abandono >= 0.4
          ? "risco risco-moderado"
          : "risco risco-baixo"
      }
    ></div>
    <p className="interpretacao">
      {resultado.interpretacao}
    </p>
  </div>
)}
</div>
  );
}

export default App;