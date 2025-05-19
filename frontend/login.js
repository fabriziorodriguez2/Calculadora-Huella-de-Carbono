window.onload = () => {
  localStorage.removeItem("token");
};

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;

  try {
    const res = await fetch(`http://localhost:3000/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contraseña })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token); // guardar el token
      document.getElementById('loginMensaje').textContent = '¡Login exitoso!';
      // Redirigir o mostrar contenido, según tu app
    } else {
      document.getElementById('loginMensaje').textContent = data.error || 'Error al iniciar sesión';
    }
  } catch (error) {
    document.getElementById('loginMensaje').textContent = 'Error de conexión';
  }
});
