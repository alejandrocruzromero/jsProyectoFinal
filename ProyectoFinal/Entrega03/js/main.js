//'LLenamos el HTML'
let idventa = 1;
let idpartida = 0;
let iditem = 0;
let idpartidaTopping = 0;
const lblTitulo = document.querySelector("h1")
lblTitulo.innerHTML = "<center>Helados de Yogurth LA YESCI<center>"

const lblHeader = document.getElementById("Header")



lblHeader.innerHTML = "<p>Cada Helado Tiene un Costo de $20, si gustas puedes agregar uno o varios Toppings segun quieras tu helado, cada topping tiene un costo adicional</p>"
lblHeader.style = " display: flex; flex-wrap: wrap;flex-direction: row;align-content: stretch;justify-content: center;align-items: flex-end;"
    //let lblCuenta 	   = document.getElementById("cuenta")

//lblCuenta.innerHTML = "<center>AQUI VA LA CUENTA<center>"
let lblTotalHelado = document.getElementById("TotalHelado")
let lblTotalCuenta = document.getElementById("TotalCuenta")
let importeTotalHelado = 0
let importeTotalCuenta = 0
let contenido = document.querySelector("#articulos")


mostrarHTMLArray = (objeto) => {
    let html = "";
    objeto.forEach(element => {
        const { id, nombre, precio, img } = element;
        if (id == "001") {
            html += `
            <button id ='btnA${id}' style = "border:0" onclick= cargaMenu('${id}')>
                    <img src="${img}" height = 190 class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title"> ${nombre}</h5>
                        <p class="card-text">$ ${precio}</p>
                        <!-- <a href="#" class="btn btn-primary"> - </a>-->
                </button>
            `
        } else {
            html += `
            <button id ='btnA${id}' style = "border:0" onclick= agregaArticulo('${id}')>
                    <img src="${img}" height = 190 class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title"> ${nombre}</h5>
                        <p class="card-text">$ ${precio}</p>
                        <!-- <a href="#" class="btn btn-primary"> - </a>-->
                </button>
            `
        }
    });
    contenido.innerHTML = html;
}

const obtenerDatosArrayJson = () => {
    fetch('./json/productos.json')
        .then((respuesta) => {
            // console.log(respuesta);
            return respuesta.json()
        })
        .then((dato) => {
            //console.log(dato)
            mostrarHTMLArray(dato)
        })
        .catch((err) => {
            console.log("ocurrio un error:" + err);
        })
}

let btnNuevaVenta = document.querySelector("#btnNuevaVenta");
btnNuevaVenta = addEventListener('click', obtenerDatosArrayJson)



function cargaMenu() {
    btnA001.disabled = true;


    cuenta.innerHTML = "";
    lblTotalCuenta.innerHTML = "";
    if (iditem == 0) {
        localStorage.clear()
    }
    iditem++;

    divToppings.innerHTML = "<div  class = 'col-sm-12 col-lg-2' id='mensaje1'></div>";
    for (let topping of Toppings) {
        divToppings.innerHTML += `
			<div class="card" style="width: 18rem;">
			<button id ='btn${topping.id}' style = "border:0" onclick= agregaTopping('${topping.id}')>
				<img src="${topping.img}" height = 190 class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title"> ${topping.nombre}</h5>
					<p class="card-text">$ ${topping.precio}</p>
					<!-- <a href="#" class="btn btn-primary"> - </a>-->
			</button>
			</div>
			</div>`;
    }
    divToppings.innerHTML += "<div id='mensaje2'></div>";

    mensaje1.innerHTML = "Venta " + idventa + ". Agrega uno o Varios Toppings:<BR><strong><strong>";


}



const Toppings = [
    { id: "A", nombre: "A - Oreo", precio: 5, img: "https://th.bing.com/th/id/R.09909be2163ca6beffffdd06ff44c058?rik=%2bS61ws9K5Dwkaw&pid=ImgRaw&r=0" },
    { id: "B", nombre: "B - Kitkat", precio: 7, img: "https://th.bing.com/th/id/R.a1d71d6108680faaca4f7883c8137031?rik=5TIGqQkB3xrguQ&pid=ImgRaw&r=0" },
    { id: "C", nombre: "C - Brownie", precio: 8, img: "https://th.bing.com/th/id/R.3507aff34c4770cac0c515382f9b39fc?rik=w2PwLGjtu3O6Vw&pid=ImgRaw&r=0" },
    { id: "D", nombre: "D - M&m's", precio: 12, img: "https://th.bing.com/th/id/R.cfe39fc7b32532a4bed3d91bd4da03bf?rik=RSxAIiGS%2fSt9WQ&pid=ImgRaw&r=0" },
    { id: "X", nombre: "X - Sin Topping", precio: 0, img: "https://imgs.search.brave.com/q5qOVlAbAmr7t8Kjlh6dGXcCNUaByH1XG9qelLgCryg/rs:fit:459:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5H/eXhWV2stQXpNcW5F/V2hmRHNIRHBRSGFI/cCZwaWQ9QXBp" }
]




