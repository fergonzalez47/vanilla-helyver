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

