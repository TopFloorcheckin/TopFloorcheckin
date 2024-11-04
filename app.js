// Simulación de almacenamiento en memoria
let attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || {};

// Mostrar el formulario después de escanear el QR
function showForm() {
    document.getElementById("attendanceForm").classList.remove("hidden");
    document.getElementById("scanQR").classList.add("hidden");
}

// Registrar la asistencia
function registerAttendance(type) {
    const name = document.getElementById("workerName").value.trim();
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const message = document.getElementById("message");

    if (!name) {
        message.innerText = "Por favor, ingresa tu nombre.";
        return;
    }

    if (!attendanceData[name]) {
        attendanceData[name] = {};
    }
    
    if (!attendanceData[name][date]) {
        attendanceData[name][date] = { entrada: null, salida: null };
    }

    if (type === 'entrada') {
        if (attendanceData[name][date].entrada) {
            message.innerText = "La entrada ya ha sido registrada hoy.";
        } else {
            attendanceData[name][date].entrada = time;
            message.innerText = "Entrada registrada a las " + time;
            localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
        }
    } else if (type === 'salida') {
        if (attendanceData[name][date].salida) {
            message.innerText = "La salida ya ha sido registrada hoy.";
        } else if (!attendanceData[name][date].entrada) {
            message.innerText = "Primero debe registrar la entrada.";
        } else {
            attendanceData[name][date].salida = time;
            message.innerText = "Salida registrada a las " + time;
            localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
        }
    }
}

// Generar reporte diario
function generateReport() {
    const reportTable = document.getElementById("reportTable");
    const reportBody = document.getElementById("reportBody");
    const date = new Date().toLocaleDateString();
    reportBody.innerHTML = "";
    
    for (const [name, records] of Object.entries(attendanceData)) {
        if (records[date]) {
            const { entrada, salida } = records[date];
            const row = `<tr>
                            <td>${name}</td>
                            <td>${date}</td>
                            <td>${entrada || 'No registrado'}</td>
                            <td>${salida || 'No registrado'}</td>
                        </tr>`;
            reportBody.innerHTML += row;
        }
    }
    
    reportTable.classList.remove("hidden");
}