const productos = []
const campos = document.querySelectorAll("input")
const btnCargar = document.querySelector(".btn .btn-dark")
const cuerpo = document.getElementById("cuerpo")


class Producto {
    constructor(id, nombre, precio) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
    }
}

function generadorAutomatico() {
    productos.push(new Producto(1, "Bucket Grey", 60000))
    productos.push(new Producto(2, "Bucket Green", 60000))
    productos.push(new Producto(3, "Bucket Purple", 60000))
    productos.push(new Producto(4, "Vest Grey", 100000))
    productos.push(new Producto(5, "Vest Purple", 100000))
    productos.push(new Producto(6, "Poncho Yellow", 150000))
    productos.push(new Producto(7, "Poncho Pink", 150000))
    productos.push(new Producto(8, "Sunglass Yellow & Green", 90000))
    productos.push(new Producto(9, "Sunglass Purple & Pink", 90000))
    productos.push(new Producto(10, "Chain Silver", 250000))
}
generadorAutomatico()

function cargarTablaProductos() {
    const cuerpo = document.getElementById("cuerpo")
    productos.forEach(producto => {
        cuerpo.innerHTML += `<tr>
                                <td>${producto.id}</td>
                                <td>${producto.nombre}</td>
                                <td>${producto.precio}</td>
                            </tr>`
    })
}

cargarTablaProductos()

function buscarProducto() {
    // debugger
    const codigoBuscado = document.getElementById("codigo").value
    if (codigoBuscado < 1 || codigoBuscado > 10 || codigoBuscado == null) {
        cuerpo.innerHTML = `<tr>
                                    <td>No existe ese producto</td>
                                    <td>No existe ese producto</td>
                                    <td>No existe ese producto</td>
                                </tr>`
    } else {
        for (let i = 0; i <= productos.length; i++) {
            if (codigoBuscado == i) {
                cuerpo.innerHTML = `<tr>
                                        <td>${productos[i - 1].id}</td>
                                        <td>${productos[i - 1].nombre}</td>
                                        <td>${productos[i - 1].precio}</td>
                                    </tr>`
            }
        }
    }
}

function mostrarProducto() {
    campos.forEach(campo => {
        campo.addEventListener("keypress", (e) => {
            if (e.key == "Enter") {
                buscarProducto()
                document.getElementById("codigo").value=""
            }
        })
    })
}

mostrarProducto()


function focoEnCampos() {
    campos.forEach(campo => {
        campo.addEventListener("focus", () => { campo.className = "form-control-lg" })
        campo.addEventListener("blur", () => { campo.className = "form-control" })
    })
}

focoEnCampos()

