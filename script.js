/* ==========================================
   CONFIGURACIÓN
========================================== */

// WhatsApp del negocio
// Formato: código de país + número, sin +, espacios ni guiones.
const WHATSAPP = "573227403563";


/* ==========================================
   MENÚ MOBILE
========================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}


document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

    });

});


/* ==========================================
   NAVBAR
========================================== */

window.addEventListener("scroll", () => {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 5px 25px rgba(0,0,0,0.10)";

    } else {

        navbar.style.boxShadow =
            "0 2px 15px rgba(0,0,0,0.05)";

    }

});


/* ==========================================
   CARRUSEL
========================================== */

const carouselTrack =
    document.getElementById("carouselTrack");

const carouselSlides =
    document.querySelectorAll(".carousel-slide");

// IMPORTANTE:
// Estos IDs coinciden con tu index.html
const carouselPrev =
    document.getElementById("prevBtn");

const carouselNext =
    document.getElementById("nextBtn");

const carouselDots =
    document.getElementById("carouselDots");


let currentSlide = 0;
let carouselInterval;


/*
    Verificar que exista el carrusel
*/

if (
    carouselTrack &&
    carouselSlides.length > 0 &&
    carouselDots
) {

    /*
        Crear los puntos del carrusel
    */

    carouselSlides.forEach((slide, index) => {

        const dot = document.createElement("button");

        dot.classList.add("carousel-dot");

        dot.setAttribute(
            "aria-label",
            `Ir a la imagen ${index + 1}`
        );

        if (index === 0) {

            dot.classList.add("active");

        }

        dot.addEventListener("click", () => {

            currentSlide = index;

            updateCarousel();

            restartCarousel();

        });

        carouselDots.appendChild(dot);

    });


    /*
        Obtener los puntos después de crearlos
    */

    const dots =
        document.querySelectorAll(".carousel-dot");


    /*
        ACTUALIZAR CARRUSEL
    */

    function updateCarousel() {

        carouselTrack.style.transform =
            `translateX(-${currentSlide * 100}%)`;


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentSlide
            );

        });

    }


    /*
        SIGUIENTE IMAGEN
    */

    function nextSlide() {

        currentSlide++;

        if (
            currentSlide >= carouselSlides.length
        ) {

            currentSlide = 0;

        }

        updateCarousel();

    }


    /*
        IMAGEN ANTERIOR
    */

    function previousSlide() {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide =
                carouselSlides.length - 1;

        }

        updateCarousel();

    }


    /*
        BOTÓN DERECHA
    */

    if (carouselNext) {

        carouselNext.addEventListener(
            "click",
            () => {

                nextSlide();

                restartCarousel();

            }
        );

    }


    /*
        BOTÓN IZQUIERDA
    */

    if (carouselPrev) {

        carouselPrev.addEventListener(
            "click",
            () => {

                previousSlide();

                restartCarousel();

            }
        );

    }


    /*
        CARRUSEL AUTOMÁTICO
    */

    function startCarousel() {

        carouselInterval = setInterval(
            nextSlide,
            5000
        );

    }


    /*
        REINICIAR AUTOMÁTICO
    */

    function restartCarousel() {

        clearInterval(carouselInterval);

        startCarousel();

    }


    /*
        Iniciar carrusel
    */

    startCarousel();

}


/* ==========================================
   WHATSAPP
========================================== */

function abrirWhatsApp(mensaje) {

    const url =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

}


/* ==========================================
   PEDIDO DE PRODUCTO
========================================== */

function pedirProducto(producto) {

    const mensaje =
        `Hola 👋, estoy interesado en pedir ${producto}. ¿Me pueden dar información sobre disponibilidad y entrega?`;

    abrirWhatsApp(mensaje);

}


/* ==========================================
   PEDIDO GENERAL
========================================== */

