import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar dotenv ANTES de otras importaciones
dotenv.config({ path: path.join(__dirname, '../.env') });

import express from "express";
import cors from "cors";
import connectDB from "./config/db.mjs";
import charactersRoutes from "./routes/characters.mjs";
import { initializeSampleData } from "./data/sampleData.mjs";

const app = express();

// Conectar a la base de datos de forma asíncrona
connectDB().then((connected) => {
  if (connected) {
    // Inicializar datos de prueba cuando la conexión sea exitosa
    initializeSampleData();
  }
}).catch(err => {
  console.log("Servidor continuará funcionando sin base de datos funcionando:", err);
});

app.use(cors());
app.use(express.json());

// Rutas principales
app.get("/", (req, res) => {
  res.json({
    message: "Marvel API corriendo correctamente",
    version: "1.0.0",
    endpoints: {
      characters: "/api/characters"
    }
  });
});

// Rutas de la API
app.use("/api", charactersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;
