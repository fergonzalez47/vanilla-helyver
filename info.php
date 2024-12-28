<?php
echo "OpenSSL: " . (extension_loaded('openssl') ? "Habilitado" : "Deshabilitado") . PHP_EOL;
echo "Zona horaria: " . date_default_timezone_get() . PHP_EOL;
echo "Hora actual: " . date('Y-m-d H:i:s') . PHP_EOL;
?>
