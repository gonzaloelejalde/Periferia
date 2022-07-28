class Producto {
    constructor(id, nombre, marca, precio, stock, imagen, boton) {
        this.id = id
        this.nombre = nombre
        this.marca = marca
        this.precio = precio
        this.stock = stock
        this.imagen = imagen
        this.boton = boton
    }
}

const producto1 = new Producto(1, "AURICULAR", "Logitech", 15000, 10, `img/auricular.png`, `<button id = "boton1" >Añadir Auricular al Carrito</button>`)
const producto2 = new Producto(2, "MONITOR", "Samsung", 30000, 15, `img/monitor.png`, `<button id = "boton2" >Añadir Monitor al Carrito</button>`)
const producto3 = new Producto(3, "MOUSE", "Redragon", 6000, 12, `img/mouse.png`, `<button id = "boton3" >Añadir Mouse al Carrito</button>`)
const producto4 = new Producto(4, "TECLADO", "Redragon", 7600, 18, `img/teclado.png`, `<button id = "boton4" >Añadir Teclado al Carrito</button>`)
const producto5 = new Producto(5, "MOUSEPAD", "Hyperx", 2000, 19, `img/mousepad.png`, `<button id = "boton5" >Añadir Mousepad al Carrito</button>`)

const productos = [producto1, producto2, producto3, producto4, producto5]

const divProductos = document.getElementById("productos")

function renderizarProductos(productos) {
    for (let producto of productos) {
        divProductos.innerHTML += `
        <div class="card productos" id="producto${producto.id}" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">Marca: ${producto.marca}</p>
            <p class="card-text">Precio: $${producto.precio}</p>
            <p class="card-text">Stock: ${producto.stock}</p>
            <div class = "imagen"><img src = "${producto.imagen}"></div>
            <div id = "botones" class="btn btn-primary">${producto.boton}</div>
        </div>
        </div>
        `
    }
}

renderizarProductos(productos)

let carrito = []

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
} else {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const botonCarrito = document.getElementById("botonCarrito")
const divCarrito = document.getElementById("divCarrito")
const botonCompra = document.getElementById("botonCompra")
const divCompra = document.getElementById("divCompra")
const botones = document.getElementById("botones")

boton1.addEventListener('click', () => {

    divCarrito.innerHTML = ""

    carrito.push(producto1)
    console.log(carrito)

    localStorage.setItem("carrito", JSON.stringify(carrito))
})

boton2.addEventListener('click', () => {

    divCarrito.innerHTML = ""

    carrito.push(producto2)
    console.log(carrito)

    localStorage.setItem("carrito", JSON.stringify(carrito))


})

boton3.addEventListener('click', () => {

    divCarrito.innerHTML = ""

    carrito.push(producto3)
    console.log(carrito)

    localStorage.setItem("carrito", JSON.stringify(carrito))

})

boton4.addEventListener('click', () => {

    divCarrito.innerHTML = ""

    carrito.push(producto4)
    console.log(carrito)

    localStorage.setItem("carrito", JSON.stringify(carrito))

})

boton5.addEventListener('click', () => {

    divCarrito.innerHTML = ""

    carrito.push(producto5)
    console.log(carrito)

    localStorage.setItem("carrito", JSON.stringify(carrito))

})


botonCarrito.addEventListener("click", () => {

    let carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    divCarrito.innerHTML = ""

    carritoStorage.forEach((producto, indice) => {
        divCarrito.innerHTML += `<div class="card border-dark mb-3" id ="producto ${indice}" style="max-width: 20rem; margin: 4px;">
    <div class="card-header"><h2></h2>${producto.nombre}</h2></div>
    <div class="card-body"> 
        <p class="card-title">$${producto.precio}</p>
        <button class = "btn btn-danger">Eliminar Producto</button>
    </div>
</div>`

    })

    carritoStorage.forEach((producto, indice) => {
        let carritoBoton = document.getElementById(`producto ${indice}`).lastElementChild.lastElementChild

        carritoBoton.addEventListener("click", () => {
            document.getElementById(`producto ${indice}`).remove()
            carrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            console.log(`${producto.nombre} Eliminado`)
        })
    })
})


//Registro de Usuarios

class Usuario {
    constructor(username, email, password) {
        this.username = username
        this.email = email
        this.password = password
    }
}

let usuarios = []

if (localStorage.getItem("usuarios")) {
    usuarios = JSON.parse(localStorage.getItem("usuarios"))
} else {
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}

const form = document.getElementById("idForm")
const divUsers = document.getElementById("divUsers")
const botonUsers = document.getElementById("botonUsers")

form.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(event.target)

    let datForm = new FormData(event.target)

    console.log(datForm.get("user"), datForm.get("email"), datForm.get("password"))

    const usuario = new Usuario(datForm.get("user"), datForm.get("email"), datForm.get("password"))

    usuarios.push(usuario)
    console.log(usuarios)

    localStorage.setItem("usuarios", JSON.stringify(usuarios))

    form.reset()
})

botonUsers.addEventListener("click", () => {
    let arrayStorage = JSON.parse(localStorage.getItem("usuarios"))
    divUsers.innerHTML = ""

    arrayStorage.forEach((usuario, indice) => {
        divUsers.innerHTML += `
        <div class="card border-dark mb-3" id ="usuario ${indice}" style="max-width: 20rem; margin: 4px;">
            <div class="card-header"><h2></h2>${usuario.username}</h2></div>
            <div class="card-body"> 
                <p class="card-title">${usuario.email}</p>
                <button class = "btn btn-danger">Eliminar Usuario</button>
            </div>
        </div>`
    })

    arrayStorage.forEach((usuario, indice) => {
        let botonCard = document.getElementById(`usuario ${indice}`).lastElementChild.lastElementChild

        botonCard.addEventListener("click", () => {
            document.getElementById(`usuario ${indice}`).remove()
            usuarios.splice(indice, 1)
            localStorage.setItem("usuarios", JSON.stringify(usuarios))
            console.log(`${usuario.username} Eliminada`)
        })
    })
})


//Dropdown de Tema (Blanco o Negro)

const botonDarkMode = document.getElementById("botonDarkMode")
const botonLightMode = document.getElementById("botonLightMode")

let darkMode

if (localStorage.getItem('theme')) {
    darkMode = localStorage.getItem('theme')
} else {
    localStorage.setItem('theme', "light")
}

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