import { NextResponse } from "next/server";
import db_Connect from "@/helper/dbConnect";
import Owner from "@/model/userSchema";

export async function PUT(request) {
  await db_Connect();

  const { email, investments, withdrawal } = await request.json();

  try {
    const user = await Owner.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found!!" },
        { status: 404 }
      );
    }

    if (investments) {
      user.investAmount.push({
        date: investments.date || new Date(),
        amount: investments.amount || "0",
        remark: investments.remark || "",
      });
    }

    if (withdrawal) {
      user.withdrawnAmount.push({
        date: withdrawal.date || new Date(),
        amount: withdrawal.amount || "0",
        remark: withdrawal.remark || "",
      });
    }

    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "Investment/Withdrawal updated successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating investment/withdrawal", error },
      { status: 500 }
    );
  }
}
