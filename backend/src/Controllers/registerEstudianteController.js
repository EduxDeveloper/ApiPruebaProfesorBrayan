import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import customModel from "../Models/estudiantesModels.js";
import { config } from "../../config.js";
import { register } from "module";
import { info } from "console";
import estudiantesModels from "../Models/estudiantesModels.js";

const registerEstudianteController = {};

registerEstudianteController.register = async (req, res) => {

    try {
        
        const {name, lastName, email, password, birthdate, phone, grade, isVerified, loginAttemps, timeOut} = req.body;
        //Validar despues si un correo existe 

        const passwordHash = await bcryptjs.hash(password, 10);

        const randomCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            {randomCode, password: passwordHash, name, lastName, email,  birthdate, phone, grade, isVerified, loginAttemps, timeOut},
            config.JWT.secret,
            {expiresIn: "15m"},
        );

        res.cookie("registrationCookie", token,{maxAge: 15 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password,
            },
        });
        
        const mailOptions = {
           from: config.email.user_email,
           to: email,
           subject: "verificacion de cuenta " + randomCode + " expira en 15 minutos", 
        };

        

        transporter.sendMail(mailOptions, (error, info)=>{

            if(error){
                console.log("Error" + error)
                return res.status(500).json({message: "Error a la hora de enviar email"});

            }
            return res.status(200).json({message: "Se envio correctamente"});
        })

        


    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}

registerEstudianteController.verifyCode = async (req, res) =>{
    
    try {
        
        const {verificationCodeRequest} = req.body;
        
        const token = req.cookies.registrationCookie;

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        const {
            randomCode: storedCode, password: passwordHash , name, lastName, email,  birthdate, phone, grade, isVerified, loginAttemps, timeOut
        } = decoded;

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Codigo incorrecto"});
        }

        const newEstudiante = estudiantesModels({//Tengo duda de esto 
             password: passwordHash, name, lastName, email,  birthdate, phone, grade, isVerified: true, loginAttemps, timeOut
        });

        await newEstudiante.save();

        return res.status(200).json({message: "Cuenta verificada"});

    } catch (error) {
        console.log("Error" + error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export default registerEstudianteController;