import mongoose from "mongoose";

export const connect = async () => {

    mongoose.set("strictQuery", true)
    if(!process.env.DB_URL) {
        console.log("Database URL is not found Can not connect to MongoDB");
    }
    
    try{
        await mongoose.connect(process.env.DB_URL||"mongodb://localhost:27017/doveappdb")
        

    }catch(error){
        console.log(error);
    }

    
}

