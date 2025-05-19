// Suponemos que el nombre del usuario está guardado en localStorage después del login
window.onload = () => {
  const nombre = localStorage.getItem('nombreUsuario') || 'Usuario';
  document.getElementById('nombreUsuario').textContent = nombre;
};

document.getElementById('iniciarEncuesta').addEventListener('click', () => {
  // Redirigir a la página de encuesta
  window.location.href = 'encuesta.html';
});
