CREATE TABLE empleado (
    id SERIAL PRIMARY KEY,                    
    fecha_ingreso DATE NOT NULL,              
    nombre VARCHAR(50) NOT NULL,             
    salario FLOAT NOT NULL,          
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),                  
    updated_by VARCHAR(100)                   
);

CREATE TABLE solicitud (
    id SERIAL PRIMARY KEY,                    
    codigo VARCHAR(50) UNIQUE NOT NULL,              
    descripcion TEXT NOT NULL,                
    resumen TEXT,                             
    empleado_id INT NOT NULL,                 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),                  
    updated_by VARCHAR(100),                  
    CONSTRAINT fk_empleado
        FOREIGN KEY (empleado_id)
        REFERENCES empleado(id)
        ON DELETE CASCADE
);

CREATE TYPE rol AS ENUM('EMPLEADO', 'ADMINISTRADOR');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,                    
    nombre VARCHAR(100) NOT NULL,             
    email VARCHAR(150) NOT NULL UNIQUE,      
    password_hash VARCHAR(255) NOT NULL,
    rol rol NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),                  
    updated_by VARCHAR(100)                   
);

INSERT INTO public.users
(id, nombre, email, password_hash, "rol", created_at, updated_at, created_by, updated_by)
VALUES(1, 'Cristian Castillo', 'cfcastillol@gmail.com', '$2b$10$rvNLSqlhsIY64sZDORYhuOKRKoIPhn3.1H5SVASd1dSC.V7QppcWm', 'ADMINISTRADOR'::public."rol", '2024-09-06 18:13:05.801', '2024-09-06 18:13:05.801', 1, 1);

INSERT INTO public.users
(id, nombre, email, password_hash, "rol", created_at, updated_at, created_by, updated_by)
VALUES(2, 'Cristian Castillo 2', 'cfcastillol2@gmail.com', '$2b$10$rvNLSqlhsIY64sZDORYhuOKRKoIPhn3.1H5SVASd1dSC.V7QppcWm', 'EMPLEADO'::public."rol", '2024-09-06 18:13:05.801', '2024-09-06 18:13:05.801', '1', '1');