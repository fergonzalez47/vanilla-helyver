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


// formato de mnoneda chilena
const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});


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
            <td data-label= "Alto(cm)"${item.alto || "--"}</td>
            <td data-label= "Linea Aluminio">${item.linea || "--"}</td>
            <td data-label= "Subtotal" class="text-bold">${formatter.format(item.subtotal)}</td>
        `;

    });
});

function getFromSessionStorage() {

    const data = JSON.parse(sessionStorage.getItem("cotizacion")) || [];
    return data;
}

