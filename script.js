console.log(document.getElementById("parrafo1"))
const parrafo1 = document.getElementById("parrafo1")

let productoABuscar = prompt("Ingrese un producto de nuestro stock, tal cual este escrito, para consultar por su marca, precio y stock: Auricular, Monitor, Mouse, Teclado y/o Mousepad").toUpperCase()
let nombreUser = prompt("Ingrese su nombre")
let apellidoUser = prompt("Ingrese su apellido")
let valorPrestamo = 0 
let pregunta, saludos, respuesta, continua

do{
    horario = parseInt(prompt("Ingrese su hora actual"))
    if(horario <= 12 ){
        saludos = "buenos dias"
    }else if(horario <= 21 ){
        saludos = "buenas tardes"
    }else if(horario <= 24 ){
        saludos = "buenas noches"
    }else if(horario <= 5){
        saludos = "¿Qué haces despierto a esta hora?"
    }else if (horario >= 25){
        alert("Esos horarios no existen")
    }else if(isNaN (horario)){
        alert("Esos horarios no existen")
    }
}while(isNaN(horario) || horario >= 25) 

const user = {username: nombreUser, lastname: apellidoUser, time: horario}
parrafo1.innerText = `Hola ${user.username} ${user.lastname}, ${saludos}`

class Producto {
    constructor (id, nombre, marca, precio, stock, imagen){
    this.id = id
    this.nombre = nombre
    this.marca = marca
    this.precio = precio
    this.stock = stock
    this.imagen = imagen
    }
    mostrarMensaje(){
        alert(`El producto seleccionado es ${productoABuscar} y sus caracteristicas son las siguientes: La marca es ${this.marca}, el precio es de ${this.precio} y nuestro stock actual es de ${this.stock}`)
    }
}

const producto1 = new Producto (1, "AURICULAR", "Logitech", 15000, 10, `img/auricular.png`)
const producto2 = new Producto (2, "MONITOR", "Samsung", 30000, 15, `img/monitor.png`)
const producto3 = new Producto (3, "MOUSE", "Redragon", 6000, 12, `img/mouse.png`)
const producto4 = new Producto (4, "TECLADO", "Redragon", 7600, 18, `img/teclado.png`)
const producto5 = new Producto (5, "MOUSEPAD", "Hyperx", 2000, 19, `img/mousepad.png`)

const productos = [producto1, producto2, producto3, producto4, producto5]

function buscarProducto(productos) {
    let nombreProducto = prompt("Ingrese un nombre de periferico (Aparecera en la consola)").toUpperCase()
    console.log(productos.find(productos => productos.nombre == nombreProducto))
    if(nombreProducto !== "AURICULAR" && nombreProducto !== "MONITOR" && nombreProducto !== "MOUSE" && nombreProducto !== "TECLADO" && nombreProducto !== "MOUSEPAD"){
        console.log("Producto no encontrado")
    }
}

function buscarProductos(productos) {
    let precio = parseFloat(prompt("Ingrese un precio"))
    let buscarProducto = productos.filter(producto => producto.precio >= precio)
    if (buscarProducto.length == 0) {
        console.log("No hay productos con dichas caracteristicas")
    } else {
        console.log(buscarProducto)
    }
}

function agregarProductos(productos){
    let agregarProducto = prompt("Agregue un producto para que nosotros podamos saber que es lo que necesita el cliente").toUpperCase()
    if (agregarProducto !== "AURICULAR" && agregarProducto !== "MONITOR" && agregarProducto !== "MOUSE" && agregarProducto !== "TECLADO" && agregarProducto !== "MOUSEPAD"){
        console.log(`Se agrego correctamente ${agregarProducto}`)
        alert(`Se agrego correctamente el siguiente producto: ${agregarProducto}`)
        console.log(productos.push(agregarProducto))
        console.log(productos)
        console.log(new Producto (6, `${agregarProducto}`, "Predetermiado", "-", "0", "-"))
    }else{
        alert("Este producto ya existe")
    }
}


const divProductos = document.getElementById("productos")

for(let producto of productos){
    divProductos.innerHTML += `
    <div class="card productos" id="producto${producto.id}" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">Marca: ${producto.marca}</p>
        <p class="card-text">Precio: $${producto.precio}</p>
        <p class="card-text">Stock: ${producto.stock}</p>
        <div class = "imagen"><img src = "${producto.imagen}"></div>
        </div>
    </div>
    </div>
    `
}

