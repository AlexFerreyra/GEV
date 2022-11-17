// // ADMIN
// const inputProductoNuevo = document.getElementById("productoNuevo")
// const inputPrecio = document.getElementById("precio")
// const inputStock = document.getElementById("stock")
// class productoNew{
//     constructor(productoNuevo,precio,stock){
//     this.productoNuevo = productoNuevo
//     this.precio = precio
//     this.stock = stock
// }
// }
// let productosNew= []
// if(localStorage.getItem('productosNew')){
//     productosNew = JSON.parse(localStorage.getItem('productosNew'))
// }


// botonIngreso.onclick = () => {
//     const productosNews = new productoNew (inputProductoNuevo.value, inputPrecio.value, inputStock.value)
//     productosNew.push(productosNews)
//     inputProductoNuevo.value = ""
//     inputPrecio.value = ""
//     inputStock.value=""

//     // guardar en localStorage
//     localStorage.setItem("productosNew",JSON.stringify(productosNew))
//     console.log(productosNew)
// }
// // Fin Admin

// // USUARIO

// const inputNombre = document.getElementById("nombre")
// const inputApellido = document.getElementById("apellido")
// const botonDatos = document.getElementById("botonDatos")

// botonDatos.onclick = () =>{
//     const usuario ={
//         nombre: inputNombre.value,
//         apellido: inputApellido.value
//     }
//     inputNombre.value = ""
//     inputApellido.value = ""
//     console.log(usuario)
//     // guardar en localStorage
//     localStorage.setItem("infoUsuario",JSON.stringify(usuario))
// }
// // Fin de usuario

// Buscar en Dom
const selectElem = document.getElementById("lista")
const botonAregar = document.getElementById("agregar")
const botonFinalizar = document.getElementById('finalizar')

const productosArray = JSON.parse(localStorage.getItem('productosNew'))


productosArray.forEach(prod=>{
    const optionProd = document.createElement('option')
    optionProd.innerText = `${prod.productoNuevo}: ${prod.precio}`
    optionProd.setAttribute('value', `${prod.productoNuevo}`)
    selectElem.append(optionProd)
})


// CARRITO 2
const carrito2 = []
console.log(productosArray)
botonAregar.onclick =()=> {
    const nomProd = selectElem.value
    const prodSelec = productosArray.find(prod=>prod.productoNuevo === nomProd)
    carrito2.push(prodSelec)
    console.log(carrito2)
}

botonFinalizar.onclick = () => { 
    let totalCompra = 0
    carrito2.forEach(prod=>{
        totalCompra = totalCompra + parseInt(prod.precio) 
    })
    alert(`El total es ${totalCompra}`)
}
// ----------------------------------------------------------------------------------------





/// INICIALIZAR VARIABLES GLOBALES 
let costoTotalCompra = 0;
let flag;
let total;
let operacion;
let opcion;
let cantidad;
// INSTANCIAR CLASE 
const productos = []

class producto {
    constructor(id, nombre, descripcion, precio) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;       
        this.precio = precio;
    };
};
//INSTANCIAMOS LOS OBJETOS Y GUARDAMOS EN ARRAYS POR TIPO DE PRODUCTOS
const Lavado = [lavadoBasico = new producto(1, "Lavado basico", "Este servicio cuenta con lavado y aspirado basico.", 1000),
lavadoMedio = new producto(2, "Lavado medio", "Este servicio cuenta con lavado con productos toxic , aspirado y abrillantado de ruedas ", 2000),
lavadoPremium = new producto(3, "Lavado Premium", "Este lavado cuenta con lavado con productos toxic , aspirado y abrillantado de ruedas y limpieza de motor", 3000)];
productos.push(Lavado)

const Ploteo = [ploteoCompleto = new producto(4, "Ploteo completo", "Plotear un auto completo", 1000),
ploteoParcial = new producto(5, "Ploteo parcial del auto", "Ploteo parcial del auto", 2000)];
productos.push(Ploteo)

const Interior = [tapizado = new producto(6, "Limpieza de tapizado", "Limpiamos los tapizados de los asientos", 1000),
alfombra = new producto(7, "Limpieza de alfombrado", "Limpiamos todo el alfombrado de tu vehiculo", 2000)];
productos.push(Interior)

const Toxic = [shampoo = new producto (8, "Shampoo Toxic", "basico", 1000 )]
productos.push(Toxic)

//CARRITO DE COMRPAS
let carrito = [];

console.log(productos)


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

//CREAMOS EL GRUPO Toxic
const seccToxic = document.getElementById("seccToxic");
const prductosToxic = Toxic.forEach((Toxic)=> {
    const div1 = document.createElement("div");
    div1.className = "col";
    seccToxic.append(div1);
    const contenido = document.createElement("div");
    contenido.className = "card cardToxic";
    div1.append(contenido);
    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body text-center"
    cuerpo.innerHTML =`
    <h5 class="card-title">${Toxic.nombre}</h5>
    <p class="card-text">${Toxic.descripcion}</p>
    <p class="card-text">$ ${Toxic.precio}</p>
    <button type="button" class="btn btn-outline-light tor" id="${Toxic.id}"><strong>Agregar al Carrito</strong></button>
    `    
    contenido.append(cuerpo);
    //AGREGAR AL ARRAY CARRITO SIN REPETIR PRODUCTOS
    const agregaToxic = document.getElementById(`${Toxic.id}`);
    agregaToxic.onclick = () => {        
        const repite = carrito.some((repiteProd)=>repiteProd.id === Toxic.id);
        if (repite) {           
            let objeto = carrito.find(item => item.id == Toxic.id)
            objeto.cantidad += 1
        }
        else {
        carrito.push({ id: Toxic.id,
            img: Toxic.img,
            nombre: Toxic.nombre,
            precio: Toxic.precio,
            cantidad: Toxic.cantidad               
        });
        };  
        pintarCarrito()                                  
    };
});


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





