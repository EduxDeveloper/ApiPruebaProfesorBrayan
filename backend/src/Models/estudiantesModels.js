import {Schema, model} from "mongoose";

//Aqui estoy dudando
const estudiantesSchema = new Schema(
    {
        name:{type: String},
        lastName:{type: String},
        email:{type: String},
        password:{type: String},
        birthdate:{type: Date},
        phone:{type: Number},
        grade:{type: String},
        isVerified:{type: Boolean},
        loginAttemps:{type: Number},
        timeOut:{type: String},
},{
    timestamps:true,
    strict:false
});

export default model("Estudiantes", estudiantesSchema);

