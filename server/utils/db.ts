import { Console } from "console";
import mongoose from "mongoose";
import path from 'path'
require("dotenv").config({path:path.resolve(__dirname, '.env')})

const dbUrl = process.env.DB_URI || '';

const connectDB = async ()=>{
    try {
        await mongoose.connect(dbUrl).then((data:any)=>{
            console.log(`databaseconnected with ${data.connection.host}`);
            
        })
    } catch (error) {
        console.log(error.message)
        setTimeout(connectDB, 5000);
    }
}


export default connectDB