// ======== VARIABLES GLOBALES ========
let workbook, sheet, data = [];
const inputExcel = document.getElementById('input-excel');
const tablaContainer = document.getElementById('tabla-container');
let sortConfig = { columna: null, asc: true };

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

// ======== FUNCIONES AUXILIARES ========
function capitalizarTexto(texto) {
  if (typeof texto !== "string") return texto;
  return texto
    .toLowerCase()
    .split(" ")
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(" ");
}

function formatearFechaExcel(val) {
  if (typeof val === "number") {
    const excelDate = new Date((val - 25569) * 86400 * 1000);
    const day = String(excelDate.getDate()).padStart(2, '0');
    const month = String(excelDate.getMonth() + 1).padStart(2, '0');
    const year = excelDate.getFullYear();
    return `${day}-${month}-${year}`;
  }
  return val;
}

function fechaActual() {
  const hoy = new Date();
  return `${String(hoy.getDate()).padStart(2, "0")}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${hoy.getFullYear()}`;
}

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

    // ✅ Asegurar columna ASISTENCIA
    data = data.map(row => ({ ...row, ASISTENCIA: row.ASISTENCIA || '' }));

    mostrarTabla(data);
    document.getElementById('registro').classList.remove('d-none');
    document.getElementById('descargar-btn').classList.remove('d-none');
  };

  reader.readAsBinaryString(file);
}

// Mostrar tabla
function mostrarTabla(lista) {
  if (!lista.length) return;

  let html = `<table class="table table-bordered align-middle text-start">
    <thead class="table-light"><tr>`;

  const headers = Object.keys(lista[0]);
  headers.forEach(col => {
    let sortIcon = "";
    const columnasOrdenables = ["ITEM", "DNI", "APELLIDOS Y NOMBRES", "PUESTO DE TRABAJO","EMPRESA", "CURSO", "FECHA","ASISTENCIA"];

    if (sortConfig.columna === col) {
      sortIcon = sortConfig.asc ? " ↑" : " ↓";
    }

    html += `<th class="text-uppercase sortable" data-col="${col}" style="font-weight: bold;">${col}${sortIcon}</th>`;
  });
  html += `</tr></thead><tbody>`;

  lista.forEach(row => {
    html += `<tr>`;
    headers.forEach(col => {
      let val = row[col];

      // ✅ Convertir fecha de Excel (columna FECHA siempre en mayúsculas)
      if (col === 'FECHA') {
        val = formatearFechaExcel(val);
        if (!val) val = fechaActual();
      }

      // Capitalizar valores (excepto ITEM y DNI)
      if (typeof val === "string" && col !== "ITEM" && col !== "DNI" && col !== "FECHA") {
        val = capitalizarTexto(val);
      }

      // Clase especial para FECHA
      const tdClass = (col === "FECHA") ? "td-fecha" : "";
      html += `<td class="${tdClass}">${val}</td>`;
    });
    html += `</tr>`;
  });

  html += `</tbody></table>`;
  tablaContainer.innerHTML = html;

  // Eventos ordenar
  document.querySelectorAll("th.sortable").forEach(th => {
    th.style.cursor = "pointer"; // siempre cursor pointer
    th.addEventListener("click", () => {
      const col = th.dataset.col;
      const columnasOrdenables = ["ITEM", "DNI", "APELLIDOS Y NOMBRES", "PUESTO DE TRABAJO", "EMPRESA", "CURSO", "FECHA","ASISTENCIA"];
      if (columnasOrdenables.includes(col)) {
        ordenarTabla(col);
      }
    });
  });
}

// Ordenar tabla
function ordenarTabla(columna) {
  if (sortConfig.columna === columna) {
    sortConfig.asc = !sortConfig.asc;
  } else {
    sortConfig.columna = columna;
    sortConfig.asc = true;
  }

  data.sort((a, b) => {
    let valA = a[columna];
    let valB = b[columna];

    if (columna === "FECHA") {
      valA = new Date(formatearFechaExcel(valA).split("-").reverse().join("-"));
      valB = new Date(formatearFechaExcel(valB).split("-").reverse().join("-"));
    } else {
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
    }

    if (valA < valB) return sortConfig.asc ? -1 : 1;
    if (valA > valB) return sortConfig.asc ? 1 : -1;
    return 0;
  });

  mostrarTabla(data);
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
      nombre = row['APELLIDOS Y NOMBRES'] || 'Sin nombre';
      empresa = row.EMPRESA || 'Sin empresa';

      if (row.ASISTENCIA === 'Presente') {
        yaRegistrado = true;
      } else {
        row.ASISTENCIA = 'Presente';
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
  const curso = document.getElementById("inputNuevoCurso").value.trim();

  if (!dni || !nombre) {
    alert("DNI y Apellidos y Nombres son obligatorios.");
    return;
  }

  if (data.some(row => row.DNI === dni)) {
    alert("El DNI ya existe en la lista.");
    return;
  }

  const nuevo = {
    ITEM: data.length + 1,
    DNI: dni,
    "APELLIDOS Y NOMBRES": capitalizarTexto(nombre),
    "PUESTO DE TRABAJO": capitalizarTexto(puesto),
    EMPRESA: capitalizarTexto(empresa),
    CURSO: capitalizarTexto(curso),
    FECHA: fechaActual(),

    ASISTENCIA: ""
  };

  data.push(nuevo);
  mostrarTabla(data);
  alert("Participante agregado correctamente.");
  document.getElementById("form-participante").reset();
  mostrarLista();
}

// Descargar Excel
function descargarExcel() {
  const nuevaHoja = XLSX.utils.json_to_sheet(data);
  const nuevoLibro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(nuevoLibro, nuevaHoja, 'ASISTENCIA');
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

// Advertencia antes de salir
window.addEventListener('beforeunload', e => {
  if (data.length > 0) {
    e.preventDefault();
    e.returnValue = '';
  }
});
