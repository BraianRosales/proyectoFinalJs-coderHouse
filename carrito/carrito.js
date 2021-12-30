$(() => {
  const articulo = $("#articulo");
  const URL = "../json/pago.json";
  let objAuto = JSON.parse(localStorage.getItem("autoElegidoPorElUsuario"));
  let imagenCompleta = "../inicio/" + objAuto.img;
  let precioAuto = Number(localStorage.getItem("precioTotal"));
  let lsUsuariosRegistrados =  JSON.parse(localStorage.getItem('lsUsuariosRegistrados'))
  let apellidoIdentificado = localStorage.getItem("apellidoIdentificado")
  let nombreIdentificado = localStorage.getItem("nombreIdentificado")
  let contraseñaIdentificado = localStorage.getItem("contraseñaIdentificado")
 
  articulo[0].innerHTML = `
    <article id="article">
    <img src= ${imagenCompleta}>
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
  $("#btn-comprar").on("click", () => {
    $("#btn-comprar").remove();
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
            <p id="p-select">tarjeta: </p>
              <select id="select">
                <option value="value1">${response.tipo[0].visa}</option>
                <option value="value2">${response.tipo[1].mastercard}</option>
                <option value="value3">${response.tipo[2].amex}</option>
              </select>  
          </div>
          <div class="labelConInput"> 
            <label class="label">${response.numero}</label>
            <input class="input" type="text">
          </div> 
          <div class="labelConInput"> 
            <label class="label">${response.nombre}</label>
            <input class="input" type="text">
          </div> 
          <div class="labelConInput"> 
            <label class="label">${response.fechaExp}</label>
            <input type="date" class="input">
          </div> 
          <div class="labelConInput"> 
            <label class="label" id="id-cvc">${response.cvc}</label> 
            <input type="text"  class="input">
          </div>
          <div class="labelConInput"> 
            <label class="label">${response.dni}</label> 
            <input type="text" class="input" id="id-dni">
          </div>
          </br>
          <button id="btn-confirmar">Confirmar</button>
      </div>
        `);
        function usuarioEncontrado(dniUsuarioComprando){
          return lsUsuariosRegistrados.find(usuario => usuario.dni === dniUsuarioComprando)
        }

        function nuevaListaSinElUsuarioComprando(dniUsuarioComprando){
          return lsUsuariosRegistrados.filter(usuario => usuario.dni !== dniUsuarioComprando)
        }

        function agregarAuto(dniUsuarioComprando){
          //encontrar el usuario que realiza la compra.
          let usuarioComprando = usuarioEncontrado(dniUsuarioComprando)
           console.log(usuarioComprando)
          //remuevo el usuarioComprando encontrado por su dni para despues agregar el modificado.
          let lsSinUsuarioComprando = nuevaListaSinElUsuarioComprando(dniUsuarioComprando)
          console.log(lsSinUsuarioComprando)
          //le agrego al usuario el auto comprado en su lista de autosComprados
          usuarioComprando.autosComprados.push(objAuto)
          console.log(usuarioComprando)
          //agrego a la nueva lista sin el usuario comprado el nuevo usuarioCreado agregandole el auto comprado.
          lsSinUsuarioComprando.push(usuarioComprando)
          console.log(lsSinUsuarioComprando)
          //agrego la lista nueva editada al localStorage reemplazando la anterior.
          localStorage.setItem('lsUsuariosRegistrados',JSON.stringify(lsSinUsuarioComprando))
          console.log(localStorage.getItem('lsUsuariosRegistrados'))
        }

        function datosCoinciden(dniUsuarioComprando){
          return( (usuarioEncontrado(dniUsuarioComprando).nombre == nombreIdentificado) && (usuarioEncontrado(dniUsuarioComprando).apellido == apellidoIdentificado)) && (usuarioEncontrado(dniUsuarioComprando).contraseña == contraseñaIdentificado)
        }

      $("#btn-confirmar").click(() => {
        $("#articulo").prepend(`<div id="compraExitosa">Compra exitosa! sus compras se guardaran en la seccion de compras</div>`);
        $("#compraExitosa").fadeOut(8000);
        $("#formulario-pago").fadeOut(1000);
        $("#btn-confirmar").remove();
        localStorage.removeItem("autoElegidoPorElUsuario");
        objAuto.precio = precioAuto;
        localStorage.setItem("numeroCarrito", 0);
        //aca comienza el algoritmo de agregar autos al usuario identificado.
        let dniUsuarioComprando = document.getElementById("id-dni").value;
        localStorage.setItem('dniUsuarioComprando',dniUsuarioComprando)
        dniUsuarioComprando = Number(dniUsuarioComprando)
        //agrega el auto a la lista de autosComprados del usuario identificado.
       if((sessionStorage.getItem('seIdentifico') === "si") && datosCoinciden(dniUsuarioComprando)){
        agregarAuto( dniUsuarioComprando)
       }
      });
    });
  }
  //termina el ready.
});
