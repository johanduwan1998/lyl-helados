/* =========================================================
   LYL HELADOS
   JAVASCRIPT
   CALCULADORA TIPO CARRITO
========================================================= */


/* =========================================================
   MENÚ MÓVIL
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");

        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    document.querySelectorAll(".nav a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================================
   CARRITO
========================================================= */

let carrito = [];


/* =========================================================
   FORMATO DE MONEDA
========================================================= */

function formatoMoneda(valor) {

    return new Intl.NumberFormat("es-CO", {

        style: "currency",

        currency: "COP",

        maximumFractionDigits: 0

    }).format(valor);

}


/* =========================================================
   SABER SI UN SABOR TIENE CHAMOY
========================================================= */

function tieneChamoy(sabor) {

    return sabor.toLowerCase().includes("chamoy");

}


/* =========================================================
   OBTENER PRECIO BASE SEGÚN TOTAL DE HELADOS
========================================================= */

function obtenerPrecioBase(cantidad) {

    if (cantidad >= 100) {

        return 1000;

    }

    if (cantidad >= 80) {

        return 1200;

    }

    if (cantidad >= 50) {

        return 1500;

    }

    return 2000;

}


/* =========================================================
   OBTENER PRECIO DE UN SABOR
========================================================= */

function obtenerPrecioProducto(sabor, cantidadTotal) {

    const precioBase =
        obtenerPrecioBase(cantidadTotal);


    if (tieneChamoy(sabor)) {

        return precioBase + 100;

    }


    return precioBase;

}


/* =========================================================
   AGREGAR PRODUCTO AL CARRITO
========================================================= */

function agregarProducto() {

    const saborInput =
        document.getElementById("sabor");

    const cantidadInput =
        document.getElementById("cantidad");


    const sabor =
        saborInput.value;


    const cantidad =
        parseInt(cantidadInput.value);


    if (isNaN(cantidad) || cantidad < 1) {

        alert(
            "Por favor, ingresa una cantidad válida."
        );

        cantidadInput.focus();

        return;

    }


    /* Buscar si el sabor ya existe */

    const productoExistente =
        carrito.find(
            producto => producto.sabor === sabor
        );


    if (productoExistente) {

        productoExistente.cantidad += cantidad;

    } else {

        carrito.push({

            sabor: sabor,

            cantidad: cantidad

        });

    }


    /* Reiniciar cantidad */

    cantidadInput.value = 1;


    actualizarCarrito();

}


/* =========================================================
   ELIMINAR PRODUCTO
========================================================= */

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();

}


/* =========================================================
   CAMBIAR CANTIDAD
========================================================= */

function cambiarCantidad(index, nuevaCantidad) {

    nuevaCantidad =
        parseInt(nuevaCantidad);


    if (
        isNaN(nuevaCantidad) ||
        nuevaCantidad < 1
    ) {

        carrito[index].cantidad = 1;

    } else {

        carrito[index].cantidad =
            nuevaCantidad;

    }


    actualizarCarrito();

}


/* =========================================================
   CALCULAR TOTAL DE HELADOS
========================================================= */

function calcularTotalCantidad() {

    return carrito.reduce(

        (total, producto) => {

            return total + producto.cantidad;

        },

        0

    );

}


/* =========================================================
   CALCULAR TOTAL DEL PEDIDO
========================================================= */

function calcularTotalPedido() {

    const totalCantidad =
        calcularTotalCantidad();


    if (totalCantidad === 0) {

        return 0;

    }


    let total = 0;


    carrito.forEach(producto => {

        const precio =
            obtenerPrecioProducto(
                producto.sabor,
                totalCantidad
            );


        total +=
            producto.cantidad *
            precio;

    });


    return total;

}


/* =========================================================
   ACTUALIZAR CARRITO
========================================================= */

