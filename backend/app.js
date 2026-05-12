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
//Categorias
import categoriasRoutes from "./src/Routes/categoriasRoutes.js"
//Profesores
import registerProfesorRoutes from "./src/Routes/profesorRegistrar.js"
import loginProfesorRoutes from "./src/Routes/loginProfesoresRoutes.js"


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
app.use("/api/recoveryPassword", recoveryPasswordEstudiante)
app.use("/api/estudiantes", estudiantesRoutes)
//Categorias
app.use("/api/categorias", categoriasRoutes)
//Tareas
app.use("/api/tareas", tareasRoutes)
//Profesor
app.use("/api/registrarProfesor", registerProfesorRoutes);
app.use("/api/loginProfesores", loginProfesorRoutes)

export default app;