// AL CARGARSE EL DOCUMENTO SE REALIZA LA PETICIÓN AL SERVIDOR PARA OBTENER LAS SOLICITUDES DE COTIZACIÓN
function cargarSolicitudes()
{
    // SE CREA UNA NUEVA INSTANCIA DE LA CLASE XMLHttpRequest
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            // SI NO SE OBTUVO RESPUESTA SATISFACTORIA DEL SERVIDOR
            if (req.status !== 200) {
                console.log(req.responseText);
            } else {
                // SE OBTIENEN LAS COTIZACIONES DE LA BASE DE DATOS
                let cotizaciones = JSON.parse(req.responseText);
                // SE SELECCIONA LA TABLA EN LA QUE SE VAN A INSERTAR LOS DATOS
                let t = document.querySelector("#table__solicitudes");
                // SE LIMPIA EL ELEMENTO TBODY
                t.children[1].textContent = "";
                if (t) {
                    // SE RECORRE CADA COTIZACIÓN Y SE CREA UNA NUEVA FILA EN LA TABLA CON LOS DATOS DE DICHA COTIZACIÓN
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
                        // A LA ÚLTIMA COLUMNA SE AGREGA UN BOTÓN CONEL EVENTO CLICK PARA LLAMAR A LA FUNCIÓN BORRARSOLICITUD PASANDO COMO PARÁMETRO EL ID DE LA SOLICITUD
                        let col_Borrar = document.createElement("td");
                        col_Borrar.innerHTML = `<button type="button" onclick="borrarSolicitud(${cotizacion.id})" class="btn btn-sm btn-danger">Borrar</button>`;
                        fila.appendChild(col_Borrar);
                        t.tBodies.item(0).appendChild(fila);
                    }
                }
            }
        }
    };
    // SE ABRE LA CONEXIÓN A LA URL
    req.open('POST', '../php/Cotizaciones.php');
    // SE ENVÍA LA PETICIÓN DE INFORMACIÓN
    req.send();
}

// FUNCIÓN QUE RESPONDE AL EVENTO CLICK EN EL DOCUMENTO
document.onclick = detectarClick;
function detectarClick(e)
{
    // SI EL CONTENDDOR DE LA CONFIRMACIÓN PARA ELIMINAR LA COTIZACIÓN ESTÁ VISIBLE Y SE DIÓ CLICK EN EL, SE OCULTA ENTONCES
    if (e.srcElement.id == "container__confirm-eliminar_cotizacion")
    {
        document.querySelector("#container__confirm-eliminar_cotizacion").style.display = "none";
    }
}

/**
 * FUNCIÓN PARA BORRAR LA SOLICITUD
  * @param id de tipo int - corresponde al id de la solicitud de cotización a borrar
 */
function borrarSolicitud(id)
{
    // SE MUESTRA EL MENSAJE DE CONFIRMACIÓN
    document.querySelector("#container__confirm-eliminar_cotizacion").style.display="flex";
    // SE AÑADE EL EVENTO CLICK AL ELEMENTO CON LA CLASE .close-modal
    document.querySelector("#container__confirm-eliminar_cotizacion .close-modal").addEventListener("click", () => {
        // AL RECIBIR EL CLIC, CIERRA EL MENSAJE DE CONFIRMACIÓN Y SE CANCELA LA OPERACIÓN
        document.querySelector("#container__confirm-eliminar_cotizacion").style.display="none";
        return;
    })
    // TAMBIÉN SE AÑADE EL EVENTO CLICK AL BOTON CON LA CLASE btn-cancelar
    document.querySelector("#container__confirm-eliminar_cotizacion #btn-cancelar").addEventListener("click", () => {
        // IGUAL AL RECIBIR EL CLIC, CIERRA EL MENSAJE DE CONFIRMACIÓN Y SE CANCELA LA OPERACIÓN
        document.querySelector("#container__confirm-eliminar_cotizacion").style.display="none";
        return;
    })
    // SE AGREGA POR ÚLTIMO EL EVENTO CLICK AL BOTON CON EL ID btn-confirmar
    document.querySelector("#container__confirm-eliminar_cotizacion #btn-confirmar").addEventListener("click", () => {
        // AL RECIBIR EL CLICK, OCULTA EL MENSAJE DE CONFIRMACIÓN
        document.querySelector("#container__confirm-eliminar_cotizacion").style.display="none";
        // CREA UNA NUEVA INSTANCIA DE LA CLASE XMLHttpRequest
        let req = new XMLHttpRequest();
        // SE CREA UNA NUEVA INSTANCIA DE LA CLASE FormData
        let formData = new FormData();
        // SE AGREGA EL ID DE LA COTIZACIÓN A BORRAR
        formData.append('id', id);
        // SE CREA LA PETICIÓN
        req.onreadystatechange = function() {
            if (req.readyState === 4)
            {
                // CUALQUIERA QUE SEA LA RESPUESTA DEL SERVIDOR SE RECIBE Y SE PARSEA A JSON
                let res = JSON.parse(req.responseText);
                // SE MUESTRA AHORA EL MENSAJE DE RESPUESTA DEL SERVIDOR
                document.querySelector("#container__mensaje-eliminar_cotizacion").style.display="flex";
                // SE INSERTA EL MENSAJE DEL SERVIDOR
                document.querySelector("#container__mensaje-eliminar_cotizacion #mensaje").innerHTML = res.message;
                // Y SE AGREGA EL EVENTO CLICK AL BOTON btn-continuar
                document.querySelector("#container__mensaje-eliminar_cotizacion #btn-continuar").addEventListener("click", () => {
                    // AL RECIBIR EL CLICK, SE CIERRA EL MENSAJE DE RESPUESTA DEL SERVIDOR
                    document.querySelector("#container__mensaje-eliminar_cotizacion").style.display="none";
                    // Y POR ÚLTIMO, SE VUELVE A LLAMAR A LA FUNCIÓN PARA CARGAR LAS SOLICITUDES
                    cargarSolicitudes();
                })
            }
        };
        // SE ABRE AL CONEXIÓN A LA URL
        req.open('POST', '../php/EliminarSolicitud.php');
        // SE MANDA LA PETICIÓN CON LA INFORMACIÓN AL SERVIDOR
        req.send(formData);
    })
}

cargarSolicitudes();