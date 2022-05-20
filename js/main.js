const navbar = document.querySelector(".navbar");
const btnMenuOpen = navbar.querySelectorAll(":scope > span")[0];
const sideBarLogo = document.querySelector(".sidebar-logo");
const btnMenuClose = sideBarLogo.querySelectorAll(":scope > span")[0];
const navLinks = document.querySelector(".nav-links");
let productosCatalogo = {};
let itemsUrl = location.pathname.split('/');

btnMenuOpen.addEventListener("click", () => {
    navLinks.style.left = "0";
});

btnMenuClose.addEventListener("click", () => {
    navLinks.style.left = "-100%";
});


/**
 * ACCIONES A REALIZAR SI EL USUARIO SE ENCUENTRA EN LA SECCIÓN 'catalogo'
 */
if (itemsUrl.indexOf("catalogo.php") !== -1) {
    /**
     * EVENTO ONLOAD
     * Al cargarse la página, se realiza una petición al servidor para obtener la lista de productos del catalogo
     * mediante AJAX, una vez obtenidos los productos, se agregan a la galería
     */
    window.onload = () => {
        let slider = document.querySelector(".slider");
        /**
         * SE CREA UNA NUEVA INSTANCIA XMLHttpRequest
         */
        let req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status !== 200) {
                    /**
                     * SI EL SERVIDOR MANDA UNA RESPUESTA DE ERROR
                     * SE MUESTRA EL MENSAJE EN LA PÁGINA
                     */
                    let resp = JSON.parse('{"message":"Los productos no pudieron ser cargados del servidor, intente nuevamente recargando la página, si el error persiste hay posiblemente un error de conectividad con el servidor."}');
                    if (slider)
                    {
                        slider.innerHTML = `<h3 class="text-danger">${ resp.message }</h3>`;
                    }
                } else {
                    /**
                     * SE RECIBEN LOS DATOS PARSEADOS A JSON Y SE GUARDAN
                     * EN LA VARIABLE productosCatalogo
                     */
                    productosCatalogo = JSON.parse(req.responseText);

                    if (slider)
                    {
                        /**
                         * SE CREAN LAS VARIABLES DE LOS CONTENDORES DE LA GALERÍA
                         * DONDE SE MOSTRARÁN LOS DATOS DE CADA PRODUCTO
                         */
                        let gallery = document.querySelector("#gallery");
                        let navigation = document.querySelector(".navigation-visibility");
                        let slides = '';
                        let slides_icons = '';
                        let cont = 0;
                        let active = '';

                        /**
                         * SE RECORRE LA LISTA DE PRODUCTO Y CADA UNO
                         * SE VA AGREGANDO A LA GALERÍA
                         */
                        for (producto of productosCatalogo)
                        {
                            cont == 0 ? active = 'active' : active = '';
                            slides += `<div class="slide ${active}">
                            <img src="/images/${producto.imagen}.png" alt="${producto.nombre}">
                            <div class="info">
                                <h2>${producto.nombre}</h2>
                                <p>${producto.descripcion}</p>
                            </div>
                        </div>`;
                            slides_icons += `<div class="slide-icon ${active}"></div>`;
                            gallery.innerHTML = slides;
                            navigation.innerHTML = slides_icons;
                            cont++;
                        }

                        const prevBtn = document.querySelector(".prev-btn");
                        const nextBtn = document.querySelector(".next-btn");

                        const galleryItems = document.querySelectorAll(".slide");
                        const slideIcons = document.querySelectorAll(".slide-icon");

                        const numberOfItems = galleryItems.length;
                        let slideNumber = 0;

                        /**
                         * SE AGREGA EL EVENTO ONCLICK AL BOTÓN NEXT
                         */
                        nextBtn.addEventListener("click", () => {
                            galleryItems.forEach((slide) => {
                                slide.classList.remove("active");
                            });
                            slideIcons.forEach((icon) => {
                                icon.classList.remove("active");
                            });

                            slideNumber++;

                            if (slideNumber > (numberOfItems - 1))
                            {
                                slideNumber = 0;
                            }

                            galleryItems[slideNumber].classList.add("active");
                            slideIcons[slideNumber].classList.add("active");
                        });

                        /**
                         * SE AGREGA EL EVENTO ONCLICK AL BOTÓN PREVIOUS
                         */
                        prevBtn.addEventListener("click", () => {
                            galleryItems.forEach((slide) => {
                                slide.classList.remove("active");
                            });
                            slideIcons.forEach((icon) => {
                                icon.classList.remove("active");
                            });

                            slideNumber--;

                            if (slideNumber < 0)
                            {
                                slideNumber = numberOfItems - 1;
                            }

                            galleryItems[slideNumber].classList.add("active");
                            slideIcons[slideNumber].classList.add("active");
                        });

                        /**
                         * SE IMPLEMENTA LA ANIMACIÓN INICIAL
                         * DE MANERA AUTOMÁTICA SIN QUE EL USUARIO
                         * HAGA CLIC EN LA GALERÍA
                         */
                        let playSlider;
                        let repeater = () => {
                            playSlider = setInterval(function(){
                                galleryItems.forEach((slide) => {
                                    slide.classList.remove("active");
                                });
                                slideIcons.forEach((icon) => {
                                    icon.classList.remove("active");
                                });

                                slideNumber++;

                                if (slideNumber > (numberOfItems - 1))
                                {
                                    slideNumber = 0;
                                }

                                galleryItems[slideNumber].classList.add("active");
                                slideIcons[slideNumber].classList.add("active");
                            }, 4000);
                        }
                        repeater();

                        /**
                         * SE AGREGA EL EVENTO ONMOUSEOVER
                         * PARA DETENER LA ANIMACIÓN CUANDO EL USUARIO
                         * COLOQUE EL MOUSE SOBRE LA GALERÍA Y SE MUESTRE
                         * LA INFORMACIÓN DEL PRODUCTO
                         */
                        slider.addEventListener("mouseover", () => {
                            let p = document.querySelector(".slide.active > .info");
                            p.style.opacity = "1";
                            clearInterval(playSlider);
                        });

                        /**
                         * SE AGREGA EL EVENTO ONMOUSEOUT
                         * PARA REINICIAR EL AUTOPLAY DE LA
                         * ANIMACIÓN DE LA GALERÍA
                         */
                        slider.addEventListener("mouseout", () => {
                            let p = document.querySelector(".slide.active > .info");
                            p.style.opacity = "0";
                            repeater();
                        });
                    }
                }
            }
        };
        req.open('POST', 'php/Catalogo.php');
        req.send();
    }
}

