$(()=>{
    const articulo = $('#articulo')
    let objAuto = JSON.parse(localStorage.getItem('autoElegidoPorElUsuario'))
    let imagenCompleta = "../inicio/" + objAuto.img;
    let precioAuto = Number(localStorage.getItem('precioTotal'))
    let lsComprasExitosas = [];
    articulo[0].innerHTML = `
    <article>
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
    <div id="alert-comprar"></div>
    `
    $('#btn-comprar').on('click',()=>{
        console.log($('#alert-comprar'))
        $("#alert-comprar").html(`Compra exitosa!`)
    })
    localStorage.setItem('comprasExitosas',JSON.stringify(objAuto) )
})