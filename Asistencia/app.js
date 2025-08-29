// ======== VARIABLES GLOBALES ========
let workbook, sheet, data = [];
const inputExcel = document.getElementById('input-excel');
const tablaContainer = document.getElementById('tabla-container');
const mensaje = document.getElementById('mensaje');

// ======== EVENTOS ========
inputExcel.addEventListener('change', importarExcel);
document.getElementById("dni-input").addEventListener("keydown", e => {
  if (e.key === "Enter") registrarAsistencia();
});
document.getElementById("btnMostrarAgregar").addEventListener("click", mostrarAgregar);
document.getElementById("btnMostrarLista").addEventListener("click", mostrarLista);
document.getElementById("form-participante").addEventListener("submit", e => {
  e.preventDefault();
  agregarParticipante();
});
document.getElementById("descargar-btn").addEventListener("click", descargarExcel);

// ======== FUNCIONES PRINCIPALES ========

// Importar desde Excel
function importarExcel(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (ev) => {
    workbook = XLSX.read(ev.target.result, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    sheet = workbook.Sheets[sheetName];
    data = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    // Asegurar columna "Asistencia"
    data = data.map(row => ({ ...row, Asistencia: row.Asistencia || '' }));

    mostrarTabla(data);
    document.getElementById('registro').classList.remove('d-none');
    document.getElementById('descargar-btn').classList.remove('d-none');
  };

  reader.readAsBinaryString(file);
}

// Mostrar tabla de participantes
function mostrarTabla(lista) {
  if (!lista.length) return;

  let html = `<table class="table table-bordered"><thead><tr>`;
  const headers = Object.keys(lista[0]);
  headers.forEach(col => html += `<th>${col}</th>`);
  html += `</tr></thead><tbody>`;

  lista.forEach(row => {
    html += `<tr>`;
    headers.forEach(col => {
      let val = row[col];

      // Convertir fecha numérica de Excel
      if (col === 'Fecha' && typeof val === 'number') {
        const excelDate = new Date((val - 25569) * 86400 * 1000);
        const day = String(excelDate.getDate()).padStart(2, '0');
        const month = String(excelDate.getMonth() + 1).padStart(2, '0');
        const year = excelDate.getFullYear();
        val = `${day}-${month}-${year}`;
      }

      html += `<td>${val}</td>`;
    });
    html += `</tr>`;
  });

  html += `</tbody></table>`;
  tablaContainer.innerHTML = html;
}

// Registrar asistencia
function registrarAsistencia() {
  const dni = document.getElementById('dni-input').value.trim();
  if (dni.length !== 8 || isNaN(dni)) {
    alert("Por favor ingrese un DNI válido");
    return;
  }

  let encontrado = false, yaRegistrado = false;
  let nombre = '', empresa = '';

  data = data.map(row => {
    if (row.DNI == dni) {
      encontrado = true;
      nombre = row['Apellidos y Nombres'] || 'Sin nombre';
      empresa = row.EMPRESA || 'Sin empresa';

      if (row.Asistencia === 'Presente') {
        yaRegistrado = true;
      } else {
        row.Asistencia = 'Presente';
      }
    }
    return row;
  });

  if (encontrado) {
    if (yaRegistrado) {
      alert(`⚠️ Ya registrado:\n\n📌 DNI: ${dni}\n👤 Nombre: ${nombre}\n🏢 Empresa: ${empresa}`);
    } else {
      alert(`✅ Asistencia registrada:\n\n📌 DNI: ${dni}\n👤 Nombre: ${nombre}\n🏢 Empresa: ${empresa}`);
    }
    mostrarTabla(data);
  } else {
    alert(`❌ No se encontró el DNI: ${dni}`);
  }

  document.getElementById('dni-input').value = '';
}

// Agregar participante manualmente
function agregarParticipante() {
  const dni = document.getElementById("inputNuevoDNI").value.trim();
  const nombre = document.getElementById("inputNuevoNombre").value.trim();
  const puesto = document.getElementById("inputNuevoPuesto").value.trim();
  const empresa = document.getElementById("inputNuevoEmpresa").value.trim();
  let fecha = document.getElementById("inputNuevoFecha").value.trim();

  if (!dni || !nombre) {
    alert("DNI y Apellidos y Nombres son obligatorios.");
    return;
  }

  if (!fecha) {
    const hoy = new Date();
    fecha = `${String(hoy.getDate()).padStart(2, "0")}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${hoy.getFullYear()}`;
  }

  if (data.some(row => row.DNI === dni)) {
    alert("El DNI ya existe en la lista.");
    return;
  }

  const nuevo = {
    ITEM: data.length + 1,
    DNI: dni,
    "Apellidos y Nombres": nombre,
    "Puesto de trabajo": puesto,
    EMPRESA: empresa,
    Fecha: fecha,
    Asistencia: ""
  };

  data.push(nuevo);
  mostrarTabla(data);
  alert("Participante agregado correctamente.");
  document.getElementById("form-participante").reset();
  mostrarLista();
}

// Descargar Excel actualizado
function descargarExcel() {
  const nuevaHoja = XLSX.utils.json_to_sheet(data);
  const nuevoLibro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(nuevoLibro, nuevaHoja, 'Asistencia');
  XLSX.writeFile(nuevoLibro, 'asistencia_actualizada.xlsx');
}

// Mostrar/ocultar formularios
function mostrarAgregar() {
  document.getElementById("formAgregar").classList.remove("d-none");
  document.getElementById("registro").classList.add("d-none");
  tablaContainer.classList.add("d-none");
  document.getElementById("descargar-btn").classList.add("d-none");
  document.getElementById("btnMostrarAgregar").classList.add("d-none");
  document.getElementById("btnMostrarLista").classList.remove("d-none");
}

function mostrarLista() {
  document.getElementById("formAgregar").classList.add("d-none");
  document.getElementById("registro").classList.remove("d-none");
  tablaContainer.classList.remove("d-none");
  document.getElementById("descargar-btn").classList.remove("d-none");
  document.getElementById("btnMostrarAgregar").classList.remove("d-none");
  document.getElementById("btnMostrarLista").classList.add("d-none");
}

// Advertencia al cerrar si hay datos cargados
window.addEventListener('beforeunload', e => {
  if (data.length > 0) {
    e.preventDefault();
    e.returnValue = '';
  }
});
