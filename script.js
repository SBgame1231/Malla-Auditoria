const malla = {
  "Semestre 1": [
    "Microeconomía",
    "Tecnologías de la Información",
    "Matemática Elemental",
    "Administración de Empresas I",
    "Derecho Civil y Comercial"
  ],
  "Semestre 2": [
    "Macroeconomía",
    "Álgebra",
    "Comunicación Oral y Escrita",
    "Contabilidad Elemental",
    "Administración de Empresas II",
    "Derecho Laboral y Previsional"
  ],
  "Semestre 3": [
    "Cálculo",
    "Sistema de Información I",
    "Administración de Recursos Humanos",
    "Contabilidad General I",
    "Derecho Tributario I",
    "Cálculo Financiero"
  ],
  "Semestre 4": [
    "Estadística I",
    "Marketing",
    "Contabilidad General II",
    "Comercio Exterior",
    "Derecho Tributario II",
    "Complementario I"
  ],
  "Semestre 5": [
    "Sistema de Información II",
    "Estadística II",
    "Derecho Tributario III",
    "Contabilidad General III",
    "Costos I",
    "Ética en las Empresas"
  ],
  "Semestre 6": [
    "Auditoría I",
    "Administración Pública",
    "Contabilidad Superior",
    "Finanzas I",
    "Costos II",
    "Electiva I"
  ],
  "Semestre 7": [
    "Auditoría II",
    "Electiva II",
    "Contabilidad Aplicada",
    "Control de Gestión",
    "Finanzas II",
    "Metodología de la Investigación"
  ],
  "Semestre 8": [
    "Auditoría de Sistemas",
    "Auditoría de Estados Financieros",
    "Evolución de Proyectos",
    "Auditoría Tributaria",
    "Seminario de Título"
  ]
};

const container = document.getElementById("malla-container");

Object.keys(malla).forEach((semestre) => {
  const div = document.createElement("div");
  div.className = "semester";

  const h2 = document.createElement("h2");
  h2.textContent = semestre;
  div.appendChild(h2);

  malla[semestre].forEach((ramo) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      saveState();
    });
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(ramo));
    div.appendChild(label);
  });

  container.appendChild(div);
});

function saveState() {
  const states = [];
  document.querySelectorAll("input[type='checkbox']").forEach((cb) => {
    states.push(cb.checked);
  });
  localStorage.setItem("malla_auditoria", JSON.stringify(states));
}

function loadState() {
  const states = JSON.parse(localStorage.getItem("malla_auditoria"));
  if (states) {
    document.querySelectorAll("input[type='checkbox']").forEach((cb, idx) => {
      cb.checked = states[idx];
    });
  }
}

window.onload = loadState;
