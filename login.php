<?php
session_start();

// SI EL USUARIO YA INICIO SESIÓN
if (isset($_SESSION["login"]) && !empty($_SESSION["login"]))
{
    if ($_SERVER["SERVER_NAME"] == "localhost")
    {
        header('Location: '.$_SERVER["REQUEST_SCHEME"]."://".$_SERVER["SERVER_NAME"]."/dpw/admin/ventas.php");
    }
    else
    {
        header('Location: '.$_SERVER["REQUEST_SCHEME"]."://".$_SERVER["SERVER_NAME"]."/admin/ventas.php");
    }
}
else
{
    /*
Se importa la parte superior del documento
*/
    require './php/Higher.php';
    ?>

    <!--
    Contenido de la página
    -->
    <main class="container">
        <section class="card">
            <h2>Acceso a usuarios</h2>

            <hr>

            <article class="container__form-login">
                <form id="form-login" autocomplete="off">
                    <div class="row">
                        <div class="col-md-12 text-left">
                            <label for="usuario">Usuario</label>
                            <input
                                    type="text"
                                    class="form-control"
                                    name="usuario"
                                    id="usuario"
                                    placeholder="7 carácteres (letras y números)"
                                    required
                            >
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 text-left">
                            <label for="password">Password</label>
                            <input
                                    type="password"
                                    class="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="9 carácteres (letras y números)"
                                    required
                            >
                        </div>
                    </div>

                    <br>

                    <div class="row">
                        <div class="col-md-12 text-left">
                            <button
                                    type="submit"
                                    class="btn btn-secondary w-100"
                            >Ingresar</button>
                        </div>
                    </div>
                </form>
            </article>

            <section id="info" class="alert">
                &nbsp;
            </section>
        </section>
    </main>

    <!--
    Se importa la parte inferior del documento
    -->
    <?php
    require './php/Nether.php';

}