function hacerPedidoGeneral() {

    const mensaje =
        "Hola 👋, quiero hacer un pedido de helados. ¿Me pueden compartir la información disponible?";

    abrirWhatsApp(mensaje);

}


/* ==========================================
   CONTACTO MAYORISTA
========================================== */

function contactarMayorista() {

    const mensaje =
        "Hola 👋, estoy interesado en comprar sus helados al por mayor para venderlos. Quisiera conocer los precios, cantidades mínimas y condiciones para revendedores.";

    abrirWhatsApp(mensaje);

}


/* ==========================================
   CONTACTO WHATSAPP
========================================== */

function contactarWhatsApp() {

    const mensaje =
        "Hola 👋, quiero información sobre sus helados.";

    abrirWhatsApp(mensaje);

}


/* ==========================================
   BOTÓN WHATSAPP FLOTANTE
========================================== */

/*
    En tu HTML actual el botón flotante
    usa onclick="contactarWhatsApp()".

    Por eso no necesitamos agregar otro
    evento aquí.
*/

const whatsappFloat =
    document.getElementById("whatsappFloat");

if (whatsappFloat) {

    whatsappFloat.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            contactarWhatsApp();

        }
    );

}


/* ==========================================
   FORMATO MONEDA
========================================== */

function formatoMoneda(valor) {

    return new Intl.NumberFormat(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }
    ).format(valor);

}


/* ==========================================
   AÑO AUTOMÁTICO
========================================== */

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* ==========================================
   CALCULADORA DE PEDIDOS MAYORISTAS
========================================== */

/*
    PRECIOS MAYORISTAS

    20 - 39   = $1.600
    40 - 79   = $1.500
    80 - 149  = $1.400
    150+      = $1.300
*/


const pedidoNombre =
    document.getElementById("pedidoNombre");

const pedidoCantidad =
    document.getElementById("pedidoCantidad");

const pedidoLugar =
    document.getElementById("pedidoLugar");

const pedidoWhatsapp =
    document.getElementById("pedidoWhatsapp");

const pedidoCotizacion =
    document.getElementById("pedidoCotizacion");

const pedidoError =
    document.getElementById("pedidoError");

const pedidoResultadoCantidad =
    document.getElementById(
        "pedidoResultadoCantidad"
    );

const pedidoResultadoPrecio =
    document.getElementById(
        "pedidoResultadoPrecio"
    );

const pedidoResultadoTotal =
    document.getElementById(
        "pedidoResultadoTotal"
    );


/* ==========================================
   OBTENER PRECIO MAYORISTA
========================================== */

function obtenerPrecioMayorista(cantidad) {

    if (
        cantidad >= 20 &&
        cantidad <= 39
    ) {

        return 1600;

    }

    if (
        cantidad >= 40 &&
        cantidad <= 79
    ) {

        return 1500;

    }

    if (
        cantidad >= 80 &&
        cantidad <= 149
    ) {

        return 1400;

    }

    if (cantidad >= 150) {

        return 1300;

    }

    return null;

}


/* ==========================================
   MOSTRAR ERROR
========================================== */

function mostrarErrorPedido(mensaje) {

    if (!pedidoError) return;

    pedidoError.textContent =
        mensaje;

    pedidoError.classList.add(
        "active"
    );

}


/* ==========================================
   OCULTAR ERROR
========================================== */

function ocultarErrorPedido() {

    if (!pedidoError) return;

    pedidoError.textContent =
        "";

    pedidoError.classList.remove(
        "active"
    );

}


/* ==========================================
   ACTUALIZAR COTIZACIÓN
========================================== */

