// formato de mnoneda chilena
import { formatter, validateAddress, validateEmail, validateName, validatePhone, showError } from './utility.js';

const comunasRM = [
    "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central",
    "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja",
    "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo",
    "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Padre Hurtado",
    "Pedro Aguirre Cerda", "Peñalolén", "Pirque", "Providencia", "Pudahuel",
    "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca",
    "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Ramón",
    "Santiago", "Vitacura"
];




// Referencia al elemento <select>
const comunasSelect = document.getElementById('comunasSelect');

// Crear y agregar opciones dinámicamente
comunasRM.forEach(comuna => {
    const option = document.createElement('option');
    option.value = comuna; // Valor del atributo "value"
    option.textContent = comuna; // Texto visible en el select
    comunasSelect.appendChild(option);
});


document.addEventListener('DOMContentLoaded', () => {


    const data = getFromSessionStorage();
    const tbody = document.querySelector('#quoteTable tbody');

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No hay datos de cotización disponibles.</td></tr>';
        return;
    }
    data.forEach(item => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td data-label= "Servicio" class="text-bold">${item.servicio}</td>
            <td data-label= "Color">${item.color || "--"}</td>
            <td data-label= "Ancho(cm)">${item.ancho || "--"}</td>
            <td data-label= "Alto(cm)">${item.alto || "--"}</td>
            <td data-label= "Linea Aluminio">${item.linea || "--"}</td>
            <td data-label= "Subtotal" class="text-bold">${formatter.format(item.subtotal)}</td>
        `;

    });
});

function getFromSessionStorage() {

    const data = JSON.parse(sessionStorage.getItem("cotizacion")) || [];
    return data;
}


function validateForm() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const comunasSelect = document.getElementById("comunasSelect").value;
    const address = document.getElementById("address").value.trim();

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
    if (!comunasSelect) {
        showError('#fieldset-comunasSelect');
        document.getElementById("comunasSelect").focus();

        return false;
    }
    if (!validateAddress(address)) {
        showError('#fieldset-address');
        document.getElementById("address").focus();

        return false; // Si todas las validaciones pasan, retorna true
    }

    return true; // Si todas las validaciones pasan, retorna true

}


document.getElementById("submitButton").addEventListener("click", async (e) => {
    e.preventDefault();
    if (validateForm()) {
        getFullFormInfo();
    }
});


async function getFullFormInfo() {
    const personalInfo = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        comuna: document.getElementById('comunasSelect').value,
        address: document.getElementById('address').value,
    };

    const cotizacion = getFromSessionStorage();


    const response = await fetch('sendMail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personalInfo, cotizacion }),
    });

    const result = await response.json();
    alert(result.message);
}