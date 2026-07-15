import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI,{
            dbName:"courier-delivery-app"
        })
        console.log("mongodb connected");
        
    } catch (error) {
        console.error(`mongodb connection error :${error.message}`);
        process.exit(1)
    }
}