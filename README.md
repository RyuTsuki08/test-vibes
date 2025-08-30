# Aplicación Next.js + Express.js + MongoDB

Este proyecto consta de dos partes principales: una API de Express.js y una aplicación web Next.js.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

*   Node.js (versión 18 o superior)
*   npm (Node Package Manager)
*   MongoDB (opcional, si deseas utilizar una base de datos real)

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de directorios:

````markdown
## API (Express.js)

### Configuración

1.  Navega al directorio `api`:

    ```bash
    cd api
    ```

2.  Instala las dependencias:

    ```bash
    npm install
    ```

### Configuración

*   **Variables de Entorno:**

    *   Crea un archivo `.env` en el directorio `api` (si necesitas variables de entorno).
    *   Define las variables de entorno necesarias, como:

        ```
        PORT=4000
        MONGO_URI=mongodb://localhost:27017/mydb
        ```

### Ejecutando la API

*   **Modo de Desarrollo:**

    ```bash
    npm run dev
    ```

    Esto iniciará el servidor de la API en modo de desarrollo con recarga en caliente.

*   **Modo de Producción:**

    1.  Construye la API:

        ```bash
        npm run build
        ```

    2.  Inicia la API:

        ```bash
        npm start
        ```

### Endpoints de la API

La API proporciona los siguientes endpoints:

*   `GET /api/products`: Obtiene una lista de productos con filtrado, ordenamiento y paginación.
    *   Parámetros de consulta:
        *   `search`: Busca productos por nombre o descripción.
        *   `sort`: Ordena los productos por `price` o `name`.
        *   `order`: Orden de clasificación (`asc` o `desc`).
        *   `page`: Número de página.
        *   `limit`: Número de productos por página.
        *   `available`: Filtra por disponibilidad (`true` o `false`).
*   `GET /api/products/:id`: Obtiene un producto específico por ID.

## Aplicación Web (Next.js)

### Configuración

1.  Navega al directorio `web`:

    ```bash
    cd web
    ```

2.  Instala las dependencias:

    ```bash
    npm install
    ```

### Configuración

*   **URL de la API:**

    *   En `web/lib/api.ts`, actualiza la variable `API_BASE_URL` para que apunte a tu endpoint de la API:

        ```typescript
        const API_BASE_URL = 'http://localhost:4000/api';
        ```

### Ejecutando la Aplicación Web

*   **Modo de Desarrollo:**

    ```bash
    npm run dev
    ```

    Esto iniciará el servidor de desarrollo de Next.js con recarga en caliente.

*   **Modo de Producción:**

    1.  Construye la aplicación web:

        ```bash
        npm run build
        ```

    2.  Inicia la aplicación web:

        ```bash
        npm start
        ```

### Accediendo a la Aplicación Web

Abre tu navegador web y ve a `http://localhost:3000`.

## Tipos Compartidos

El directorio `shared` contiene definiciones de tipos que son utilizadas tanto por la API como por la aplicación web.

*   `shared/types.ts`: Define la interfaz `Product`.

## Notas Adicionales

*   Asegúrate de que tu servidor MongoDB esté en funcionamiento si estás utilizando una base de datos real.
*   Puedes personalizar la API y la aplicación web modificando el código en los directorios `api` y `web`, respectivamente.
*   Consulta la documentación de Express.js, Next.js y MongoDB para más información.
````