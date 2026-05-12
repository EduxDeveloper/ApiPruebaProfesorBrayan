import materiasModel from "../Models/materiasModels.js"

const MateriasController = {};

MateriasController.getMateria = async (req, res) =>{

    try {
        const categorias = await materiasModel.find();
        res.json (categorias)
        return res.status(200).json({message: "Get Realizado!"})
    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

MateriasController.insertMaterias = async (req, res) => {

    try {
            const {subjectName, teacher_id, isAvailable} = req.body;
            const newCategoria = new materiasModel ({subjectName, teacher_id, isAvailable});
            await newCategoria.save();
            return res.status(200).json({message: "Materia Guardada!"})
    } catch (error) {
        
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }

}


MateriasController.updateMaterias = async (req, res) => {

    try {
        
        const {subjectName, teacher_id, isAvailable} = req.body;
        

        await materiasModel.findByIdAndUpdate(req.params.id,
                {subjectName, teacher_id, isAvailable}, {new: true},);
        
               return res.status(200).json({message: "Materia Actualizada"})


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }

}

MateriasController.deleteMateria = async (req, res) => {
    try {
        
        await materiasModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Materia Eliminada"})

    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }

}


export default MateriasController;
