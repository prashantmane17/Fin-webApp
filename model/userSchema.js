import mongoose from "mongoose";
const investMentSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: String,
  },
  remark: {
    type: String,
  },
});
const withdrawnSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: String,
  },
  remark: {
    type: String,
  },
});
const OwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  investAmount: [investMentSchema],
  withdrawnAmount: [withdrawnSchema],
});

const Owner = mongoose.models.Owner || mongoose.model("Owner", OwnerSchema);

export default Owner;
