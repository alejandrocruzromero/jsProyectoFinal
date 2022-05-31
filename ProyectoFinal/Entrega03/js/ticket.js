const ticket = document.getElementById('ticket')
let lvTotalPartida = 0;
let lvTotalVenta = 0;
let partidas = [];
let current = new Date();
let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
let dateTime = cDate + ' ' + cTime;


let linea = (localStorage.getItem(localStorage.key(0)));
partidas = JSON.parse(linea)
let lvVenta = partidas[0].idventa

let boton = document.querySelector("#boton")
boton.addEventListener("click", function() {
    if (sessionStorage.getItem("theme") == "dark") {
        lightmode();
    } else {
        darkmode();
    }

})

document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem("theme") == "dark") {
        darkmode();
    } else {
        lightmode();
    }
})


if (ticket != null) {
    ticket.style = "font-family: monospace;font-size: larger;width: 350px;"
    ticket.innerHTML =
        "<p> <center>HELADOS LA YESCI S.A. DE C.V. " +
        "<br>RFC: SMO710204MS7 " +
        "<br>AVE.GOMEZ MORIN 799-A COL.  DEL" +
        "<br>VALLE, SAN PEDRO GARZA GARCIA" +
        "<br>CP.66220 TEL.83781300 Y 83783895</center>" +
        "<br>FECHA :" + dateTime +
        "<br>CAJA: CAJA01  VENTA:" + lvVenta +
        "<br>VENDEDOR: Pepe Pecas</p>" +
        "<p style ='text-align-last: justify;'>----------------------------------------" +
        "<br>DESCRIPCION                     IMPORTE" +
        "<br>----------------------------------------"
    for (var i = 0, len = localStorage.length; i < len; ++i) {



        let linea = (localStorage.getItem(localStorage.key(i)));
        // console.log(linea)
        partidas = JSON.parse(linea)
        let lv_titulo = 0
        for (var n = 0, len2 = partidas.length; n < len2; ++n) {

            if (partidas[n].iditem.length != 3) {

                if (lv_titulo == 0) {
                    lvTotalPartida = 20;
                    ticket.innerHTML += "<p> BASE DE HELADO. $20.00"
                    ticket.innerHTML += "<ul>"
                    lv_titulo = 1
                }
                ticket.innerHTML += "<li> " + partidas[n].topping + " - $" + partidas[n].precio + ".00" + "</li> "
                    // console.log(partidas[n].precio)
                lvTotalPartida = lvTotalPartida + partidas[n].precio
                    // console.log(lvTotalPartida)
            } else {
                lvTotalPartida = 0;
                lvTotalPartida = 0;
                lv_titulo = 0
                ticket.innerHTML += "<li> " + partidas[n].topping + " - $" + partidas[n].precio + ".00" + "</li> "
                lvTotalPartida += partidas[n].precio

            }


        }

        ticket.innerHTML += "</ul><p style='text-align: end'> $" + lvTotalPartida + ".00</p><hr>"
        lvTotalVenta += lvTotalPartida;

        // for (var n = 0, len2 = partidas.length; n < len2; ++n) {
        //     ticket.innerHTML += "<li> " + partidas[n].topping + " - $" + partidas[n].precio + ".00" + "</li> "
        //     lvTotalPartida += partidas[n].precio
        // }
        // ticket.innerHTML += "</ul><p style='text-align: end'> $" + lvTotalPartida + ".00</p><hr>"
        // lvTotalVenta += lvTotalPartida;
    }
    ticket.innerHTML +=
        "<p style ='text-align-last: end'>IMPORTE TOTAL:                 $" + lvTotalVenta + ".00" +
        "<br>----------------------------------------</p>" +
        "<center>Gracias Por Su Compra </center>"
}



function darkmode() {
    let body = document.querySelector("body")
    body.style.backgroundColor = "#222222"
    let parrafos = document.querySelector("#parrafos")
    parrafos.style.color = "white"

    sessionStorage.setItem("theme", "dark")
}

function lightmode() {
    let body = document.querySelector("body")
    body.style.backgroundColor = "white"
    let parrafos = document.querySelector("#parrafos")
    parrafos.style.color = "#222222"

    sessionStorage.setItem("theme", "light")
}