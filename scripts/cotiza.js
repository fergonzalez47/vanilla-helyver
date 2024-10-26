let selectService = document.getElementById("service");


selectService.addEventListener("change", () => {

    let option = selectService.value;
    switch (option) {
        case "ventana":
            console.log("ventana");
            break;

        case "puerta":
            console.log("puerta");
            break;

        case "espejo":
            console.log("espejo");
            break;

        default:
            break;
    }
})



function createElement() {

    let fieldset = document.createElement("fieldset");
    let innerElements = `<legend>Cotización de Ventana</legend>`;

    fieldset.setAttribute("value", param.id);
    return fieldset;
};