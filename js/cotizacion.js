// SE OBTIENE LA FECHA DE SOLICITUD DE LA COTIZACIÓN
// SE CREA UNA NUEVA INSTANCIA DE LA CLASE DATE
const d = new Date();
// SE EXTRAE EL AÑO
let year = d.getFullYear();
// SE OBTIENE EL MES
let month = (d.getMonth()+1) < 10 ? '0' + (d.getMonth()+1) : d.getMonth()+1;
// SE OBTIENE EL DÍA
let day = parseInt(d.getDate()) < 10 ? ('0' + parseInt(d.getDate())) : parseInt(d.getDate());
// SE CREA LA FECHA EN FORMATO 'YYYY-MM-DD'
const fecha = year + '-' + month + '-' + day;

// SE SELECCIONAN TANTO EL FORMULARIO PARA SOLICITUD DE COTIZACIONES COMO SUS ELEMENTOS
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

// EVENTO KEYUP EN EL CAMPO NOMBRE
nombre.addEventListener("keyup", () => {
    nombre.classList.remove("border-danger", "border-success");
    feedbackNombre.classList.remove("text-danger", "text-success");
    feedbackNombre.innerHTML = '&nbsp;';
    respuestaCotizacion.classList.remove("alert-danger", "alert-success");
    respuestaCotizacion.innerHTML = "&nbsp;";
});

// EVENTO CHANGE EN EL CAMPO EDAD
edad.addEventListener("change", () => {
    edad.classList.remove("border-danger", "border-success");
    feedbackEdad.classList.remove("text-danger", "text-success");
    feedbackEdad.innerHTML = '&nbsp;';
    respuestaCotizacion.classList.remove("alert-danger", "alert-success");
    respuestaCotizacion.innerHTML = "&nbsp;";
});

// EVENTO KEYUP EN EL CAMPO EMAIL
email.addEventListener("keyup", () => {
    email.classList.remove("border-danger", "border-success");
    feedbackEmail.classList.remove("text-danger", "text-success");
    feedbackEmail.innerHTML = '&nbsp;';
    respuestaCotizacion.classList.remove("alert-danger", "alert-success");
    respuestaCotizacion.innerHTML = "&nbsp;";
});

// EVENTO KEYUP EN EL CAMPO SOLICITUD
solicitud.addEventListener("keyup", () => {
    solicitud.classList.remove("border-danger", "border-success");
    feedbackSolicitud.classList.remove("text-danger", "text-success");
    feedbackSolicitud.innerHTML = '&nbsp;';
    respuestaCotizacion.classList.remove("alert-danger", "alert-success");
    respuestaCotizacion.innerHTML = "&nbsp;";
});

// SE PREVIENE EL SUBMIT DEL FORMULARIO PARA REALIZAR SOLICITUDES DE COTIZACIÓN
f.addEventListener("submit", e => {
    e.preventDefault();

    // SE EVALUA EL CAMPO NOMBRE
    if (nombre.value.trim().length < 10 || nombre.value.trim().length > 50 || !/^[a-zA-Z\u00C0-\u017F\s]+$/.test(nombre.value.trim())) {
        nombre.classList.add("border-danger");
        feedbackNombre.classList.add("text-danger");
        feedbackNombre.innerHTML = '¡Este campo es requerido y debe tener entre 10 y 50 caracteres, únicamente letras y espacios!';
        return false;
    }

    // SE EVALUA LA EDAD
    if (isNaN(parseInt(edad.value)) || parseInt(edad.value) < 18 || parseInt(edad.value) > 60)
    {
        edad.classList.add("border-danger");
        feedbackEdad.classList.add("text-danger");
        feedbackEdad.innerHTML = '¡Ingresa un valor entre 18 y 60 años!';
        return false;
    }

    // SE EVALUA EL EMAIL
    if (email.value.trim().length == 0 || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
    {
        email.classList.add("border-danger");
        feedbackEmail.classList.add("text-danger");
        feedbackEmail.innerHTML = '¡Ingresa una dirección de correo electrónico válida!';
        return false;
    }

    // SE EVALUA EL CAMPO SOLICITUD
    if (solicitud.value.trim().length < 20)
    {
        solicitud.classList.add("border-danger");
        feedbackSolicitud.classList.add("text-danger");
        feedbackSolicitud.innerHTML = '¡Este campo es requerido y debe tener no menos de 20 caracteres!';
        return false;
    }

    // SE ENVÍA LA INFORMACIÓN AL SERVIDOR
    // SE CREA UNA NUEVA INSTANCIA DE LA CLASE XMLHttpRequest
    let req = new XMLHttpRequest();
    // SE CREA UNA NUEVA INSTANCIA DE LA CLASE FormData
    let formData = new FormData();
    // SE AÑADEN LOS DATOS AL FORMDATA
    formData.append('nombre', nombre.value.trim());
    formData.append('edad', edad.value);
    formData.append('email', email.value.trim());
    formData.append('solicitud', solicitud.value.trim());
    formData.append('fecha', fecha);
    // SE REALIZA LA PETICIÓN AJAX
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            // SI NO SE OBTUVO RESPUESTA SATISFACTORIA DEL SERVIDOR
            if (req.status !== 200) {
                respuestaCotizacion.classList.remove("alert-success");
                respuestaCotizacion.classList.add("alert-danger");
                respuestaCotizacion.innerHTML = JSON.parse(req.responseText).message;
                return false;
            }
            // SI LA RESPUESTA ES SATISFACTORIA
            else{
                respuestaCotizacion.classList.remove("alert-danger");
                respuestaCotizacion.classList.add("alert-success");
                respuestaCotizacion.innerHTML = JSON.parse(req.responseText).message;
                setTimeout(() => {
                    nombre.value = "";
                    edad.value = "";
                    email.value = "";
                    solicitud.value = "";
                    respuestaCotizacion.classList.remove("alert-success");
                    respuestaCotizacion.innerHTML = "&nbsp;";
                }, 3000);
            }
        }
    };
    // SE ABRE LA CONEXIÓN INDICANDO EL MÉTODO Y LA URL A LA QUE SE MANDARÁ LA INFORMACIÓN
    req.open('POST', '../php/GuardarCotizacion.php');
    // SE MANDA LA INFORMACIÓN
    req.send(formData);
});