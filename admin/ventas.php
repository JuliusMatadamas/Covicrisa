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
                <div class="col-12 text-left">
                    <button
                            type="button"
                            class="btn btn-info"
                    >Agregar producto</button>
                </div>
            </div>

            <br>

            <div class="row">
                <div class="col-12">
                    <table class="table table-bordered">
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
                            <tr>
                                <td class='td__container'>1</td>
                                <td class='td__container'>LACU-10</td>
                                <td class='td__container'>Laminado Cuadrado</td>
                                <td class='td__container'>$273.15</td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-info">Ver</button>
                                </td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-success">Editar</button>
                                </td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-danger">Borrar</button>
                                </td>
                            </tr>

                            <tr>
                                <td class='td__container'>1</td>
                                <td class='td__container'>TERE-01</td>
                                <td class='td__container'>Templado rectangular</td>
                                <td class='td__container'>$153.00</td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-info">Ver</button>
                                </td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-success">Editar</button>
                                </td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-danger">Borrar</button>
                                </td>
                            </tr>

                            <tr>
                                <td class='td__container'>1</td>
                                <td class='td__container'>SICU-12</td>
                                <td class='td__container'>Simple cuadrado</td>
                                <td class='td__container'>$39.60</td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-info">Ver</button>
                                </td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-success">Editar</button>
                                </td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-danger">Borrar</button>
                                </td>
                            </tr>

                            <tr>
                                <td class='td__container'>1</td>
                                <td class='td__container'>TEOV-31</td>
                                <td class='td__container'>Templado ovalado</td>
                                <td class='td__container'>$115.00</td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-info">Ver</button>
                                </td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-success">Editar</button>
                                </td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-danger">Borrar</button>
                                </td>
                            </tr>

                            <tr>
                                <td class='td__container'>1</td>
                                <td class='td__container'>LARE-00</td>
                                <td class='td__container'>Laminado rectangular</td>
                                <td class='td__container'>$114.38</td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-info">Ver</button>
                                </td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-success">Editar</button>
                                </td>
                                <td class='td__action td__container'>
                                    <button class="btn-sm btn-danger">Borrar</button>
                                </td>
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