class venta {
    constructor(id, importe, descripcion) {
        this.id = id;
        this.importe = importe;
        this.descripcion = descripcion;
    }
}
const ventas = []

class Partida {
    constructor(idventa, iditem, id, topping, precio) {
        this.idventa = idventa;
        this.iditem = iditem;
        this.id = id;
        this.topping = topping;
        this.precio = precio;
    }
}

const Partidas = []
    //const Helado = 20;
let topping;
let valorTopping;
let total;
let textofinal = "";
let textofinaltotal = "";
let precioActual;
let valorTotalFinal = 0;
//comprahelado();



function agregaArticulo(idArticulo) {
    //console.log(idArticulo)
    //console.log(iditem)
    //    console.log("partidaactual:" + iditem)
    if (iditem == 0) {
        localStorage.clear()
    }
    iditem++;
    //console.log("agregaarticulo.articulo:" + idArticulo)
    if (idArticulo == '001') { //articulo helado
        TotalizaVenta(idArticulo, "HELADO");
        //alert (importeTotalCuenta)


        BloqueTotal();
        localStorage.setItem('partida' + idpartida, JSON.stringify(Partidas))
            //limpiamos el arreglo	
            // console.log("aqui borro");
            //console.log("agregaarticulo.Antes de borrar :" + Partidas)
        Partidas.splice(0, Partidas.length)
            //console.log("agregaarticulo.Despues de borrar :" + Partidas)

    } else { //articulo normal

        fetch('./json/productos.json')
            .then((respuesta) => {
                return respuesta.json()
            })
            .then((dato) => {
                dato.forEach(element => {
                    if (element.id == idArticulo) {
                        //                        console.log('precio:' + element.precio)
                        Partidas.push(new Partida(idventa, idArticulo, 0, element.nombre, Number(element.precio)))
                            //                        console.log('Se agrego el articulo:', Partidas)
                        TotalizaArticulo(idArticulo, element.precio);
                        //                        console.log('voy')
                        TotalizaVenta(idArticulo, element.nombre);
                        //                        console.log('bien')
                        BloqueTotal();
                        //                        console.log('aqui')
                        //                       console.log(Partidas)
                        // console.log(JSON.stringify(Partidas))
                        localStorage.setItem('partida' + idpartida, JSON.stringify(Partidas))
                            //Partidas.splice(0, Partidas.length)
                            //  BloqueTotal();
                            // localStorage.setItem('partida' + idpartida, JSON.stringify(Partidas))
                            //limpiamos el arreglo	
                            // console.log("aqui borro");
                            //                       console.log("agregaarticulo.Antes de borrar :" + Partidas)
                        Partidas.splice(0, Partidas.length)
                            //                       console.log("agregaarticulo.Despues de borrar :" + Partidas)
                    }
                })
            })
            .catch((err) => {
                console.log("ocurrio un error:" + err);
            })
    }

}



function agregaTopping(idTopping) {


    let busqueda = Toppings.find(nombreVAR => nombreVAR.id == idTopping.toUpperCase())
    if (busqueda != undefined) {
        idpartidaTopping++
        Partidas.push(new Partida(idventa, iditem, idpartidaTopping, busqueda.nombre, Number(busqueda.precio)))
        if (idTopping == "X") {
            let botonactivo = document.getElementById('btnX')
            botonactivo.disabled = true;
        }
    }

    TotalizaArticulo("001", 20);
    btnConfirmarHelado.disabled = false;

}




