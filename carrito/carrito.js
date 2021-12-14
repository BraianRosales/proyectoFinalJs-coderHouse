$(()=>{
    const articulo = $('#articulo')
    let objAuto = JSON.parse(localStorage.getItem('autoElegidoPorElUsuario'))
    let imagenCompleta = "../inicio/" + objAuto.img;
    let precioAuto = Number(localStorage.getItem('precioTotal'))
    let lsComprasExitosas = [];
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
    </article>
    <button id="btn-comprar">Comprar</button>
    `

    

    $('#btn-comprar').on('click',()=>{
        objAuto.precio = precioAuto;
        lsComprasExitosas.push(objAuto)
        console.log(lsComprasExitosas)
        localStorage.setItem('lsComprasExitosas',JSON.stringify(lsComprasExitosas))
        localStorage.setItem('numeroCarrito',0)
        $("#btn-comprar").fadeOut(0)
        $("#article").fadeOut(500)
        $("body").append(`<div id="compraExitosa">Compra exitosa! para volver a comprar seleccione otro vehiculo.</div>`)
        localStorage.removeItem('autoElegidoPorElUsuario')
    })
})