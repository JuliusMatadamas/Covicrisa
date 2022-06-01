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
                            <img src="/images/${producto.imagen}" alt="${producto.nombre}">
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
 * ACCIONES A REALIZAR SI EL USUARIO SE ENCUENTRA EN LA PARTE ADMINISTRATIVA, EN LA SECCIÓN 'Productos por vender'
 */
if (itemsUrl.indexOf("productos.php") !== -1) {
    let productos = {};
    let proveedores = {};
    let formNuevoProducto = document.querySelector("#form__nuevo-producto");
    let clave = document.querySelector("#clave");
    let nombre = document.querySelector("#nombre");
    let descripcion = document.querySelector("#descripcion");
    let presentacion = document.querySelector("#presentacion");
    let precio = document.querySelector("#precio");
    let imagen = document.querySelector("#imagen");
    let proveedorId = document.querySelector("#proveedor_id");
    let formInfo = document.querySelector("#form__info");

    // AL CARGARSE EL DOCUMENTO SE LLAMA A LA FUNCIÓN cargarProductos
    cargarProductos();
    // FUNCIÓN PARA CARGA DE LOS PRODUCTOS DEL CATALOGO DE LA BASE DE DATOS
    function cargarProductos()
    {
        let req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                // SI NO SE OBTUVO RESPUESTA SATISFACTORIA DEL SERVIDOR
                if (req.status !== 200) {
                    console.log(req.responseText);
                } else {
                    productos = JSON.parse(req.responseText);
                    let t = document.querySelector("#table__productos");
                    t.children[1].textContent = "";
                    if (t) {
                        t.childNodes[3].textContent = "";
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
                            col_Ver.innerHTML = '<button type="button" onclick="verProducto('+ producto.id +')" class="btn btn-sm btn-info">Ver</button>';
                            fila.appendChild(col_Ver);
                            let col_Editar = document.createElement("td");
                            col_Editar.innerHTML = '<button type="button" onclick="editarProducto('+ producto.id +')" class="btn btn-sm btn-success">Editar</button>';
                            fila.appendChild(col_Editar);
                            let col_Borrar = document.createElement("td");
                            col_Borrar.innerHTML = '<button type="button" onclick="confirmarEliminarProducto('+ producto.id +')" class="btn btn-sm btn-danger">Borrar</button>';
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

    // AL CARGARSE EL DOCUMENTO SE REALIZA LA CARGA DE LOS PROOVEEDORES DE LOS PRODUCTOS
    let req2 = new XMLHttpRequest();
    req2.onreadystatechange = function() {
        if (req2.readyState === 4) {
            // SI NO SE OBTUVO RESPUESTA SATISFACTORIA DEL SERVIDOR
            if (req2.status !== 200) {
                console.log(req2.responseText);
            } else {
                // SE ALMACENAN LOS PROVEEDORES EN UNA VARIABLE
                proveedores = JSON.parse(req2.responseText);
                // SE CREA EL option POR DEFECTO EN EL SELECT 'proveedor_id'
                let optionDefault = document.createElement("option");
                optionDefault.value = 0;
                optionDefault.innerHTML = "Seleccione...";
                proveedorId.appendChild(optionDefault);
                // SE CARGAN LOS PROVEEDORES EN EL SELECT 'proveedor_id'
                for (proveedor of proveedores)
                {
                    let optionProveedor = document.createElement("option");
                    optionProveedor.value = proveedor.id;
                    optionProveedor.innerHTML = proveedor.nombre;
                    proveedorId.appendChild(optionProveedor);
                }
            }
        }
    };
    req2.open('POST', '../php/Proveedores.php');
    req2.send();

    // SE AGREGA EL EVENTO CLIC EN EL BOTÓN 'Agregar producto' PARA MOSTRAR EL FORMULARIO PARA AGREGAR UN NUEVO PRODUCTO
    let btnAgregarProducto = document.querySelector("#btn__agregar-producto");
    if (btnAgregarProducto)
    {
        // SE AGREGA EL EVENTO AL CONTENEDOR PARA OCULTAR EL FORMULARIO
        btnAgregarProducto.addEventListener("click", () => {
            let containerFormNuevoProducto = document.querySelector("#container__form-nuevo_producto");
            if (containerFormNuevoProducto.style.display == "" || containerFormNuevoProducto.style.display == "none")
            {
                containerFormNuevoProducto.style.display="flex";
            }
            else
            {
                containerFormNuevoProducto.style.display="none";
            }
        });
    }

    // SE AÑADE EL EVENTO CLICK A LOS ELEMENTOS CON LA CLASE 'close-modal' PARA OCULTAR EL MODAL
    let btnOcultarForm = document.querySelectorAll(".close-modal");
    btnOcultarForm.forEach(item => {
        item.addEventListener("click", () => {
            let i = item.parentElement.parentElement.id;
            let container = document.querySelector("#" + i);
            container.style.display="none";
        })
    })

    // SE DETECTA EL CLICK EN EL DOCUMENTO Y SE IDENTIFICA EN QUE ELEMENTO SE DIO CLICK PARA DETERMINAR EL CIERRE DEL MODAL
    document.onclick = detectarClick;
    function detectarClick(e)
    {
        // SI EL MODAL PARA INGRESAR UN NUEVO PRODUCTO ESTÁ VISIBLE
        if (e.srcElement.id == "container__form-nuevo_producto")
        {
            document.querySelector("#container__form-nuevo_producto").style.display = "none";
        }
        // SI EL MODAL PARA VER LA INFO DE UN PRODUCTO ESTÁ VISIBLE
        if (e.srcElement.id == "container__producto-info")
        {
            document.querySelector("#container__producto-info").style.display = "none";
        }
        // SI EL MODAL PARA VER EL FORMULARIO PARA EDITAR UN PRODUCTO ESTÁ VISIBLE
        if (e.srcElement.id == "container__form-editar_producto")
        {
            document.querySelector("#container__form-editar_producto").style.display = "none";
        }
        // SI EL MODAL PARA CONFIRMAR LA ELIMINACIÓN DE UN PRODUCTO ESTÁ VISIBLE
        if (e.srcElement.id == "container__form-eliminar_producto")
        {
            document.querySelector("#container__form-eliminar_producto").style.display = "none";
        }
    }

    // CUANDO SE DETECTE UN CAMBIO EN EL FORMULARIO SE OCULTARÁ EL ÁREA DE MENSAJES
    formNuevoProducto.addEventListener("change", e => {
        formInfo.classList.remove("alert-danger");
        formInfo.innerHTML = "&nbsp;";
    });

    // CUANDO SE REALIZA EL SUBMIT DEL FORMULARIO DE PARA AGREGAR UN NUEVO PRODUCTO, SE PREVIENE EL SUBMIT DEL FORMULARIO Y SE EVALUAN LOS CAMPOS ANTES DE ENVIARSE MEDIANTE AJAX AL SERVIDOR
    formNuevoProducto.addEventListener("submit", e => {
        e.preventDefault();
        // SE EVALUAN LOS CAMPOS DEL FORMULARIO
        if (clave.value.trim().length == 0)
        {
            formInfo.classList.add("alert-danger");
            formInfo.innerHTML = "¡El campo 'clave' es obligatorio!";
            clave.focus();
            return;
        }
        if (nombre.value.trim().length == 0)
        {
            formInfo.classList.add("alert-danger");
            formInfo.innerHTML = "¡El 'nombre' del producto es obligatorio!";
            nombre.focus();
            return;
        }
        if (descripcion.value.trim().length == 0)
        {
            formInfo.classList.add("alert-danger");
            formInfo.innerHTML = "¡La 'descripcion' del producto es obligatoria!";
            descripcion.focus();
            return;
        }
        if (presentacion.value.trim().length == 0)
        {
            formInfo.classList.add("alert-danger");
            formInfo.innerHTML = "¡La 'presentacion' del producto es obligatoria!";
            presentacion.focus();
            return;
        }
        if (precio.value.trim().length == 0)
        {
            formInfo.classList.add("alert-danger");
            formInfo.innerHTML = "¡El 'precio' del producto es obligatorio!";
            precio.focus();
            return;
        }
        let extensiones = /(.jpg|.jpeg|.png|.gif)$/i;
        if(!extensiones.exec(imagen.value)){
            formInfo.classList.add("alert-danger");
            formInfo.innerHTML = "¡Se debe cargar un archivo de tipo imagen en alguna de los siguientes formatos: '.jpeg', '.jpg', '.png' o '.gif', no mayor a 2MB!";
            imagen.focus();
            return;
        }
        else
        {
            if(imagen.files[0].size > 2097152)
            {
                formInfo.classList.add("alert-danger");
                formInfo.innerHTML = "¡Se debe cargar un archivo de tipo imagen en alguna de los siguientes formatos: '.jpeg', '.jpg', '.png' o '.gif', no mayor a 2MB!";
                imagen.focus();
                return;
            }
        }
        if (proveedorId.value == 0)
        {
            formInfo.classList.add("alert-danger");
            formInfo.innerHTML = "¡Debe seleccionar el proveedor del producto!";
            proveedorId.focus();
            return;
        }
        // SE ENVÍA LA INFORMACIÓN AL SERVIDOR
        let req3 = new XMLHttpRequest();
        let formData = new FormData();
        formData.append('clave', clave.value);
        formData.append('nombre', nombre.value);
        formData.append('descripcion', descripcion.value);
        formData.append('presentacion', presentacion.value);
        formData.append('precio', precio.value);
        formData.append('imagen', imagen.files[0], imagen.files[0].name);
        formData.append('proveedor_id', proveedorId.value);
        req3.onreadystatechange = function() {
            if (req3.readyState === 4) {
                // SI NO SE OBTUVO RESPUESTA SATISFACTORIA DEL SERVIDOR
                if (req3.status !== 200) {
                    formInfo.classList.add("alert-danger");
                    formInfo.innerHTML = req3.responseText;
                    return;
                }
                // SI LA RESPUESTA ES SATISFACTORIA
                else{
                    // SE LIMPIA EL FORMULARIO
                    clave.value = "";
                    nombre.value = ""
                    descripcion.value = "";
                    presentacion.value = "";
                    precio.value = "";
                    imagen.value = "";
                    proveedorId.value = 0;
                    formInfo.classList.remove("alert-danger");
                    formInfo.classList.add("alert-success")
                    formInfo.innerHTML = JSON.parse(req3.responseText).message;
                    // SE VUELVEN A CARGAR LOS PRODUCTOS
                    cargarProductos();
                    setTimeout(() => {
                        formInfo.classList.remove("alert-danger");
                        formInfo.classList.remove("alert-success");
                        formInfo.innerHTML = "&nbsp;";
                    }, 2000);
                }
            }
        };
        req3.open('POST', '../php/GuardarProducto.php');
        req3.send(formData);
    });

    /**
     * Función para mostrar el modal con la información del producto
     * @param i - de tipo int, corresponde al id del producto a ver
     */
    function verProducto(i)
    {
        document.querySelector("#container__producto-info").style.display = "flex";
        let producto = productos.find(el => el.id == i);
        document.querySelector("#td__img").src = "../images/" + producto.imagen;
        document.querySelector("#td__clave").innerHTML = producto.clave;
        document.querySelector("#td__nombre").innerHTML = producto.nombre;
        document.querySelector("#td__descripcion").innerHTML = producto.descripcion;
        document.querySelector("#td__presentacion").innerHTML = producto.presentacion;
        document.querySelector("#td__precio").innerHTML = producto.precio;
        let proveedor = proveedores.find(el => el.id == producto.proveedor_id);
        document.querySelector("#td__proveedor").innerHTML = proveedor.nombre;
    }

    /**
     * Función para mostrar el formulario para editar un producto
     * @param i de tipo int, corresponde al id del producto a editar
     */
    function editarProducto(i)
    {
        document.querySelector("#container__form-editar_producto").style.display = "flex";
        // SE SELECCIONAN LOS ELEMENTOS DEL FORMULARIO
        let f = document.querySelector("#form__editar-producto");
        let id = document.querySelector("#form__editar-producto #id");
        let clave = document.querySelector("#form__editar-producto #clave");
        let nombre = document.querySelector("#form__editar-producto #nombre");
        let descripcion = document.querySelector("#form__editar-producto #descripcion");
        let presentacion = document.querySelector("#form__editar-producto #presentacion");
        let precio = document.querySelector("#form__editar-producto #precio");
        let imagen = document.querySelector("#form__editar-producto #imagen");
        let proveedorId = document.querySelector("#form__editar-producto #proveedor_id");
        let formInfo = document.querySelector("#form__editar-producto #form__info");

        f.addEventListener("change", () => {
            formInfo.classList.remove("alert-danger");
            formInfo.innerHTML = "&nbsp;";
        });

        // SE CREA EL option POR DEFECTO EN EL SELECT 'proveedor_id'
        let optionDefault = document.createElement("option");
        optionDefault.value = 0;
        optionDefault.innerHTML = "Seleccione...";
        proveedorId.appendChild(optionDefault);
        // SE CARGAN LOS PROVEEDORES EN EL SELECT 'proveedor_id'
        for (proveedor of proveedores)
        {
            let optionProveedor = document.createElement("option");
            optionProveedor.value = proveedor.id;
            optionProveedor.innerHTML = proveedor.nombre;
            proveedorId.appendChild(optionProveedor);
        }
        // SE LES ASIGNAN LOS VALORES DEL PRODUCTO
        let producto = productos.find(el => el.id == i);
        id.value = producto.id;
        clave.value = producto.clave;
        nombre.value = producto.nombre;
        descripcion.value = producto.descripcion;
        presentacion.value = producto.presentacion;
        precio.value = producto.precio;
        proveedorId.value = producto.proveedor_id
        // SE PREVIENE EL SUBMIT DEL FORMULARIO Y SE EVALUAN LOS CAMPOS ANTES DE ENVIARSE MEDIANTE AJAX AL ASERVIDOR
        f.addEventListener("submit", e => {
            e.preventDefault();
            if (clave.value.trim().length == 0)
            {
                formInfo.classList.add("alert-danger");
                formInfo.innerHTML = "¡El campo 'clave' es obligatorio!";
                clave.focus();
                return;
            }
            if (nombre.value.trim().length == 0)
            {
                formInfo.classList.add("alert-danger");
                formInfo.innerHTML = "¡El 'nombre' del producto es obligatorio!";
                nombre.focus();
                return;
            }
            if (descripcion.value.trim().length == 0)
            {
                formInfo.classList.add("alert-danger");
                formInfo.innerHTML = "¡La 'descripcion' del producto es obligatoria!";
                descripcion.focus();
                return;
            }
            if (presentacion.value.trim().length == 0)
            {
                formInfo.classList.add("alert-danger");
                formInfo.innerHTML = "¡La 'presentacion' del producto es obligatoria!";
                presentacion.focus();
                return;
            }
            if (precio.value.trim().length == 0)
            {
                formInfo.classList.add("alert-danger");
                formInfo.innerHTML = "¡El 'precio' del producto es obligatorio!";
                precio.focus();
                return;
            }
            let extensiones = /(.jpg|.jpeg|.png|.gif)$/i;
            if(!extensiones.exec(imagen.value)){
                formInfo.classList.add("alert-danger");
                formInfo.innerHTML = "¡Se debe cargar un archivo de tipo imagen en alguna de los siguientes formatos: '.jpeg', '.jpg', '.png' o '.gif', no mayor a 2MB!";
                imagen.focus();
                return;
            }
            else
            {
                if(imagen.files[0].size > 2097152)
                {
                    formInfo.classList.add("alert-danger");
                    formInfo.innerHTML = "¡Se debe cargar un archivo de tipo imagen en alguna de los siguientes formatos: '.jpeg', '.jpg', '.png' o '.gif', no mayor a 2MB!";
                    imagen.focus();
                    return;
                }
            }
            if (proveedorId.value == 0)
            {
                formInfo.classList.add("alert-danger");
                formInfo.innerHTML = "¡Debe seleccionar el proveedor del producto!";
                proveedorId.focus();
                return;
            }
            // SE ENVÍA LA INFORMACIÓN AL SERVIDOR
            let req4 = new XMLHttpRequest();
            let formData = new FormData();
            formData.append('id', id.value);
            formData.append('clave', clave.value);
            formData.append('nombre', nombre.value);
            formData.append('descripcion', descripcion.value);
            formData.append('presentacion', presentacion.value);
            formData.append('precio', precio.value);
            formData.append('imagen', imagen.files[0], imagen.files[0].name);
            formData.append('proveedor_id', proveedorId.value);
            req4.onreadystatechange = function() {
                if (req4.readyState === 4) {
                    // SI NO SE OBTUVO RESPUESTA SATISFACTORIA DEL SERVIDOR
                    if (req4.status !== 200) {
                        formInfo.classList.add("alert-danger");
                        formInfo.innerHTML = JSON.parse(req4.responseText).message;
                        return;
                    }
                    // SI LA RESPUESTA ES SATISFACTORIA
                    else{
                        // SE LIMPIA EL FORMULARIO
                        clave.value = "";
                        nombre.value = ""
                        descripcion.value = "";
                        presentacion.value = "";
                        precio.value = "";
                        imagen.value = "";
                        proveedorId.value = 0;

                        formInfo.classList.remove("alert-danger");
                        formInfo.classList.add("alert-success")
                        formInfo.innerHTML = JSON.parse(req4.responseText).message;

                        // SE VUELVEN A CARGAR LOS PRODUCTOS
                        cargarProductos()

                        setTimeout(() => {
                            formInfo.classList.remove("alert-danger");
                            formInfo.classList.remove("alert-success");
                            formInfo.innerHTML = "&nbsp;";
                            document.querySelector("#container__form-editar_producto").style.display = "none";
                            cargarProductos();
                        }, 2000);
                    }
                }
            };
            req4.open('POST', '../php/EditarProducto.php');
            req4.send(formData);
        });
    }

    /**
     * Función para mostrar el modal de confirmación para eliminar el producto
     * @param i de tipo int, corresponde al id del producto a eliminar
     */
    function confirmarEliminarProducto(i)
    {
        // SE MUESTRA EL MODAL
        document.querySelector("#container__form-eliminar_producto").style.display = "flex";
        // SI SE DA CLICK EN EL BOTÓN 'cancelar' SE CIERRA EL MODAL
        let btnCancelar = document.querySelector("#form__eliminar-producto #btn__cancelar");
        btnCancelar.addEventListener("click", () => {
            document.querySelector("#container__form-eliminar_producto").style.display = "none";
        });
        // AL DARSE CLICK EN EL SUBMIT DEL FORMULARIO, SE PREVIENE EL SUBMIT Y SE MANDA LA INFORMACIÓN AL SERVIDOR POR AJAX
        let f = document.querySelector("#form__eliminar-producto");
        f.addEventListener("submit", e => {
            e.preventDefault();
            // SE ENVÍA LA INFORMACIÓN AL SERVIDOR
            let req5 = new XMLHttpRequest();
            let formData = new FormData();
            formData.append('id', i);
            req5.onreadystatechange = function() {
                if (req5.readyState === 4) {
                    // SI NO SE OBTUVO RESPUESTA SATISFACTORIA DEL SERVIDOR
                    if (req5.status !== 200) {
                        let response = JSON.parse(req5.responseText);
                        document.querySelector("#container__form-eliminar_producto").style.display = "none";
                        document.querySelector("#container__producto-eliminado").style.display = "flex";
                        document.querySelector("#respuesta__producto-eliminado").innerHTML = response.message;
                        document.querySelector("#btn__producto-eliminado").addEventListener("click", () => {
                            document.querySelector("#container__producto-eliminado").style.display = "none";
                        });
                    }
                    // SI LA RESPUESTA ES SATISFACTORIA
                    else{
                        let response = JSON.parse(req5.responseText);
                        document.querySelector("#container__form-eliminar_producto").style.display = "none";
                        document.querySelector("#container__producto-eliminado").style.display = "flex";
                        document.querySelector("#respuesta__producto-eliminado").innerHTML = response.message;
                        document.querySelector("#btn__producto-eliminado").addEventListener("click", () => {
                            document.querySelector("#container__form-editar_producto").style.display = "none";
                            document.querySelector("#container__producto-eliminado").style.display = "none";
                            cargarProductos();
                        });
                    }
                }
            };
            req5.open('POST', '../php/EliminarProducto.php');
            req5.send(formData);
        });
    }
}
