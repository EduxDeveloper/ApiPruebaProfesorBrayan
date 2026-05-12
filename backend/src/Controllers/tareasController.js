import tareasModel from "../Models/tareasModels.js"

const tareasController = {};

tareasController.getTareas = async (req , res) =>{
    
    const tareas = await tareasModel.find();
    res.json (tareas)
}

tareasController.insertTareas = async (req , res) =>{

    const {title, description, dueDate, priority, status} = req.body;
    const newTarea = new tareasModel ({title, description, dueDate, priority, status});
    await newTarea.save();
    res.json({message: "Tarea Guardada"})
}


tareasController.updateTareas = async (req , res) =>{

    try {
        const {title, description, dueDate, priority, status} = req.body;

        await tareasModel.findByIdAndUpdate(req.params.id,
        {title, description, dueDate, priority, status}, {new: true},);

       return res.status(200).json({message: "Tarea Actualizada"})

    } catch (error) {
        console.log("error " + error)
        return res.status(200).json({message: "Error" + error})
    }


}


tareasController.deleteTareas = async (req , res) =>{

    await tareasModel.findByIdAndDelete(req.params.id);
    res.json({message: "Tarea Eliminada"})

}

export default tareasController
