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
                            <th>Acción</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>

    <section id="container__confirm-eliminar_cotizacion">
        <div id="card__eliminar-producto" class="card">
            <div class="close-modal">
                &times;
            </div>
            <div class="row">
                <div class="col-12">
                    <h4>¿Seguro que deseas eliminar esta solicitud de cotización?</h4>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-6">
                    <button
                            type="button"
                            class="btn btn-warning w-75"
                            id="btn-cancelar"
                    >Cancelar</button>
                </div>
                <div class="col-6">
                    <button
                            type="button"
                            class="btn btn-danger w-75"
                            id="btn-confirmar"
                    >Confirmar</button>
                </div>
            </div>
        </div>
    </section>

    <section id="container__mensaje-eliminar_cotizacion">
        <div id="card__eliminar-producto" class="card">
            <div class="close-modal">
                &times;
            </div>
            <div class="row">
                <div class="col-12">
                    <h4 id="mensaje"></h4>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-6">
                    <button
                            type="button"
                            class="btn btn-primary w-75"
                            id="btn-continuar"
                    >Continuar</button>
                </div>
            </div>
        </div>
    </section>

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