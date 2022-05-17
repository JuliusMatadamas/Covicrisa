<?php
session_start();

if (isset($_SESSION["login"]) && !empty($_SESSION["login"]))
{
    ?>
    <!--
    Se importa la parte superior del documento
    -->
    <?php require '../php/Higher.php'; ?>


    <!--
    Contenido de la página
    -->
    <main class="container">
        <section class="card">
            <h2>Solicitudes de cotización</h2>

            <br>

            <div class="row">
                <div id="container__table-solicitudes" class="col-12">
                    <table id="table__solicitudes" class="table table-bordered">
                        <thead>
                        <tr>
                            <th>Nombre completo</th>
                            <th>Correo</th>
                            <th>Fecha de solicitud</th>
                            <th>Descripción</th>
                            <th colspan="3">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>

    <!--
    Se importa la parte inferior del documento
    -->
    <?php
    require '../php/Nether.php';
}
else
{
    if ($_SERVER["SERVER_NAME"] == "localhost")
    {
        header('Location: '.$_SERVER["REQUEST_SCHEME"]."://".$_SERVER["SERVER_NAME"]."/dpw/login.php");
    }
    else
    {
        header('Location: '.$_SERVER["REQUEST_SCHEME"]."://".$_SERVER["SERVER_NAME"]."/login.php");
    }
}