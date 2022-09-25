const productos = []
// const btnBuscar = document.querySelector(".btn .btn-dark")
const cuerpo = document.getElementById("cuerpo")
const loader = document.getElementById("loader")
const carritoSection = document.getElementById("carrito")
const btnEnviar = document.getElementById("btnEnviar")
const nombreCliente = document.getElementById("nombreCliente")
const edadCliente = document.getElementById("edadCliente")
const comentariosCliente = document.getElementById("comentariosCliente")
//JSON De productos
let tf = []



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
    let contenidoHTML = ""
    await fetch("./js/wuacamoli.json")
        .then((response) => response.json())
        .then((data) => {
            tf = data
            tf.forEach(contenido => {
                contenidoHTML += retornoCardContenido(contenido)
            });
            cuerpo.innerHTML = contenidoHTML
        })
        .catch((error) => {
            cuerpo.innerHTML = retornoCardError()
        })
        .finally(() => loader.innerHTML = "")
}
cargarContenido()




