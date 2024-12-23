import db_Connect from "@/helper/dbConnect";
import UserLoanData from "@/model/loanSchema";
import { NextResponse } from "next/server";

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
      processingFee, 
      interest,
      repaymentMethod,
      totalInstallment, 
      advancePayment,
      installmentAmount,
      approvalDate, 
      repaymentStartDate, 
      paymentMethod,
      owner,
      emiHistory,
    } = await request.json();

    console.log();
    const newLoan = new UserLoanData({
      name,
      customerId,
      loanId,
      phone,
      email,
      loanAmount,
      processingFee, // updated field name
      interest,
      repaymentMethod,
      totalInstallment, // updated field name
      advancePayment,
      installmentAmount,
      approvalDate, // updated field name
      repaymentStartDate, // updated field name
      paymentMethod,
      owner,
      emiHistory,
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
