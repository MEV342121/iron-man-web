<?php
namespace Config;

use PDO;
use PDOException;

class Conexion {
    private static ?PDO $instancia = null;

    // Configuración DSN para Oracle Database
    private string $host = 'localhost';
    private string $port = '1521';
    private string $serviceName = 'FREEPDB1'; // O el SID de tu base de datos Oracle
    private string $user = 'IRONMAN_USER';
    private string $pass = '901080';

    private function __construct() {}

    public static function getInstancia(): PDO {
        if (self::$instancia === null) {
            $conexionAux = new self();
            
            // DSN para Oracle utilizando PDO_OCI
            $tns = "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST={$conexionAux->host})(PORT={$conexionAux->port}))(CONNECT_DATA=(SERVICE_NAME={$conexionAux->serviceName})))";
            $dsn = "oci:dbname=" . $tns . ";charset=UTF8";
            
            $opciones = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_CASE               => PDO::CASE_LOWER // Convierte nombres de columnas a minúsculas
            ];

            try {
                self::$instancia = new PDO($dsn, $conexionAux->user, $conexionAux->pass, $opciones);
            } catch (PDOException $e) {
                error_log("Error de conexión a Oracle: " . $e->getMessage());
                throw new PDOException("No se pudo conectar a la base de datos Oracle.");
            }
        }
        return self::$instancia;
    }
}