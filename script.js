const nombreInput = document.getElementById("nombre");
const edadInput = document.getElementById("edad");
const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");
const error = document.getElementById("error");
const datosGuardados = document.getElementById("datosGuardados");
const contadorDiv = document.getElementById("contador");
const btnLimpiar = document.getElementById("limpiar");


let datos = JSON.parse(localStorage.getItem("usuarios")) || [];
let contador = parseInt(sessionStorage.getItem("contador")) || 0;


renderTabla();
actualizarContador();


function renderTabla() {
  if (datos.length === 0) {
    datosGuardados.innerHTML = "<p>No hay datos guardados.</p>";
    return;
  }

  let tabla = `<table>
    <thead>
      <tr>
        <th>#</th>
        <th>Nombre</th>
        <th>Edad</th>
      </tr>
    </thead>
    <tbody>`;

  datos.forEach((usuario, index) => {
    tabla += `
      <tr>
        <td>${index + 1}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.edad}</td>
      </tr>`;
  });

  tabla += `</tbody></table>`;
  datosGuardados.innerHTML = tabla;
}


function actualizarContador() {
  contador += 1;
  sessionStorage.setItem("contador", contador);
  contadorDiv.textContent = `Has interactuado ${contador} vez/veces en esta sesión.`;
}


formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const edad = parseInt(edadInput.value);

  if (nombre === "" || isNaN(edad) || edad < 0) {
    error.textContent = "Por favor, ingresa datos válidos.";
    mensaje.textContent = "";
    return;
  }

  datos.push({ nombre, edad });
  localStorage.setItem("usuarios", JSON.stringify(datos));

  mensaje.textContent = "Datos guardados correctamente.";
  error.textContent = "";

  nombreInput.value = "";
  edadInput.value = "";
  nombreInput.focus();

  renderTabla();
  actualizarContador();
});

btnLimpiar.addEventListener("click", () => {
  localStorage.removeItem("usuarios");
  sessionStorage.removeItem("contador");

  datos = [];
  contador = 0;

  mensaje.textContent = "Local Storage limpiado.";
  error.textContent = "";

  renderTabla();
  actualizarContador();
}); 