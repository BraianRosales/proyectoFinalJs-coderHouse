
$(()=>{
  let nombre = $("#nombre");
  let apellido = $("#apellido");
  let eMail = $("#e-mail");
  let contraseña = $("#contraseña");
  let confirmarContraseña = $("#confirmar-contraseña");
  let lsUsuariosRegistrados = [];
  let btnRegistrar = $("#button");
  let divAlert = $("#alert");

  class Usuario {
    constructor(nombre, apellido, contraseña) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.contraseña = contraseña;
    }
  }

  const todosLosCamposSonValidos = () => {
    let testNombre = nombre[0].value;
    let testApellido = apellido[0].value;
    let testContraseña = contraseña[0].value;
    let testEmail = eMail[0].value;
    let testConfirmarContraseña = confirmarContraseña[0].value;
    return (
      (testNombre.length /= 0) &&
      (testApellido.length /= 0) &&
      (testContraseña.length /= 0) &&
      (testEmail.length /= 0) &&
      (testConfirmarContraseña.length /= 0) &&
      testContraseña == testConfirmarContraseña
    );
  };

  btnRegistrar.on("click", handleRegistrar);

  function handleRegistrar() {
    $("body").append(`<div id="alert"></div>`);
    if (todosLosCamposSonValidos()) {
      localStorage.setItem("usuarioNombre", nombre[0].value.toLowerCase());
      localStorage.setItem("usuarioApellido", apellido[0].value.toLowerCase());
      localStorage.setItem(
        "usuarioContraseña",
        contraseña[0].value.toLowerCase()
      );
      lsUsuariosRegistrados.push(
        new Usuario(
          localStorage.getItem("usuarioNombre"),
          localStorage.getItem("usuarioApellido"),
          localStorage.getItem("usuarioContraseña")
        )
      );
      let lsUsuariosRegistradosString = JSON.stringify(lsUsuariosRegistrados);
      localStorage.setItem(
        "lsUsuariosRegistrados",
        lsUsuariosRegistradosString
      );
      $("#alert").html(`Usuario registrado!`);
      $("#alert").css("color", "green");
    } else {
      $("#alert").html(
        `Usuario no registrado.Verfique que ningun campo este vacio y que las contraseñas coincidan.`
      );
      $("#alert").css("color", "red");
    }
  }   
})

