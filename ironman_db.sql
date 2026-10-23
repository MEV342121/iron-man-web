-- 1. Tabla de Categorías de Trabajos
CREATE TABLE categorias (
    id_categoria NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR2(50) NOT NULL UNIQUE,
    descripcion VARCHAR2(255)
);

-- 2. Tabla del Catálogo de Trabajos Realizados
CREATE TABLE trabajos (
    id_trabajo NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_categoria NUMBER NOT NULL,
    titulo VARCHAR2(100) NOT NULL,
    descripcion CLOB NOT NULL,
    fecha_realizacion DATE NOT NULL,
    destacado NUMBER(1) DEFAULT 0 CHECK (destacado IN (0, 1)),
    CONSTRAINT fk_trabajos_categorias FOREIGN KEY (id_categoria) 
        REFERENCES categorias(id_categoria)
);

-- 3. Tabla de Galería de Imágenes por Trabajo
CREATE TABLE trabajo_imagenes (
    id_imagen NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_trabajo NUMBER NOT NULL,
    ruta_imagen VARCHAR2(255) NOT NULL,
    es_principal NUMBER(1) DEFAULT 0 CHECK (es_principal IN (0, 1)),
    CONSTRAINT fk_imagenes_trabajos FOREIGN KEY (id_trabajo) 
        REFERENCES trabajos(id_trabajo) ON DELETE CASCADE
);

-- 4. Tabla de Clientes
CREATE TABLE clientes (
    id_cliente NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre_completo VARCHAR2(120) NOT NULL,
    telefono VARCHAR2(15) NOT NULL,
    correo VARCHAR2(100) NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla de Solicitudes de Cotización
CREATE TABLE solicitudes (
    id_solicitud NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_cliente NUMBER NOT NULL,
    tipo_estructura VARCHAR2(100) NOT NULL,
    descripcion_requerimiento CLOB NOT NULL,
    estado VARCHAR2(20) DEFAULT 'Pendiente' 
        CHECK (estado IN ('Pendiente', 'En Evaluacion', 'Cotizado', 'Aceptado', 'Rechazado')),
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_solicitudes_clientes FOREIGN KEY (id_cliente) 
        REFERENCES clientes(id_cliente)
);