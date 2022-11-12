/// INICIALIZAR VARIABLES GLOBALES 
let costoTotalCompra = 0;
let flag;
let total;
let operacion;
let opcion;
let cantidad;
// INSTANCIAR CLASE 
class gev {
    constructor(id, nombre, descripcion, precio) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;       
        this.precio = precio;
    };
};
//INSTANCIAMOS LOS OBJETOS Y GUARDAMOS EN ARRAYS POR TIPO DE PRODUCTOS
const Lavado = [lavadoBasico = new gev(1, "Lavado basico", "Este servicio cuenta con lavado y aspirado basico.", 1000),
lavadoMedio = new gev(2, "Lavado medio", "Este servicio cuenta con lavado con productos toxic , aspirado y abrillantado de ruedas ", 2000),
lavadoPremium = new gev(3, "Lavado Premium", "Este lavado cuenta con lavado con productos toxic , aspirado y abrillantado de ruedas y limpieza de motor", 3000)];
const Ploteo = [ploteoCompleto = new gev(4, "Ploteo completo", "Plotear un auto completo", 1000),
ploteoParcial = new gev(5, "Ploteo parcial del auto", "Ploteo parcial del auto", 2000)];
const Interior = [tapizado = new gev(8, "Limpieza de tapizado", "Limpiamos los tapizados de los asientos", 1000),
alfombra = new gev(9, "Limpieza de alfombrado", "Limpiamos todo el alfombrado de tu vehiculo", 2000)];
//CARRITO DE COMRPAS
let carrito = [];




//DOM PARA CREAR PRODUCTOS DINAMICAMENTE
//CREAMOS EL GRUPO Lavado
const seccLavado = document.getElementById("seccLavado");
const prductosLavado = Lavado.forEach((lavado)=> {
    const div1 = document.createElement("div");
    div1.className = "col";
    seccLavado.append(div1);
    const contenido = document.createElement("div");
    contenido.className = "card cardLavado";
    div1.append(contenido);
    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body text-center"
    cuerpo.innerHTML =`
    <h5 class="card-title">${lavado.nombre}</h5>
    <p class="card-text">${lavado.descripcion}</p>
    <p class="card-text">$ ${lavado.precio}</p>
    <button type="button" class="btn btn-outline-light tor" id="${lavado.id}"><strong>Agregar al Carrito</strong></button>
    `    
    contenido.append(cuerpo);
    //AGREGAR AL ARRAY CARRITO SIN REPETIR PRODUCTOS
    const agregaLavado = document.getElementById(`${lavado.id}`);
    agregaLavado.onclick = () => {        
        const repite = carrito.some((repiteProd)=>repiteProd.id === lavado.id);
        if (repite) {           
            let objeto = carrito.find(item => item.id == lavado.id)
            objeto.cantidad += 1
        }
        else {
        carrito.push({ id: lavado.id,
            img: lavado.img,
            nombre: lavado.nombre,
            precio: lavado.precio,
            cantidad: lavado.cantidad               
        });
        };  
        pintarCarrito()                                  
    };
});


//CREAMOS EL GRUPO Ploteo  
const seccPloteo = document.getElementById("seccPloteo");
const prductosPloteo = Ploteo.forEach((Ploteo)=> {
    const div1 = document.createElement("div");
    div1.className ="col"
    seccPloteo.append(div1);
    const contenido = document.createElement("div");
    contenido.className = "card cardPloteo";
    
    div1.append(contenido);
    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body text-center"
    cuerpo.innerHTML =`
    <h5 class="card-title">${Ploteo.nombre}</h5>
    <p class="card-text">${Ploteo.descripcion}</p>
    <p class="card-text">$ ${Ploteo.precio} la unidad</p>
    <button type="button" class="btn btn-outline-light" id="${Ploteo.id}"><strong>Agregar al Carrito</strong></button>
    `    
    contenido.append(cuerpo);
     //AGREGAR AL ARRAY CARRITO SIN REPETIR PRODUCTOS 
    const agregaPloteo = document.getElementById(`${Ploteo.id}`);
    agregaPloteo.onclick = () => {
        const repite = carrito.some((repiteProd)=>repiteProd.id === Ploteo.id);
        if (repite) {           
            let objeto = carrito.find(item => item.id == Ploteo.id)
            objeto.cantidad += 1
        }
        else {
        carrito.push({ id: Ploteo.id,
            img: Ploteo.img,
            nombre: Ploteo.nombre,
            precio: Ploteo.precio,
            cantidad: Ploteo.cantidad               
        });
        };     
        pintarCarrito()               
    };  
});



//CREAMOS EL GRUPO Interior
const seccInterior = document.getElementById("seccInterior");
const prductosInterior = Interior.forEach((Interior)=> {
    const div1 = document.createElement("div");
    div1.className = "col";
    seccInterior.append(div1);
    const contenido = document.createElement("div");
    contenido.className = "card cardInterior";
    div1.append(contenido);
    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body text-center"
    cuerpo.innerHTML =`
    <h5 class="card-title">${Interior.nombre}</h5>
    <p class="card-text">${Interior.descripcion}</p>
    <p class="card-text">$ ${Interior.precio} la unidad</p>
    <button type="button" class="btn btn-outline-light" id="${Interior.id}"><strong>Agregar al Carrito</strong></button>
    `    
    contenido.append(cuerpo);
     //AGREGAR AL ARRAY CARRITO SIN REPETIR PRODUCTOS 
    const agregaInterior = document.getElementById(`${Interior.id}`);
    agregaInterior.onclick = () => {
       
        const repite = carrito.some((repiteProd)=>repiteProd.id === Interior.id);
        if (repite) {           
            let objeto = carrito.find(item => item.id == Interior.id)
            objeto.cantidad += 1
        }
        else {
        carrito.push({ id: Interior.id,
            img: Interior.img,
            nombre: Interior.nombre,
            precio: Interior.precio,
            cantidad: Interior.cantidad               
        });
        };

        pintarCarrito()                         
    };   
});

// Correccion hasta aca---------------------------------------------------------------------------------------------

//CONSTRUCCION CARRITO EVENTOS CLICK
const verCarrito = document.getElementById("ver-carrito");
const modalCarrito = document.getElementById("modal-container");

const pintarCarrito = () => {
    
    modalCarrito.innerHTML = ""
    carrito.forEach((product)=>{
        let carritoCont = document.createElement("div");
        carritoCont.className= "modal-cuerpo-carrito";
        carritoCont.innerHTML = `<h3>${product.nombre}</h3>
        <p>$${product.precio}</p>
        <input type="number" min = "1"  id="cantidad${product.id}">`       
         modalCarrito.append(carritoCont);
        
        let inputCantidad = document.getElementById(`cantidad${product.id}`)
        
        inputCantidad.onclick = ()=>{
            console.log(inputCantidad.value);
            let objeto = carrito.find(item => item.id == product.id)
            console.log(objeto);
            objeto.cantidad = parseInt(inputCantidad.value)
            actualizarCarrito()
        }
                            
        let eliminaProducto = document.createElement("span");
        eliminaProducto.innerText = "❌";
        eliminaProducto.className = "delete-product"
        carritoCont.append(eliminaProducto);
        eliminaProducto.onclick = eliminarArticulo;
                
    });
    actualizarCarrito()
};

function actualizarCarrito(){
    let total = document.getElementById('total-carrito')
    total.innerText = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
}

const eliminarArticulo = () => {
    const foundId = carrito.find((el)=>el.id);    
    carrito = carrito.filter((carritoId)=> {
        return carritoId !== foundId        
    });
    pintarCarrito();
    actualizarCarrito()
};