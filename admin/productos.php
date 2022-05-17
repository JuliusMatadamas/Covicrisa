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
            <h2>Productos por vender</h2>

            <br>

            <div class="row">
                <div class="col-md-4 col-lg-3 col-xl-3 col-xxl-2 text-left">
                    <button
                            type="button"
                            class="btn btn-info w-100"
                    >Agregar producto</button>
                </div>
            </div>

            <br>

            <div class="row">
                <div id="container__table-productos" class="col-12">
                    <table id="table__productos" class="table table-bordered">
                        <thead>
                        <tr>
                            <th>N°</th>
                            <th>Clave</th>
                            <th>Nombre</th>
                            <th>Precio</th>
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