import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../../config.js"
import customModel from "../Models/estudiantesModels.js"

const loginEstudianteController = {};

loginEstudianteController.login = async (req, res) =>{

    try {
        
            const {email, password} = req.body;

    const estudianteFound = await customModel.findOne({email});

    if(!estudianteFound.timeOut && estudianteFound.timeOut > Date.now()){
        return res.status(403).json({message: "Blocked Acount"})
    }

    const isMatch = await bcrypt.compare(password, estudianteFound.password)

    if(!isMatch){
        estudianteFound.loginAttemps = (estudianteFound.loginAttemps || 0 ) + 1
    

    if(estudianteFound.loginAttemps >= 7){
        estudianteFound.timeOut = Date.now() + 5 * 60 * 1000
        estudianteFound.loginAttemps = 0

        await estudianteFound.save();
        return res.status(403).json({message: "Excediste el numero de intntos cuenta bloqueada"})
    }

    await estudianteFound.save();
    return res.status(403).json({message: "wrong pass"})
    }

    estudianteFound.loginAttemps = 0;
    estudianteFound.timeOut = null;

    const token = jsonwebtoken.sign(
        {id: estudianteFound._id,},
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

export default loginEstudianteController;