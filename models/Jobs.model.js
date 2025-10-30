import { application } from "express";
import mongoose from "mongoose";

const joblistingScehma = new mongoose.Schema({
    title:{
        type:String
    },
    tags:[{type:String}],
    description:{type:String},
    requirements:[{type:String}], //skills for job ['creative','frontend dev','']
    salaryRange:{type:String},
    location:{type:String},
    companyId:{
        type:mongoose.Schema.Types.ObjectId(),
        ref:"Company"
    },
    applicants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    status:{
        type:String,
        enum:["Open","Close"]
    }

},{timestamps:true})

export const Jobs = mongoose.model("Jobs",joblistingScehma)