# Konecta Test - Backend con Node.js y Frontend con React

## Descripción del Proyecto

KonectaTest es una aplicación web diseñada para demostrar habilidades en el desarrollo de un sistema backend con Node.js junto con un frontend en React.

## Características

- Autenticación de usuarios con JWT.
- Encriptación de contraseñas utilizando bcrypt.
- Validación de datos y manejo de errores en las solicitudes.
- Implementación de seguridad con Helmet y rate limiting para proteger la API.
- Control de acceso mediante roles de usuario.
- Conexión a base de datos PostgreSQL utilizando Sequelize ORM.
- Configuración a través de variables de entorno.
- Protección CORS para controlar el acceso a la API.
- Gestión del estado global en frontend con Redux.

## Tecnologías Utilizadas

### Backend (Node.js + Express)

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework minimalista de backend.
- **bcrypt**: Para encriptar contraseñas de manera segura.
- **cors**: Para permitir el acceso a la API desde diferentes dominios.
- **dotenv**: Para manejar variables de entorno.
- **express-rate-limit**: Para limitar la cantidad de solicitudes a la API y protegerla de ataques de fuerza bruta.
- **express-validator**: Para realizar validaciones de entrada en las rutas.
- **helmet**: Para añadir capas adicionales de seguridad HTTP.
- **http-status-codes**: Librería para manejar los códigos de estado HTTP.
- **jsonwebtoken**: Para la creación y validación de tokens JWT.
- **pg**: Cliente de PostgreSQL para Node.js.
- **pg-hstore**: Conversión de datos entre PostgreSQL y el ORM.
- **sequelize**: ORM para la manipulación de la base de datos PostgreSQL.

### Frontend (React)

- **React**: Biblioteca para construir interfaces de usuario.
- **NextUI**: Librería de componentes UI moderna para React usada en el Login.
- **Redux Toolkit**: Herramienta para gestionar el estado global de la aplicación (Solicitudes y Empleados).
- **Axios**: Cliente HTTP para realizar peticiones al backend.
- **Formik**: Para manejar formularios y validaciones en React.
- **Framer Motion**: Librería para manejar animaciones en React usada por NextUi en el login.
- **JWT-decode**: Para decodificar tokens JWT en el frontend.
- **React Router Dom**: Para el enrutamiento de páginas en la aplicación.
- **React Toastify**: Para mostrar notificaciones en la interfaz.
- **Yup**: Librería de validación de esquemas utilizada junto con Formik.

## Configuración del Proyecto

### Requisitos Previos

- Docker y Docker Compose instalados.

## Configuración de Variables de Entorno

Los archivos `.env` necesarios para el correcto funcionamiento de la aplicación ya están incluidos como ejemplos en el proyecto.

### Archivos `.env`

- **Backend**: Se encuentra en el directorio `backend/.env`.
- **Frontend**: Se encuentra en el directorio `frontend/.env`.

### Puesta en Marcha

1. Clona este repositorio:

   ```bash
   git clone https://gitlab.com/cfcastillol/konectatest
   ```

2. Accede a la carpeta del proyecto

   ```bash
   cd konectatest
   ```

3. Ejecuta el siguiente comando para levantar la aplicación (esto construirá los contenedores de Docker y levantará tanto el backend como el frontend junto con la base de datos PostgreSQL)

   ```bash
   docker-compose up -d
   ```

4. Los entornos quedan alojados asi:
   ```
   Backend:     http://localhost:3000/
   Frontend:    http://localhost:5173/
   ```
5. Por defecto se dejaron configurados los siguientes usuarios

   ```bash
   Rol Administrador:
        email: cfcastillol@gmail.com
        passw: cfcastillol22

   Rol Empleado:
        email: cfcastillol2@gmail.com
        passw: cfcastillol22
   ```

## Colección de Postman

He incluido una colección de Postman para facilitar las pruebas de la API. Esta colección contiene todas las rutas necesarias para probar las funcionalidades de registro, autenticación, gestión de usuarios, y operaciones CRUD de la aplicación.

**_Nota: Para las rutas protegidas no olvidar usar el Bearer Token en la pestaña Authorization_**

[![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/13666984/2sAXjSyoYb#fec9b927-d906-412a-8722-6ed9e57a0cb8)

## Autor

**Cristian Fabian Castillo Castillo** - [@cfcastillol](https://gitlab.com/cfcastillol)
