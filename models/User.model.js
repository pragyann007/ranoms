import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  skills: [{ type: String }],
  description: { type: String },
  experience: { type: String },

  // Here's the part you're asking for 👇
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      startYear: { type: String },
      endYear: { type: String },
    }
  ],

  resume: { type: String }, // could be a URL or path to uploaded CV
}, { timestamps: true });

export default mongoose.model("User", userSchema);
