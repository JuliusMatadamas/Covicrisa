<!--
Se importa la parte superior del documento
-->
<?php require './php/Higher.php'; ?>


<!--
Contenido de la página
-->
<main class="container">
    <section class="card">
        <h2>Solicitud de cotización</h2>
        <article>
            <p>Complete el siguiente formulario para solicitar una cotización de producto, después de clic en 'Enviar', una vez recibida su solicitud le responderemos a la brevedad.</p>

            <hr>

            <form id="form__cotizacion">
                <div class="row">
                    <div class="col-12 text-left">
                        <label for="nombre">Nombre</label>
                        <!--
                            Campo de tipo texto con validaciones HTML de longitud mínima y máxima así como la especificación de requerido, si ninguna de estas 3 valicadiones se cumple no se permitirá el envío del formulario
                        -->
                        <input
                                type="text"
                                class="form-control"
                                name="nombre"
                                id="nombre"
                                minlength="10"
                                maxlength="50"
                                placeholder="Ingrese su nombre completo"
                                required
                        >
                        <div id="feedback__nombre" class="feedback">
                            &nbsp;
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2 text-left">
                        <label for="edad">Edad</label>
                        <input
                                type="number"
                                class="form-control"
                                name="edad"
                                id="edad"
                                min="1"
                                max="60"
                                placeholder="18 - 60"
                                required
                        >
                        <div id="feedback__edad" class="feedback">
                            &nbsp;
                        </div>
                    </div>

                    <div class="col-md-10 text-left">
                        <label for="email">Correo electrónico</label>
                        <input
                                type="email"
                                class="form-control"
                                name="email"
                                id="email"
                                placeholder="ejemplo@email.com"
                                required
                        >
                        <div id="feedback__email" class="feedback">
                            &nbsp;
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 text-left">
                        <label for="solicitud">Solicitud</label>
                        <textarea
                                class="form-control"
                                name="solcitud"
                                id="solicitud"
                                cols="30"
                                rows="3"
                                minlength="20"
                                placeholder="Ingrese mínimo 20 caracteres."
                                required
                        ></textarea>
                        <div id="feedback__solicitud" class="feedback">
                            &nbsp;
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3">
                        <button
                                type="reset"
                                class="btn btn-warning w-100"
                        >Cancelar</button>
                    </div>

                    <div class="col-md-3">
                        <button
                                type="submit"
                                class="btn btn-success w-100"
                        >Enviar</button>
                    </div>
                </div>
            </form>

            <div id="respuesta__cotizacion" class="row text-center">&nbsp;</div>
        </article>
    </section>
</main>

<!--
Se importa la parte inferior del documento
-->
<?php require './php/Nether.php'; ?>