/**
 * ACCIONES A REALIZAR SI EL USUARIO SE ENCUENTRA EN LA SECCIÓN 'cotización'
 */
if (itemsUrl.indexOf("cotizacion.php") !== -1) {
    let f = document.querySelector("#form__cotizacion");
    let nombre = document.querySelector("#nombre");
    let feedbackNombre = document.querySelector("#feedback__nombre");
    let edad = document.querySelector("#edad");
    let feedbackEdad = document.querySelector("#feedback__edad");
    let email = document.querySelector("#email");
    let feedbackEmail = document.querySelector("#feedback__email");
    let solicitud = document.querySelector("#solicitud");
    let feedbackSolicitud = document.querySelector("#feedback__solicitud");
    let respuestaCotizacion = document.querySelector("#respuesta__cotizacion");
    let btnReset = document.querySelector('button[type="reset"]')
    let btnSubmit = document.querySelector('button[type="submit"]')

    if (nombre) {
        nombre.addEventListener("keypress", () => {
            nombre.classList.remove("border-danger");
            feedbackNombre.classList.remove("text-danger");
            feedbackNombre.innerHTML = "&nbsp;";
        })
    }

    if (edad) {
        edad.addEventListener("keypress", () => {
            edad.classList.remove("border-danger");
            feedbackEdad.classList.remove("text-danger");
            feedbackEdad.innerHTML = "&nbsp;";
        })
    }

    if (email) {
        email.addEventListener("keypress", () => {
            email.classList.remove("border-danger");
            feedbackEmail.classList.remove("text-danger");
            feedbackEmail.innerHTML = "&nbsp;";
        })
    }

    if (solicitud) {
        solicitud.addEventListener("keypress", () => {
            solicitud.classList.remove("border-danger");
            feedbackSolicitud.classList.remove("text-danger");
            feedbackSolicitud.innerHTML = "&nbsp;";
        })
    }

    if (f) {
        /**
         * Antes de realizar el submit del formulario se valida la información de los campos
         */
        f.addEventListener("submit", e => {
            e.preventDefault();

            // Si el nombre no cumple con el mínimo de longitud de caracteres
            if (nombre.value.trim().length < 10 || nombre.value.trim().length > 50) {
                nombre.classList.add("border-danger");
                feedbackNombre.classList.add("text-danger");
                feedbackNombre.innerHTML = "¡El nombre es obligatorio y debe tener entre 10 y 50 caracteres!";
                nombre.focus();
                return;
            }

            // Si la edad no es menor de 18 o mayor de 60
            if (isNaN(parseInt(edad.value)) || parseInt(edad.value) < 18 || parseInt(edad.value) > 60) {
                edad.classList.add("border-danger");
                feedbackEdad.classList.add("text-danger");
                feedbackEdad.innerHTML = "¡La edad es obligatoria, no menor de 18 ni mayor de 60 años!";
                edad.focus();
                return;
            }

            // Si el email no es válido
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(email.value.toLowerCase())) {
                email.classList.add("border-danger");
                feedbackEmail.classList.add("text-danger");
                feedbackEmail.innerHTML = "¡El email es obligatorio y debe ser una dirección válida!";
                email.focus();
                return;
            }

            // Si la solicitud es menor de 20 caracteres
            if (solicitud.value.trim().length < 20) {
                solicitud.classList.add("border-danger");
                feedbackSolicitud.classList.add("text-danger");
                feedbackSolicitud.innerHTML = "¡El texto de la solicitud es obligatorio y debe tener al menos 20 caracteres!";
                solicitud.focus();
                return;
            }

            // Se bloquean los botones de reset y submit
            btnReset.disabled = true;
            btnSubmit.disabled = true;

            /**
             * Se realiza el envio de la información por AJAX
             */
            respuestaCotizacion.innerHTML = "Espere mientras se envía la información...";
            let req = new XMLHttpRequest();
            let formData = new FormData();
            formData.append('nombre', nombre.value.trim());
            formData.append('edad', edad.value);
            formData.append('email', email.value);
            formData.append('solicitud', solicitud.value);

            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    if (req.status !== 200) {
                        if (JSON.parse(req.responseText).message) {
                            btnReset.disabled = false;
                            btnSubmit.disabled = false;
                            respuestaCotizacion.classList.add("text-danger");
                            respuestaCotizacion.innerHTML = "Respuesta del servidor: " + JSON.parse(req.responseText).message;
                            return;
                        } else {
                            btnReset.disabled = false;
                            btnSubmit.disabled = false;
                            respuestaCotizacion.classList.add("text-danger");
                            respuestaCotizacion.innerHTML = "Ocurrió un error y la información no pudo ser enviada.";
                            return;
                        }
                    } else {
                        respuestaCotizacion.classList.remove("text-danger");
                        respuestaCotizacion.innerHTML = "Respuesta del servidor: " + JSON.parse(req.responseText).message;

                        setTimeout(() => {
                            f.reset();
                            btnReset.disabled = false;
                            btnSubmit.disabled = false;
                            respuestaCotizacion.innerHTML = "";
                        }, 3000);
                    }
                }
            };
            req.open('POST', 'php/Cotizacion.php');
            req.send(formData);
        });

        /**
         * Se resetea el formulario cuando el usuario de clic en el botón de cancelar
         */
        f.addEventListener("reset", e => {
            f.reset();
        })
    }
}

