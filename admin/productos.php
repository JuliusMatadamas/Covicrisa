<?php
session_start();

if (isset($_SESSION["login"]) && !empty($_SESSION["login"]))
{
?>
    <!--
    Se importa la parte superior del documento
    -->
    <?php require '../php/Higher.php'; ?>


    <!-- SECCIÓN DE LOS PRODUCTOS POR VENDER -->
    <main class="container">
        <section class="card">
            <h2>Productos por vender</h2>
            <br>
            <div class="row">
                <div class="col-md-4 col-lg-3 col-xl-3 col-xxl-2 text-left">
                    <!--
                    BOTÓN AL QUE SE LE AGREGA EL EVENTO ONCLICK EN JAVASCRIPT PARA MOSTRAR EL FORMULARIO PARA LA CAPTURA DE UN NUEVO PRODUCTO
                    -->
                    <button
                            type="button"
                            class="btn btn-info w-100"
                            id="btn__agregar-producto"
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
                        <!--
                        DENTRO DEL ELEMENTO TBODY SE MOSTRARÁN LOS PRODUCTOS, LOS CUALES SE AGREGARÁN DINAMICAMENTE MEDIANTE JAVASCRIPT DESPUÉS DE HABERSE OBTENIDO DEL SERVIDOR POR MEDIO DE AJAX
                        -->
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>

    <!-- SECCIÓN PARA MOSTRAR EL FORMUALRIO DE CAPTURA DE UN NUEVO PRODUCTO -->
    <section id="container__form-nuevo_producto">
        <div id="card__nuevo-producto" class="card text-start">
            <div class="close-modal">
                &times;
            </div>
            <form id="form__nuevo-producto">
                <div class="row">
                    <div class="col-md-4">
                        <label for="clave">Clave</label>
                        <input type="text" class="form-control" name="clave" id="clave" placeholder="Clave del producto" value="">
                    </div>
                    <div class="col-md-8">
                        <label for="nombre">Nombre del producto</label>
                        <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Nombre del producto" value="">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label for="descripcion">Descripción</label>
                        <textarea name="descripcion" id="descripcion" placeholder="Agregue la descripción acerca del producto" class="form-control" cols="30" rows="3"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <label for="presentacion">Presentación</label>
                        <input type="text" class="form-control" name="presentacion" id="presentacion" placeholder="Medidas de cada lámina">
                    </div>
                    <div class="col-md-3">
                        <label for="precio">Precio</label>
                        <input type="number" class="form-control" name="precio" id="precio" placeholder="$ por metro cuadrado">
                    </div>
                    <div class="col-md-6">
                        <label for="imagen">Imagen</label>
                        <input type="file" name="imagen" id="imagen">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label for="proveedor">Seleccione el proveedor</label>
                        <select class="form-control" name="proveedor_id" id="proveedor_id"></select>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-6">
                        <button type="reset" class="btn btn-warning w-100">Cancelar</button>
                    </div>
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-secondary w-100">Guardar</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div id="form__info" class="alert" role="alert">
                            &nbsp;
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>

    <!-- SECCIÓN PARA MOSTRAR LA INFORMACIÓN DE UN PRODUCTO -->
    <section id="container__producto-info">
        <div class="card text-start">
            <div class="close-modal">
                &times;
            </div>
            <div class="row">
                <div class="col-12">
                    <img id="td__img" src="" alt="">
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <!--
                    LA INFORMACIÓN DEL PRODUCTO SE AGREGARÁ POR MEDIO DE JAVASCRIPT
                    -->
                    <table id="table__producto-info">
                        <tr>
                            <th>Clave:</th>
                            <td id="td__clave"></td>
                        </tr>
                        <tr>
                            <th>Nombre:</th>
                            <td id="td__nombre"></td>
                        </tr>
                        <tr>
                            <th>Descripción:</th>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td colspan="2" id="td__descripcion"></td>
                        </tr>
                        <tr>
                            <th>Presentación:</th>
                            <td id="td__presentacion"></td>
                        </tr>
                        <tr>
                            <th>Precio:</th>
                            <td id="td__precio"></td>
                        </tr>
                        <tr>
                            <th>Proveedor:</th>
                            <td id="td__proveedor"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </section>

    <!-- SECCIÓN PARA MOSTRAR EL FORMUALRIO DE EDICIÓN DE UN PRODUCTO -->
    <section id="container__form-editar_producto">
        <div id="card__editar-producto" class="card text-start">
            <div class="close-modal">
                &times;
            </div>
            <form id="form__editar-producto">
                <input type="hidden" name="id" id="id" value="">
                <div class="row">
                    <div class="col-md-4">
                        <label for="clave">Clave</label>
                        <input type="text" class="form-control" name="clave" id="clave" placeholder="Clave del producto" value="">
                    </div>
                    <div class="col-md-8">
                        <label for="nombre">Nombre del producto</label>
                        <input type="text" class="form-control" name="nombre" id="nombre" placeholder="Nombre del producto" value="">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label for="descripcion">Descripción</label>
                        <textarea name="descripcion" id="descripcion" placeholder="Agregue la descripción acerca del producto" class="form-control" cols="30" rows="3"></textarea>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <label for="presentacion">Presentación</label>
                        <input type="text" class="form-control" name="presentacion" id="presentacion" placeholder="Medidas de cada lámina">
                    </div>
                    <div class="col-md-3">
                        <label for="precio">Precio</label>
                        <input type="number" class="form-control" name="precio" id="precio" placeholder="$ por metro cuadrado">
                    </div>
                    <div class="col-md-6">
                        <label for="imagen">Imagen</label>
                        <input type="file" name="imagen" id="imagen">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label for="proveedor">Seleccione el proveedor</label>
                        <select class="form-control" name="proveedor_id" id="proveedor_id"></select>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-4">
                        <button type="submit" class="btn btn-secondary w-100">Actualizar</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div id="form__info" class="alert" role="alert">
                            &nbsp;
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>

    <!-- SECCIÓN PARA MOSTRAR EL FORMUALRIO PARA ELIMINAR UN PRODUCTO -->
    <section id="container__form-eliminar_producto">
        <div id="card__editar-producto" class="card text-start">
            <div class="close-modal">
                &times;
            </div>
            <form id="form__eliminar-producto">
                <div class="row">
                    <div class="col-12">
                        <p>¿Seguro que deseas eliminar este producto?</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <button type="button" id="btn__cancelar" class="btn btn-warning w-75">Cancelar</button>
                    </div>

                    <div class="col-md-6">
                        <button type="submit" class="btn btn-danger w-75">Confirmar</button>
                    </div>
                </div>
            </form>
        </div>
    </section>

    <!-- SECCIÓN PARA MOSTRAR LA CONFIRMACIÓN DE ELIMINACIÓN DEL PRODUCTO -->
    <section id="container__producto-eliminado">
        <div id="card__producto-eliminado" class="card">
            <div class="close-modal">
                &times;
            </div>
            <div class="row">
                <div class="col-12">
                    <p class="text-success" id="respuesta__producto-eliminado"></p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button type="button" id="btn__producto-eliminado" class="btn btn-success w-100">Continuar</button>
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