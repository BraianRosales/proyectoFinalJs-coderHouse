$(()=>{
  $('.bxslider').bxSlider({
    auto: true,
    autoControls: true,
    stopAutoOnClick: true,
    pager: true,
    slideWidth: 1111,
  });

  class AutoClassic {
    constructor(id,marca,modelo,color,cantPuertas,kilometraje,combustible,año,precioEnString,precio,img) {
      this.id = id;
      this.marca = marca;
      this.modelo = modelo;
      this.color = color;
      this.cantPuertas = cantPuertas;
      this.kilometraje = kilometraje;
      this.combustible = combustible;
      this.año = año;
      this.precioEnString = precioEnString;
      this.precio = precio;
      this.img = img;
    }
  }

  let lsAutosClassic = [];
  let lsAutosComprados = localStorage.getItem('lsAutosComprados');
  lsAutosComprados = JSON.parse(localStorage.getItem('lsAutosComprados'));
  const mgMidget1500 = new AutoClassic(0,"MG","midget 1500","Brooklands Green",2,74.448,"Nafta",1978, "U$S 55000",55000,"img-autos/MG-Midget-1500.jpg");
  const mercedesBenz280Sl = new AutoClassic(1,"Mercedes benz","280 Sl","Sun Yellow",2,90.358,"Nafta",1978,"U$S 80000",80000,"img-autos/MercedesBenz-280SL.jpg" );
  const acCobra = new AutoClassic(2,"AC", "cobra", "Deep Impact Blue Metallic", 2,31.397,"Nafta", 2013,"U$S 80000",80000,"img-autos/AC-Cobra.jpg");
  const porsche911ScCabrioEU = new AutoClassic(3,"Porsche", "911 SC Cabrio Europeo", "White", 2, 116.927,"Nafta",1983,"U$S 98000",98000,"img-autos/Porsche-911.jpg");
  const fordA = new AutoClassic(4,"Ford","a","Washigton Blue",4,58.484,"Gasolina",1929,"U$S 12000",12000,"img-autos/Ford-A.jpg");
  const subaru360 = new AutoClassic(5,"Subaru","360","Blanco",2,12.900,"Nafta",1962,"U$S 28000",28000,"img-autos/Subaru-360.jpg");
  const chevroletCamaroZ28 = new AutoClassic(6,"Chevrolet","camaro Z28","Cottonwood Green",2,62.430,"Nafta",1971,"U$S 110000",110000,"img-autos/Chevrolet-Camaro-Z28.jpg" );
  const mercedesBenz560SL = new AutoClassic(7,"Mercedes Benz","560 SL","Red",2,69.607,"Nafta",1987,"U$S 114000",114000,"img-autos/MercedesBenz-560SL.jpg");
  const jaguarEType = new AutoClassic(8,"Jaguar","e-Type Serie 3 Roadster","Regency Red",2,50.730 ,"Nafta",1973,"U$S 295000",295000,"img-autos/Jaguar-E-Type.jpg");
  const porsche928S = new AutoClassic(9,"Porsche","928S","Chashmere Beige",2,42.744 ,"Nafta",1982, "U$S 75000",75000, "img-autos/porsche-928S.jpg");
  const chevroletCorvetteTTop = new AutoClassic(10,"Chevrolet","corvette Coupe T-Top","Black",2,71.000,"Nafta",1981,"U$S 55000",55000,"img-autos/chevrolet-corvette-coupe-T-Top.jpg");
  const fordMustang289Convertible = new AutoClassic(11,"Ford","mustaing 289","Red",2,85.995,"Nafta",1968,"U$S 120000",120000,"img-autos/ford-Mustang289.jpg");
  lsAutosClassic.push(mgMidget1500,mercedesBenz280Sl,acCobra,porsche911ScCabrioEU,fordA,subaru360,chevroletCamaroZ28,mercedesBenz560SL,jaguarEType,porsche928S,chevroletCorvetteTTop,fordMustang289Convertible);
  localStorage.setItem('lsAutosClassic', JSON.stringify(lsAutosClassic))
  let precioGuardado;
  let alerta = $('#alert');
  const InputNombre = $('#nombre')
  const InputApellido = $('#apellido')
  const InputContraseña = $('#contraseña')
  const BtnEntrar = $('#btn-entrar')
  let alertIndentificate = $('#identificate-alerta')
  BtnEntrar.on('click',handleEntrar);
  let precioAuto;
  let lsUsuariosRegistrados;
  let textoElemento = document.getElementById("btn-leerMas").textContent;
  const seIdentifico = sessionStorage.getItem("seIdentifico")
  const apellidoIdentificado = localStorage.getItem("apellidoIdentificado")
  const nombreIdentificado = localStorage.getItem("nombreIdentificado")
  const contraseñaIdentificado = localStorage.getItem("contraseñaIdentificado")
  
  
  nroCarrito = localStorage.getItem("numeroCarrito");
  $("#carrito")[0].innerHTML = `<span>${nroCarrito}</span>`;

  if (nroCarrito == null) {
    $("#carrito")[0].innerHTML = `<span>${0}</span>`;
  }

  //Agrega propiedades a los articulos en venta de la pagina.
    for (const auto of lsAutosClassic) {
      let articulos = $("#articulos");
      articulos[0].innerHTML += `
      <article class="article">
      <img src=${auto.img}>
      <i class="fas fa-star estrella" id="${auto.id}"></i>
          <ul class="ul">
              <li> marca: ${auto.marca}. </li>
              <li> nombre: ${auto.modelo}. </li>
              <li> color: ${auto.color}. </li>
              <li> cantidad de puertas: ${auto.cantPuertas}. </li>
              <li> kilometraje: ${auto.kilometraje} km. </li>
              <li> combustible: ${auto.combustible}. </li>
              <li> año: ${auto.año}. </li>
          </ul>
          <div class="precio" id="${auto.id}">${auto.precioEnString}</div>
      </article>`; 
  };

  function redireccionar(){
    location.href = "../carrito/carrito.html"
  }
  
  function clickPrecio(e) { 
    const idPrecio = Number(e.target.id);
    localStorage.setItem("precioClickeado", e.target.textContent);
    precioGuardado = localStorage.getItem("precioClickeado");
    localStorage.setItem("autoClickeado",JSON.stringify(encuentraElAutoPorPrecio()));
    siEsUsuarioRegistradoSeAplicaElDescuento();
    localStorage.setItem("autoElegidoPorElUsuario",JSON.stringify(autoElegidoParaLaCompra(idPrecio)));
    localStorage.setItem("precioTotal", precioAuto);
    localStorage.setItem("numeroCarrito", "1");
    $("#carrito")[0].innerHTML = `<span>${localStorage.getItem("numeroCarrito")}</span>`;
    $('html, body').animate({scrollTop:1}, 'slow'); //crea una animación hacia top de la página.
    alerta.fadeOut(4500);
    setTimeout(redireccionar,4000);
  }

  //al hacer click sobre un precio de los autos manda el articulo del auto seleccionado a la seccion del carrito para concretar la compra.
  $(".precio").click((e)=>{
    clickPrecio(e)
  });

  function siEsUsuarioRegistradoSeAplicaElDescuento (){
    let autoObjeto = JSON.parse(localStorage.getItem("autoClickeado"));
    if (esUsuarioRegistrado() && sessionStorage.getItem("seIdentifico") == "si") {
      aplicamosSuDescuento(autoObjeto);
      alerta.fadeIn(0);
    } else {
      pagaPrecioReal(autoObjeto);
      alerta.fadeIn(0);
    }
  };

  function aplicamosSuDescuento(autoObjeto){
    precioAuto = autoObjeto.precio;
    let porcentaje = precioAuto * 0.1;
    precioAuto = precioAuto - porcentaje;
    alerta.css("background-color", "rgb(173, 233, 186)");
    alerta.html( `<p>Usuario identificado, aplicamos su descuento! su monto a pagar es de U$S ${precioAuto}.</p>`);
    alerta.css("textAlign", "center");
    alerta.css("fontSize", "20px");
    alerta.css("lineHeight", "35px");
  };

  function pagaPrecioReal(autoObjeto){
    precioAuto = autoObjeto.precio;
    alerta.css("background-color", "rgb(250, 251, 168)");
    alerta.html(`<p> Usuario no identificado.Su monto a pagar es de U$S ${precioAuto}.</p>`);
    alerta.css("textAlign", "center");
    alerta.css("fontSize", "20px");
    alerta.css("lineHeight", "35px");
  };

  function encuentraElAutoPorPrecio(){
    return lsAutosClassic.find((auto) => auto.precioEnString == precioGuardado);
  };

  function elUsuarioYaFueRegistrado(){
    lsUsuariosRegistrados = JSON.parse(
      localStorage.getItem("lsUsuariosRegistrados")
    );
    let nombreUsuarioIdentificado = localStorage.getItem("nombreIdentificado");
    let apellidoUsuarioIdentificado = localStorage.getItem("apellidoIdentificado");
    let contraseñaUsuarioIdentificado = localStorage.getItem("contraseñaIdentificado");
    let fueRegistrado;
    if (lsUsuariosRegistrados == null) {
      fueRegistrado = false;
    } else {
      fueRegistrado = lsUsuariosRegistrados.some(
        (usuario) =>
          usuario.nombre == nombreUsuarioIdentificado &&
          usuario.apellido == apellidoUsuarioIdentificado &&
          usuario.contraseña == contraseñaUsuarioIdentificado
      );
    }
    return fueRegistrado;
  };

  function esUsuarioRegistrado(){
    let esUsuarioRegistrado = false;
    if (elUsuarioYaFueRegistrado()) {
      esUsuarioRegistrado = true;
    }
    return esUsuarioRegistrado;
  };
  
  function handleEntrar() {
    let nombreUsuario = InputNombre[0].value.toLowerCase();
    let apellidoUsuario = InputApellido[0].value.toLowerCase();
    let contraseñaUsuario = InputContraseña[0].value.toLowerCase();
    localStorage.setItem("nombreIdentificado", nombreUsuario);
    localStorage.setItem("apellidoIdentificado", apellidoUsuario);
    localStorage.setItem("contraseñaIdentificado", contraseñaUsuario);
    if (esUsuarioRegistrado()) {
          sessionStorage.setItem("seIdentifico", "si");
          location.reload()
    } else {
      alertIndentificate.html(`No registrado!
      <a href="../registrate/registrate.html">Registrarme</a>`)
      alertIndentificate.css("color", "red");
    }
  }

  if(sessionStorage.getItem("seIdentifico") === "si"){
      alertIndentificate.html(`Usuario registrado!`);
      alertIndentificate.css("color", "#4AC253")
      $('form').fadeOut(0);
      alertIndentificate.fadeOut(0)
      let nombreUsuario = localStorage.getItem("nombreIdentificado")
      $("#identificate").append(`<p id="p-bienvenido">Bienvenido/a ${nombreUsuario.charAt(0).toUpperCase() + (nombreUsuario).slice(1)}!</p><input type="button" value="salir" id="btn-salir" />`);
      $("#btn-salir").css("margin","0px auto")
      $("#btn-salir").css("margin-top","6px")
      
      $('#btn-salir').click(()=>{
        sessionStorage.setItem('seIdentifico',"no")
        localStorage.removeItem('autoElegidoPorElUsuario')
        localStorage.setItem('numeroCarrito',0)
        location.reload()
        
      })
  }
  function autoElegidoParaLaCompra(idPrecio){
    return lsAutosClassic.find((auto) => auto.id == idPrecio);
  };
  $("#presentacion").fadeOut(0);

  function nuevaEscritura(escritura){
    txt = document.getElementById("btn-leerMas");
      txt.innerText = escritura;
      textoElemento = document.getElementById("btn-leerMas").textContent;
  }

  $("#presentacion").fadeOut(0);
  $('#btn-leerMas').click(()=>{
    let txt;
    if(textoElemento === "Leer mas"){
      nuevaEscritura("Leer menos")
      $("#presentacion").fadeIn(100)
    }
    else{
      nuevaEscritura("Leer mas")
      $("#presentacion").fadeOut(100);
    }
  }) 

  function idesAutosComprados(){
    return lsAutosComprados.map(auto => auto.id)
  }
 
 function autoEstaComprado(auto){
      return idesAutosComprados().includes(auto.id)
 }

//Cambia el precio del auto a "Auto comprado" si es un auto que ya fue comprado por algun usuario.
  for (const auto of lsAutosClassic) {
    if (autoEstaComprado(auto)) {
    let article = $('.article')
    article[auto.id].innerHTML = `
    <img src=${auto.img}>
    <ul class="ul">
        <li> marca: ${auto.marca}. </li>
        <li> nombre: ${auto.modelo}. </li>
        <li> color: ${auto.color}. </li>
        <li> cantidad de puertas: ${auto.cantPuertas}. </li>
        <li> kilometraje: ${auto.kilometraje} km. </li>
        <li> combustible: ${auto.combustible}. </li>
        <li> año: ${auto.año}. </li>
    </ul>
    <div class="autoComprado" id="${auto.id}">Auto comprado</div>
    `
    }
  }

  function cambiaDeColorEstrellita(idEstrella){
    $(`#${idEstrella}`).css("color","gold")
  }

  function usuarioEncontrado(usuario,nombre,apellido,contraseña){
    return usuario.nombre === nombre &&
           usuario.apellido === apellido &&
           usuario.contraseña === contraseña
  }
 
  
  function autoFavorito(idAuto){
    return lsAutosClassic.find(auto => auto.id == idAuto)
  }

  function usuarioLogeado(){
     const nombre = localStorage.getItem('nombreIdentificado')
     const apellido = localStorage.getItem('apellidoIdentificado')
     const  contraseña = localStorage.getItem('contraseñaIdentificado')
     let usuarioLogeado;
       if (esUsuarioRegistrado() && sessionStorage.getItem("seIdentifico") == "si"){
         lsUsuariosRegistrados = JSON.parse(localStorage.getItem("lsUsuariosRegistrados"));
         usuarioLogeado = lsUsuariosRegistrados.find(usuario => usuarioEncontrado(usuario,nombre,apellido,contraseña))
       }
     return usuarioLogeado;
   }
 
   let usuarioLog = usuarioLogeado();

  function lsSinElUsuarioViejo(dni){
    return lsUsuariosRegistrados.filter((usuario) => usuario.dni !== dni);
  }

   //Modifique la lsDeUsuariosRegistrados pusheando un nuevo auto a los autos favoritos del usuario logeado y cuando la lista quedo modificada, la guarde pisandola en el local storage.
   $('.estrella').click((e)=>{
    cambiaDeColorEstrellita(e.target.id);
    autoFavorito(e.target.id);
    let lsAutosFavoritos = usuarioLog.autosFavoritos
    lsAutosFavoritos.push(autoFavorito(e.target.id))
    usuarioLog.autosFavoritos = lsAutosFavoritos;
    lsSinElUsuarioViejo(usuarioLogeado().dni)
    let lsUsuarioRegistradosNueva = lsSinElUsuarioViejo(usuarioLogeado().dni);
    lsUsuarioRegistradosNueva.push(usuarioLog)
    localStorage.setItem('lsUsuariosRegistrados',JSON.stringify(lsUsuarioRegistradosNueva))
    location.reload()
  })

  function idsAutosFavoritosDelUsuarioLogeado(){
    return (usuarioLogeado().autosFavoritos).map((auto) => auto.id)
  }

  function esUnAutoFavorito(auto){
      return idsAutosFavoritosDelUsuarioLogeado().includes(auto.id)
  }
  
  //Agrega una estrellita brillante a los autos que estan dentro de la pagina de favoritos.
    for (const auto of lsAutosClassic) {
      if (esUnAutoFavorito(auto)) {
      let article = $('.article')
      article[auto.id].innerHTML = `
      <img src=${auto.img}>
      <i class="fas fa-star estrella-brillante" id="${auto.id}"></i>
      <ul class="ul">
          <li> marca: ${auto.marca}. </li>
          <li> nombre: ${auto.modelo}. </li>
          <li> color: ${auto.color}. </li>
          <li> cantidad de puertas: ${auto.cantPuertas}. </li>
          <li> kilometraje: ${auto.kilometraje} km. </li>
          <li> combustible: ${auto.combustible}. </li>
          <li> año: ${auto.año}. </li>
      </ul>
      <div class="precio" id="${auto.id}">En favoritos</div>
      `
      }
    }

    $(".precio").click((e)=>{
      clickPrecio(e)
    })

    function autoConId(idAuto){
      return lsAutosClassic.find(auto => auto.id == idAuto)
    }
    function coincideConElUsuarioIdentificado(usuario,nombreIdentificado,apellidoIdentificado,contraseñaIdentificado){
      return ((usuario.nombre === nombreIdentificado) && (usuario.apellido === apellidoIdentificado)) && (usuario.contraseña === contraseñaIdentificado)
    }
  
    function usuarioIdentificado(){
      return  lsUsuariosRegistrados.find(usuario => coincideConElUsuarioIdentificado(usuario,nombreIdentificado,apellidoIdentificado,contraseñaIdentificado))
    }

    let lsAutosFavoritos = usuarioIdentificado().autosFavoritos;

    function lsAutosFavoritosSinElAutoRemovido(idClick){
      return lsAutosFavoritos.filter((auto) => auto.id !== Number(idClick))
    }

    function lsSinElUsuarioViejo(dni){
      return lsUsuariosRegistrados.filter((usuario) => usuario.dni !== dni);
    }

    function removerAutoDeFavoritos(idClick){
      let usuarioLog =  usuarioIdentificado();
      lsAutosFavoritosSinElAutoRemovido(idClick);
      const lsAutosFavoritosNueva = lsAutosFavoritosSinElAutoRemovido(idClick);
      usuarioLog.autosFavoritos = lsAutosFavoritosNueva;
      lsSinElUsuarioViejo(usuarioIdentificado().dni);
      let lsUsuarioRegistradosNueva = lsSinElUsuarioViejo(usuarioIdentificado().dni);
      lsUsuarioRegistradosNueva.push(usuarioLog);
      localStorage.setItem('lsUsuariosRegistrados',JSON.stringify(lsUsuarioRegistradosNueva))
      location.reload()
    }

    $('.estrella-brillante').click((e) =>{ 
      removerAutoDeFavoritos(e.target.id)
      const auto = autoConId(e.target.id)
      let article = $('.article')
      article[auto.id].innerHTML = `
      <img src=${auto.img}>
      <i class="fas fa-star estrella" id="${auto.id}"></i>
      <ul class="ul">
          <li> marca: ${auto.marca}. </li>
          <li> nombre: ${auto.modelo}. </li>
          <li> color: ${auto.color}. </li>
          <li> cantidad de puertas: ${auto.cantPuertas}. </li>
          <li> kilometraje: ${auto.kilometraje} km. </li>
          <li> combustible: ${auto.combustible}. </li>
          <li> año: ${auto.año}. </li>
      </ul>
      <div class="precio" id="${auto.id}">${auto.precioEnString}</div>
      `
    });



})