/**
 * ACCIONES A REALIZAR SI EL USUARIO SE ENCUENTRA EN LA PARTE ADMINISTRATIVA, EN LA SECCIÓN 'Consultar solicitudes'
 */
if (itemsUrl.indexOf("solicitudes.php") !== -1) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            // SI NO SE OBTUVO RESPUESTA SATISFACTORIA DEL SERVIDOR
            if (req.status !== 200) {
                console.log(req.responseText);
            } else {
                let cotizaciones = JSON.parse(req.responseText);
                let t = document.querySelector("#table__solicitudes");
                if (t) {
                    for (cotizacion of cotizaciones) {
                        let fila = document.createElement("tr");

                        let col_Nombre = document.createElement("td");
                        col_Nombre.innerHTML = cotizacion.nombre;
                        fila.appendChild(col_Nombre);

                        let col_Correo = document.createElement("td");
                        col_Correo.innerHTML = cotizacion.correo;
                        fila.appendChild(col_Correo);

                        let col_Fecha = document.createElement("td");
                        col_Fecha.innerHTML = cotizacion.fecha;
                        fila.appendChild(col_Fecha);

                        let col_Descripcion = document.createElement("td");
                        col_Descripcion.innerHTML = cotizacion.descripcion;
                        fila.appendChild(col_Descripcion);

                        let col_Ver = document.createElement("td");
                        col_Ver.innerHTML = '<button type="button" class="btn btn-sm btn-info">Ver</button>';
                        fila.appendChild(col_Ver);

                        let col_Editar = document.createElement("td");
                        col_Editar.innerHTML = '<button type="button" class="btn btn-sm btn-success">Editar</button>';
                        fila.appendChild(col_Editar);

                        let col_Borrar = document.createElement("td");
                        col_Borrar.innerHTML = '<button type="button" class="btn btn-sm btn-danger">Borrar</button>';
                        fila.appendChild(col_Borrar);

                        t.tBodies.item(0).appendChild(fila);
                    }
                }
            }
        }
    };
    req.open('POST', '../php/Cotizaciones.php');
    req.send();
}

