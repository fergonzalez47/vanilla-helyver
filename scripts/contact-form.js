
import { validateTextarea, validateEmail, validateName, validatePhone, showError } from './utility.js';


function validateContactForm() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();


    // Validaciones para cada campo
    if (!validateName(name)) {
        showError('#fieldset-name');
        document.getElementById("name").focus(); // Poner el foco en el campo de nombre

        return false;
    }
    if (!validatePhone(phone)) {
        showError('#fieldset-phone');
        document.getElementById("phone").focus();

        return false;
    }
    if (email !== "") {
        if (!validateEmail(email)) {
            showError('#fieldset-email');
            document.getElementById("email").focus();

            return false;
        }
    }
    if (!validateTextarea(message)) {
        showError('#fieldset-message');
        document.getElementById("message").focus();
        return false;
    }
    
    // if (message !== "") {
    //     if (!validateTextarea(message)) {
    //         showError('#fieldset-message');
    //         document.getElementById("message").focus();
    //         return false;
    //     }
    // } ASI SI FUESE OPCIONAL OJO

    return true; // Si todas las validaciones pasan, retorna true

}


document.getElementById("sendButton").addEventListener("click", async (e) => {
    e.preventDefault();
    if (validateContactForm()) {
        getFullFormInfo();
    }
});


async function getFullFormInfo() {
    const personalInfo = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value, // Incluir el mensaje

    };




    const response = await fetch('../../sendContactInf.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personalInfo }),
    });

    // const result = await response.json();
    // alert(result.message);
    const text = await response.text();  // Obtén la respuesta como texto
    console.log(text);  // Imprime la respuesta para ver qué está devolviendo el servidor

    const result = JSON.parse(text);  // Luego convierte el texto a JSON
    alert(result.message);
}