import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import registerEstudiantesRoutes from "./src/Routes/estudiantesRegisterRoute.js"

const app = express();

app.use(cors({
   origin: ["http://localhost:5173","http://localhost:5174"], 
   credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use("/api/registrarEstudiantes", registerEstudiantesRoutes);

export default app;