function actualizarCotizacionPedido() {

    if (
        !pedidoCantidad ||
        !pedidoCotizacion
    ) {
        return;
    }

    const cantidad =
        Number(pedidoCantidad.value);


    /*
        Si no hay cantidad válida,
        ocultamos la cotización.
    */

    if (
        !Number.isInteger(cantidad) ||
        cantidad < 20
    ) {

        pedidoCotizacion.classList.remove(
            "active"
        );

        return;

    }


    /*
        Obtener precio
    */

    const precio =
        obtenerPrecioMayorista(
            cantidad
        );


    if (!precio) {

        pedidoCotizacion.classList.remove(
            "active"
        );

        return;

    }


    /*
        Calcular total
    */

    const total =
        cantidad * precio;


    /*
        Mostrar cantidad
    */

    if (pedidoResultadoCantidad) {

        pedidoResultadoCantidad.textContent =
            `${cantidad} helados`;

    }


    /*
        Mostrar precio unitario
    */

    if (pedidoResultadoPrecio) {

        pedidoResultadoPrecio.textContent =
            formatoMoneda(precio);

    }


    /*
        Mostrar total
    */

    if (pedidoResultadoTotal) {

        pedidoResultadoTotal.textContent =
            formatoMoneda(total);

    }


    /*
        Mostrar cotización
    */

    pedidoCotizacion.classList.add(
        "active"
    );


    /*
        Ocultar error
    */

    ocultarErrorPedido();

}


/* ==========================================
   ACTUALIZAR AL ESCRIBIR CANTIDAD
========================================== */

if (pedidoCantidad) {

    pedidoCantidad.addEventListener(
        "input",
        actualizarCotizacionPedido
    );

}


/* ==========================================
   ENVIAR PEDIDO POR WHATSAPP
========================================== */

if (pedidoWhatsapp) {

    pedidoWhatsapp.addEventListener(
        "click",
        function() {

            ocultarErrorPedido();


            /*
                VALIDAR NOMBRE
            */

            const nombre =
                pedidoNombre
                    ? pedidoNombre.value.trim()
                    : "";


            if (!nombre) {

                mostrarErrorPedido(
                    "Por favor escribe tu nombre."
                );

                if (pedidoNombre) {

                    pedidoNombre.focus();

                }

                return;

            }


            /*
                VALIDAR CANTIDAD
            */

            const cantidad =
                pedidoCantidad
                    ? Number(pedidoCantidad.value)
                    : 0;


            if (
                !Number.isInteger(cantidad) ||
                cantidad < 20
            ) {

                mostrarErrorPedido(
                    "El pedido mínimo es de 20 helados."
                );

                if (pedidoCantidad) {

                    pedidoCantidad.focus();

                }

                return;

            }


            /*
                OBTENER PRECIO
            */

            const precio =
                obtenerPrecioMayorista(
                    cantidad
                );


            if (!precio) {

                mostrarErrorPedido(
                    "No fue posible calcular el precio."
                );

                return;

            }


            /*
                VALIDAR LUGAR
            */

            const lugar =
                pedidoLugar
                    ? pedidoLugar.value.trim()
                    : "";


            if (!lugar) {

                mostrarErrorPedido(
                    "Por favor escribe el lugar de entrega."
                );

                if (pedidoLugar) {

                    pedidoLugar.focus();

                }

                return;

            }


            /*
                CALCULAR TOTAL
            */

            const total =
                cantidad * precio;


            /*
                MENSAJE FINAL PARA WHATSAPP

                Solamente contiene:

                - Nombre
                - Cantidad
                - Precio unitario
                - Total
                - Lugar de entrega
            */

            const mensaje =
`🍦 *PEDIDO DE HELADOS*

👤 Nombre: ${nombre}

📦 Cantidad: ${cantidad} helados

💰 Precio unitario: ${formatoMoneda(precio)}

💵 Total: ${formatoMoneda(total)}

📍 Lugar de entrega: ${lugar}`;


            /*
                ABRIR WHATSAPP
            */

            abrirWhatsApp(mensaje);

        }
    );

}


/* ==========================================
   INICIALIZAR COTIZACIÓN
========================================== */

if (pedidoCantidad) {

    actualizarCotizacionPedido();

}