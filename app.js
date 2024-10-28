// Inicializar EmailJS
emailjs.init("VO5iB68usHdIBsSsH"); 

// Obtener los botones y campo de texto
const checkInButton = document.getElementById("checkInButton");
const checkOutButton = document.getElementById("checkOutButton");
const nameInput = document.getElementById("nameInput");

// Función para enviar el correo electrónico
function sendEmail(action) {
  const name = nameInput.value;
  if (!name) {
    alert("Please enter your name before checking in or out.");
    return;
  }

  const templateParams = {
    name: name,
    action: action
  };

  emailjs.send("service_2pcy0vq", "template_ivk1irl", templateParams)
    .then(function(response) {
      alert(`${action} successful!`);
    }, function(error) {
      alert("An error occurred. Please try again.");
    });
}

// Asignar eventos a los botones
checkInButton.addEventListener("click", function() {
  sendEmail("Check-In");
});

checkOutButton.addEventListener("click", function() {
  sendEmail("Check-Out");
});