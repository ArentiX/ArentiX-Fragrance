let loadMoreBtn = document.querySelector('#load-more');
let currentItem = 8;

const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');


const mensajeCarrito = document.getElementById('mensaje-carrito');
const contadorCarrito = document.getElementById('contador-carrito');
let totalProductos = 0;
loadMoreBtn.onclick = () => {
    let boxes = [...document.querySelectorAll('.box-container .box')];

    for (var i = currentItem; i < currentItem + 4; i++) {
        boxes[i].style.display = 'flex';
        boxes[i].style.flexDirection = 'column';
    }

    currentItem += 4;

    if (currentItem >= boxes.length) {
        loadMoreBtn.style.display = 'none';
    }
}


cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}
function comprarElemento(e) {

    if (e.target.classList.contains('agregar-carrito')) {
        e.preventDefault();

        const elemento = e.target.closest('.box');
        animarAlCarrito(elemento.querySelector("img"));
        leerDatosElemento(elemento);
    }
}
function leerDatosElemento(elemento) {

    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.Precio').textContent,
        id: elemento.querySelector('a').getAttribute('data-id')
    };

    insertarCarrito(infoElemento);
}
function insertarCarrito(elemento) {

    const row = document.createElement('tr');

    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100" height="150px">
        </td>

        <td>
            ${elemento.titulo}
        </td>

        <td>
            ${elemento.precio}
        </td>

        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;


    lista.appendChild(row);
    totalProductos++;
    contadorCarrito.textContent = totalProductos;
    mostrarMensaje();
}
function eliminarElemento(e) {

    if (!e.target.classList.contains('borrar')) {
        return;
    }

    e.preventDefault();

    e.target.parentElement.parentElement.remove();

    totalProductos--;
    contadorCarrito.textContent = totalProductos;
}

function vaciarCarrito(e) {

    e.preventDefault();

    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }

    totalProductos = 0;
    contadorCarrito.textContent = "0";

    mostrarMensajeVaciar();
}
function mostrarMensaje() {
    const mensaje = document.getElementById("mensaje-carrito");

    mensaje.classList.add("activo");

    setTimeout(() => {
        mensaje.classList.remove("activo");
    }, 2000);
}
function mostrarMensajeVaciar() {
    mensajeCarrito.textContent = "Carrito vaciado correctamente";
    mensajeCarrito.classList.add("activo");

    setTimeout(() => {
        mensajeCarrito.classList.remove("activo");
        mensajeCarrito.textContent = ""; // limpia el texto después
    }, 2000);
}

function animarAlCarrito(imagen) {

    const carrito = document.getElementById("img-carrito");

    const copia = imagen.cloneNode(true);

    const imgRect = imagen.getBoundingClientRect();
    const carritoRect = carrito.getBoundingClientRect();

    copia.style.position = "fixed";

    // La animación comienza desde el centro de la imagen
    copia.style.left = (imgRect.left + imgRect.width / 2 - 40) + "px";
    copia.style.top = (imgRect.top + imgRect.height / 2 + 20) + "px";

    copia.style.width = "80px";
    copia.style.height = "80px";
    copia.style.objectFit = "cover";

    copia.style.zIndex = "99999";
    copia.style.pointerEvents = "none";

    copia.style.transition = "all 0.8s ease-in-out";

    document.body.appendChild(copia);

    setTimeout(() => {

        copia.style.left = carritoRect.left + "px";
        copia.style.top = carritoRect.top + "px";

        copia.style.width = "20px";
        copia.style.height = "20px";

        copia.style.opacity = "0";

    }, 50);

    setTimeout(() => {
        copia.remove();
    }, 900);
}