

// USUARIO

const inputNombre = document.getElementById("nombre")
const inputApellido = document.getElementById("apellido")
const botonDatos = document.getElementById("botonDatos")

botonDatos.onclick = () =>{
    const usuario ={
        nombre: inputNombre.value,
        apellido: inputApellido.value
    }
    inputNombre.value = ""
    inputApellido.value = ""
    console.log(usuario)
    // guardar en localStorage
    localStorage.setItem("infoUsuario",JSON.stringify(usuario))
}
// // Fin de usuario
// // ADMIN
const inputProductoNuevo = document.getElementById("productoNuevo")
const inputPrecio = document.getElementById("precio")
const inputStock = document.getElementById("stock")
class productoNew{
    constructor(productoNuevo,precio,stock){
    this.productoNuevo = productoNuevo
    this.precio = precio
    this.stock = stock
}
}
let productosNew= []
if(localStorage.getItem('productosNew')){
    productosNew = JSON.parse(localStorage.getItem('productosNew'))
}


botonIngreso.onclick = () => {
    const productosNews = new productoNew (inputProductoNuevo.value, inputPrecio.value, inputStock.value)
    productosNew.push(productosNews)
    inputProductoNuevo.value = ""
    inputPrecio.value = ""
    inputStock.value=""

    // guardar en localStorage
    localStorage.setItem("productosNew",JSON.stringify(productosNew))
    console.log(productosNew)
}
// Fin Admin

//-------------------------------------------

   // SECCION PRUEBA
// const selectElem = document.getElementById("prueba")
const botonAregar = document.getElementById("agregar")
const botonFinalizar = document.getElementById('finalizar')

const productosArray = JSON.parse(localStorage.getItem('productosNew'))


productosArray.forEach(prod=>{
    let targetDiv = document.getElementById('prueba');
    const div1 = document.createElement("div");
    div1.className = "card text bg-dark mb-3 ";
    const styles = document.createElement("div");
    styles.className = "card-header"
    const contenido = document.createElement("div");
    
    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body text-white text-center"

    targetDiv.innerHTML += `<h5 class="card-title text-white">${prod.productoNuevo}</h5>
      <p class="card-text text-white">${prod.precio}</p>
      <button type="button" class="btn btn-outline-light tor" id="${prod.id}"><strong>Agregar al Carrito</strong></button>`
// array
      const agregaProd = document.getElementById(`${prod.id}`);
      agregaProd.onclick = () => {        
    const repite = carrito.some((repiteProd)=>repiteProd.id === prod.id);
    if (repite) {           
        let objeto = carrito.find(item => item.id == prod.id)
        objeto.cantidad += 1
    }
    else {
    carrito.push({ id: prod.id,
        nombre: prod.productoNuevo,
        precio: prod.precio,
        cantidad: prod.cantidad               
    });
    };  
    pintarCarrito()                                  
};
})
//---------------------------------------------------







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




//CARRITO DE COMRPAS
let carrito = [];

// console.log(productos)



//CREAMOS EL GRUPO Toxic
// const seccToxic = document.getElementById("seccToxic");
// const prductosToxic = Toxic.forEach((Toxic)=> {
//     const div1 = document.createElement("div");
//     div1.className = "col";
//     seccToxic.append(div1);
//     const contenido = document.createElement("div");
//     contenido.className = "card cardToxic";
//     div1.append(contenido);
//     const cuerpo = document.createElement("div");
//     cuerpo.className = "card-body text-center"
//     cuerpo.innerHTML =`
//     <h5 class="card-title">${Toxic.nombre}</h5>
//     <p class="card-text">${Toxic.descripcion}</p>
//     <p class="card-text">$ ${Toxic.precio}</p>
//     <button type="button" class="btn btn-outline-light tor" id="${Toxic.id}"><strong>Agregar al Carrito</strong></button>
//     `    
//     contenido.append(cuerpo);
    //AGREGAR AL ARRAY CARRITO SIN REPETIR PRODUCTOS
//     const agregaToxic = document.getElementById(`${Toxic.id}`);
//     agregaToxic.onclick = () => {        
//         const repite = carrito.some((repiteProd)=>repiteProd.id === Toxic.id);
//         if (repite) {           
//             let objeto = carrito.find(item => item.id == Toxic.id)
//             objeto.cantidad += 1
//         }
//         else {
//         carrito.push({ id: Toxic.id,
//             img: Toxic.img,
//             nombre: Toxic.nombre,
//             precio: Toxic.precio,
//             cantidad: Toxic.cantidad               
//         });
//         };  
//         pintarCarrito()                                  
//     };
// });


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
