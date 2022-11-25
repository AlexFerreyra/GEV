
// // USUARIO
const inputNombre = document.getElementById("nombre")
const inputApellido = document.getElementById("apellido")
const botonDatos = document.getElementById("botonDatos")

class cliente{
    constructor(nombre,apellido){
    this.nombre = nombre
    this.apellido = apellido
}
}
let usuarios= []
if(localStorage.getItem('usuarios')){
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
}


botonDatos.onclick = () => {
    const clientes = new cliente (inputNombre.value, inputApellido.value)
    usuarios.push(clientes)
    inputNombre.value = ""
    inputApellido.value = ""
    // guardar en localStorage
    localStorage.setItem("usuarios",JSON.stringify(usuarios))
    console.log(usuarios)
}
// Fin USUARIO

// Productos y carritp
// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Producto 1',
        precio: 100,
        imagen: '/media/sm.jpg'
    },
    {
        id: 2,
        nombre: 'Producto 2',
        precio: 120,
        imagen: '/media/sm.jpg'
    },
    {
        id: 3,
        nombre: 'Producto 3',
        precio: 250,
        imagen: '/media/sm.jpg'
    },
    {
        id: 4,
        nombre: 'Producto 4',
        precio: 600,
        imagen: '/media/sm.jpg'
    }

];

let carrito = [];
const divisa = '€';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

total
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-dark');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderizarCarrito();

}

function renderizarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-dark', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    DOMtotal.textContent = calcularTotal();
}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    renderizarCarrito();
}

function calcularTotal() {
    // Array del carrito 
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}
function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
}
// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
// Inicio
renderizarProductos();
renderizarCarrito();