function TotalizaArticulo(idArticulo, precio) {
    //alert("totalizarArticulo.precio :" + precio)
    if (divToppings.innerHTML == "") {
        divToppings.innerHTML = "<div  class = 'col-sm-12 col-lg-2' id='mensaje1'></div>";
    }
    importeTotalHelado = precio
        // console.log("TotalizarArticulo.importeTotalHelado:" + importeTotalHelado)
    if (idArticulo == "001") {
        mensaje1.innerHTML = "Venta " + idventa + " <BR><strong>HELADO $20<strong><BR>";
    } else {
        mensaje1.innerHTML = "Venta " + idventa + " <BR><strong><strong><BR>";
    }
    //    console.table(Partidas)
    Partidas.forEach((elemento) => {
        valorTotalFinal += parseInt(elemento.precio)
        valorTopping += parseInt(elemento.precio)
            //        console.log("importeTotalHelado:", importeTotalHelado)
        if (elemento.iditem.length == 3) {
            //            console.log("ArTiCuLo")
            if (elemento.iditem == "001") {
                importeTotalHelado += parseInt(elemento.precio)
            } else {
                importeTotalHelado = parseInt(elemento.precio)
            }

        } else {
            //console.log("hElAdO")

            importeTotalHelado += parseInt(elemento.precio)
        }

        mensaje1.innerHTML += "<button  onclick='eliminaTopping(" + elemento.id + ")'>❌</button>" + elemento.topping + " $" + elemento.precio + "<br>"
    })
    mensaje1.innerHTML += "Total: $" + importeTotalHelado
}

function TotalizaVenta(id, descripcion) {
    idpartida++


    ventas.push(new venta(idpartida, Number(importeTotalHelado), descripcion))
        //    console.log("Precio :", importeTotalHelado)
        // importeTotalCuenta += importeTotalHelado;
    importeTotalHelado = 0
}


function comprahelado() {


    iniciaProceso();

}



function eliminaTopping(id) {

    swal.fire({
        title: 'Eliminar Topping?',
        text: "Una vez eliminado no se podra recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
        if (result.value) {
            let index = Partidas.findIndex(element => {
                if (element.id === id) {
                    return true;
                }
            });
            Partidas.splice(index, 1)
            TotalizaArticulo("001", 0)

            swal.fire(
                'Topping Eliminada',
                'Presiona OK para continuar',
                'success'
            )
        }
    })



}


function eliminaPartida(id) {

    swal.fire({
        title: 'Eliminar Partida?',
        text: "Una vez eliminada no se podra recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar'
    }).then((result) => {
        if (result.value) {
            // console.log('borrando ' + id + " .")
            let index = ventas.findIndex(element => {
                if (element.id === id) {
                    return true;
                }
            });
            // console.log('indice seleccionado ' + index + " .")
            ventas.splice(index, 1)
                //borramos localstorage
            localStorage.removeItem('partida' + id);
            BloqueTotal()

            swal.fire(
                'Partida Eliminada',
                'Presiona OK para continuar',
                'success'
            )
        }
    })



}



function BloqueTotal() {
    importeTotalCuenta = 0
    divToppings.innerHTML = "<div  class = 'col-sm-12 col-lg-8' id='mensaje1' >";
    //se agrega la lista de productos
    // console.table(ventas)
    ventas.forEach((elemento) => {
        mensaje1.innerHTML += "<button onclick='eliminaPartida(" + elemento.id + ")'>❌</button>" + elemento.id + " - " + elemento.descripcion + " $" + elemento.importe + "<br>"
        importeTotalCuenta += elemento.importe
            //        console.log(elemento.importe);
    })
    divToppings.innerHTML += `</div><div class = 'col-sm-12 col-lg-4'  ><B>Importe Total $ ${importeTotalCuenta}</B></div>`

    if (importeTotalCuenta != 0) {
        divToppings.innerHTML += "<div class = 'col-sm-12 col-lg-4' id ='Cobrar'><br></div>"
        let btn = document.createElement("button");
        btn.innerHTML = "Finalizar Venta";
        btn.id = "btnFinalizar"
        btn.classList = "btn"
        btn.classList = "btn-dark"
        btn.onclick = function() {
            FinalizarCompra();
        }
        Cobrar.appendChild(btn)

    }

    btnA001.disabled = false;
    btnConfirmarHelado.disabled = true;
}



function FinalizarCompra() {
    BloqueTotal()
    ventas.splice(0, ventas.length)
    divToppings.innerHTML = "<div  class = 'col-sm-12 col-lg-2' id='mensaje1'></div>";
    divToppings.innerHTML += "<p><strong>Venta " + idventa + " Finalizada </strong></p>"
    divToppings.innerHTML += "<br><p><strong>$" + importeTotalCuenta + " </strong></p>"




    swal.fire({
        title: 'Mostrar Ticket de venta?',
        text: "Para su impresion",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, mostrar'
    }).then((result) => {
        if (result.value) {

            const openedWindow = window.open(
                "ticket.html",
                "Ticket de venta",
                "width=380,height=800,resizable,scrollbars"
            );

            // swal.fire(
            //     'Ticket Abierto',
            //     'Presiona OK para continuar',
            //     'success'
            // )
        }
    })







    // openedWindow.close();

    idventa++;
    //limpiamos arreglo
    iditem = 0;
    idpartida = 0;

}