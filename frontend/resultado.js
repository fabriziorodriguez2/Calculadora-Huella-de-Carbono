// Recupera las respuestas del almacenamiento local (o un array vacío si no hay nada)
const respuestas = JSON.parse(localStorage.getItem("respuestasHuella") || "[]");

// Referencias a los elementos HTML donde se mostrará la información
const consumoMensual = document.getElementById("consumoMensual");
const zonaResultado = document.getElementById("zonaResultado");
const recomendaciones = document.getElementById("recomendaciones");
const comparativa = document.getElementById("comparativa");
const promedioMundial = 333; 
const promedioRecomendado = 160;

// Puntaje estimado por respuesta
const puntajes = {
  // Vivienda y Energía
  "1": 80, "2": 70, "3": 60, "4+": 50,
  "Gas": 60, "Electricidad": 50, "Leña": 90, "Ninguna": 0,

  // Transporte
  "Nunca": 0, "Ocasionalmente": 50, "Diariamente": 150,
  "Sí": 50, "No": 80, "Ocasionalmente": 25,

  // Alimentación
  "Diariamente": 120, "1-2 veces por semana": 60, "Nunca": 20,
  "Sí": 20, "No": 50,

  // Residuos
  "A veces": 40,
};

let total = 0;
respuestas.forEach(r => {
  total += puntajes[r] || 0; // valor por defecto 0 si no hay puntaje definido
});

consumoMensual.textContent = `Tu consumo estimado es de ${total.toFixed(0)} kg de CO₂ por mes.`;

// Zona según promedio (Ejemplo)
let zona = "";
let color = "";
let mensaje = "";

if (total < 200) {
  zona = "Verde";
  color = "#2e7d32";
  mensaje = "¡Excelente! Tu huella está por debajo del promedio mudnial.";
} else if (total < 350) {
  zona = "Amarilla";
  color = "#fbc02d";
  mensaje = "Bien, pero podés mejorar algunas áreas.";
} else if (total < 500) {
  zona = "Naranja";
  color = "#fb8c00";
  mensaje = "Tu huella es mayor a la deseada. Considerá cambios.";
} else {
  zona = "Roja";
  color = "#d32f2f";
  mensaje = "Tu huella es muy alta. Es importante actuar para reducirla.";
}

zonaResultado.innerHTML = `<h2 style="color:${color};">Zona ${zona}</h2><p>${mensaje}</p>`;

comparativa.innerHTML = `<p>Promedio mundial: ${promedioMundial} kg CO₂/mes</p>
<p>Promedio esperado por la ONU para 2030 : ${promedioRecomendado} kg CO₂/mes</p>`;

// Recomendaciones simples
if (respuestas.includes("Diariamente") && respuestas.includes("Carne roja")) {
  recomendaciones.innerHTML += "<li>Reducí el consumo de carne roja.</li>";
}
if (respuestas.includes("No")) {
  recomendaciones.innerHTML += "<li>Intentá reciclar y usar transporte público.</li>";
}
if (respuestas.includes("Leña")) {
  recomendaciones.innerHTML += "<li>Cambiá la calefacción a una opción más limpia.</li>";
}
if (respuestas.includes("No") || respuestas.includes("A veces")) {
  recomendaciones.innerHTML += "<li>Elegí productos locales o reutilizables.</li>";
}
if (recomendaciones.children.length === 0) {
  recomendaciones.innerHTML = "<li>¡Seguí así! Tu estilo de vida es bastante sostenible.</li>";
}
