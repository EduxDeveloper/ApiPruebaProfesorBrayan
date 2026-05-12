import estudiantesModel from "../Models/estudiantesModels.js"
import bcryptjs from "bcryptjs";

const EstudiantesController = {};

EstudiantesController.getEstudiantes = async (req, res) =>{

    try {
        const estudiantes = await estudiantesModel.find();
        res.json (estudiantes)
        return res.status(200).json({message: ""})
    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

EstudiantesController.updateEstudiantes = async (req, res) => {

    try {
        
        const {name, lastName, email, password, birthdate, phone, grade, isVerified, loginAttemps, timeOut} = req.body;

        const passwordHash = await bcryptjs.hash(password, 10);
        

        await estudiantesModel.findByIdAndUpdate(req.params.id,
                {name, lastName, email, password: passwordHash, birthdate, phone, grade, isVerified, loginAttemps, timeOut}, {new: true},);
        
               return res.status(200).json({message: "estudiante Actualizado"})


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }

}

EstudiantesController.deleteEstudiantes = async (req, res) => {
    try {
        
        await estudiantesModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "estudiante Eliminado"})

    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }

}




export default EstudiantesController;
