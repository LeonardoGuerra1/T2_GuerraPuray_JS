window.addEventListener('load', function(){

    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');

    // recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

    const button = document.getElementById("btnLogout")
    button.addEventListener("click", salir)
});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

async function salir() {
  const url = 'http://localhost:8082/login/salir-async';
  const saved = JSON.parse(localStorage.getItem("result"))
  const request = {
    correoUsuario: saved.correoUsuario
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const mensaje = "Error: Ocurrió un problema al salir."
      mostrarAlerta(mensaje)
      throw new Error(mensaje)
    }

    const json = await response.json()
    if (json.resultado) {
      window.location.href = "index.html"
      localStorage.removeItem("result")
    } else {
      mostrarAlerta(json.mensajeError)
    }
  } catch (error) {
    console.log('Error: Ocurrió un problema.', error);
    mostrarAlerta('Error: Ocurrió un problema.');
  }
}