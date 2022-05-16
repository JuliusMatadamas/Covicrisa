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
if (itemsUrl.indexOf("catalogo.php"))
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
 * Función para llenar el select 'listaProductos' con la lista de productos almacenada en la base de datos
 * @param param - corresponde a la respuesta del servidor en formato JSON
 */
function cargarProductos(params)
{
    // Se selecciona el contenedor de la tabla de la lista de productos
    let container = document.querySelector("#container__table-catalogo");

    // Se selecciona el elemento 'select' del DOM del documento y se le añade el primer option
    let selectListaProductos = document.querySelector("#listaProductos");

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
