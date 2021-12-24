$(() => {
  lsComprasUsuario = JSON.parse(localStorage.getItem("lsComprasExitosas"));
  console.log(lsComprasUsuario);
  for (const compra of lsComprasUsuario) {
    let imagenCompleta = "../inicio/" + compra.img;
    let articulos = $("#articulos");
    articulos[0].innerHTML += `
    <article>
      <img src=${imagenCompleta}>
          <ul class="ul">
              <li> marca: ${compra.marca}. </li>
              <li> nombre: ${compra.modelo}. </li>
              <li> color: ${compra.color}. </li>
              <li> cantidad de puertas: ${compra.cantPuertas}. </li>
              <li> kilometraje: ${compra.kilometraje} km. </li>
              <li> combustible: ${compra.combustible}. </li>
              <li> año: ${compra.año}. </li>
              <li> comprado por: <span>U$S ${compra.precio}.</span> </li>
          </ul>
          <div class="precio">Comprado</div>
      </article>
  `;
  }
});



//ARREGLAR QUE LA PAGINA MUESTRE LOS AUTOS SOLO SI ESTAN COMPRADOS.
//AGREGAR EL SLIDER.
//RESTRICCIONES EN LOS IMPUTS DEL FORMULARIO.
//MODIFICAR EL BOTON CLICK.
//SOLAMENTE SE PUEDEN GUARDAR AUTOS SI ESTAS REGISTRADO.
//CAMPIAR EL PRECIO DEL AUTO DEL INICIO A COMPRADO. ULTIMO PORQUE ES EL MAS DIFICIL.!!
