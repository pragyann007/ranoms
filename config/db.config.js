import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const url = process.env.MONGO_URL ; 
export const connectDb = async ()=>{
    try {
        await mongoose.connect(url)
        console.log("Db connected sucessfully !!")
    } catch (error) {

        console.log("error in db connection ",error)
        
    }
}