while(productoABuscar !== "AURICULAR" && productoABuscar !== "MONITOR" && productoABuscar !== "MOUSE" && productoABuscar !== "TECLADO" && productoABuscar !== "MOUSEPAD"){
    productoABuscar = prompt("Ingrese un producto de nuestro stock, tal cual este escrito, para consultar por su marca, precio y stock: Auricular, Monitor, Mouse, Teclado y/o Mousepad").toUpperCase()
}

if(productoABuscar == "AURICULAR"){
    (producto1.mostrarMensaje())
}else if(productoABuscar == "MONITOR"){
    (producto2.mostrarMensaje())
}else if(productoABuscar == "MOUSE"){
    (producto3.mostrarMensaje())
}else if(productoABuscar == "TECLADO"){
    (producto4.mostrarMensaje())
}else if(productoABuscar == "MOUSEPAD"){
    (producto5.mostrarMensaje())
}

do {
    do{
        continua = prompt("¿Desea realizar otra función?").toUpperCase()
        if (continua == "SI"){
            do{
                respuesta = parseInt(prompt(`Ingrese un número para: 
                1- Buscar un producto
                2- Buscar productos por precio
                3- Agregar producto
                `))} while (respuesta < 1 || respuesta > 3)
        }
        else if(continua != "SI"){
            alert("Usted a ingresado No")
            break
        }
    } while(continua != "SI")
} while((continua != "SI") && (respuesta < 1 || respuesta > 3))

switch(respuesta){
    case 1:
        buscarProducto(productos)
        break
    case 2:
        buscarProductos(productos)
        break
    case 3:
        agregarProductos(productos)
        break
    default:
        alert("Continuar")
        break
}

do {
    pregunta = prompt("Quiere sacar un prestamo para poder comprar nuestros productos. Si o No (Unicamente valido en Periferia)").toUpperCase()
    do{
    if(pregunta == "SI"){
        valorPrestamo = parseInt (prompt("Ingrese un prestamo"))
    if(isNaN(valorPrestamo)){
        alert("Por favor ingrese numeros válidos")
    }
    if(valorPrestamo === 0){
        alert("No se puede pedir un préstamo por 0")
    }
    }else if(pregunta == "NO")
        alert("Hasta luego!")
        break
    }while((isNaN(valorPrestamo)) || (valorPrestamo === 0))
    if(pregunta === "NO"){
        break
    }
}while(pregunta != "SI")

const IVA = 1.21

class Prestamo {
    constructor (valorPrestamo, IVA) {
        this.valorPrestamo = valorPrestamo;
        this.IVA = IVA;
        this.precioFinal = this.valorPrestamo * IVA;
    }
    aplicarCuotas(){
        this.cuotas = this.precioFinal / 3
        this.precioAumento = (this.precioFinal * 1.05) / 6
    }
    mostrarMensaje(){
        alert(`Cuando devuelvas el préstamo, vas a tener que pagar ${this.precioFinal} pesos argentinos, ya que aumenta por la inflación. Lo podes abonar en 3 cuotas de ${this.cuotas} sin interés o en 6 cuotas de ${this.precioAumento} con un interés del 5%, ambas con el aumento de los impuestos sobre el valor añadido`)
    }
}

const prestamo1 = new Prestamo(valorPrestamo,IVA)

prestamo1.aplicarCuotas()

if(pregunta ==  "SI"){
prestamo1.mostrarMensaje()
}

class Usuario {
    constructor(username, email, password){
        this.username = username
        this.email = email
        this.password = password
    }
}

const usuarios = []

const form = document.getElementById("idForm")
const divUsers = document.getElementById("divUsers")
const botonUsers = document.getElementById("botonUsers")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    let username = document.getElementById("idUser").value
    let email = document.getElementById("idEmail").value
    let password = document.getElementById("idPassword").value

    const usuario = new Usuario (username, email, password)
    usuarios.push(usuario)
    console.log(usuarios)

    form.reset() 
})

botonUsers.addEventListener("click", () => {
    usuarios.forEach(usuario => {
        divUsers.innerHTML += `
        <div class = "card" style = "width: 18rem; margin:3px;">
            <div class = "card-body>
                <h5 class = "card-title">${usuario.username}</h5>
                <p class = "card-text">${usuario.email}</p>
            </div>
        </div>`
    })
})

const inputColor = document.getElementById("inputColor")

inputColor.addEventListener("input", () => {
    document.body.style.backgroundColor = inputColor.value
    console.log(inputColor.value)
})