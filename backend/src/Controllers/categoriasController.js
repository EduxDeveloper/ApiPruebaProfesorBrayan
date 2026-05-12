import categoriasModel from "../Models/categoriasModels.js"

const categoriasController = {};

categoriasController.getCategorias = async (req, res) =>{

    try {
        const categorias = await categoriasModel.find();
        res.json (categorias)
        return res.status(200).json({message: "Get Realizado!"})
    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

categoriasController.insertCategorias = async (req, res) => {

    try {
            const {categoryName, description, color, isActive} = req.body;
            const newCategoria = new categoriasModel ({categoryName, description, color, isActive});
            await newCategoria.save();
            return res.status(200).json({message: "Categoria Guardada!"})
    } catch (error) {
        
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }

}


categoriasController.updateCategorias = async (req, res) => {

    try {
        
        const {categoryName, description, color, isActive} = req.body;
        

        await categoriasModel.findByIdAndUpdate(req.params.id,
                {categoryName, description, color, isActive}, {new: true},);
        
               return res.status(200).json({message: "Categoria Actualizada"})


    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }

}

categoriasController.deleteCategoria = async (req, res) => {
    try {
        
        await categoriasModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Categoria Eliminada"})

    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }

}




export default categoriasController;
