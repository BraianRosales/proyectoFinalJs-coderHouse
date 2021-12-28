
$(()=>{
  let nombre = $("#nombre");
  let apellido = $("#apellido");
  let eMail = $("#e-mail");
  let contraseña = $("#contraseña");
  let dni = $('#dni');
  let confirmarContraseña = $("#confirmar-contraseña");
  let btnRegistrar = $("#button");
  let divAlert = $("#alert");
  let lsUsuariosRegistrados;
  
  // si lsUsuariosRegistrado es null lsUsuariosRegistrado inicializa vacia sino le agrega la lista ya obtenida. ALGORITMO IMPORTANTE.
  if (localStorage.getItem("lsUsuariosRegistrados") == null) {
    lsUsuariosRegistrados = [];
  } else {
    lsUsuariosRegistrados = JSON.parse(localStorage.getItem("lsUsuariosRegistrados"));
  }

  class Usuario {
    constructor(nombre, apellido, contraseña,dni) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.contraseña = contraseña;
      this.dni = Number(dni);
      this.autosComprados = [];
    }
  }
  
  const todosLosCamposSonValidos = () => {
    let testNombre = nombre[0].value;
    let testApellido = apellido[0].value;
    let testContraseña = contraseña[0].value;
    let testEmail = eMail[0].value;
    let testDni = dni[0].value;
    let testConfirmarContraseña = confirmarContraseña[0].value;
    return (
      (testNombre.length /= 0) && (testApellido.length /= 0) &&(testContraseña.length /= 0) &&(testEmail.length /= 0) &&(testConfirmarContraseña.length /= 0) && testContraseña == testConfirmarContraseña && (testDni.length /= 0)

    );
  };

  btnRegistrar.on("click", handleRegistrar);

  function handleRegistrar() {
    $("body").append(`<div id="alert"></div>`);
    if (todosLosCamposSonValidos()) {
      localStorage.setItem("nombreUsuarioDelRegistro", nombre[0].value.toLowerCase());
      localStorage.setItem("apellidoUsuarioDelRegistro", apellido[0].value.toLowerCase());
      localStorage.setItem("contraseñaUsuarioDelRegistro",contraseña[0].value.toLowerCase());
      localStorage.setItem("dniUsuarioDelRegistro",Number(dni[0].value))
      //console.log(Number(localStorage.getItem("dniUsuarioDelRegistro")))
      //hacer un if para verificar si el usuario con el dni ya existe entonces no lo agrego a la lsDeUsuariosRegistrados.
      lsUsuariosRegistrados.push(new Usuario( localStorage.getItem("nombreUsuarioDelRegistro"),localStorage.getItem("apellidoUsuarioDelRegistro"),localStorage.getItem("contraseñaUsuarioDelRegistro"),localStorage.getItem('dniUsuarioDelRegistro')));
      let lsUsuariosRegistradosString = JSON.stringify(lsUsuariosRegistrados);
      localStorage.setItem("lsUsuariosRegistrados",lsUsuariosRegistradosString);
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

