$(() => {
  const articulo = $("#articulo");
  const URL = "../json/pago.json";
  let objAuto = JSON.parse(localStorage.getItem("autoElegidoPorElUsuario"));
  let precioAuto = Number(localStorage.getItem("precioTotal"));
  let lsUsuariosRegistrados = JSON.parse(localStorage.getItem("lsUsuariosRegistrados"));
  let apellidoIdentificado = localStorage.getItem("apellidoIdentificado");
  let nombreIdentificado = localStorage.getItem("nombreIdentificado");
  let contraseñaIdentificado = localStorage.getItem("contraseñaIdentificado");
  let lsAutosComprados;


  if (localStorage.getItem("lsAutosComprados") == null) {
    lsAutosComprados = [];
  } else {
    lsAutosComprados = JSON.parse(localStorage.getItem("lsAutosComprados"));
  }

  $('#nota').fadeOut(0)

  articulo[0].innerHTML = `
    <article id="article">
    <img src= ${objAuto.img}>
        <ul class="ul">
            <li> marca: ${objAuto.marca}. </li>
            <li> nombre: ${objAuto.modelo}. </li>
            <li> color: ${objAuto.color}. </li>
            <li> cantidad de puertas: ${objAuto.cantPuertas}. </li>
            <li> kilometraje: ${objAuto.kilometraje} km. </li>
            <li> combustible: ${objAuto.combustible}. </li>
            <li> año: ${objAuto.año}. </li>
            <li> precio: ${precioAuto}. </li>
        </ul>
        <button id="btn-comprar">Comprar</button>
    </article>
    `;

  $('#btn-comprar').on("click", () => {
    $('#btn-comprar').remove();
    $('#nota').fadeIn()
    $('#nota')[0].innerHTML = `Nota: <br>
    Para que se guarde su compra debe ingresar al formulario el DNI con el que se registro y estar identificado.`
    formularioDePago();
  });

  function formularioDePago() {
    $.ajax({
      method: "GET",
      url: URL,
      dataType: "JSON",
    }).done((response) => {
      $("body").append(`
        <div id="formulario-pago">
          <div id="div-select">
            <p id="p-select">Tarjeta: </p>
              <select id="select">
                <option value="value1">${response.tipo[0].visa}</option>
                <option value="value2">${response.tipo[1].mastercard}</option>
                <option value="value3">${response.tipo[2].amex}</option>
              </select>  
          </div>
          <div class="labelConInput"> 
            <label class="label">${response.numero}</label>
            <input class="input" type="text" id="num-tarjeta">
            <div class="error-input" name="num-tarjeta"></div>
          </div> 
          <div class="labelConInput"> 
            <label class="label">${response.nombre}</label>
            <input class="input" type="text" id="nombre-Completo">
            <span class="error-input" name="nombre"></span>
          </div> 
          <div class="labelConInput"> 
            <label class="label">${response.fechaExp}</label>
            <input type="date" class="input">
          </div> 
          <div class="labelConInput"> 
            <label class="label" id="id-cvc">${response.cvc}</label> 
            <input type="password" class="input" id="id-CVC">
            <span class="error-input" name="cvc"></span>
          </div>
          <div class="labelConInput"> 
            <label class="label">${response.dni}</label> 
            <input type="text" class="input" id="id-dni">
            <span class="error-input" name="dni"></span>
          </div>
          </br>
          <button id="btn-confirmar">Confirmar</button>
      </div>
        `);
      function usuarioEncontrado(dniUsuarioComprando) {
        return lsUsuariosRegistrados.find((usuario) => usuario.dni === dniUsuarioComprando);
      }

      function nuevaListaSinElUsuarioComprando(dniUsuarioComprando) {
        return lsUsuariosRegistrados.filter((usuario) => usuario.dni !== dniUsuarioComprando);
      }

      function agregarAuto(dniUsuarioComprando) {
        //encontrar el usuario que realiza la compra.
        let usuarioComprando = usuarioEncontrado(dniUsuarioComprando);
        //remuevo el usuarioComprando encontrado por su dni para despues agregar el modificado.
        let lsSinUsuarioComprando = nuevaListaSinElUsuarioComprando(dniUsuarioComprando);
        //le agrego al usuario el auto comprado en su lista de autosComprados
        usuarioComprando.autosComprados.push(objAuto);
        //agrego a la nueva lista sin el usuario comprado el nuevo usuarioCreado agregandole el auto comprado.
        lsSinUsuarioComprando.push(usuarioComprando);
        //agrego la lista nueva editada al localStorage reemplazando la anterior.
        localStorage.setItem("lsUsuariosRegistrados",JSON.stringify(lsSinUsuarioComprando));
        console.log(localStorage.getItem("lsUsuariosRegistrados"));
      }

      
      function datosCoinciden(dniUsuarioComprando) {
        return (
          usuarioEncontrado(dniUsuarioComprando).nombre == nombreIdentificado &&
          usuarioEncontrado(dniUsuarioComprando).apellido == apellidoIdentificado &&
          usuarioEncontrado(dniUsuarioComprando).contraseña == contraseñaIdentificado
        );
      }

      function nroTarjetaValido() {
        let numeroTarjeta = $("#num-tarjeta");
        numTarjetaString = numeroTarjeta[0].value;
        numeroTarjeta = Number(numeroTarjeta[0].value);
        let numValido = false;
        if (numTarjetaString.length == 16 && !isNaN(numeroTarjeta)) {
          numValido = true;
          $("#error-numTarjeta").fadeOut(0);
        } else {
          $(".error-input")[0].innerHTML = `<p id="error-numTarjeta">• Solo se aceptan 16 digitos</p>`;
          $("#error-numTarjeta").css("color", "red");
          $("#error-numTarjeta").css("margin-left", "44px");
          $("#error-numTarjeta").css("margin-top", "-6px");
        }
        return numValido;
      }

      function nombreValido() {
        let nombreTarjeta = $("#nombre-Completo");
        nombreTarjetaString = nombreTarjeta[0].value;
        nombreTarjeta = Number(nombreTarjeta[0].value);
        let nomValido = false;
        if (typeof nombreTarjetaString == "string" && isNaN(nombreTarjeta)) {
          nomValido = true;
          $("#error-nomTarjeta").fadeOut(0);
        } else {
          $(".error-input")[1].innerHTML = `<p id="error-nomTarjeta">• Solo se aceptan letras</p>`;
          $("#error-nomTarjeta").css("color", "red");
          $("#error-nomTarjeta").css("margin-left", "44px");
          $("#error-nomTarjeta").css("margin-top", "-6px");
          $("#error-nomTarjeta").css("font-size", "17px");
        }
        return nomValido;
      }

      function cvcValido() {
        let cvcTarjeta = $("#id-CVC");
        cvcTarjeta = cvcTarjeta[0].value;
        cvcTarjeta = Number(cvcTarjeta);
        cvcTarjetaString = String(cvcTarjeta);
        let cvcVal = false;
        if (!isNaN(cvcTarjeta) && cvcTarjetaString.length == 3) {
          cvcVal = true;
          $("#error-cvcTarjeta").fadeOut(0);
        } else {
          $( ".error-input")[2].innerHTML = `<p id="error-cvcTarjeta">• Solo se aceptan 3 digitos</p>`;
          $("#error-cvcTarjeta").css("color", "red");
          $("#error-cvcTarjeta").css("margin-left", "44px");
          $("#error-cvcTarjeta").css("margin-top", "-6px");
          $("#error-cvcTarjeta").css("font-size", "17px");
        }
        return cvcVal;
      }

      function dniValido() {
        let dniTarjeta = $("#id-dni");
        dniTarjeta = dniTarjeta[0].value;
        dniTarjeta = Number(dniTarjeta);
        dniTarjetaString = String(dniTarjeta);
        let dniVal = false;
        if (!isNaN(dniTarjeta) && dniTarjetaString.length == 8) {
          dniVal = true;
          $("#error-dniTarjeta").fadeOut(0);
        } else {
          $(".error-input")[3].innerHTML = `<p id="error-dniTarjeta">• Solo se aceptan 8 digitos</p>`;
          $("#error-dniTarjeta").css("color", "red");
          $("#error-dniTarjeta").css("margin-left", "44px");
          $("#error-dniTarjeta").css("margin-top", "-6px");
          $("#error-dniTarjeta").css("font-size", "17px");
        }
        return dniVal;
      }

      function datosTarjetasValidos() {
        return (
          nroTarjetaValido() && nombreValido() && cvcValido() && dniValido()
        );
      }

      function redireccionar() {
        location.href = "../index.html";
      }

      function lsAutosFavoritosSinElAutoRemovido(idAuto){
        let lsAutosFavoritos = usuarioIdentificado().autosFavoritos;
        return lsAutosFavoritos.filter((auto) => auto.id !== Number(idAuto))
      }

      function removerAutoDeFavoritos(idAuto){
        lsAutosFavoritosSinElAutoRemovido(idAuto)
        let usuarioLog =  usuarioIdentificado()
        const lsAutosFavoritosNueva = lsAutosFavoritosSinElAutoRemovido(objAuto.id)
        usuarioLog.autosFavoritos = lsAutosFavoritosNueva;
        lsSinElUsuarioViejo(usuarioIdentificado().dni)
        let lsUsuarioRegistradosNueva = lsSinElUsuarioViejo(usuarioIdentificado().dni);
        lsUsuarioRegistradosNueva.push(usuarioLog)
        localStorage.setItem('lsUsuariosRegistrados',JSON.stringify(lsUsuarioRegistradosNueva))
      }

      function lsSinElUsuarioViejo(dni){
        return lsUsuariosRegistrados.filter((usuario) => usuario.dni !== dni);
      }

      function coincideConElUsuarioIdentificado(usuario,nombreIdentificado,apellidoIdentificado,contraseñaIdentificado){
        return ((usuario.nombre === nombreIdentificado) && (usuario.apellido === apellidoIdentificado)) && (usuario.contraseña === contraseñaIdentificado)
      }
    
      function usuarioIdentificado(){
        return  lsUsuariosRegistrados.find(usuario => coincideConElUsuarioIdentificado(usuario,nombreIdentificado,apellidoIdentificado,contraseñaIdentificado))
      }


      $("#btn-confirmar").click(() => {
        let autoElegidoPorElUsuario = JSON.parse(localStorage.getItem("autoElegidoPorElUsuario"));
        lsAutosComprados.push(autoElegidoPorElUsuario);
        localStorage.setItem("lsAutosComprados",JSON.stringify(lsAutosComprados));
        if (datosTarjetasValidos()) {
          $("#articulo").prepend(`<div id="compraExitosa">Compra exitosa! sus compras se guardaran en compras si esta registrado.</div>`);
          $("#compraExitosa").fadeOut(5000);
          $("#formulario-pago").fadeOut(1000);
          $("#btn-confirmar").remove();
          localStorage.removeItem("autoElegidoPorElUsuario");
          objAuto.precio = precioAuto;
          localStorage.setItem("numeroCarrito", 0);
          //aca comienza el algoritmo de agregar autos al usuario identificado.
          let dniUsuarioComprando = document.getElementById("id-dni").value;
          localStorage.setItem("dniUsuarioComprando", dniUsuarioComprando);
          dniUsuarioComprando = Number(dniUsuarioComprando);
          localStorage.setItem("seConcretoLaCompra", "si");
          //agrega el auto a la lista de autosComprados del usuario identificado.
          if (
            sessionStorage.getItem("seIdentifico") === "si" && datosCoinciden(dniUsuarioComprando)){
            agregarAuto(dniUsuarioComprando);
            removerAutoDeFavoritos(objAuto.id)
          }
          setTimeout(redireccionar, 4500);
        }
      });
    });
  }
});