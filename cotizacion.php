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

            <form action="">
                <div class="row">
                    <div class="col-12 text-left">
                        <label for="nombre">Nombre</label>
                        <input
                                type="text"
                                class="form-control"
                                name="nombre"
                                id="nombre"
                                placeholder="Ingrese su nombre completo"
                        >
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
                                placeholder="18 - 60"
                        >
                    </div>

                    <div class="col-md-10 text-left">
                        <label for="email">Correo electrónico</label>
                        <input
                                type="email"
                                class="form-control"
                                name="email"
                                id="email"
                                placeholder="ejemplo@email.com"
                        >
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
                        ></textarea>
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
                                type="button"
                                class="btn btn-success w-100"
                        >Enviar</button>
                    </div>
                </div>
            </form>
        </article>
    </section>
</main>

<!--
Se importa la parte inferior del documento
-->
<?php require './php/Nether.php'; ?>