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

function App() {
  const [resultado, setResultado] = useState(null);

  const [formData, setFormData] = useState({
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
    tp_pop_saude: "",
    tp_sensibilidade: "",
    st_baciloscopia_2_mes: "",
    escolaridade: "",
    sexo: "",
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

    try {
      // DESCOMENTE QUANDO A API EXISTIR

      /*
      const response = await fetch(
        "http://localhost:5000/prever",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      setResultado(data.probabilidade);
      */

      // Mock temporário
      setResultado("37%");
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

      <form onSubmit={handleSubmit}>
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
        {renderSelect("sexo", "Sexo", sexoOptions)}
{renderSelect("tp_entrada", "Tipo de Entrada", tpEntradaOptions)}

{renderSelect(
  "tp_pop_rua",
  "População em Situação de Rua",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "tp_pop_liberdade",
  "Privado de Liberdade",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "tp_pop_imigrante",
  "Imigrante",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "tp_benef_gov",
  "Beneficiário de Programa Governamental",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "st_agravo_alcolismo",
  "Alcoolismo",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "st_agravo_drogas",
  "Uso de Drogas",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "st_agravo_mental",
  "Transtorno Mental",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "st_agravo_aids",
  "AIDS",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "st_agravo_diabete",
  "Diabetes",
  simNaoIgnoradoOptions
)}

{renderSelect("tp_hiv", "HIV", tpHivOptions)}

{renderSelect(
  "tp_forma",
  "Forma Clínica",
  tpFormaOptions
)}

{renderSelect(
  "tp_tratamento_acompanhamento",
  "Tratamento Acompanhado",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "tp_pop_saude",
  "Profissional da Saúde",
  simNaoIgnoradoOptions
)}

{renderSelect(
  "tp_sensibilidade",
  "Sensibilidade",
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
  <label>Nome do Município</label>

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
          <h2>Probabilidade de abandono:</h2>
          <p>{resultado}</p>
        </div>
      )}
    </div>
  );
}

export default App;