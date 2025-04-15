function userRegister() {
    const correo = document.getElementById("correo").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const contraseña = document.getElementById("contraseña").value;

    if (!correo || !usuario || !contraseña) {
        alert("Completa todos los campos");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    if (usuarios[correo]) {
        alert("El usuario ya está registrado");
        return;
    }

    usuarios[correo] = {
        usuario: usuario,
        contraseña: contraseña,
        tareas: []
    };

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Registro exitoso");
    window.location.href = "index.html";
}

function userLogin() {
    const correo = document.getElementById("correo").value.trim();
    const contraseña = document.getElementById("contraseña").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    if (usuarios[correo] && usuarios[correo].contraseña === contraseña) {
        localStorage.setItem("usuarioActivo", correo);
        window.location.href = "index.html";
    } else {
        alert("Correo o contraseña incorrectos");
    }
}
