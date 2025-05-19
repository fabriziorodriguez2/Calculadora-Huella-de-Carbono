// Definir preguntas con respuestas y un "peso" para el cálculo de huella (ejemplo)
const preguntas = [
  {
    texto: '¿Con qué frecuencia usas transporte público?',
    respuestas: [
      { texto: 'Nunca', valor: 5 },
      { texto: 'A veces', valor: 3 },
      { texto: 'Frecuentemente', valor: 1 }
    ]
  },
  {
    texto: '¿Cuántas horas al día usas electricidad en casa?',
    respuestas: [
      { texto: 'Menos de 3 horas', valor: 1 },
      { texto: 'Entre 3 y 6 horas', valor: 3 },
      { texto: 'Más de 6 horas', valor: 5 }
    ]
  },
  {
    texto: '¿Consumes productos locales o importados?',
    respuestas: [
      { texto: 'Mayormente importados', valor: 5 },
      { texto: 'Mix', valor: 3 },
      { texto: 'Mayormente locales', valor: 1 }
    ]
  }
];

let indicePregunta = 0;
let respuestasSeleccionadas = [];

const preguntaElem = document.getElementById('pregunta');
const respuestasElem = document.getElementById('respuestas');
const backBtn = document.getElementById('backBtn');
const finalizarBtn = document.getElementById('finalizarBtn');

function mostrarPregunta() {
  const pregunta = preguntas[indicePregunta];
  preguntaElem.textContent = pregunta.texto;
  respuestasElem.innerHTML = '';

  pregunta.respuestas.forEach((r, i) => {
    const btn = document.createElement('button');
    btn.textContent = r.texto;
    btn.className = 'respuesta';
    btn.onclick = () => {
      respuestasSeleccionadas[indicePregunta] = r.valor;

      if (indicePregunta < preguntas.length - 1) {
        indicePregunta++;
        mostrarPregunta();
        backBtn.style.display = 'inline-block';
        finalizarBtn.style.display = 'none';
      } else {
        // Última pregunta
        backBtn.style.display = indicePregunta > 0 ? 'inline-block' : 'none';
        finalizarBtn.style.display = 'inline-block';
        mostrarPregunta(); // para actualizar opciones si querés
      }
    };
    respuestasElem.appendChild(btn);
  });
}

backBtn.onclick = () => {
  if (indicePregunta > 0) {
    indicePregunta--;
    mostrarPregunta();
    finalizarBtn.style.display = 'none';
    if (indicePregunta === 0) backBtn.style.display = 'none';
  }
};

finalizarBtn.onclick = async () => {
  // Calcular huella de carbono sumando valores
  const huellaUsuario = respuestasSeleccionadas.reduce((a, b) => a + b, 0);

  // Aquí llamar API para obtener huella media mundial
  try {
    const res = await fetch('https://api.example.com/huella_media'); // reemplaza con API real
    const data = await res.json();

    const huellaMedia = data.media; // ejemplo de estructura

    alert(`Tu huella de carbono es: ${huellaUsuario}\nHuella media mundial: ${huellaMedia}`);

  } catch (e) {
    alert(`Tu huella de carbono es: ${huellaUsuario}\nNo se pudo obtener la huella media mundial.`);
  }
};

// Inicializar
mostrarPregunta();
backBtn.style.display = 'none';
