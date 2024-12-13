import { NextResponse } from "next/server";
import Owner from "../../../../model/userSchema";
import db_Connect from "../../../../helper/dbConnect";

// export const dynamic = "force-dynamic"; // Ensures the route is treated as dynamic

export async function POST(request) {
  await db_Connect();
  const { name, email, phone, companyName, password } = await request.json();
  try {
    const userExits = await Owner.findOne({ email }); // Fix findOne query syntax
    if (userExits) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new Owner({ name, email, phone, companyName, password });
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
