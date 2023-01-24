import mongoose from "mongoose";

const dbConnection = async()=>{
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGODB_CNN)

        console.log("connected to database");
    } catch (error) {
        console.log(error);
        throw new Error("Error al conectar a la base de datos")
    }
}


export {
    dbConnection
}