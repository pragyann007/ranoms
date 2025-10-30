import mongoose from "mongoose"

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    industry: { type: String },
    description: { type: String },
    jobs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Jobs"
    }
},{timestamps:true})

export const Company = mongoose.model("Company",companySchema);