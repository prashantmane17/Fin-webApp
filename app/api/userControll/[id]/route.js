import { NextResponse } from "next/server";
import db_Connect from "@/helper/dbConnect";
import Owner from "@/model/userSchema";

export async function GET(request, { params }) {
  const { id } = params;
  await db_Connect();

  try {
    if (!id) {
      return NextResponse.json(
        { message: "ID is required to fetch data" },
        { status: 400 }
      );
    }

    const user = await Owner.findOne({ _id: id });

    if (!user) {
      return NextResponse.json(
        { message: "User not found!!" },
        { status: 404 }
      );
    }

    const { investAmount, withdrawnAmount } = user;

    return NextResponse.json(
      {
        success: true,
        investments: investAmount,
        withdrawals: withdrawnAmount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching data", error: error.message },
      { status: 500 }
    );
  }
}
