import mongoose from "mongoose";

// Define the Owner Schema
const OwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String, 
  },
  companyName: {
    type: String,
    required: true,
  },
});

const Owner = mongoose.models.Owner || mongoose.model("Owner", OwnerSchema);

export default Owner;
