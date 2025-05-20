const API_URL= "https://calculadora-huella-de-carbono.onrender.com";

window.onload = () => {
  localStorage.removeItem("token");
};

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;

  try {
    const res = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contraseña })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token); // guardar el token
      localStorage.setItem('nombreUsuario', data.nombre); // Agregá esto
      console.log(localStorage.getItem('nombreUsuario')); // Verifica que se guarde correctamente
      document.getElementById('loginMensaje').textContent = '¡Login exitoso!';
      // Redirigir o mostrar contenido, según tu app
      setTimeout(() => {
      window.location.href = 'menu.html'; // Redirige al menú
      }, 1000);
    } else {
      document.getElementById('loginMensaje').textContent = data.error || 'Error al iniciar sesión';
    }
  } catch (error) {
    document.getElementById('loginMensaje').textContent = 'Error de conexión';
  }
});
