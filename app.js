// Función para generar el token diario basado en la fecha actual
function getTodayToken() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Función para verificar el token en la URL y permitir acceso
function checkAccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const validToken = getTodayToken();

    if (token !== validToken) {
        document.body.innerHTML = "<h2>Access Denied: Invalid or Expired Link</h2>";
    } else {
        document.getElementById('confirmation').innerText = `Welcome!`;
    }
}

// Configuración de EmailJS
const emailServiceID = service_2pcy0vq
const emailTemplateID = template_ivk1irl
const emailUserID = VO5iB68usHdIBsSsH

// Inicializar EmailJS
emailjs.init(emailUserID);

// Función para enviar la notificación de check-in/check-out por correo electrónico
function sendEmailNotification(employeeName, action) {
    const templateParams = {
        to_email: 'hemmanuelmtz@gmail.com,
        employee_name: employeeName,
        action: action,
        date: new Date().toLocaleString()
    };

    emailjs.send(emailServiceID, emailTemplateID, templateParams)
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
        }, (error) => {
            console.error('Failed to send email.', error);
        });
}

// Función para manejar el check-in y check-out
function sendCheckInOut(action) {
    const employeeName = document.getElementById('employeeName').value;
    if (!employeeName) {
        alert('Please enter your name.');
        return;
    }

    // Llamada a la función de notificación por email
    sendEmailNotification(employeeName, action);

    // Mostrar mensaje de confirmación en la página
    document.getElementById('confirmation').innerText = `${action === 'checkin' ? 'Checked in' : 'Checked out'} successfully!`;
}

// Ejecutar checkAccess cuando cargue la página
window.onload = checkAccess;