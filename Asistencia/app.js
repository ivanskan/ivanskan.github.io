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
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function formatearFechaExcel(val) {
  if (typeof val === "number") {
    const excelDate = new Date((val - 25569) * 86400 * 1000);
    const d = String(excelDate.getDate()).padStart(2, '0');
    const m = String(excelDate.getMonth() + 1).padStart(2, '0');
    const y = excelDate.getFullYear();
    return `${d}-${m}-${y}`;
  }
  return val;
}

function fechaActual() {
  const hoy = new Date();
  return `${String(hoy.getDate()).padStart(2, "0")}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${hoy.getFullYear()}`;
}

// ======== ORDEN FIJO DE COLUMNAS ========
const COLUMNAS_FIJAS = [
  "ITEM",
  "DNI",
  "APELLIDOS Y NOMBRES",
  "CURSO",
  "EMPRESA",
  "PUESTO DE TRABAJO",
  "FECHA",
  "ASISTENCIA"
];

// ======== FUNCIONES PRINCIPALES ========

// Importar desde Excel
function importarExcel(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (ev) => {
    workbook = XLSX.read(ev.target.result, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    sheet = workbook.Sheets[sheetName];
    let filas = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    data = filas.map((row, i) => {
      const fila = {};
      COLUMNAS_FIJAS.forEach((col, idx) => {
        if (col === "ITEM") fila[col] = i + 1;
        else fila[col] = row[col] ?? "";
      });
      // marcar que viene del excel
      fila.fuente = "excel";
      // asegurar que ASISTENCIA tenga valor string (puede estar vacío)
      fila.ASISTENCIA = fila.ASISTENCIA || "";
      return fila;
    });

    mostrarTabla(data);
    document.getElementById('registro').classList.remove('d-none');
    document.getElementById('descargar-btn').classList.remove('d-none');
    document.getElementById('resumen').classList.remove('d-none');

    actualizarResumen();
  };

  reader.readAsBinaryString(file);
}

// Mostrar tabla
function mostrarTabla(lista) {
  if (!lista.length) {
    tablaContainer.innerHTML = `<div class="alert alert-secondary">No hay datos para mostrar.</div>`;
    return;
  }

  let html = `<table class="table table-bordered align-middle text-start">
    <thead class="table-light"><tr>`;

  COLUMNAS_FIJAS.forEach(col => {
    let sortIcon = "";
    if (sortConfig.columna === col) sortIcon = sortConfig.asc ? " ↑" : " ↓";
    html += `<th class="text-uppercase sortable" data-col="${col}" style="font-weight:bold;">${col}${sortIcon}</th>`;
  });

  html += `</tr></thead><tbody>`;

  lista.forEach((row, i) => {
    // aplicar clase para filas adicionales/presentes si quieres destacarlas (opcional)
    let filaClase = "";
    if (row.ASISTENCIA === "Presente") filaClase = "table-success";
    else if (row.ASISTENCIA === "Adicional") filaClase = "table-warning";

    html += `<tr class="${filaClase}">`;
    COLUMNAS_FIJAS.forEach(col => {
      let val = row[col] ?? "";

      if (col === "ITEM") val = i + 1;
      if (col === "FECHA") {
        val = formatearFechaExcel(val);
        if (!val) val = fechaActual();
      }

      if (typeof val === "string" && !["ITEM", "DNI", "FECHA"].includes(col)) {
        val = capitalizarTexto(val);
      }

      const tdClass = (col === "FECHA") ? "td-fecha" : "";
      html += `<td class="${tdClass}">${val}</td>`;
    });
    html += `</tr>`;
  });

  html += `</tbody></table>`;
  tablaContainer.innerHTML = html;

  document.querySelectorAll("th.sortable").forEach(th => {
    th.style.cursor = "pointer";
    th.addEventListener("click", () => ordenarTabla(th.dataset.col));
  });
}

// Ordenar tabla
function ordenarTabla(columna) {
  if (!COLUMNAS_FIJAS.includes(columna)) return;

  if (sortConfig.columna === columna) sortConfig.asc = !sortConfig.asc;
  else {
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
  actualizarResumen();
}

// Registrar asistencia
function registrarAsistencia() {
  const dniInput = document.getElementById('dni-input');
  const dni = dniInput.value.trim();
  if (dni.length == 0|| dni=="") {
    alert("Por favor ingrese un DNI válido");
    return;
  }

  let encontrado = false, yaRegistrado = false;
  let nombre = '', empresa = '', curso = '';

  data = data.map(row => {
    if (row.DNI == dni) {
      encontrado = true;
      nombre = row['APELLIDOS Y NOMBRES'] || 'Sin nombre';
      empresa = row.EMPRESA || 'Sin empresa';
      curso = row.CURSO || 'Sin curso';

      if (row.ASISTENCIA === 'Presente' || row.ASISTENCIA === 'Adicional' ) yaRegistrado = true;
      else row.ASISTENCIA = 'Presente';
    }
    return row;
  });

  if (encontrado) {
    alert(yaRegistrado
      ? `⚠️ Ya registrado:\n\n📌 DNI: ${dni}\n👤  Nombre: ${nombre}\n🏢 Empresa: ${empresa}\n📚 ${curso}`
      : `✅ Asistencia registrada:\n\n📌 DNI: ${dni}\n👤 Nombre: ${nombre}\n🏢 Empresa: ${empresa}\n📚 Curso: ${curso}`);
    mostrarTabla(data);
    if (!yaRegistrado) {
      // limpiar después del registro exitoso (cuando se acaba de marcar presente)
      dniInput.value = '';
    }
    actualizarResumen();
  } else {
    alert(`❌ No se encontró el DNI: ${dni}`);
    // No limpiar el input si no se encuentra
  }
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

  if (data.some(r => r.DNI === dni)) {
    alert("El DNI ya existe en la lista.");
    return;
  }

  const nuevo = {
    ITEM: data.length + 1,
    DNI: dni,
    "APELLIDOS Y NOMBRES": capitalizarTexto(nombre),
    CURSO: capitalizarTexto(curso),
    EMPRESA: capitalizarTexto(empresa),
    "PUESTO DE TRABAJO": capitalizarTexto(puesto),
    FECHA: fechaActual(),
    ASISTENCIA: "Adicional",
    fuente: "manual"
  };

  data.push(nuevo);
  mostrarTabla(data);
  alert("Participante agregado correctamente!");

  // limpiar formularios e input de DNI principal
  document.getElementById("form-participante").reset();
  document.getElementById("dni-input").value = "";

  mostrarLista();
  actualizarResumen();
}

// Descargar Excel
function descargarExcel() {
  const datosMayus = data.map(row => {
    const nuevo = {};
    for (let key in row) {
      if (key === 'fuente') continue; // omitimos campo interno
      let val = row[key];
      nuevo[key] = typeof val === "string" ? val.toUpperCase() : val;
    }
    return nuevo;
  });

  const hoja = XLSX.utils.json_to_sheet(datosMayus, { header: COLUMNAS_FIJAS });
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, 'ASISTENCIA');
  XLSX.writeFile(libro, 'asistencia_actualizada.xlsx');
}

// Mostrar / Ocultar formularios
function mostrarAgregar() {
  document.getElementById("formAgregar").classList.remove("d-none");
  document.getElementById("registro").classList.add("d-none");
  tablaContainer.classList.add("d-none");
  document.getElementById("descargar-btn").classList.add("d-none");
  document.getElementById("btnMostrarAgregar").classList.add("d-none");
  document.getElementById("btnMostrarLista").classList.remove("d-none");
  document.getElementById("bloque-dni").classList.add("invisible");

}

function mostrarLista() {
  document.getElementById("formAgregar").classList.add("d-none");
  document.getElementById("registro").classList.remove("d-none");
  tablaContainer.classList.remove("d-none");
  document.getElementById("descargar-btn").classList.remove("d-none");
  document.getElementById("btnMostrarAgregar").classList.remove("d-none");
  document.getElementById("btnMostrarLista").classList.add("d-none");
  document.getElementById("bloque-dni").classList.remove("invisible");

}

// Advertencia antes de salir
window.addEventListener('beforeunload', e => {
  if (data.length > 0) {
    e.preventDefault();
    e.returnValue = '';
  }
});

// ======== RESUMEN DINÁMICO ========
function actualizarResumen() {
  const resumenEl = document.getElementById('resumen');
  if (!resumenEl) return;

  const programados = data.filter(r => r.fuente === 'excel').length;
  const presentes = data.filter(r => r.ASISTENCIA === 'Presente').length;
  const adicionales = data.filter(r => r.fuente === 'manual' || r.ASISTENCIA === 'Adicional').length;
  const ausentes = Math.max(0, programados - presentes);

  resumenEl.innerHTML = `
    <span><b>Programados:</b> ${programados}</span>
    <span><b>Presentes:</b> ${presentes}</span>
    <span><b>Ausentes:</b> ${ausentes}</span>
    <span><b>Adicionales:</b> ${adicionales}</span>
  `;
}
