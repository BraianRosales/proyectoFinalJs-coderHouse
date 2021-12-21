$(() => {
  const articulo = $("#articulo");
  const URL = "../json/pago.json";
  let objAuto = JSON.parse(localStorage.getItem("autoElegidoPorElUsuario"));
  let imagenCompleta = "../inicio/" + objAuto.img;
  let precioAuto = Number(localStorage.getItem("precioTotal"));
  let lsComprasExitosas;
  if (localStorage.getItem("lsComprasExitosas") == null) {
    lsComprasExitosas = [];
  } else {
    lsComprasExitosas = JSON.parse(localStorage.getItem("lsComprasExitosas"));
  }
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
            <input type="text" class="input">
          </div> 
          <div class="labelConInput"> 
            <label class="label" id="id-cvc">${response.cvc}</label> 
            <input type="text"  class="input">
          </div>
          </br>
          <button id="btn-confirmar">Confirmar</button>
      </div>
        `);

      $("#btn-confirmar").click(() => {
        $("#articulo").prepend(
          `<div id="compraExitosa">Compra exitosa! sus compras se guardaran en la seccion de compras</div>`
        );
        $("#compraExitosa").fadeOut(8000);
        $("#formulario-pago").fadeOut(1000);
        $("#btn-confirmar").remove();
        localStorage.removeItem("autoElegidoPorElUsuario");
        objAuto.precio = precioAuto;
        localStorage.setItem("numeroCarrito", 0);
        lsComprasExitosas.push(objAuto);
        console.log(lsComprasExitosas);
        localStorage.setItem(
          "lsComprasExitosas",
          JSON.stringify(lsComprasExitosas)
        );
      });
    });
  }
  //termina el ready.
});
