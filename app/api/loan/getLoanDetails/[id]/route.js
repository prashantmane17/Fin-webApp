import { NextResponse } from "next/server";
import UserLoanData from "@/model/loanSchema";
import db_Connect from "@/helper/dbConnect";

export async function GET(request, { params }) {
  await db_Connect();
  const { id } = params;

  try {
    const loans = await UserLoanData.find({ owner: id }).exec();

    if (loans.length === 0) {
      return NextResponse.json(
        { success: false, message: "No loans found for this owner" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, loans }, { status: 200 });
  } catch (error) {
    console.error("Error fetching loan data:", error.message);
    return NextResponse.json(
      { success: false, message: "Error fetching loan data" },
      { status: 500 }
    );
  }
}
