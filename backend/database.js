import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/gestorTareas")

const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("DB is connected")
})

connection.on("disconected", ()=>{
    console.log("DB is disconected")
})

connection.on("error", (error)=>{
    console.log("Error: " + error)
})

export default connection;
