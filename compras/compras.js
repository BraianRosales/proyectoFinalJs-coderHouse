$(() => {
  const lsUsuariosRegistrados = JSON.parse(localStorage.getItem("lsUsuariosRegistrados"))
  const seIdentifico = sessionStorage.getItem("seIdentifico")
  const apellidoIdentificado = localStorage.getItem("apellidoIdentificado")
  const nombreIdentificado = localStorage.getItem("nombreIdentificado")
  const contraseñaIdentificado = localStorage.getItem("contraseñaIdentificado")

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
    if(usuarioIdentificado().autosComprados.length === 0){
      articulos[0].innerHTML = `<p id="titulo">${nombreMayuscula} ${apellidoMayuscula} todavia no compraste ningun auto classic.</p>`
    }else{
      articulos[0].innerHTML = `<p id="titulo">Autos comprados de: ${nombreMayuscula} ${apellidoMayuscula}</p>`
      for (const autoComprado of usuarioIdentificado().autosComprados) {
          let imagenCompleta = "../inicio/" + autoComprado.img;
          articulos[0].innerHTML += `
          <article>
            <img src=${imagenCompleta}>
                <ul class="ul">
                    <li> marca: ${autoComprado.marca}. </li>
                    <li> nombre: ${autoComprado.modelo}. </li>
                    <li> color: ${autoComprado.color}. </li>
                    <li> cantidad de puertas: ${autoComprado.cantPuertas}. </li>
                    <li> kilometraje: ${autoComprado.kilometraje} km. </li>
                    <li> combustible: ${autoComprado.combustible}. </li>
                    <li> año: ${autoComprado.año}. </li>
                    <li> comprado por: <span>U$S ${autoComprado.precio}.</span> </li>
                </ul>
                <div class="precio">Comprado</div>
            </article>
        `;
        }
    }
  }
  else{
    let articulos = $("#articulos");
    articulos[0].innerHTML += `<p>Usuario no identificado, debe identificarse para ver su historial de compras.</p>`
  }
  //termina el ready
});

