$(()=>{
  class AutoClassic {
    constructor(marca,modelo,color,cantPuertas,kilometraje,combustible,año,precioEnString,precio) {
      this.marca = marca;
      this.modelo = modelo;
      this.color = color;
      this.cantPuertas = cantPuertas;
      this.kilometraje = kilometraje;
      this.combustible = combustible;
      this.año = año;
      this.precioEnString = precioEnString
      this.precio = precio
    }
  }
  let lsAutosClassic = [];
  const mgMidget1500 = new AutoClassic("MG","midget 1500","Brooklands Green",2,74.448,"Nafta",1978, "U$S 55000",55000);
  const mercedesBenz280Sl = new AutoClassic("Mercedes benz","280 Sl","Sun Yellow",2,90.358,"Nafta",1978,"U$S 80000",80000);
  const acCobra = new AutoClassic("AC", "cobra", "Deep Impact Blue Metallic", 2,31.397,"Nafta", 2013,"U$S 80000",80000);
  const porsche911ScCabrioEU = new AutoClassic("Porsche", "911 SC Cabrio Europeo", "White", 2, 116.927,"Nafta",1983,"U$S 98000",98000);
  const fordA = new AutoClassic("Ford","a","Washigton Blue",4,58.484,"Gasolina",1929,"U$S 12000",12000);
  const subaru360 = new AutoClassic("Subaru","360","Blanco",2,12.900,"Nafta",1962,"U$S 28000",28000);
  const chevroletCamaroZ28 = new AutoClassic("Chevrolet","camaro Z28","Cottonwood Green",2,62.430,"Nafta",1971,"U$S 110000",110000);
  const mercedesBenz560SL = new AutoClassic("Mercedes Benz","560 SL","Red",2,69.607,"Nafta",1987,"U$S 114000",114000);
  const jaguarEType = new AutoClassic("Jaguar","e-Type Serie 3 Roadster","Regency Red",2,50.730 ,"Nafta",1973,"U$S 295000",295000);
  const porsche928S = new AutoClassic("Porsche","928S","Chashmere Beige",2,42.744 ,"Nafta",1982, "U$S 75000",75000);
  const chevroletCorvetteTTop = new AutoClassic("Chevrolet","corvette Coupe T-Top","Black",2,71.000,"Nafta",1981,"U$S 55000",55000);
  const fordMustang289Convertible = new AutoClassic("Ford","mustaing 289","Red",2,85.995,"Nafta",1968,"U$S 120000",120000);
  lsAutosClassic.push(mgMidget1500,mercedesBenz280Sl,acCobra,porsche911ScCabrioEU,fordA,subaru360,chevroletCamaroZ28,mercedesBenz560SL,jaguarEType,porsche928S,chevroletCorvetteTTop,fordMustang289Convertible);
  let precioGuardado;
  let alerta = document.getElementById("alert");
  const InputNombre = document.getElementById('nombre')
  const InputApellido = document.getElementById('apellido')
  const InputContraseña = document.getElementById('contraseña')
  const BtnEntrar = document.getElementById('btn-entrar')
  let alertIndentificate = document.getElementById('identificate-alerta')
  BtnEntrar.addEventListener('click',handleEntrar)
  let seIdentifico = "no";
  
  const agregarPropiedades = () => {
    let key = 0;
    for (const auto of lsAutosClassic) {
      let propiedades = document.getElementsByClassName("propiedades");
      let precios = document.getElementsByClassName("precio")
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
      precios[key].innerHTML = `${auto.precioEnString}`
      key++;
    }
  };
  
  agregarPropiedades();
  
  $('.precio').on('click',(e)=>{
    localStorage.setItem('precioClickeado', e.target.textContent)
    precioGuardado = localStorage.getItem('precioClickeado')
    localStorage.setItem('autoClickeado', JSON.stringify(encuentraElAutoPorNombre()))
    siEsUsuarioRegistradoSeAplicaElDescuento()
})
  
   const siEsUsuarioRegistradoSeAplicaElDescuento = () => {
     let autoObjeto = JSON.parse(localStorage.getItem('autoClickeado'))
     if(esUsuarioRegistrado() && sessionStorage.getItem('seIdentifico') == "si"){
      aplicamosSuDescuento(autoObjeto)
     }
     else{
      pagaPrecioReal(autoObjeto)
     }
   }
   
   const aplicamosSuDescuento = (autoObjeto) => {
    let precioAuto = autoObjeto.precio
    let porcentaje = precioAuto * 0.1
    precioAuto = precioAuto - porcentaje
    alerta.style.backgroundColor = "rgb(173, 233, 186)"
    alerta.innerHTML = `<p>Usuario ingresado, aplicamos su descuento! su monto a pagar es de U$S ${precioAuto}.</p>`
    alerta.style.textAlign = "center"
    alerta.style.fontSize = "20px"
    alerta.style.lineHeight = "35px"
  }
  
  const pagaPrecioReal  = (autoObjeto) =>{
    let precioAuto = autoObjeto.precio
    alerta.style.backgroundColor = "rgb(250, 251, 168)"
    alerta.innerHTML = `<p> Usuario no ingresado.Su monto a pagar es de U$S ${precioAuto}.</p>`
    alerta.style.textAlign = "center"
    alerta.style.fontSize = "20px"
    alerta.style.lineHeight = "35px"
  }
  
  const encuentraElAutoPorNombre = () =>{
    return lsAutosClassic.find((auto) => auto.precioEnString == precioGuardado);
  }; 
  
  const elUsuarioYaFueRegistrado = () =>{
    let lsUsuariosRegistrados = JSON.parse(localStorage.getItem('lsUsuariosRegistrados'))
    let nombreUsuarioIdentificado =  localStorage.getItem('nombreIdentificado');
    let apellidoUsuarioIdentificado = localStorage.getItem('apellidoIdentificado');
    let contraseñaUsuarioIdentificado = localStorage.getItem('contraseñaIdentificado');
    return lsUsuariosRegistrados.some(usuario => (usuario.nombre == nombreUsuarioIdentificado && usuario.apellido == apellidoUsuarioIdentificado) && (usuario.contraseña ==  contraseñaUsuarioIdentificado))
  }
  
  const esUsuarioRegistrado = () => {
    let esUsuarioRegistrado = false;
    if(elUsuarioYaFueRegistrado())
    {
      esUsuarioRegistrado = true;
    }
    return esUsuarioRegistrado
  }
  
  function handleEntrar(){
  seIdentifico = "si";
  sessionStorage.setItem('seIdentifico',seIdentifico)
  let nombreUsuario = (InputNombre.value).toLowerCase()
  let apellidoUsuario = (InputApellido.value).toLowerCase()
  let contraseñaUsuario = (InputContraseña.value).toLowerCase()
  localStorage.setItem('nombreIdentificado',nombreUsuario)
  localStorage.setItem('apellidoIdentificado',apellidoUsuario)
  localStorage.setItem('contraseñaIdentificado',contraseñaUsuario)
    if(esUsuarioRegistrado()){
      alertIndentificate.innerHTML = `Usuario registrado!`
      alertIndentificate.style.color = "green"
    }
    else{
      alertIndentificate.innerHTML = `No es usuario registrado.`
      alertIndentificate.style.color = "red"
    }
  }
})
