// Mostrar u ocultar formularios
function mostrarRegistro() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
    document.getElementById("formTitle").textContent = "Registro";
}

function mostrarLogin() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("formTitle").textContent = "Iniciar Sesión";
}

// Registro de usuario
function userRegister() {
    const correo = document.getElementById("regCorreo").value.trim();
    const nombre = document.getElementById("regNombre").value.trim();
    const pass = document.getElementById("regPass").value;

    if (!correo || !nombre || !pass) {
        alert("Completa todos los campos");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    if (usuarios[correo]) {
        alert("Este correo ya está registrado");
        return;
    }

    usuarios[correo] = { usuario: nombre, contraseña: pass, tareas: [] };

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Registro exitoso. Ya puedes iniciar sesión.");
    mostrarLogin();
}

// Inicio de sesión
function userLogin() {
    const correo = document.getElementById("loginCorreo").value.trim();
    const pass = document.getElementById("loginPass").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    if (usuarios[correo] && usuarios[correo].contraseña === pass) {
        localStorage.setItem("usuarioActivo", correo);
        window.location.href = "html/gestor-tareas.html";
    } else {
        alert("Correo o contraseña incorrectos");
    }
}

// Detectar si hay sesión activa
if (localStorage.getItem("usuarioActivo")) {
    window.location.href = "html/gestor-tareas.html";
}

// Permitir Enter para login y registro
document.addEventListener("DOMContentLoaded", () => {
    const loginInput = document.getElementById('loginPass');
    const registerInput = document.getElementById('regPass');

    if (loginInput) {
        loginInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") userLogin();
        });
    }

    if (registerInput) {
        registerInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") userRegister();
        });
    }
});