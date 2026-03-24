let data = [];

// Leer Excel
fetch('data/cursos.xlsx')
  .then(res => res.arrayBuffer())
  .then(buffer => {
    const workbook = XLSX.read(buffer);
    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    data = XLSX.utils.sheet_to_json(hoja);

    console.log("DATA CARGADA:", data);
  });

// Convertir fecha Excel
function convertirFecha(fecha) {

  if (fecha instanceof Date) return fecha;

  if (typeof fecha === "number") {
    return new Date((fecha - 25569) * 86400 * 1000);
  }

  return new Date(fecha);
}

// 🔍 Buscar
function buscar() {
  const dni = document.getElementById('dni').value.trim();

  const registros = data.filter(x => String(x.DNI).trim() === dni);

  if (registros.length === 0) {
    alert("No encontrado");
    return;
  }

  document.getElementById('login').style.display = "none";
  document.getElementById('dashboard').style.display = "block";
  document.getElementById('logo').style.display = "block";

  document.getElementById('nombre').innerText = registros[0].NOMBRE;

  // Codigo (si no existe, evitar error)
  document.getElementById('cod').innerText = registros[0].DNI || "";

  procesar(registros);
}

// Procesar cursos
function procesar(registros) {

  let total = registros.length;
  let vigentes = 0;
  let porVencer = 0;

  let html = "";

  registros.forEach(r => {

    let fecha = convertirFecha(r.FECHA);

    let años = r.CURSO.toUpperCase().includes("IZAJE") ? 2 : 1;

    let vencimiento = new Date(fecha);
    vencimiento.setFullYear(vencimiento.getFullYear() + años);

    let hoy = new Date();

    let diffMeses = (vencimiento - hoy) / (1000 * 60 * 60 * 24 * 30);

    let estado = "";
    let clase = "";

    if (vencimiento < hoy) {
      estado = "Vencido";
      clase = "text-danger";
    } else if (diffMeses <= 2) {
      estado = "Por vencer";
      clase = "text-warning";
      porVencer++;
      vigentes++;
    } else {
      estado = "Vigente";
      clase = "text-success";
      vigentes++;
    }

    html += `
      <tr>
        <td>${r.CURSO}</td>
        <td>${r.EMPRESA || "-"}</td>
        <td>${fecha.toLocaleDateString()}</td>
        <td>${vencimiento.toLocaleDateString()}</td>
        <td class="${clase} fw-bold">${estado}</td>
      </tr>
    `;
  });

  document.getElementById('tabla').innerHTML = html;

  document.getElementById('total').innerText = total;
  document.getElementById('vigentes').innerText = vigentes;
  document.getElementById('porVencer').innerText = porVencer;
}

// Volver
function volver() {
  document.getElementById('login').style.display = "block";
  document.getElementById('dashboard').style.display = "none";
  document.getElementById('logo').style.display = "none";
  document.getElementById('dni').value = "";
}

function toggleModo() {
  const body = document.body;
  const btn = document.querySelector("#logo button i");

  const modoActual = body.getAttribute("data-bs-theme");

  if (modoActual === "light") {
    body.setAttribute("data-bs-theme", "dark");
    btn.classList.remove("bi-moon");
    btn.classList.add("bi-sun");
  } else {
    body.setAttribute("data-bs-theme", "light");
    btn.classList.remove("bi-sun");
    btn.classList.add("bi-moon");
  }
}