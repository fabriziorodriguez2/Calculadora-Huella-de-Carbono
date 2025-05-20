document.getElementById('registroForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;

  try {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, contraseña })
    });

    const data = await res.json();

    if (res.ok) {
      document.getElementById('registroMensaje').textContent = '¡Cuenta creada con éxito!';
      setTimeout(() => {
        window.location.href = 'login.html'; // Redirige al login
      }, 1500);
    } else {
      document.getElementById('registroMensaje').textContent = data.error || 'Error al registrarse';
    }
  } catch (error) {
    document.getElementById('registroMensaje').textContent = 'El mail ya está en uso';
  }
});
