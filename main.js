class AutoClassic {
  constructor(marca,modelo,color,cantPuertas,kilometraje,combustible,año,precioEnDolares) {
    this.marca = marca;
    this.modelo = modelo;
    this.color = color;
    this.cantPuertas = cantPuertas;
    this.kilometraje = kilometraje;
    this.combustible = combustible;
    this.año = año;
    this.precioEnDolares = precioEnDolares
  }
}
let intentos = 0;
let lsAutosClassic = [];
const mgMidget1500 = new AutoClassic("MG","midget 1500","Brooklands Green",2,74.448,"Nafta",1978,55000);
const mercedesBenz280Sl = new AutoClassic("Mercedes benz","280 Sl","Sun Yellow",2,90.358,"Nafta",1978,80000);
const acCobra = new AutoClassic("AC", "cobra", "Deep Impact Blue Metallic", 2,31.397,"Nafta", 2013, 80000);
const porsche911ScCabrioEU = new AutoClassic("Porsche", "911 SC Cabrio Europeo", "White", 2, 116.927,"Nafta",1983,98000);
const fordA = new AutoClassic("Ford","a","Washigton Blue",4,58.484,"Gasolina",1929,12000);
const subaru360 = new AutoClassic("Subaru","360","Blanco",2,12.900,"Nafta",1962,28000);
const chevroletCamaroZ28 = new AutoClassic("Chevrolet","camaro Z28","Cottonwood Green",2,62.430,"Nafta",1971,110000);
const mercedesBenz560SL = new AutoClassic("Mercedes Benz","560 SL","Red",2,69.607,"Nafta",1987,114000);
const jaguarEType = new AutoClassic("Jaguar","e-Type Serie 3 Roadster","Regency Red",2,50.730 ,"Nafta",1973,295000);
const porsche928S = new AutoClassic("Porsche","928S","Chashmere Beige",2,42.744 ,"Nafta",1982,75000);
const chevroletCorvetteTTop = new AutoClassic("Chevrolet","corvette Coupe T-Top","Black",2,71.000,"Nafta",1981,55000);
const fordMustang289Convertible = new AutoClassic("Ford","mustaing 289","Red",2,85.995,"Nafta",1968,120000);
lsAutosClassic.push(mgMidget1500,mercedesBenz280Sl,acCobra,porsche911ScCabrioEU,fordA,subaru360,chevroletCamaroZ28,mercedesBenz560SL,jaguarEType,porsche928S,chevroletCorvetteTTop,fordMustang289Convertible);

const modelosDeTodosLosAutos = () => {
  //proposito: retornar una nueva lista con todos los nombres de los autos antiguos.
  //precondicion: debe haber una lista de autos inicializada.
  return lsAutosClassic.map((auto) => auto.modelo);
};

let autoAComprar = prompt(`Ingrese el nombre del auto que quiere comprar: 
    ${modelosDeTodosLosAutos()}.`);

const esUsuarioRegistrado = (nombreUsuario) => {
  //proposito: retorna true si el usuario esta registrado.
  //precondicion: la funcion necesita el parametro nombreUsuario para que funcione.
  let registrado = false;
  if (nombreUsuario == "braian") {
    registrado = true;
  }
  return registrado;
};

const autoExiste = () => {
  //proposito: afirmar con true si existe el auto buscado por condicion.
  //precondicion: debe haber una lista de autos inicializada.
  return lsAutosClassic.some((auto) => auto.modelo == autoAComprar)
};

let alerta = document.getElementById("alert")
const noSeEncuentraAutoBuscado = () =>{
  alerta.style.backgroundColor = "rgb(235, 130, 130)"
  alerta.innerHTML = `<p>No se encuentra el auto buscado!!</p>`
  alerta.style.textAlign = "center"
  alerta.style.fontSize = "20px"
  alerta.style.lineHeight = "35px"
}

const esUsuarioRegistradoAplicamosSuDescuento = (nombreUsuario) => {
  alerta.style.backgroundColor = "rgb(173, 233, 186)"
  alerta.innerHTML = `<p>${nombreUsuario} es usuario registrado! aplicamos su descuento.</p>`
  alerta.style.textAlign = "center"
  alerta.style.fontSize = "20px"
  alerta.style.lineHeight = "35px"
}

const noEsUsuarioRegistrado = (nombreUsuario) =>{
  alerta.style.backgroundColor = "rgb(235, 130, 130)"
  alerta.innerHTML = `<p>${nombreUsuario} no es usuario registrado.</p>`
  alerta.style.textAlign = "center"
  alerta.style.fontSize = "20px"
  alerta.style.lineHeight = "35px"
}

const aplicaDescuentoSoloAUsuarioRegistrado = () => {
  //proposito: si el auto buscado existe y es usuario registrado, aplicamos un descuento a la compra que desea el usuario registrado.
  //precondicion: el usuario necesita la lista de autos que puede comprar, el auto que selecciona debe existir y el usuario debe estar registrado.
  if (autoExiste()) {
    while (intentos < 3) {
      let nombreUsuario =
        prompt(`Ingrese un nombre, si es un usuario registrado le aplicaremos un 10% de descuento a su compra.
        Tiene 3 intentos.`);
      if (esUsuarioRegistrado(nombreUsuario.toLowerCase())) {
        esUsuarioRegistradoAplicamosSuDescuento(nombreUsuario)
        intentos = 5;
      } else {
        intentos = intentos + 1;
        noEsUsuarioRegistrado(nombreUsuario)
      }
    }
  } else {
    noSeEncuentraAutoBuscado()
  }
};

const agregarPropiedades = () => {
  let key = 0;
  for (const auto of lsAutosClassic) {
    let propiedades = document.getElementsByClassName("propiedades");
    propiedades[key].innerHTML = `<ul>
                     <li> marca: ${auto.marca}. </li>
                     <li> nombre: ${auto.modelo}. </li>
                     <li> color: ${auto.color}. </li>
                     <li> cantidad de puertas: ${auto.cantPuertas}. </li>
                     <li> kilometraje: ${auto.kilometraje} km. </li>
                     <li> combustible: ${auto.combustible}. </li>
                     <li> año: ${auto.año}. </li>
                     </ul>
                     `;
    key++;
  }
};

agregarPropiedades();
aplicaDescuentoSoloAUsuarioRegistrado()

