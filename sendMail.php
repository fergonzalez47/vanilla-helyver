<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';  // Asegúrate de que la ruta es correcta

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener los datos del JSON recibido
    $data = json_decode(file_get_contents("php://input"), true);
    $personalInfo = $data['personalInfo'];
    $quoteDetails = $data['quoteDetails'];

    // Correo de destino
    $to = "mlfernandongonzalezvaldz@gmail.com"; 

    // Asunto del correo
    $subject = "Nueva Solicitud de Cotización";

    
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

    $mail = new PHPMailer(true);

    try {
        // Configuración SMTP de Gmail
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'mlfernandongonzalezvaldz@gmail.com';
        $mail->Password = 'tcfavdcxsfhzblmn';  // Contraseña generada en Google
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;


        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true,
            ],
        ];
        

        // Destinatarios
        $mail->setFrom('mlfernandongonzalezvaldz@gmail.com', 'Fernando Gonzalez');
        $mail->addAddress($to); // Tu correo

        // Contenido
        $mail->isHTML(false);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Correo enviado correctamente."]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Error al enviar el correo: {$mail->ErrorInfo}"]);
    }
}

?>