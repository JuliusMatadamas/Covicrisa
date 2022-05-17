const formLogin = document.querySelector("#form-login");
const usuario = document.querySelector("#usuario");
const password = document.querySelector("#password");
const info = document.querySelector("#info");

/*
Se previene el evento submit del form y se evaluan los valores de los
campos 'usuario' y 'password', en caso de que alguno no cumpla con
lo requerido, se mandará mensaje al usuario para que corrija el error
señalado, si ambos campos pasan, se manda la información por medio de AJAX
al servidor
*/
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    if (usuario.value.trim().length < 7)
    {
        info.classList.remove("alert-success");
        info.classList.add("alert-danger");
        info.innerHTML = "¡El usuario debe tener 7 carácteres (letras y números)!";
        usuario.focus();
        return;
    }

    if (password.value.trim().length < 9 )
    {
        info.classList.remove("alert-success");
        info.classList.add("alert-danger");
        info.innerHTML = "¡El password debe tener 9 carácteres (letras y números)!";
        password.focus();
        return;
    }

    let req = new XMLHttpRequest();
    let formData = new FormData();
    formData.append('usuario', usuario.value);
    formData.append('password', password.value);
    req.onreadystatechange = function()
    {
        if (req.readyState === 4)
        {
            if(req.status !== 200)
            {
                info.classList.remove("alert-success");
                info.classList.add("alert-danger");
                info.innerHTML = "¡Usuario/password invalidos!";
                return;
            }
            else
            {
                info.classList.remove("alert-danger");
                info.classList.add("alert-success");
                info.innerHTML = "Haz iniciado sesión, en un momento serás redirigido";
                setTimeout(() => {
                    if (location.host == "localhost")
                    {
                        window.location = location.origin + "/dpw/admin/productos.php";
                    }
                    else
                    {
                        window.location = location.origin + "/admin/productos.php";
                    }
                }, 2000);
                return;
            }
        }
    };
    req.open('POST', 'php/Auth.php');
    req.send(formData);
})
