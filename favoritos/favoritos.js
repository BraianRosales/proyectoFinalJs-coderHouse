$(()=>{
    let lsUsuariosRegistrados = JSON.parse(localStorage.getItem("lsUsuariosRegistrados"))
    const seIdentifico = sessionStorage.getItem("seIdentifico")
    const apellidoIdentificado = localStorage.getItem("apellidoIdentificado")
    const nombreIdentificado = localStorage.getItem("nombreIdentificado")
    const contraseñaIdentificado = localStorage.getItem("contraseñaIdentificado")
    const lsAutosClassic = JSON.parse(localStorage.getItem('lsAutosClassic'))
    let alerta = $('#alert');
    let lsAutosComprados = localStorage.getItem('lsAutosComprados');
    lsAutosComprados = JSON.parse(lsAutosComprados);
  
    nroCarrito = localStorage.getItem("numeroCarrito");
    $("#carrito")[0].innerHTML = `<span>${nroCarrito}</span>`;

    if (nroCarrito == null) {
        $("#carrito")[0].innerHTML = `<span>${0}</span>`;
    }

    function coincideConElUsuarioIdentificado(usuario,nombreIdentificado,apellidoIdentificado,contraseñaIdentificado){
      return ((usuario.nombre === nombreIdentificado) && (usuario.apellido === apellidoIdentificado)) && (usuario.contraseña === contraseñaIdentificado)
    }
  
    function usuarioIdentificado(){
      return  lsUsuariosRegistrados.find(usuario => coincideConElUsuarioIdentificado(usuario,nombreIdentificado,apellidoIdentificado,contraseñaIdentificado))
    }

  
    if(seIdentifico === "si" && usuarioIdentificado() !== undefined){
      let articulos = $("#articulos");
      const nombreMayuscula = (usuarioIdentificado().nombre).charAt(0).toUpperCase() + (usuarioIdentificado().nombre).slice(1);
      const apellidoMayuscula = (usuarioIdentificado().apellido).charAt(0).toUpperCase() + (usuarioIdentificado().apellido).slice(1);
      if(usuarioIdentificado().autosFavoritos.length === 0){
        articulos[0].innerHTML = `<p id="titulo">${nombreMayuscula} ${apellidoMayuscula} todavia no tenes ningun auto favorito.</p>`
      }else{
        articulos[0].innerHTML = `<p id="titulo">Autos favoritos a comprar de : ${nombreMayuscula} ${apellidoMayuscula}</p>`
        for (const autoFavorito of usuarioIdentificado().autosFavoritos) {
            let imagenCompleta = "../inicio/" + autoFavorito.img;
            articulos[0].innerHTML += `
            <article class="article">
              <img src=${imagenCompleta}>
              <div class="btn-remover" id="${autoFavorito.id}">Remover</div>
                  <ul class="ul">
                      <li> marca: ${autoFavorito.marca}. </li>
                      <li> nombre: ${autoFavorito.modelo}. </li>
                      <li> color: ${autoFavorito.color}. </li>
                      <li> cantidad de puertas: ${autoFavorito.cantPuertas}. </li>
                      <li> kilometraje: ${autoFavorito.kilometraje} km. </li>
                      <li> combustible: ${autoFavorito.combustible}. </li>
                      <li> año: ${autoFavorito.año}. </li>
                  </ul>
                  <div class="precio" id="${autoFavorito.id}">${autoFavorito.precioEnString}</div>
              </article>
          `;
          }
      }
    }
    else{
      let articulos = $("#articulos");
      articulos[0].innerHTML += `<p>Usuario no identificado, debe identificarse para ver sus favoritos marcados.</p>`
    }

    precioGuardado = localStorage.getItem("precioClickeado");

    function encuentraElAutoPorPrecio(){
        return lsAutosClassic.find((auto) => auto.precioEnString == precioGuardado);
      };

    function elUsuarioYaFueRegistrado(){
        lsUsuariosRegistrados = JSON.parse(localStorage.getItem("lsUsuariosRegistrados"));
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

      function autoElegidoParaLaCompra(idPrecio){
        return lsAutosClassic.find((auto) => auto.id == idPrecio);
      };

      function redireccionar(){
        location.href = "../carrito/carrito.html"
      }

      function idesAutosComprados(){
        let autosComprados = []
        if(lsAutosComprados !== null){
          autosComprados = lsAutosComprados.map(auto => auto.id)
        }
        return autosComprados;
      }
    
      function autoEstaComprado(autoId){
        return idesAutosComprados().includes(autoId)
      }

    $(".precio").on("click", (e) => {
      console.log( idesAutosComprados())
      console.log(autoEstaComprado(e.target.id))
      console.log(Number(e.target.id))
      if(autoEstaComprado(Number(e.target.id)) === false){
        const idPrecio = Number(e.target.id);
        localStorage.setItem("precioClickeado", e.target.textContent);
        precioGuardado = localStorage.getItem("precioClickeado");
        localStorage.setItem("autoClickeado",JSON.stringify(encuentraElAutoPorPrecio()));
        siEsUsuarioRegistradoSeAplicaElDescuento();
        localStorage.setItem("autoElegidoPorElUsuario",JSON.stringify(autoElegidoParaLaCompra(idPrecio)));
        localStorage.setItem("precioTotal", precioAuto);
        localStorage.setItem("numeroCarrito", "1");
        $("#carrito")[0].innerHTML = `<span>${localStorage.getItem("numeroCarrito")}</span>`;
        $('html, body').animate({scrollTop:1}, 'slow');
        alerta.fadeOut(4500);
        setTimeout(redireccionar,4000);
        }
        else{
          alerta.html(`<p>ups! Auto Classic ya fue comprado.</p>`);
          alerta.css("textAlign", "center");
          alerta.css("fontSize", "22px");
          alerta.css("lineHeight", "35px");
          alerta.css("color", "red");
          $('html, body').animate({scrollTop:1}, 'slow');
        }
      });

      let lsAutosFavoritos = usuarioIdentificado().autosFavoritos;

      function lsAutosFavoritosSinElAutoRemovido(idClick){
        return lsAutosFavoritos.filter((auto) => auto.id !== Number(idClick))
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
      }

      function lsSinElUsuarioViejo(dni){
        return lsUsuariosRegistrados.filter((usuario) => usuario.dni !== dni);
      }

  $('.btn-remover').click((e)=>{
    removerAutoDeFavoritos(e.target.id)
    location.reload()
  })
})