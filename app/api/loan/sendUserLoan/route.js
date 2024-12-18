import { NextResponse } from "next/server";
import db_Connect from "../../../../helper/dbConnect";
import UserLoanData from "../../../../model/loanSchema";

export async function POST(request) {
  await db_Connect();

  try {
    const {
      name,
      customerId,
      loanId,
      phone,
      email,
      loanAmount,
      processFee,
      interest,
      repaymentMethod,
      installMent,
      advancePayment,
      installmentAmount,
      loanApprovalDate,
      repaymentDate,
      paymentMethod,
    } = await request.json();

    const newLoan = new UserLoanData({
      name,
      customerId,
      loanId,
      phone,
      email,
      loanAmount,
      processFee,
      interest,
      repaymentMethod,
      installMent,
      advancePayment,
      installmentAmount,
      loanApprovalDate,
      repaymentDate,
      paymentMethod,
    });

    const savedLoan = await newLoan.save();

    return NextResponse.json(
      { success: true, data: savedLoan },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
