<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "correo@empresa.com"; // Correo del receptor (empresa)
    $subject = "Nueva Solicitud de Cotización";

    // Recuperar datos enviados desde JavaScript
    $data = json_decode(file_get_contents("php://input"), true);
    $personalInfo = $data['personalInfo'];
    $quoteDetails = $data['quoteDetails'];

    // Crear el mensaje
    $message = "Detalles Personales:\n";
    $message .= "Nombre: " . $personalInfo['name'] . "\n";
    $message .= "Teléfono: " . $personalInfo['phone'] . "\n";
    $message .= "Correo: " . $personalInfo['email'] . "\n";
    $message .= "Comuna: " . $personalInfo['comuna'] . "\n";
    $message .= "Dirección: " . $personalInfo['address'] . "\n\n";

    $message .= "Detalles de la Cotización:\n";
    foreach ($quoteDetails as $item) {
        $message .= "- Servicio: " . $item['servicio'] . ", Color: " . $item['color'];
        $message .= ", Ancho: " . $item['ancho'] . "cm, Alto: " . $item['alto'] . "cm";
        $message .= ", Línea: " . $item['linea'] . ", Subtotal: $" . $item['subtotal'] . "\n";
    }

    $headers = "From: no-reply@tusitio.com";

    // Enviar el correo
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Correo enviado correctamente."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al enviar el correo."]);
    }
}
?>
