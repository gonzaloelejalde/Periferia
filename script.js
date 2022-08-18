//Constructores

class Producto {
    constructor(id, nombre, marca, precio, stock, imagen) {
        this.i = id
        this.n = nombre
        this.m = marca
        this.p = precio
        this.s = stock
        this.imagen = imagen
    }
}

class Cart {
    constructor(id, nombre, marca, precio, imagen, cantidad = 1) {
        this.i = id
        this.n = nombre
        this.m = marca
        this.p = precio
        this.imagen = imagen
        this.c = cantidad
    }
}

const producto1 = new Producto(1, "AURICULAR", "Logitech", 15000, 1, `img/auricular.png`)
const producto2 = new Producto(2, "MONITOR", "Samsung", 30000, 1, `img/monitor.png`)
const producto3 = new Producto(3, "MOUSE", "Redragon", 6000, 1, `img/mouse.png`)
const producto5 = new Producto(5, "MOUSEPAD", "Hyperx", 2000, 1, `img/mousepad.png`)

//Spread

const producto4 = structuredClone(producto3)
producto4.i = 4
producto4.n = "TECLADO"
producto4.p = 7600
producto4.imagen = `img/teclado.png`
producto4.b = `<button id = "boton4" >Añadir Teclado al Carrito</button>`

const productos = [producto1, producto2, producto3, producto4, producto5]
const carrito = JSON.parse(localStorage.getItem("carrito")) || []

//Elementos del index

const divCarrito = document.getElementById("divCarrito")
const divProductos = document.getElementById("productos")
const carritoLogo = document.getElementById("carritoLogo")

//Funcion de las cards

function renderizarProductos(productos) {
    for (let producto of productos) {
        let div = document.createElement("div")
        div.className = "card productos"
        div.setAttribute("id", producto.i)
        div.style.width = "18rem"
        div.innerHTML += `
            <div class="card-body">
                <h5 class="card-title">${producto.n}</h5>
                <p class="card-text">Marca: ${producto.m}</p>
                <p class="card-text">Precio: $${producto.p}</p>
                <p class="card-text">Stock: ${producto.s}</p>
                <div class = "imagen"><img src = "${producto.imagen}"></div>
                <div class="btn btn-primary">
                    <button id="botonAgregar${producto.i}" class="btn btn-primary"><i class="fas fa-cart-plus"></i> Agregar</button>
                </div>
            </div>
        `
        divProductos.appendChild(div)
        let botonAgregar = document.getElementById(`botonAgregar${producto.i}`)
        botonAgregar.addEventListener("click", () => {
            agregarAlCarrito(producto.i)
        })
    }
}
renderizarProductos(productos)

//Funcion para que se agreguen los elementos al carrito 

function agregarAlCarrito(productId) {
    let buscarProducto = productos.find(elemento => elemento.i === productId)
    console.log(buscarProducto)
    if (buscarProducto) {
        let productoAgregado = carrito.find(elemento => elemento.i == buscarProducto.i)
        if (productoAgregado) {
            productoAgregado.c += 1
        } else {
            carrito.push(new Cart(buscarProducto.i, buscarProducto.n, buscarProducto.m, buscarProducto.p, buscarProducto.imagen, buscarProducto.c))
        }
    }
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to bottom left, #30655A, #0229BA)",
        },
        onClick: function () {
            console.log("Diste click")
        }
    }).showToast();
    localStorage.setItem('carrito', JSON.stringify(carrito))
    console.log(carrito)
}

//Boton que muestra el contenido del carrito

carritoLogo.addEventListener("click", () => {

    divCarrito.innerHTML = ""

    carrito.forEach((producto, indice) => {
        divCarrito.innerHTML += `<div class="card border-dark mb-3" id ="producto ${indice}" style="max-width: 20rem; margin: 4px;">
    <div class="card-header"><h2></h2>${producto.n}</h2></div>
    <div class="card-body"> 
        <p class="card-title">$${producto.p}</p>
        <button class = "btn btn-danger">Eliminar Producto</button>
    </div>
</div>`
    })

    carrito.forEach((producto, indice) => {
        let carritoBoton = document.getElementById(`producto ${indice}`)

        carritoBoton.addEventListener("click", () => {
            document.getElementById(`producto ${indice}`).remove()
            carrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            console.log(`${producto.n} Eliminado`)

            Toastify({
                text: "Producto eliminado del carrito",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(35,0,31,1) 0%, rgba(204,4,4,1) 51%, rgba(2,0,36,1) 100%)",
                },
                onClick: function () {
                    console.log("Diste click")
                }
            }).showToast();
        })
    })
})

const carritoVacio = "Carrito Vacio"

//Funcion para eliminar los productos del carrito una vez hecha la compra

function comprar() {
    let botonComprar = document.getElementById("botonComprar")
    botonComprar.addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire({
                icon: 'error',
                text: 'El carrito esta vacío',
            })
        } else if (carrito.length !== 0) {
            Swal.fire({
                icon: 'success',
                title: '¡Felicidades!',
                text: 'Compra realizada con éxito',
            })
            carrito.splice(0, carrito.length)
            divCarrito.innerHTML = ""
            // divCarrito.innerHTML += `(Error) / ${carritoVacio}`
            localStorage.setItem('carrito', JSON.stringify(carrito))
        }
    })
}
comprar()

//Fetch

const tableId = document.getElementById("tableId")
const boton1 = document.getElementById("boton1")

async function mostrarProximamente() {
    const productos = await fetch('./json/productos.json')
    const productosParseados = await productos.json()
    tableId.innerHTML = `
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Modelo</th>
                <th scope="col">Precio</th>
                <th scope="col">Imagen</th>
                <th scope="col"></th>
            </tr>
        </thead>
            <tbody id="tBody">
            </tbody>
        </table>
    
    `
    productosParseados.forEach((producto, indice) => {
        tBody.innerHTML += `
            <tr id="producto${indice + 1}">
                <th scope="row">${indice + 1}</th>
                <td>${producto.nombre}</td>
                <td>${producto.modelo}</td>
                <td>$${producto.precio}</td>
                <td><img src="./img/${producto.img}" class = "imagenes"></td>
            </tr>
        `
    })
}

boton1.addEventListener('click', () => {
    mostrarProximamente()
})

//Dropdown de Tema (Blanco o Negro)

const botonDarkMode = document.getElementById("botonDarkMode")
const botonLightMode = document.getElementById("botonLightMode")

let darkMode

//Operador Ternario

(localStorage.getItem("theme")) ? darkMode = localStorage.getItem("theme") : localStorage.setItem("theme", "light")

if (darkMode == "dark") {
    document.body.classList.add('darkMode')
}

botonDarkMode.addEventListener("click", () => {

    document.body.classList.add('darkMode')
    localStorage.setItem('theme', "dark")
})

botonLightMode.addEventListener("click", () => {

    document.body.classList.remove('darkMode')
    localStorage.setItem('theme', "light")
})