function actualizarCarrito() {

    const container =
        document.getElementById("cartContainer");


    const totalCantidad =
        calcularTotalCantidad();


    const precioBase =
        totalCantidad > 0
            ? obtenerPrecioBase(totalCantidad)
            : 0;


    const totalPedido =
        calcularTotalPedido();


    /* =========================
       CARRITO VACÍO
    ========================= */

    if (carrito.length === 0) {

        container.innerHTML = `

            <div class="cart-empty">

                <i class="fas fa-basket-shopping"></i>

                <p>
                    Tu pedido está vacío
                </p>

                <small>
                    Agrega sabores para comenzar.
                </small>

            </div>

        `;

    }


    /* =========================
       MOSTRAR PRODUCTOS
    ========================= */

    else {

        container.innerHTML = `

            <div class="cart-title">

                <span>
                    Tu pedido
                </span>

                <strong>
                    ${carrito.length}
                    ${carrito.length === 1
                        ? "sabor"
                        : "sabores"}
                </strong>

            </div>


            <div class="cart-products">

                ${carrito.map((producto, index) => {

                    const precioProducto =
                        obtenerPrecioProducto(
                            producto.sabor,
                            totalCantidad
                        );


                    return `

                        <div class="cart-product">

                            <div class="cart-product-info">

                                <strong>
                                    ${producto.sabor}
                                </strong>

                                <span>
                                    ${formatoMoneda(precioProducto)}
                                    por unidad
                                </span>

                            </div>


                            <div class="cart-product-actions">

                                <button
                                    type="button"
                                    onclick="cambiarCantidad(
                                        ${index},
                                        ${producto.cantidad - 1}
                                    )"
                                    ${producto.cantidad <= 1
                                        ? "disabled"
                                        : ""}
                                    aria-label="Disminuir cantidad">

                                    <i class="fas fa-minus"></i>

                                </button>


                                <span>
                                    ${producto.cantidad}
                                </span>


                                <button
                                    type="button"
                                    onclick="cambiarCantidad(
                                        ${index},
                                        ${producto.cantidad + 1}
                                    )"
                                    aria-label="Aumentar cantidad">

                                    <i class="fas fa-plus"></i>

                                </button>


                                <button
                                    type="button"
                                    class="delete-product"
                                    onclick="eliminarProducto(${index})"
                                    aria-label="Eliminar producto">

                                    <i class="fas fa-trash"></i>

                                </button>

                            </div>

                        </div>

                    `;

                }).join("")}

            </div>

        `;

    }


    /* =========================
       ACTUALIZAR RESUMEN
    ========================= */

    document.getElementById(
        "totalCantidad"
    ).textContent =
        totalCantidad;


    document.getElementById(
        "precioUnitario"
    ).textContent =
        totalCantidad > 0
            ? formatoMoneda(precioBase)
            : formatoMoneda(0);


    document.getElementById(
        "totalPedido"
    ).textContent =
        formatoMoneda(totalPedido);

}


/* =========================================================
   ENVIAR PEDIDO POR WHATSAPP
========================================================= */

function enviarPedidoWhatsApp() {

    const nombreInput =
        document.getElementById("nombreCliente");


    const lugarInput =
        document.getElementById("lugarCliente");


    const nombre =
        nombreInput.value.trim();


    const lugar =
        lugarInput.value.trim();


    /* =========================
       VALIDAR CARRITO
    ========================= */

    if (carrito.length === 0) {

        alert(
            "Agrega al menos un sabor a tu pedido."
        );

        return;

    }


    /* =========================
       VALIDAR NOMBRE
    ========================= */

    if (nombre === "") {

        alert(
            "Por favor, escribe tu nombre."
        );

        nombreInput.focus();

        return;

    }


    /* =========================
       VALIDAR LUGAR
    ========================= */

    if (lugar === "") {

        alert(
            "Por favor, indica el lugar de entrega."
        );

        lugarInput.focus();

        return;

    }


    /* =========================
       CALCULAR PEDIDO
    ========================= */

    const totalCantidad =
        calcularTotalCantidad();


    const precioBase =
        obtenerPrecioBase(
            totalCantidad
        );


    const totalPedido =
        calcularTotalPedido();


    /* =========================
       CREAR LISTA DE PRODUCTOS
    ========================= */

    let listaProductos = "";


    carrito.forEach(producto => {

        const precioProducto =
            obtenerPrecioProducto(
                producto.sabor,
                totalCantidad
            );


        const subtotal =
            producto.cantidad *
            precioProducto;


        listaProductos +=

`🍦 ${producto.sabor}: ${producto.cantidad} unidades × ${formatoMoneda(precioProducto)} = ${formatoMoneda(subtotal)}
`;

    });


    /* =========================
       CREAR MENSAJE
    ========================= */

    const mensaje =

`🍦 *PEDIDO LYL*

👤 Nombre: ${nombre}

📍 Lugar: ${lugar}

📋 *DETALLE DEL PEDIDO*

${listaProductos}
📦 *Total de helados:* ${totalCantidad}

💰 *Precio base por helado:* ${formatoMoneda(precioBase)}

💵 *TOTAL: ${formatoMoneda(totalPedido)}*

Quiero realizar este pedido. ¡Gracias!`;


    /* =========================
       WHATSAPP
    ========================= */

    const numeroWhatsApp =
        "573118920775";


    const url =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;


    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   INICIALIZAR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        actualizarCarrito();

    }
);
