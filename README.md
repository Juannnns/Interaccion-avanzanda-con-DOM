# 📝 Formulario de Usuario con Local Storage y Contador de Sesión
Este proyecto es una aplicación web simple que perimite a los usuarios ingresar su nombre y edad, guardar estos datos en el __Local Storage__, y visualizar un __contador deinteracciones__ que se almacena durante la sesión actual mediante __Session Storage__

## 🚀 ¿Para qué sirve?
+ Guardar y visualizaar datos de usuarios.
+ Almacena los datos ingresados en el navegador para futuras visitas.
+ Mostrar un contador de interacciones por sesión.
+ Permitir la limpieza de datos almacenados.

## 💡 Características principales
+ Formulario para capturar nombre y edad.
+ Validación básica de campos.
+ Tabla dinámica con los datos ingresados.
+ Contador de interacciones visible en pantalla.
+ Botón para limpiar todos los datos almacenados.
+ Interfaz estilizada con CSS moderno.

## 📁 Estructura del proyecto 
```bash
📦 Proyecto
├── index.html
├── script.js
└── style.css
```

## 🛠️ ¿Cómo se usa?

1. Abre `index.html` en tu navegador.
2. Llena los campos de nombre y edad, luego haz clic en "Guardar".
3. Los datos se mostrarán en una tabla debajo del formulario.
4. El contador aunmentará con cada interacción válida.
5. Hazz clic en "Limpiar Local Storage" para borrar todos los datos.

## 📦Instalación // Requisitos
No necesitas instalar nada. Solo necesitas:
1. Un navegador moderno
2. Descargar clonar los tres archivos y abrir
```
<!--  Clonar este repositorio -->
git clone https://github.com/Juannnns/Interaccion-avanzanda-con-DOM.git
````

## 🧠 `script.js` - Lógica del funcionamiento

__Carga inicial de datos y contador__
```js
let datos = JSON.parse(localStorage.getItem("usuarios")) || [];
let contador = parseInt(sessionStorage.getItem("contador")) || 0;
```

__Mostrar datos guardados en una tabla__ 
```js
function renderTabla() {
  if (datos.length === 0) {
    datosGuardados.innerHTML = "<p>No hay datos guardados.</p>";
    return;
  }

  let tabla = `<table>...</table>`;
  datos.forEach((usuario, index) => {
    tabla += `<tr><td>${index + 1}</td><td>${usuario.nombre}</td><td>${usuario.edad}</td></tr>`;
  });

  datosGuardados.innerHTML = tabla;
}
```

__Contador de interacciones__
```js
function actualizarContador() {
  contador += 1;
  sessionStorage.setItem("contador", contador);
  contadorDiv.textContent = `Has interactuado ${contador} vez/veces en esta sesión.`;
}
```

__Guardar datos al enviar el formulario__
```js
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = nombreInput.value.trim();
  const edad = parseInt(edadInput.value);

  if (nombre === "" || isNaN(edad) || edad < 0) {
    error.textContent = "Por favor, ingresa datos válidos.";
    return;
  }

  datos.push({ nombre, edad });
  localStorage.setItem("usuarios", JSON.stringify(datos));

  mensaje.textContent = "Datos guardados correctamente.";
  renderTabla();
  actualizarContador();
});
```

__Limpiar los datos__
```js
btnLimpiar.addEventListener("click", () => {
  localStorage.removeItem("usuarios");
  sessionStorage.removeItem("contador");
  datos = [];
  contador = 0;
  mensaje.textContent = "Local Storage limpiado.";
  renderTabla();
  actualizarContador();
});
```