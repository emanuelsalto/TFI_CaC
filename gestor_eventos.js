var contadorTarjetas = 0;

function crearTarjeta() {
  contadorTarjetas++;

  var contenedorTarjetas = document.getElementById('contenedor-tarjetas');
  var nuevaTarjeta = document.createElement('div');
  nuevaTarjeta.className = 'col-12 mb-4';
  nuevaTarjeta.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Tarjeta ${contadorTarjetas}</h5>
        <table class="table" id="tabla-${contadorTarjetas}">
          <thead>
            <tr>
              <th>FECHA</th>
              <th>DESCRIPCIÓN</th>
              <th>LOCACIÓN</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fecha</td>
              <td>Descripción 1</td>
              <td>Locación 1</td>
            </tr>
            <!-- Agrega aquí más filas según tus necesidades -->
          </tbody>
        </table>              
        <div class="form-group">
          <label for="imagen">Documentos</label>
          <input type="file" class="form-control-file" id="imagen-${contadorTarjetas}" onchange="previsualizarImagen(event, ${contadorTarjetas})" multiple>
          <img src="#" alt="Previsualización de imagen" id="imagen-preview-${contadorTarjetas}" style="display: none; max-width: 100%; max-height: 200px; margin-top: 10px;">
          <button class="btn btn-danger" onclick="eliminarFoto(${contadorTarjetas})">Eliminar Foto</button>
        </div>
        <button class="btn btn-success">Subir</button>
        <button class="btn btn-primary" onclick="editarTabla(${contadorTarjetas})">Editar</button>
        <button class="btn btn-danger" onclick="eliminarTarjeta(${contadorTarjetas})">Eliminar</button>
        <button class="btn btn-primary d-none" id="guardar-${contadorTarjetas}" onclick="guardarCambios(${contadorTarjetas})">Guardar</button>
      </div>
    </div>
  `;

  contenedorTarjetas.appendChild(nuevaTarjeta);
}

function editarTabla(tablaId) {
  var tabla = document.getElementById(`tabla-${tablaId}`);
  var botonEditar = document.getElementById(`editar-${tablaId}`);
  var botonGuardar = document.getElementById(`guardar-${tablaId}`);

  // Habilitar la edición de las celdas
  for (var i = 1; i < tabla.rows.length; i++) {
    for (var j = 0; j < tabla.rows[i].cells.length; j++) {
      var celda = tabla.rows[i].cells[j];
      celda.contentEditable = true;
    }
  }

  // Habilitar la edición del título de la tabla
  var titulo = tabla.previousElementSibling;
  titulo.contentEditable = true;

  // Mostrar botón "Guardar cambios" y ocultar botón "Editar"
  botonGuardar.classList.remove('d-none');
  botonEditar.classList.add('d-none');
}

function guardarCambios(tablaId) {
  var tabla = document.getElementById(`tabla-${tablaId}`);
  var botonEditar = document.getElementById(`editar-${tablaId}`);
  var botonGuardar = document.getElementById(`guardar-${tablaId}`);

  // Deshabilitar la edición de las celdas
  for (var i = 1; i < tabla.rows.length; i++) {
    for (var j = 0; j < tabla.rows[i].cells.length; j++) {
      var celda = tabla.rows[i].cells[j];
      celda.contentEditable = false;
    }
  }

  // Deshabilitar la edición del título de la tabla
  var titulo = tabla.previousElementSibling;
  titulo.contentEditable = false;

  // Ocultar botón "Guardar cambios" y mostrar botón "Editar"
  botonGuardar.classList.add('d-none');
  botonEditar.classList.remove('d-none');
}

function eliminarTarjeta(tablaId) {
  var tarjeta = document.getElementById(`tabla-${tablaId}`).closest('.col-12');
  tarjeta.remove();
}

function previsualizarImagen(event, tablaId) {
  var input = event.target;
  var imagenPreview = document.getElementById(`imagen-preview-${tablaId}`);

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      imagenPreview.src = e.target.result;
      imagenPreview.style.display = 'block';
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    imagenPreview.src = '#';
    imagenPreview.style.display = 'none';
  }       
}

function eliminarFoto(tablaId) {
  var input = document.getElementById(`imagen-${tablaId}`);
  var imagenPreview = document.getElementById(`imagen-preview-${tablaId}`);

  input.value = ''; // Restablecer el valor del campo de entrada de archivo
  imagenPreview.src = '#';
  imagenPreview.style.display = 'none'; // Ocultar la previsualización de la imagen
}
