import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
//Estudiantes
import registerEstudiantesRoutes from "./src/Routes/estudiantesRegisterRoute.js"
import loginEstudiantesRoutes from "./src/Routes/estudiantesLoginRoutes.js"
import logOutEstudiantesRoutes from "./src/Routes/logOutEstudiantesRoute.js"
import recoveryPasswordEstudiante from "./src/Routes/estudentRecoveryPassword.js"
import estudiantesRoutes from "./src/Routes/estudiantesControllerRoutes.js"
//Tareas
import tareasRoutes from "./src/Routes/tareasRoutes.js"

const app = express();

app.use(cors({
   origin: ["http://localhost:5173","http://localhost:5174"], 
   credentials: true
}))

app.use(cookieParser())
app.use(express.json())

//Estudiantes
app.use("/api/registrarEstudiantes", registerEstudiantesRoutes);
app.use("/api/loginEstudiantes", loginEstudiantesRoutes)
app.use("/api/logOut", logOutEstudiantesRoutes)
app.use("/api/tareas", tareasRoutes)
app.use("/api/recoveryPassword", recoveryPasswordEstudiante)
app.use("/api/estudiantes", estudiantesRoutes)

export default app;