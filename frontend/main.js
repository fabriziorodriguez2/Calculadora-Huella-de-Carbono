
async function enviarRespuesta() {
  const token = localStorage.getItem("token"); // lo guardaste luego del login
  const respuesta = document.getElementById("pregunta1").value;
  const mensajeDiv = document.getElementById("mensaje");

  if (!token) {
    mensajeDiv.textContent = "No has iniciado sesión.";
    mensajeDiv.style.color = "red";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/respuestas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        pregunta: "¿Cuántos km recorres en auto a la semana?",
        respuesta: respuesta
      })
    });

    if (res.ok) {
      mensajeDiv.textContent = "✅ Respuesta guardada con éxito.";
      mensajeDiv.style.color = "green";
    } else {
      const data = await res.json();
      mensajeDiv.textContent = "❌ Error: " + (data.error || "Algo salió mal.");
      mensajeDiv.style.color = "red";
    }
  } catch (err) {
    console.error("Error al enviar la respuesta:", err);
    mensajeDiv.textContent = "❌ Error de conexión con el servidor.";
    mensajeDiv.style.color = "red";
  }
}

