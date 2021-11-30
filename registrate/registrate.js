let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let eMail = document.getElementById("e-mail")
let contraseña = document.getElementById("contraseña");
let confirmarContraseña = document.getElementById("confirmar-contraseña")
let lsUsuariosRegistrados = [];
let btnRegistrar = document.getElementById("button");
let divAlert = document.getElementById('alert')

class Usuario {
  constructor(nombre, apellido, contraseña) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.contraseña = contraseña;
  }
}

const todosLosCamposSonValidos = () => {
  let testNombre = nombre.value
  let testApellido = apellido.value
  let testContraseña = contraseña.value
  let testEmail = eMail.value
  let testConfirmarContraseña = confirmarContraseña.value
  return (testNombre.length /= 0) && (testApellido.length /= 0) && (testContraseña.length /= 0) && (testEmail.length /= 0) && (testConfirmarContraseña.length /= 0) && testContraseña == testConfirmarContraseña
}

btnRegistrar.addEventListener("click", handleRegistrar);

function handleRegistrar() {
  if(todosLosCamposSonValidos()){
        localStorage.setItem("usuarioNombre", nombre.value.toLowerCase());
        localStorage.setItem("usuarioApellido", apellido.value.toLowerCase());
        localStorage.setItem("usuarioContraseña", contraseña.value.toLowerCase());
        lsUsuariosRegistrados.push(new Usuario( localStorage.getItem('usuarioNombre'),localStorage.getItem('usuarioApellido'),localStorage.getItem('usuarioContraseña')))
        let lsUsuariosRegistradosString = JSON.stringify(lsUsuariosRegistrados)
        localStorage.setItem('lsUsuariosRegistrados', lsUsuariosRegistradosString)
        divAlert.innerHTML = `Usuario registrado!`
        divAlert.style.color = "green"
  }
  else{
    divAlert.innerHTML = `Usuario no registrado.Verfique que ningun campo este vacio y que las contraseñas coincidan.`
    divAlert.style.color = "red"
  }
}



