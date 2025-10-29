# Marvel API Backend

Backend API para el proyecto Marvel desarrollado con Express.js y MongoDB, desplegado en Vercel.

## 🚀 Características

- API REST para gestión de usuarios y personajes de Marvel
- Integración con la API oficial de Marvel
- Sistema de favoritos por usuario
- Autenticación con Firebase
- Base de datos MongoDB
- Desplegado en Vercel (Serverless)
- CORS habilitado para frontend

## 🏗️ Arquitectura

```
marvel-api/
├── src/
│   ├── server.mjs          # Servidor principal
│   ├── config/
│   │   └── db.mjs          # Configuración de MongoDB
│   ├── models/
│   │   ├── Character.mjs   # Modelo de personajes
│   │   └── User.mjs        # Modelo de usuarios
│   ├── routes/
│   │   ├── characters.mjs  # Rutas de personajes
│   │   └── users.mjs       # Rutas de usuarios
│   └── data/
│       └── sampleData.mjs  # Datos de ejemplo
├── scripts/
│   └── testApi.mjs         # Script de pruebas
└── package.json
```

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Firebase** - Autenticación de usuarios
- **Marvel API** - API oficial de Marvel
- **Vercel** - Plataforma de despliegue

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Rugroso/TheMarvelProject-Backend.git
cd marvel-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/marvel-db

# Marvel API
MARVEL_URL=https://gateway.marvel.com/v1/public/characters
MARVEL_APIKEY=tu_api_key_publica
MARVEL_HASH=tu_hash_md5
MARVEL_TS=1

# Servidor
PORT=3000
NODE_ENV=development
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`

## 🌐 Despliegue en Vercel

El proyecto está configurado para despliegue automático en Vercel:

1. Conecta tu repositorio de GitHub con Vercel
2. Configura las variables de entorno en el dashboard de Vercel
3. El despliegue se realizará automáticamente en cada push a `main`

**URL de producción**: [Tu URL de Vercel]

## 📚 API Endpoints

### Información General

- **Base URL**: `https://tu-dominio.vercel.app`
- **Content-Type**: `application/json`

### Root

#### GET `/`
Información básica de la API

**Respuesta:**
```json
{
  "message": "Marvel API corriendo correctamente",
  "version": "1.0.0",
  "environment": "Vercel Serverless",
  "endpoints": {
    "characters": "/api/characters",
    "users": "/api/users"
  }
}
```

### Personajes

#### GET `/api/characters`
Obtiene todos los personajes almacenados en la base de datos local

