import "dotenv/config";
import express from "express";
import Route from "./routes/Route.js";
import cors from "cors";

const app = express();

const port = process.env.PORT || 5000;

// Middleware para servir archivos estáticos
// Si no tienes un frontend en esa carpeta, puedes eliminar esta línea.
app.use(express.static('frontend'));

// Middleware para parsear JSON y datos del cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:3000", // Cambia al origen correcto de tu frontend
};
app.use(cors(corsOptions));

// Ruta raíz (prueba básica)
app.get('/', (req, res) => {
    res.json({ message: "ok" });
});

// Rutas de la API
app.use('/api', Route);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`App corriendo en el puerto: ${port}`);
});
