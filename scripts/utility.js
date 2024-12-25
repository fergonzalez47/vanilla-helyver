export const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});


export function showError(fieldId) {

    const errorParagraph = document.querySelector(`${fieldId} .error-message`);
    errorParagraph.classList.add("show");

    // Ocultar después de 5 segundos
    setTimeout(() => {
        errorParagraph.classList.remove("show");
    }, 5000);
}


export function validateName(name) {
    const nameRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ]+(\s[a-zA-ZÁÉÍÓÚáéíóúÑñ]+)+$/;
    return nameRegex.test(name);

}

export function validatePhone(phone) {
    const phoneRegex = /^9\d{8}$/;
    return phoneRegex.test(phone);
}

export function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

export function validateAddress(address) {
    return address.length >= 5;
}