<?php
require_once __DIR__ . '/config/Conexion.php';

use Config\Conexion;

try {
    // 1. Obtener la instancia PDO
    $db = Conexion::getInstancia();
    echo "<h3>¡Conexión exitosa a Oracle Database mediante PDO!</h3>";

    // 2. Ejecutar una consulta preparada de prueba
    $sql = "SELECT table_name FROM user_tables WHERE table_name = :tabla";
    $stmt = $db->prepare($sql);
    
    $nombreTabla = 'CATEGORIAS';
    $stmt->bindParam(':tabla', $nombreTabla);
    $stmt->execute();
    
    $resultado = $stmt->fetch();

    if ($resultado) {
        echo "<p>La tabla <strong>" . htmlspecialchars($resultado['table_name']) . "</strong> existe en la base de datos.</p>";
    } else {
        echo "<p>Conexión correcta, pero la tabla '$nombreTabla' aún no ha sido creada.</p>";
    }

} catch (Exception $e) {
    echo "<h3>Error al conectar:</h3>";
    echo "<p>" . $e->getMessage() . "</p>";
}