**Respuesta:**
```json
[
  {
    "_id": "id_mongo",
    "name": "Spider-Man",
    "description": "Descripción del personaje",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### GET `/api/characters/:id`
Obtiene un personaje específico por ID

**Parámetros:**
- `id` (string): ID de MongoDB del personaje

**Respuesta exitosa (200):**
```json
{
  "_id": "id_mongo",
  "name": "Spider-Man",
  "description": "Descripción del personaje",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Errores:**
- `404`: Personaje no encontrado
- `500`: Error interno del servidor

### Usuarios

#### POST `/api/users`
Crea un nuevo usuario o actualiza uno existente

**Body:**
```json
{
  "firebaseUid": "firebase_uid_string",
  "email": "usuario@email.com",
  "displayName": "Nombre del Usuario"
}
```

**Respuesta exitosa (201 - nuevo usuario):**
```json
{
  "message": "Usuario creado exitosamente",
  "user": {
    "_id": "id_mongo",
    "firebaseUid": "firebase_uid_string",
    "email": "usuario@email.com",
    "displayName": "Nombre del Usuario",
    "favorites": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Respuesta exitosa (200 - usuario actualizado):**
```json
{
  "message": "Usuario actualizado exitosamente",
  "user": { /* datos del usuario */ }
}
```

**Errores:**
- `400`: Faltan campos requeridos
- `409`: Email ya registrado
- `500`: Error interno del servidor

#### GET `/api/users/:firebaseUid`
Obtiene un usuario por su Firebase UID

**Parámetros:**
- `firebaseUid` (string): UID de Firebase del usuario

**Respuesta exitosa (200):**
```json
{
  "user": {
    "_id": "id_mongo",
    "firebaseUid": "firebase_uid_string",
    "email": "usuario@email.com",
    "displayName": "Nombre del Usuario",
    "favorites": [
      {
        "marvelId": 1009610,
        "name": "Spider-Man",
        "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg",
        "addedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errores:**
- `404`: Usuario no encontrado
- `500`: Error interno del servidor

### Favoritos

#### GET `/api/users/:firebaseUid/favorites`
Obtiene la lista de favoritos de un usuario

**Parámetros:**
- `firebaseUid` (string): UID de Firebase del usuario

**Respuesta exitosa (200):**
```json
{
  "favorites": [
    {
      "marvelId": 1009610,
      "name": "Spider-Man",
      "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg",
      "addedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### POST `/api/users/:firebaseUid/favorites`
Agrega un personaje a favoritos buscándolo en la API de Marvel

**Parámetros:**
- `firebaseUid` (string): UID de Firebase del usuario

**Body (opción 1 - por nombre):**
```json
{
  "name": "Spider-Man"
}
```

**Body (opción 2 - por ID de Marvel):**
```json
{
  "id": "1009610"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Favorito agregado",
  "favorite": {
    "marvelId": 1009610,
    "name": "Spider-Man",
    "thumbnail": "http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b.jpg"
  }
}
```

**Errores:**
- `400`: Se requiere 'name' o 'id' en el body
- `404`: Usuario no encontrado o personaje no encontrado en Marvel
- `409`: El personaje ya está en favoritos
- `500`: Error interno del servidor

#### DELETE `/api/users/:firebaseUid/favorites/:marvelId`
Elimina un personaje de favoritos

**Parámetros:**
- `firebaseUid` (string): UID de Firebase del usuario
- `marvelId` (number): ID del personaje en Marvel

**Respuesta exitosa (200):**
```json
{
  "message": "Favorito eliminado correctamente",
  "favorites": [
    /* lista actualizada de favoritos */
  ]
}
```

**Errores:**
- `404`: Usuario no encontrado
- `500`: Error interno del servidor

## 🗄️ Modelos de Datos

### Usuario (User)

```javascript
{
  firebaseUid: String,      // UID único de Firebase (requerido, único)
  email: String,            // Email del usuario (requerido, único)
  displayName: String,      // Nombre de usuario (requerido)
  favorites: [              // Array de personajes favoritos
    {
      marvelId: Number,     // ID del personaje en Marvel
      name: String,         // Nombre del personaje
      thumbnail: String,    // URL de la imagen
      addedAt: Date        // Fecha de agregado
    }
  ],
  createdAt: Date,         // Fecha de creación (automático)
  updatedAt: Date          // Fecha de actualización (automático)
}
```

### Personaje (Character)

```javascript
{
  name: String,            // Nombre del personaje (requerido)
  description: String,     // Descripción del personaje
  createdAt: Date,        // Fecha de creación (automático)
  updatedAt: Date         // Fecha de actualización (automático)
}
```

## 🔧 Scripts Disponibles

- `npm start` - Ejecuta el servidor en producción
- `npm run dev` - Ejecuta el servidor en modo desarrollo con nodemon
- `npm test` - Ejecuta las pruebas (pendiente de implementar)

## 🧪 Pruebas

El proyecto incluye un script de pruebas básico en `scripts/testApi.mjs`:

```bash
node scripts/testApi.mjs
```

Este script prueba:
- Creación de usuario
- Agregado de favoritos por nombre
- Obtención de favoritos

## 🌍 Variables de Entorno

### Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `MONGO_URI` | URI de conexión a MongoDB | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `MARVEL_APIKEY` | Clave pública de Marvel API | `tu_api_key_publica` |
| `MARVEL_HASH` | Hash MD5 para Marvel API | `md5(ts+privateKey+publicKey)` |

### Opcionales

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `MARVEL_URL` | URL base de Marvel API | `https://gateway.marvel.com/v1/public/characters` |
| `MARVEL_TS` | Timestamp para Marvel API | `1` |

## 🔒 Autenticación

El sistema utiliza Firebase Authentication. Los usuarios deben estar autenticados en el frontend con Firebase antes de realizar peticiones que requieran `firebaseUid`.

## 🚦 Códigos de Estado HTTP

- `200` - OK: Operación exitosa
- `201` - Created: Recurso creado exitosamente
- `400` - Bad Request: Datos inválidos en la petición
- `404` - Not Found: Recurso no encontrado
- `409` - Conflict: Conflicto (ej. recurso duplicado)
- `500` - Internal Server Error: Error interno del servidor

## 📝 Logs

La aplicación registra eventos importantes:
- Conexiones a MongoDB
- Errores de servidor
- Operaciones de usuario
- Errores de Marvel API

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📞 Soporte

Para reportar bugs o solicitar features, crea un issue en el repositorio de GitHub.

## 📄 Licencia

ISC License

---

**Desarrollado por**: Rugroso  
**Repositorio**: [TheMarvelProject-Backend](https://github.com/Rugroso/TheMarvelProject-Backend)