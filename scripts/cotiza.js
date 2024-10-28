let selectService = document.getElementById("service");
let displayOption = document.getElementById("display-option");


selectService.addEventListener("change", () => {

    let option = selectService.value;
    displayOption.innerHTML = "";
    switch (option) {
        case "ventana":
            displayOption.appendChild(createWindowQuote());
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



function createWindowQuote() {

    let fieldset = document.createElement("fieldset");
    let innerElements = `
        <div class="cotizacion-ventana">

                    <legend>Cotización de Ventana</legend>

                    <div><i>Por favor, ingrese las medidas en centímetros (cm), sin incluir el texto
                            "cm".</i></div>
                    <label>
                        <p>Ancho:</p>
                        <input placeholder="Ejemplo: 125 (cm)" type="number" name="window-width" required
                            id="window-width"> Cm
                    </label>
                    <label>
                        <p>Alto: </p> <input placeholder="Ejemplo: 90 (cm)" type="number" name="window-height" required
                            id="window-height"> Cm
                    </label>
                </fieldset>

                <fieldset>
                    <legend><span class="required-element">*</span>Linea Aluminio: </legend>
                    <label>
                        <input type="radio" name="line" required id="line-25" value="line-25"> Linea 25
                    </label>
                    <label>
                        <input type="radio" name="line" required id="line-5000" value="line-5000"> Linea 5000
                    </label>
    `;

    fieldset.innerHTML = innerElements;
    return fieldset;
};