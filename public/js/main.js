let tareasUsuario = [];
let usuarios = {};
let usuario = "";
let input, lista;

document.addEventListener('DOMContentLoaded', () => {
  usuario = localStorage.getItem('usuarioActivo');
  if (!usuario) {
    window.location.href = 'login.html';
    return;
  }

  usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
  if (!usuarios[usuario]) {
    alert("Usuario no válido");
    localStorage.removeItem("usuarioActivo");
    window.location.href = "login.html";
    return;
  }

  tareasUsuario = usuarios[usuario].tareas || [];

  input = document.getElementById("tarea");
  lista = document.getElementById("listaTareas");

  // Carga las tareas al iniciar
  renderizarTareas();

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      agregarTarea();
    }
  });
});

function guardarTareas() {
  usuarios[usuario].tareas = tareasUsuario;
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function renderizarTareas() {
    lista.innerHTML = "";
    tareasUsuario.forEach((tarea, index) => {
      const li = document.createElement("li");
      li.className = "d-flex align-items-center mb-2";
  
      const span = document.createElement("span");
      span.textContent = tarea;
      span.className = "flex-grow-1 ms-3";
  
      // Boton de eliminar
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.className = "btn btn-danger btn-sm me-2";
      btnEliminar.onclick = () => {
        tareasUsuario.splice(index, 1);
        guardarTareas();
        renderizarTareas();
      };
  
      // Boton de editar
      const btnEditar = document.createElement("button");
      btnEditar.textContent = "Editar";
      btnEditar.className = "btn btn-warning btn-sm";
      btnEditar.onclick = () => {
        const nuevaTarea = prompt("Editar tarea:", tarea);
        if (nuevaTarea !== null && nuevaTarea.trim() !== "") {
          tareasUsuario[index] = nuevaTarea.trim();
          guardarTareas();
          renderizarTareas();
        }
      };
  
      li.appendChild(span);
      li.appendChild(btnEditar);
      li.appendChild(btnEliminar);
      lista.appendChild(li);
    });
  }  

function agregarTarea() {
  const tarea = input.value.trim();
  if (tarea) {
    tareasUsuario.push(tarea);
    guardarTareas();
    renderizarTareas();
    input.value = "";
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "login.html";
}