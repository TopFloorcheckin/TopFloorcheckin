
// Obtener referencias a los elementos del formulario
const checkInButton = document.getElementById("checkInButton");
const checkOutButton = document.getElementById("checkOutButton");
const nameInput = document.getElementById("nameInput");
const jobsiteInput = document.getElementById("jobsiteInput");
const logDiv = document.getElementById("log");

// Función para obtener la fecha en formato YYYY-MM-DD
function getFormattedDate() {
  const today = new Date();
  return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
}

// Guardar la fecha de hoy en localStorage (solo se ejecuta al cargar el QR por primera vez)
if (!localStorage.getItem("accessDate")) {
  localStorage.setItem("accessDate", getFormattedDate());
}

// Función para verificar si la fecha de acceso sigue siendo válida
function validateAccessDate() {
  const storedDate = localStorage.getItem("accessDate");
  const currentDate = getFormattedDate();

  if (storedDate !== currentDate) {
    alert("Access expired. Please scan the new QR code to access the site.");
    window.location.href = "https://www.error-page.com"; // Reemplaza este enlace con una página de error o una página vacía
  }
}

// Ejecutar la verificación de fecha al cargar la página
validateAccessDate();

// Función para mostrar la información de Check-In o Check-Out
function logAction(action) {
  const name = nameInput.value;
  const jobsite = jobsiteInput.value;
  const timestamp = new Date().toLocaleString();

  if (!name || !jobsite) {
    alert("Please enter both your name and the jobsite.");
    return;
  }

  // Crear un mensaje de log para mostrar en la página
  const logMessage = `<p><strong>${action}:</strong> ${name} at ${jobsite} on ${timestamp}</p>`;
  logDiv.innerHTML += logMessage;

  // Limpiar los campos después de registrar el check-in o check-out
  nameInput.value = "";
  jobsiteInput.value = "";
}

// Agregar eventos a los botones
checkInButton.addEventListener("click", function() {
  logAction("Check-In");
});

checkOutButton.addEventListener("click", function() {
  logAction("Check-Out");
});
import { Analytics } from "@vercel/analytics/react"