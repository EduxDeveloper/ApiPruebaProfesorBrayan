import {Schema, model} from "mongoose";

//Aqui estoy dudando
const profesoresSchema = new Schema(
    {
        name:{type: String},
        lastName:{type: String},
        email:{type: String},
        password:{type: String},
        phone:{type: Number},
        speciality:{type: String},
        isVerified:{type: Boolean},
        isActive:{type: Boolean},
        loginAttemps:{type: Number},
        timeOut:{type: String},
},{
    timestamps:true,
    strict:false
});

export default model("Profesores", profesoresSchema);