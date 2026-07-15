import http from "http";
import dotenv from "dotenv";
import  app  from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    const server = http.createServer(app);
    server.listen(port,()=>{
        console.log(`server running on port ${port}`);    
    })
}

startServer().catch(err=>{
    console.log(`error staeting server :${err.message}`);
    process.exit(1);
})