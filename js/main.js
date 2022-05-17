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
if (itemsUrl.indexOf("catalogo.php") !== -1)
{
    let req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        if (req.readyState === 4)
        {
            // SI NO SE OBTUVO RESPUESTA SATISFACTORIA DEL SERVIDOR
            if(req.status !== 200)
            {
                let resp = JSON.parse('{"message":"Los productos no pudieron ser cargados del servidor, intente nuevamente recargando la página, si el error persiste hay posiblemente un error de conectividad con el servidor."}');
                cargarProductos(resp);
            }
            else
            {
                // Primero se convierte la respuesta del servidor en formato JSON
                let res = JSON.parse(req.responseText);
                // SE pasa después a la función 'cargarProductos' como prámetro
                cargarProductos(res);
            }
        }
    };
    req.open('POST', 'php/Catalogo.php');
    req.send();
}

/**
 * ACCIONES A REALIZAR SI EL USUARIO SE ENCUENTRA EN LA SECCIÓN 'cotización'
 */
if (itemsUrl.indexOf("cotizacion.php") !== -1)
{
    let f = document.querySelector("#form__cotizacion");
    let nombre              = document.querySelector("#nombre");
    let feedbackNombre      = document.querySelector("#feedback__nombre");
    let edad                = document.querySelector("#edad");
    let feedbackEdad        = document.querySelector("#feedback__edad");
    let email               = document.querySelector("#email");
    let feedbackEmail       = document.querySelector("#feedback__email");
    let solicitud           = document.querySelector("#solicitud");
    let feedbackSolicitud   = document.querySelector("#feedback__solicitud");
    let respuestaCotizacion = document.querySelector("#respuesta__cotizacion");
    let btnReset            = document.querySelector('button[type="reset"]')
    let btnSubmit           = document.querySelector('button[type="submit"]')

    if (nombre)
    {
        nombre.addEventListener("keypress", () => {
            nombre.classList.remove("border-danger");
            feedbackNombre.classList.remove("text-danger");
            feedbackNombre.innerHTML = "&nbsp;";
        })
    }

    if (edad)
    {
        edad.addEventListener("keypress", () => {
            edad.classList.remove("border-danger");
            feedbackEdad.classList.remove("text-danger");
            feedbackEdad.innerHTML = "&nbsp;";
        })
    }

    if (email)
    {
        email.addEventListener("keypress", () => {
            email.classList.remove("border-danger");
            feedbackEmail.classList.remove("text-danger");
            feedbackEmail.innerHTML = "&nbsp;";
        })
    }

    if (solicitud)
    {
        solicitud.addEventListener("keypress", () => {
            solicitud.classList.remove("border-danger");
            feedbackSolicitud.classList.remove("text-danger");
            feedbackSolicitud.innerHTML = "&nbsp;";
        })
    }

    if (f)
    {
        /**
         * Antes de realizar el submit del formulario se valida la información de los campos
         */
        f.addEventListener("submit", e => {
            e.preventDefault();

            // Si el nombre no cumple con el mínimo de longitud de caracteres
            if (nombre.value.trim().length < 10 || nombre.value.trim().length > 50)
            {
                nombre.classList.add("border-danger");
                feedbackNombre.classList.add("text-danger");
                feedbackNombre.innerHTML = "¡El nombre es obligatorio y debe tener entre 10 y 50 caracteres!";
                nombre.focus();
                return;
            }

            // Si la edad no es menor de 18 o mayor de 60
            if (isNaN(parseInt(edad.value)) || parseInt(edad.value) < 18 || parseInt(edad.value)  > 60)
            {
                edad.classList.add("border-danger");
                feedbackEdad.classList.add("text-danger");
                feedbackEdad.innerHTML = "¡La edad es obligatoria, no menor de 18 ni mayor de 60 años!";
                edad.focus();
                return;
            }

            // Si el email no es válido
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ( !re.test(email.value.toLowerCase()) )
            {
                email.classList.add("border-danger");
                feedbackEmail.classList.add("text-danger");
                feedbackEmail.innerHTML = "¡El email es obligatorio y debe ser una dirección válida!";
                email.focus();
                return;
            }

            // Si la solicitud es menor de 20 caracteres
            if (solicitud.value.trim().length < 20)
            {
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

            req.onreadystatechange = function()
            {
                if (req.readyState === 4)
                {
                    if(req.status !== 200)
                    {
                        if (JSON.parse(req.responseText).message)
                        {
                            btnReset.disabled = false;
                            btnSubmit.disabled = false;
                            respuestaCotizacion.classList.add("text-danger");
                            respuestaCotizacion.innerHTML = "Respuesta del servidor: " + JSON.parse(req.responseText).message;
                            return;
                        }
                        else
                        {
                            btnReset.disabled = false;
                            btnSubmit.disabled = false;
                            respuestaCotizacion.classList.add("text-danger");
                            respuestaCotizacion.innerHTML = "Ocurrió un error y la información no pudo ser enviada.";
                            return;
                        }
                    }
                    else
                    {
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
if (itemsUrl.indexOf("solicitudes.php") !== -1)
{
    let req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        if (req.readyState === 4)
        {
            // SI NO SE OBTUVO RESPUESTA SATISFACTORIA DEL SERVIDOR
            if(req.status !== 200)
            {
                console.log(req.responseText);
            }
            else
            {
                let cotizaciones = JSON.parse(req.responseText);
                let t = document.querySelector("#table__solicitudes");
                if (t)
                {
                    for (cotizacion of cotizaciones)
                    {
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
if (itemsUrl.indexOf("productos.php") !== -1)
{
    let req = new XMLHttpRequest();
    req.onreadystatechange = function()
    {
        if (req.readyState === 4)
        {
            // SI NO SE OBTUVO RESPUESTA SATISFACTORIA DEL SERVIDOR
            if(req.status !== 200)
            {
                console.log(req.responseText);
            }
            else
            {
                let productos = JSON.parse(req.responseText);
                let t = document.querySelector("#table__productos");
                if (t)
                {
                    let cont = 1;
                    for (producto of productos)
                    {
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


/**
 * Función para llenar el select 'listaProductos' con la lista de productos almacenada en la base de datos
 * @param param - corresponde a la respuesta del servidor en formato JSON
 */
function cargarProductos(params)
{
    // Se selecciona el contenedor de la tabla de la lista de productos
    let container = document.querySelector("#container__table-catalogo");

    // Se selecciona el elemento 'select' del DOM del documento y se le añade el primer option
    let selectListaProductos = document.querySelector("#listaProductos");

    if (selectListaProductos)
    {
        // Si la respuesta del servidor incluye un mensaje significa que hubo un error al obtener el listado de productos
        if (params.message)
        {
            // Se muestra el error en el contenedor de la tabla
            container.innerHTML = productosCatalogo.message;
        }
        else
        {
            // Se cargan los productos en la variable productosCatalogo
            productosCatalogo = params;

            // Se crea el option por defecto y se agrega al select
            let nOption = document.createElement("option");
            nOption.value = "TODOS";
            nOption.text = "Ver todos los productos";
            selectListaProductos.appendChild(nOption);

            // Se recorre el listado de productos
            for (let prod of params)
            {
                // Se crean los demás options y se agregan al select
                let nOption = document.createElement("option");
                nOption.value = prod.clave;
                nOption.text = prod.nombre;
                selectListaProductos.appendChild(nOption);
            }

            // Se agrega el evento 'click' al botón para mostrar la tabla de los productos del catalogo
            let btn = document.querySelector("#btnMostrarTablaCatalogo");
            btn.addEventListener("click", () => {
                // Primero se vacía el contenedor
                container.innerHTML = '';

                // Se crea la tabla
                let t = document.createElement("table");
                t.classList.add("table", "table-bordered");

                // Se crean los encabezados de la tabla
                let trH = document.createElement("tr");
                let thImg = document.createElement("th");
                thImg.innerHTML = "Img";
                trH.appendChild(thImg);
                let thClave = document.createElement("th");
                thClave.innerHTML = "Clave";
                trH.appendChild(thClave);
                let thNombre = document.createElement("th");
                thNombre.innerHTML = "Nombre";
                trH.appendChild(thNombre);
                let thDesc = document.createElement("th");
                thDesc.innerHTML = "Descripción";
                trH.appendChild(thDesc);
                let thPres = document.createElement("th");
                thPres.innerHTML = "Presentación";
                trH.appendChild(thPres);
                let thPrec = document.createElement("th");
                thPrec.innerHTML = "Precio m<sup>2</sup>";
                trH.appendChild(thPrec);

                // Se añaden los encabezados a la tabla
                t.appendChild(trH);

                // Se obtiene el valor seleccionado del select
                if(selectListaProductos.value == "TODOS")
                {
                    for (prod of productosCatalogo)
                    {
                        // Se crean las filas de la tabla
                        let trB = document.createElement("tr");
                        let tdImg = document.createElement("td");
                        tdImg.innerHTML = "<img src='"+ location.origin +"/images/"+ prod.imagen +".png' />";
                        trB.appendChild(tdImg);
                        let tdClave = document.createElement("td");
                        tdClave.innerHTML = prod.clave;
                        trB.appendChild(tdClave);
                        let tdNombre = document.createElement("td");
                        tdNombre.innerHTML = prod.nombre;
                        trB.appendChild(tdNombre);
                        let tdDesc = document.createElement("td");
                        tdDesc.innerHTML = prod.descripcion;
                        trB.appendChild(tdDesc);
                        let tdPres = document.createElement("td");
                        tdPres.innerHTML = prod.presentacion;
                        trB.appendChild(tdPres);
                        let tdPrec = document.createElement("td");
                        tdPrec.innerHTML = "$ "+ prod.precio;
                        trB.appendChild(tdPrec);
                        t.appendChild(trB);
                    }
                }
                else
                {
                    // Se busca el producto seleccionado en la lista de productos
                    let producto = productosCatalogo.find(x => x.clave == selectListaProductos.value);

                    // Se crea la fila de la tabla
                    let trB = document.createElement("tr");
                    let tdImg = document.createElement("td");
                    tdImg.innerHTML = "<img src='"+ location.origin +"/images/"+ producto.imagen +".png' />";
                    trB.appendChild(tdImg);
                    let tdClave = document.createElement("td");
                    tdClave.innerHTML = producto.clave;
                    trB.appendChild(tdClave);
                    let tdNombre = document.createElement("td");
                    tdNombre.innerHTML = producto.nombre;
                    trB.appendChild(tdNombre);
                    let tdDesc = document.createElement("td");
                    tdDesc.innerHTML = producto.descripcion;
                    trB.appendChild(tdDesc);
                    let tdPres = document.createElement("td");
                    tdPres.innerHTML = producto.presentacion;
                    trB.appendChild(tdPres);
                    let tdPrec = document.createElement("td");
                    tdPrec.innerHTML = "$ "+ producto.precio;
                    trB.appendChild(tdPrec);
                    t.appendChild(trB);
                }
                // Se añade la tabla al contenedor
                container.appendChild(t);
            })
        }
    }
}
