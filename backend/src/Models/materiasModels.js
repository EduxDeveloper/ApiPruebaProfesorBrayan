import mongoose, {Schema, model} from "mongoose";

const materiasSchema = new Schema(
    {
        subjectName:{type: String},
        teacher_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profesores"},
        isAvailable:{type: Boolean},
     
},{
    timestamps:true,
    strict:false
});

export default model("Materias", materiasSchema);