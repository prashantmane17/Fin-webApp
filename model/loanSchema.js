import mongoose from "mongoose";

const emiHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  amount: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  paidDate: {
    type: Date,
  },
});

const penaltyHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  amount: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  paidDate: {
    type: Date,
  },
});

const userLoanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  loanId: {
    type: String,
    unique: true,
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
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
  totalInstallment: {
    type: String,
    required: true,
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
    required: true,
  },
  repaymentStartDate: {
    type: Date,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  repaymentMethod: {
    type: String,
    required: true,
  },
  emiHistory: [emiHistorySchema],
  penaltyHistory: [penaltyHistorySchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
  },
});

const UserLoanData =
  mongoose.models.UserLoan || mongoose.model("UserLoan", userLoanSchema);

export default UserLoanData;
