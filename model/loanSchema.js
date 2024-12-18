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
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: String,
    required: true,
  },
  processingFee: {
    type: String,
    required: true, // Changed from 'processFee' to match the initial data field
  },
  interest: {
    type: String,
    required: true,
  },
  totalInstallment: {
    type: String,
    required: true, // Added to match 'totalInstallment' in the data
  },
  installmentAmount: {
    type: String,
    required: true,
  },
  advancePayment: {
    type: String,
    required: true,
  },
  approvalDate: {
    type: Date,
    required: true, // Changed from 'loanApprovalDate' to 'approvalDate'
  },
  repaymentStartDate: {
    type: Date,
    required: true, // Changed from 'repaymentDate' to 'repaymentStartDate'
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  repaymentMethod: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
});

// Check if the model is already registered
const UserLoanData =
  mongoose.models.UserLoan || mongoose.model("UserLoan", userLoanSchema);

export default UserLoanData;
