// Obtener referencias a los elementos del formulario
const checkInButton = document.getElementById("checkInButton");
const checkOutButton = document.getElementById("checkOutButton");
const nameInput = document.getElementById("nameInput");
const jobsiteInput = document.getElementById("jobsiteInput");
const logDiv = document.getElementById("log");

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