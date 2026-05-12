import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js"
import customModel from "../Models/profesoresModels.js"

const loginProfesorController = {};

loginProfesorController.login = async (req, res) =>{

    try {
        
            const {email, password} = req.body;

    const profesorFound = await customModel.findOne({email});

    if(!profesorFound.timeOut && profesorFound.timeOut > Date.now()){
        return res.status(403).json({message: "Blocked Acount"})
    }

    const isMatch = await bcrypt.compare(password, profesorFound.password)

    if(!isMatch){
        profesorFound.loginAttemps = (profesorFound.loginAttemps || 0 ) + 1
    

    if(profesorFound.loginAttemps >= 7){
        profesorFound.timeOut = Date.now() + 5 * 60 * 1000
        profesorFound.loginAttemps = 0

        await profesorFound.save();
        return res.status(403).json({message: "Excediste el numero de intntos cuenta bloqueada"})
    }

    await profesorFound.save();
    return res.status(403).json({message: "wrong pass"})
    }

    profesorFound.loginAttemps = 0;
    profesorFound.timeOut = null;

    const token = jsonwebtoken.sign(
        {id: profesorFound._id,},
        config.JWT.secret,
        {expiresIn: "15m"},
    )

    res.cookie("authCookie", token);

    return res.status(200).json({message: "Login Exitoso"})


    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal Server Error" + error})
    }

}

export default loginProfesorController;