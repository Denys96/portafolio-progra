emailjs.init('p0bUXlHcUYIWjNpW_'); // Tu User ID de EmailJS

window.onload = function () {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación manual básica
    if (!name || !email || !subject || !message) {
      showMessage("Por favor, completa todos los campos.", 'danger');
      return;
    }

    if (!emailPattern.test(email)) {
      showMessage("Por favor, introduce un correo válido.", 'danger');
      return;
    }

    document.getElementById('sendMessageButton').disabled = true;

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    };

    emailjs.send('service_denys', 'template_on9zpvi', templateParams)
      .then(() => {
        showMessage("¡Mensaje enviado con éxito!", 'success');
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        showMessage("Error al enviar el mensaje. Intenta de nuevo más tarde.", 'danger');
      })
      .finally(() => {
        setTimeout(() => {
          document.getElementById('sendMessageButton').disabled = false;
        }, 1000);
      });
  });

  function showMessage(message, type) {
    const successDiv = document.getElementById('success');
    successDiv.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
      </div>
    `;
    
    // ❗ Ocultar el mensaje automáticamente después de 5 segundos
    setTimeout(() => {
      successDiv.innerHTML = '';
    }, 5000);
  }
};
