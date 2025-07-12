const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Eviando...';

   const serviceID = 'default_service';
   const templateID = 'template_qfa4c2d';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Lógica para EmailJS (la que ya tenías)
    const btn = document.getElementById('button');
    if (btn) { // Asegúrate de que el botón exista antes de agregar el listener
        document.getElementById('form')
            .addEventListener('submit', function(event) {
                event.preventDefault();

                // Usamos las traducciones para el texto del botón
                btn.value = (currentLanguage === 'es' ? 'Enviando...' : 'Sending...');

                const serviceID = 'default_service';
                const templateID = 'template_qfa4c2d';

                emailjs.sendForm(serviceID, templateID, this)
                    .then(() => {
                        btn.value = (currentLanguage === 'es' ? 'Enviar Mensaje' : 'Send Message');
                        alert(currentLanguage === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!');
                    }, (err) => {
                        btn.value = (currentLanguage === 'es' ? 'Enviar Mensaje' : 'Send Message');
                        alert(currentLanguage === 'es' ? 'Error al enviar: ' + JSON.stringify(err) : 'Error sending: ' + JSON.stringify(err));
                    });
            });
    }

    // --- Lógica de traducción de idioma ---
    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');

    // Función para aplicar las traducciones
    const applyTranslations = (lang) => {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                // Para elementos input con placeholder
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[lang][key]);
                }
                // Para textarea con placeholder
                else if (element.tagName === 'TEXTAREA' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[lang][key]);
                }
                // Para input de tipo submit con value
                else if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translations[lang][key];
                }
                // Para el resto de los elementos (texto interno)
                else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        // Actualizar placeholders de los inputs del formulario si no tienen data-key
        // Esto es un fallback si no se les ha asignado data-key
        if (currentLanguage === 'es') {
            document.getElementById('to_name').setAttribute('placeholder', 'Escribe el nombre del destinatario');
            document.getElementById('from_name').setAttribute('placeholder', 'Escribe tu correo electrónico');
            document.getElementById('message').setAttribute('placeholder', 'Escribe un Mensaje');
        } else {
            document.getElementById('to_name').setAttribute('placeholder', 'Type the recipient\'s name');
            document.getElementById('from_name').setAttribute('placeholder', 'Type your email address');
            document.getElementById('message').setAttribute('placeholder', 'Type a Message');
        }
    };

    // Función para actualizar el estado visual de los botones de idioma
    const updateLanguageButtons = () => {
        if (currentLanguage === 'es') {
            langEsBtn.classList.add('active');
            langEnBtn.classList.remove('active');
        } else {
            langEnBtn.classList.add('active');
            langEsBtn.classList.remove('active');
        }
    };

    // Cargar el idioma guardado en localStorage o el predeterminado al cargar la página
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
    applyTranslations(currentLanguage); // Aplica el idioma inicial/guardado
    updateLanguageButtons(); // Actualiza los botones visualmente

    // Event listeners para los botones de idioma
    langEsBtn.addEventListener('click', () => {
        if (currentLanguage !== 'es') {
            currentLanguage = 'es';
            localStorage.setItem('preferredLanguage', 'es');
            applyTranslations('es');
            updateLanguageButtons();
        }
    });

    langEnBtn.addEventListener('click', () => {
        if (currentLanguage !== 'en') {
            currentLanguage = 'en';
            localStorage.setItem('preferredLanguage', 'en');
            applyTranslations('en');
            updateLanguageButtons();
        }
    });
});