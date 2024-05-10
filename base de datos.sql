CREATE TABLE articulos (
    id INT PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL,
    imagen TEXT NOT NULL
);

COMMENT ON COLUMN articulos.id IS 'identificador';
COMMENT ON COLUMN articulos.titulo IS 'titulo del articulo';
COMMENT ON COLUMN articulos.imagen IS 'imagen del articulo';