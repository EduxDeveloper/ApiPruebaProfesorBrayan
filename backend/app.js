import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import registerEstudiantesRoutes from "./src/Routes/estudiantesRegisterRoute.js"
import loginEstudiantesRoutes from "./src/Routes/estudiantesLoginRoutes.js"

const app = express();

app.use(cors({
   origin: ["http://localhost:5173","http://localhost:5174"], 
   credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use("/api/registrarEstudiantes", registerEstudiantesRoutes);
app.use("/api/loginEstudiantes", loginEstudiantesRoutes)

export default app;