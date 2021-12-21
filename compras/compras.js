$(() => {
  lsComprasUsuario = JSON.parse(localStorage.getItem("lsComprasExitosas"));
  console.log(lsComprasUsuario);
    for (const compra of lsComprasUsuario) {
        let imagenCompleta = "../inicio/" + compra.img;
      $("body").append(`
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
            </ul>
            <div class="precio">Comprado</div>
        </article>
    `);
    }
});
