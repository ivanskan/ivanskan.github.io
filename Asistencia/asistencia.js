let workbook, sheet, data = [];
const inputExcel = document.getElementById('input-excel');
const tablaContainer = document.getElementById('tabla-container');
const mensaje = document.getElementById('mensaje');

inputExcel.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const binaryStr = e.target.result;
    workbook = XLSX.read(binaryStr, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    sheet = workbook.Sheets[sheetName];

    data = XLSX.utils.sheet_to_json(sheet, { defval: '' });

    // Asegurar que todas las filas tengan la columna "Asistencia"
    data = data.map(row => {
      if (!row.hasOwnProperty('Asistencia')) {
        row.Asistencia = '';
      }
      return row;
    });


    mostrarTabla(data);
    document.getElementById('registro').style.display = 'block';
    document.getElementById('descargar-btn').style.display = 'inline-block';
  };

  reader.readAsBinaryString(file);
});

function mostrarTabla(data) {
  let html = `<table><thead><tr>`;
  const headers = Object.keys(data[0]);
  headers.forEach(col => html += `<th>${col}</th>`);
  html += `</tr></thead><tbody>`;

  data.forEach(row => {
    html += `<tr>`;
    headers.forEach(col => {
      let val = row[col];

      if (col === 'Fecha' && typeof val === 'number') {
        // Convertir de número de serie de Excel a fecha
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


function registrarAsistencia() {
  const dni = document.getElementById('dni-input').value.trim();
  let encontrado = false;
  let yaRegistrado = false;
  let nombre = '', empresa = '';

  data = data.map((row) => {
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
      alert(`⚠️ Ya se ha registrado asistencia para:\n\n📌 DNI: ${dni}\n👤 Nombre: ${nombre}\n🏢 Empresa: ${empresa}`);
    } else {
      alert(`✅ Asistencia registrada:\n\n📌 DNI: ${dni}\n👤 Nombre: ${nombre}\n🏢 Empresa: ${empresa}`);
    }
    mensaje.innerText = '';
    mostrarTabla(data);
  } else {
    alert(`❌ No se encontró el DNI: ${dni}`);
    mensaje.innerText = '';
  }

  document.getElementById('dni-input').value = '';
}


function descargarExcel() {
  const nuevaHoja = XLSX.utils.json_to_sheet(data);
  const nuevoLibro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(nuevoLibro, nuevaHoja, 'Asistencia');
  XLSX.writeFile(nuevoLibro, 'asistencia_actualizada.xlsx');
}

// window.addEventListener('beforeunload', function (e) {
//   if (data.length > 0) {
//     e.preventDefault();
//     e.returnValue = ''; // Mostrará el mensaje de advertencia en la mayoría de navegadores
//   }
// });

