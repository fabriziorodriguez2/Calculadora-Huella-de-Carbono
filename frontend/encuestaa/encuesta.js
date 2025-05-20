const preguntas = [
  // Vivienda y Energía
  { seccion: "Vivienda y Energía", texto: "¿Cuántas personas viven en tu hogar?", opciones: ["1", "2", "3", "4+"] },
  { seccion: "Vivienda y Energía", texto: "¿Qué tipo de energía usás para calefaccionar?", opciones: ["Gas", "Electricidad", "Leña", "Ninguna"] },

  // Transporte
  { seccion: "Transporte", texto: "¿Con qué frecuencia usás el auto?", opciones: ["Nunca", "Ocasionalmente", "Diariamente"] },
  { seccion: "Transporte", texto: "¿Utilizás transporte público?", opciones: ["Sí", "No"] },

  // Alimentación
  { seccion: "Alimentación", texto: "¿Consumís carne roja?", opciones: ["Diariamente", "1-2 veces por semana", "Nunca"] },
  { seccion: "Alimentación", texto: "¿Comprás productos locales?", opciones: ["Sí", "No"] },

  // Consumo y Residuos
  { seccion: "Consumo y Residuos", texto: "¿Reciclás en tu hogar?", opciones: ["Sí", "No"] },
  { seccion: "Consumo y Residuos", texto: "¿Comprás productos con envases reutilizables?", opciones: ["Sí", "A veces", "No"] }
];

let indiceActual = 0;
const respuestasUsuario = [];

const preguntaDiv = document.getElementById("pregunta");
const respuestasDiv = document.getElementById("respuestas");
const seccionTitulo = document.getElementById("seccionTitulo");
const barraProgreso = document.getElementById("barraProgreso");

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const finalizarBtn = document.getElementById("finalizarBtn");

function mostrarPregunta() {
  const pregunta = preguntas[indiceActual];
  preguntaDiv.textContent = pregunta.texto;
  seccionTitulo.textContent = pregunta.seccion;

  respuestasDiv.innerHTML = "";
  pregunta.opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.className = "respuesta";
    btn.textContent = opcion;
    btn.onclick = () => {
      respuestasUsuario[indiceActual] = opcion;

      // Deseleccionar anteriores
      document.querySelectorAll(".respuesta").forEach(el => el.classList.remove("seleccionada"));
      btn.classList.add("seleccionada");

      nextBtn.disabled = false;
    };
    respuestasDiv.appendChild(btn);
  });

  // Mostrar selección previa si volvés
  if (respuestasUsuario[indiceActual]) {
    [...respuestasDiv.children].forEach(btn => {
      if (btn.textContent === respuestasUsuario[indiceActual]) {
        btn.classList.add("seleccionada");
      }
    });
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }

  // Barra de progreso
  const progreso = ((indiceActual + 1) / preguntas.length) * 100;
  barraProgreso.style.width = progreso + "%";

  backBtn.style.display = indiceActual > 0 ? "inline-block" : "none";
  nextBtn.style.display = indiceActual < preguntas.length - 1 ? "inline-block" : "none";
  finalizarBtn.style.display = indiceActual === preguntas.length - 1 ? "inline-block" : "none";
}

nextBtn.onclick = () => {
  if (indiceActual < preguntas.length - 1) {
    indiceActual++;
    mostrarPregunta();
  }
};

backBtn.onclick = () => {
  if (indiceActual > 0) {
    indiceActual--;
    mostrarPregunta();
  }
};

finalizarBtn.onclick = () => {
  localStorage.setItem("respuestasHuella", JSON.stringify(respuestasUsuario));
  window.location.href = "resultado.html";
};

mostrarPregunta();
