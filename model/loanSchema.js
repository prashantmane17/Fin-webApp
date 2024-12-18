import mongoose from "mongoose";

const userLoanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
    unique: true,
  },
  loanId: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: String,
    required: true,
  },
  processFee: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
  repaymentMethod: {
    type: String,
    required: true,
  },
  installMent: {
    type: String,
    required: true,
  },
  advancePayment: {
    type: String,
    required: true,
  },
  installmentAmount: {
    type: String,
    required: true,
  },
  loanApprovalDate: {
    type: Date,
    required: true,
  },
  repaymentDate: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
});
const UserLoanData =
  mongoose.model.UserLoan || mongoose.model("UserLoan", userLoanSchema);

export default UserLoanData;
