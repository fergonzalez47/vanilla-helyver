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
            <td>${item.servicio}</td>
            <td>${item.color}</td>
            <td>${item.ancho}</td>
            <td>${item.alto}</td>
            <td>${item.linea}</td>
            <td>${item.subtotal}</td>
        `;
    });
});

function getFromSessionStorage() {

    const data = JSON.parse(sessionStorage.getItem("cotizacion")) || [];
    return data;
}