/**
 * ACCIONES A REALIZAR SI EL USUARIO SE ENCUENTRA EN LA PARTE ADMINISTRATIVA, EN LA SECCIÓN 'Productos por vender'
 */
if (itemsUrl.indexOf("productos.php") !== -1) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            // SI NO SE OBTUVO RESPUESTA SATISFACTORIA DEL SERVIDOR
            if (req.status !== 200) {
                console.log(req.responseText);
            } else {
                let productos = JSON.parse(req.responseText);
                let t = document.querySelector("#table__productos");
                if (t) {
                    let cont = 1;
                    for (producto of productos) {
                        let fila = document.createElement("tr");

                        let col_Id = document.createElement("td");
                        col_Id.innerHTML = cont;
                        fila.appendChild(col_Id);

                        let col_Clave = document.createElement("td");
                        col_Clave.innerHTML = producto.clave;
                        fila.appendChild(col_Clave);

                        let col_Nombre = document.createElement("td");
                        col_Nombre.innerHTML = producto.nombre;
                        fila.appendChild(col_Nombre);

                        let col_Precio = document.createElement("td");
                        col_Precio.innerHTML = producto.precio;
                        fila.appendChild(col_Precio);

                        let col_Ver = document.createElement("td");
                        col_Ver.innerHTML = '<button type="button" class="btn btn-sm btn-info">Ver</button>';
                        fila.appendChild(col_Ver);

                        let col_Editar = document.createElement("td");
                        col_Editar.innerHTML = '<button type="button" class="btn btn-sm btn-success">Editar</button>';
                        fila.appendChild(col_Editar);

                        let col_Borrar = document.createElement("td");
                        col_Borrar.innerHTML = '<button type="button" class="btn btn-sm btn-danger">Borrar</button>';
                        fila.appendChild(col_Borrar);

                        t.tBodies.item(0).appendChild(fila);
                        cont++;
                    }
                }
            }
        }
    };
    req.open('POST', '../php/Productos.php');
    req.send();
}
