import profesoresModel from "../Models/profesoresModels.js"
import bcryptjs from "bcryptjs";

const ProfesoresController = {};

ProfesoresController.getProfesores = async (req, res) =>{

    try {
        const estudiantes = await profesoresModel.find();
        res.json (estudiantes)
        return res.status(200).json({message: "Exito!"})
    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

ProfesoresController.updateProfesores = async (req, res) => {

    try {
        
        const {name, lastName, email, password, phone, speciality, isVerified, isActive, loginAttemps, timeOut} = req.body;

        const passwordHash = await bcryptjs.hash(password, 10);
        

        await profesoresModel.findByIdAndUpdate(req.params.id,
                {name, lastName, email, password: passwordHash, phone, speciality, isVerified, isActive, loginAttemps, timeOut}, {new: true},);
        
               return res.status(200).json({message: "estudiante Actualizado"})


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }

}

ProfesoresController.deleteProfesores = async (req, res) => {
    try {
        
        await profesoresModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "estudiante Eliminado"})

    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }

}



export default ProfesoresController;
