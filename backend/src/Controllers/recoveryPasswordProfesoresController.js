import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { config } from "../../config.js";
import ProfesoresModels from "../Models/profesoresModels.js";

const RecoveryProfesoresController = {};

RecoveryProfesoresController.requestCodePass = async (req, res) => {
try{
    const {email} = req.body;
        
    const randomCode = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign(
            {randomCode, email},
            config.JWT.secret,
            {expiresIn: "15m"},
        );

    res.cookie("recoveryCookie", token,{maxAge: 15 * 60 * 1000});

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
               subject: "Recuperación de cuenta, Codigo: " + randomCode + " Expira en 15 minutos", 
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

RecoveryProfesoresController.verifyCode = async (req, res) => {

    try {
        const {code} = req.body;

        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (code !== decoded.randomCode){
            return res.status(400).json({message: "Error codigo incorrecto"});
        }

        const newToken = jsonwebtoken.sign({
            email:decoded.email, verfied: true},
        config.JWT.secret, {expiresIn: "15m"})

        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000});

        return res.status(200).json({message: "Verificacion Exitosa!"})

    } catch (error) {
        console.log("Error " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

RecoveryProfesoresController.changePassword = async (req, res) => {

    try {
        
        const {newPassword, confirmPassword} = req.body;

        if (newPassword !== confirmPassword){
            return res.status(400).json({message: "Password dosent match"})
        }
        
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify (token,config.JWT.secret);

        if (!decoded.verfied) {
            return res.status(400).json({message: "Code not verified"})
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);

        await ProfesoresModels.findOneAndUpdate({email:decoded.email},
            {password: passwordHash},
            {new: true}
        )

        res.clearCookie("recoveryCookie");
        return res.status(200).json({message: "Password Updated"})

    } catch (error) {
        console.log("Error " + error)
        return res.status(400).json({message: "Internal Server Error"})
    }
}

export default RecoveryProfesoresController;