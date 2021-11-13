class AutoClassic {
  constructor(nombre, marca, color, cantPuertas, precioEnDolares, veloMaxEnKm, combustible) {
    this.nombre = nombre;
    this.marca = marca;
    this.color = color;
    this.cantPuertas = cantPuertas;
    this.precioEnDolares = precioEnDolares;
    this.veloMaxEnKm = veloMaxEnKm;
    this.combustible = combustible
  }
}
let intentos = 0;
let lsAutosClassic = [];
const sel280 = new AutoClassic("sel280", "mercedes benz", "negro", 5, 3500, 200, "gasolina")
const mustang = new AutoClassic("mustang", "ford", "negro", 5, 2200, 180, "nafta")
const falcon = new AutoClassic("falcon", "ford", "negro", 5, 2800, 180, "nafta")
const cj7 = new AutoClassic("cj7", "jeep", "negro", 2, 3000, 150, "nafta")
const topolino = new AutoClassic("topolino", "fiat", "negro", 2, 1000, 80, "gasolina")
lsAutosClassic.push(sel280,mustang,falcon,cj7,topolino);

const nombresDeTodosLosAutosClassic = () => {
    //proposito: retornar una nueva lista con todos los nombres de los autos antiguos.
    //precondicion: debe haber una lista de autos inicializada.
    return lsAutosClassic.map((auto) => auto.nombre);
};

let autoAComprar= prompt(`Ingrese el nombre del auto que quiere comprar: 
    ${nombresDeTodosLosAutosClassic()}.`).toLowerCase();

const esUsuarioRegistrado = (nombreUsuario) =>{
    //proposito: retorna true si el usuario esta registrado.
    //precondicion: la funcion necesita el parametro nombreUsuario para que funcione.
    let registrado = false;
    if(nombreUsuario == "braian"){
      registrado = true;
    }
    return registrado;
 }

 const autoExiste = () => {
    //proposito: afirmar con true si existe el auto buscado por condicion.
    //precondicion: debe haber una lista de autos inicializada.
   return lsAutosClassic.some((auto) => auto.nombre == autoAComprar);
 };
 
const montoAPagarPorElAutoBuscado = () => {
    //proposito: retorna el monto total de lo que vale el auto que el usuario quiere comprar.
    //precondicion: el usuario necesita la lista de autos que puede comprar.
    let montoAPagarPorElAuto;
    if(autoExiste()){
        let autoEncontrado = lsAutosClassic.find((auto) => auto.nombre == autoAComprar);
        montoAPagarPorElAuto = autoEncontrado.precioEnDolares;
        while (intentos < 3) {
            let nombreUsuario = prompt(`Ingrese un nombre, si es un usuario registrado le aplicaremos un 10% de descuento a su compra.
        Tiene 3 intentos.`)
            if (esUsuarioRegistrado(nombreUsuario.toLowerCase())) {
                alert(`${nombreUsuario}, es usuario registrado.`);
                console.log("Aplicamos su descuento!!")
                let descuento = autoEncontrado.precioEnDolares * 0.1;
                montoAPagarPorElAuto = montoAPagarPorElAuto - descuento;
                intentos = 5;
            }
            else {
                intentos = intentos + 1;
                alert(`${nombreUsuario} no es un usuario registrado.`)
            }
        }
    }
    else{
      alert("el auto que busco no existe.") 
      montoAPagarPorElAuto = 0;
    }
    return montoAPagarPorElAuto;
}

alert(`Su monto a pagar por el auto es de: ${montoAPagarPorElAutoBuscado()}U$S`)
