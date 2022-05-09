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

    if (usuario.value.length < 5 || usuario.value.length > 8)
    {
        info.classList.remove("alert-success");
        info.classList.add("alert-danger");
        info.innerHTML = "¡El usuario debe tener entre 5 y 8 letras!";
        usuario.focus();
        return;
    }

    if (password.value.length < 5 ||  password.value.length > 8)
    {
        info.classList.remove("alert-success");
        info.classList.add("alert-danger");
        info.innerHTML = "¡El password debe tener entre 5 y 8 carácteres!";
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
                        window.location = location.origin + "/dpw/admin/ventas.php";
                    }
                    else
                    {
                        window.location = location.origin + "/admin/ventas.php";
                    }
                }, 2000);
                return;
            }
        }
    };
    req.open('POST', 'php/Auth.php');
    req.send(formData);
})
