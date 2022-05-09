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
                <div class="col-12">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>Nombre completo</th>
                            <th>Correo</th>
                            <th>Fecha de solicitud</th>
                            <th>Descripción</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Breanna Daniels</td>
                            <td>et@aol.couk</td>
                            <td>2020-04-11</td>
                            <td>Requiero la cotización de un pedido de vidrio laminado de forma rectangular de 1.50m x 2.50m</td>
                        </tr>

                        <tr>
                            <td>Lucas Ross</td>
                            <td>cursus@yahoo.couk</td>
                            <td>2020-04-13</td>
                            <td>Requiero me mande la cotización de 7 láminas de vidrio simple cuadrado de 3 x 3</td>
                        </tr>
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