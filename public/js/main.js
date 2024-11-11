let arrayTareas = JSON.parse(localStorage.getItem('tareas')) || [];

function agregarTarea() {
    let elementoTarea = document.getElementById("tarea").value;
    arrayTareas.push(elementoTarea);
    localStorage.setItem('tareas', JSON.stringify(arrayTareas)); // Se convierte el array en una cadena para almacenarlo en el LS.
    mostrarTarea();
    document.getElementById("tarea").value = '';
}

function mostrarTarea() {
    let elementoLista = document.getElementById("listaTareas");
    elementoLista.innerHTML = '';

    arrayTareas.forEach((tarea, indice) => {
        let itemLista = document.createElement("li");
        itemLista.className = "d-flex align-items-center mb-2";

        let textoTarea = document.createElement("span");
        textoTarea.textContent = tarea;
        textoTarea.className = "flex-grow-1 ms-3";

        let itemBorrar = document.createElement("button");
        itemBorrar.textContent = "Eliminar";
        itemBorrar.className = "btn btn-danger btn-sm";
        itemBorrar.onclick = function () {
            eliminarTarea(indice);
        };

        itemLista.appendChild(textoTarea);
        itemLista.appendChild(itemBorrar);
        elementoLista.appendChild(itemLista);
    }); 
}

function eliminarTarea(indice) {
    arrayTareas.splice(indice, 1);
    localStorage.setItem('tareas', JSON.stringify(arrayTareas));
    mostrarTarea();
}

// Accion de la tecla ENTER.
document.getElementById('tarea').addEventListener('keydown', function(event) {
    if(event.key === 'Enter' || event.key === 13) {
        agregarTarea();
    }
});

// Cargar las tareas almacenadas cuando se abre la pagina.
document.addEventListener('DOMContentLoaded', mostrarTarea);

// const tareaRegistradas = localStorage.getItem('tareas'); // Se recupera la cadena JSON del LS.