// const btnBuscar = document.querySelector(".btn .btn-dark")
const cuerpo = document.getElementById("cuerpo")
const loader = document.getElementById("loader")
const carritoSection = document.getElementById("carritoSection")
const totalCompra = document.getElementById("totalCompra")
const btnEnviar = document.getElementById("btnEnviar")
const nombreCliente = document.getElementById("nombreCliente")
const edadCliente = document.getElementById("edadCliente")
const comentariosCliente = document.getElementById("comentariosCliente")
//JSON De productos
let tf = []
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let contenidoHTML = ""


// Formulario de Datos personales
const datosCompletos = () => (nombreCliente.value !== "" && edadCliente.value !== "" && comentariosCliente.value !== "" && parseInt(edadCliente.value)) ? true : false
const mostrarMensaje = () => (datosCompletos()) ? sweetAlert("Gracias por ingresar tus comentarios", 'success', 'green') : sweetAlert("Completa todos los valores solicitados.", 'error', 'red')
btnEnviar.addEventListener("click", mostrarMensaje)

const sweetAlert = (mensaje, icono, bgcolor) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        text: mensaje,
        icon: icono,
        showConfirmButton: false,
        timer: 5000,
        background: bgcolor,
        color: 'white'
    })
}

// Agregando Fetch
const retornoCardContenido = (contenido) => {
    return `<div class="col">
                                 <div class="card h-100">
                                         <div class="card-body">
                                             <h5 class="card-title">${contenido.nombre}</h5>
                                             <p class="card-text">Precio: $${contenido.precio}</p>
                                             <button id="btn-agregar${contenido.id}" class="btn btn-dark">Añadir al Carrito</button>
                                        </div>
                                     </div>
                                 </div>`
}

const retornoCardError = () => {
    return `<div>
                <div></div>
                <p>Parece que hubo un error :(</p>
                <p>Intenta nuevamente en unos segundos...</p>
            </div>`
}

const cargarContenido = async () => {
    await fetch("./js/wuacamoli.json")
        .then((response) => response.json())
        .then((data) => {
            tf = data
            tf.forEach(contenido => {
                contenidoHTML += retornoCardContenido(contenido)
            });
            cuerpo.innerHTML = contenidoHTML
            agregarFuncionalidad()
        })
        .catch((error) => {
            cuerpo.innerHTML = retornoCardError()
        })
        .finally(() => loader.innerHTML = "")
}
cargarContenido()

function agregarFuncionalidad() {
    tf.forEach(prod => {
        document.querySelector(`#btn-agregar${prod.id}`).addEventListener("click", () => {
            agregarAlCarrito(prod)
        })
    })
}

function agregarAlCarrito(prod) {
    let existe = carrito.some((productoSome) => productoSome.id === prod.id)
    if (existe === false) {
        prod.cantidad = 1;
        carrito.push(prod)
    } else {
        let prodFind = carrito.find(productoFinal => productoFinal.id === prod.id)
        prodFind.cantidad++;
    }
    console.table(carrito)
    renderizarCarrito()
}


function renderizarCarrito() {
    carritoSection.innerHTML = ""
    carrito.forEach(prod => {
        carritoSection.innerHTML += `
        <div class="col">
            <div class="card text-bg-dark h-100">
                <div class="card-body">
                    <h5 class="card-title">${prod.nombre}</h5>
                    <p class="card-text">Cantidad: ${prod.cantidad}</p>
                    <p class="card-text">Precio: $${prod.precio * prod.cantidad}</p>
                    <button id="btn-borrar${prod.id}" class="btn btn-light">Quitar del Carrito</button>
                    <br></br>
                    <button id="btn-restar${prod.id}" class="btn btn-light">Restar Cantidad</button>
                    <br></br>
                    <button id="btn-sumar${prod.id}" class="btn btn-light">Agregar Cantidad</button>
                </div>
            </div>
        </div>`
    })
    localStorage.setItem("carrito", JSON.stringify(carrito));
    borrarProducto()
    restarCantidad()
    agregarCantidad()
    generarTotal()
}

function borrarProducto() {
    carrito.forEach((prod) => {
        document.querySelector(`#btn-borrar${prod.id}`).addEventListener("click", () => {
            carrito = carrito.filter((productoFilter) => productoFilter.id !== prod.id)
            renderizarCarrito()
        })
    })
}

function restarCantidad(prod) {

    carrito.forEach((prod) => {
        document.querySelector(`#btn-restar${prod.id}`).addEventListener("click", () => {
            let existe = carrito.some((productoSome) => productoSome.id === prod.id)
            if (existe === false) {
                prod.cantidad = 0;
                carritoSection.innerHTML = ""
            } else {
                let prodFind = carrito.find(productoFinal => productoFinal.id === prod.id)
                prodFind.cantidad--;
                if (prodFind.cantidad == 0) {
                    carrito = carrito.filter((productoFilter) => productoFilter.id !== prod.id)
                    renderizarCarrito()
                }
                else {
                    renderizarCarrito()
                }
            }
            console.table(carrito)
        })
    })
}

function agregarCantidad(prod) {

    carrito.forEach((prod) => {
        document.querySelector(`#btn-sumar${prod.id}`).addEventListener("click", () => {
            let existe = carrito.some((productoSome) => productoSome.id === prod.id)
            if (existe === false) {
                prod.cantidad = 0;
                carritoSection.innerHTML = ""
            } else {
                let prodFind = carrito.find(productoFinal => productoFinal.id === prod.id)
                prodFind.cantidad++;
                renderizarCarrito()
            }
            console.table(carrito)
        })
    })
}


function generarTotal() {
    let acumTotal = 0
    carrito.forEach((prod) => {
        acumTotal += prod.precio * prod.cantidad
        console.table(carrito)
    })
    if (carrito == []) {
        totalCompra.innerHTML =
            `Total= $0`
    } else {
        totalCompra.innerHTML =
            `Total= $${acumTotal}`
    }
}


//Para que cuando se refresque página siga apareciendo el carrito
renderizarCarrito()
generarTotal()


