<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Asegúrate de que la ruta sea correcta

// Configuración SMTP de Gmail
$mail = new PHPMailer(true);
try {
    // Obtener datos JSON desde la solicitud
    $data = json_decode(file_get_contents("php://input"), true);
    $personalInfo = $data['personalInfo'] ?? [];

    // Validaciones en PHP (por seguridad)
    $name = htmlspecialchars(trim($personalInfo['name'] ?? ''));
    $phone = htmlspecialchars(trim($personalInfo['phone'] ?? ''));
    $email = htmlspecialchars(trim($personalInfo['email'] ?? ''));
    $message = htmlspecialchars(trim($personalInfo['message'] ?? ''));

    if (empty($name) || empty($phone) || empty($message)) {
        throw new Exception("Todos los campos son obligatorios excepto el correo.");
    }

    // Validación adicional de formato
    if (!preg_match('/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/', $name)) {
        throw new Exception("El nombre no es válido.");
    }
    if (!preg_match('/^9\d{8}$/', $phone)) {
        throw new Exception("El teléfono debe ser de 9 dígitos y comenzar con 9.");
    }
    if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("El correo electrónico no es válido.");
    }

    // Configuración del correo
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'tu_email@gmail.com'; // Tu correo de Gmail
    $mail->Password = 'tu_contraseña_de_aplicacion'; // Contraseña de aplicación
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Configuración del remitente y destinatario
    $mail->setFrom('tu_email@gmail.com', 'Tu Nombre');
    $mail->addAddress('destinatario@ejemplo.com', 'Nombre del Destinatario'); // Cambia el destinatario

    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = 'Nuevo mensaje de contacto';
    $mail->Body = "
        <h3>Nuevo mensaje de contacto:</h3>
        <p><strong>Nombre:</strong> {$name}</p>
        <p><strong>Teléfono:</strong> {$phone}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Mensaje:</strong> {$message}</p>
    ";

    // Enviar el correo
    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje: ' . $mail->ErrorInfo]);
}
?>
