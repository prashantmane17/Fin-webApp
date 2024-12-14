import { NextResponse } from "next/server";
import db_Connect from "../../../../helper/dbConnect";
import Owner from "../../../../model/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await db_Connect();
  const { email, password } = await request.json();
  try {
    const userExits = await Owner.findOne({ email });
    if (!userExits) {
      return NextResponse.json(
        { message: "User not found!!" },
        { status: 404 }
      );
    }
    const checkPassword = bcrypt.compare(password, userExits.password);
    if (!checkPassword) {
      return NextResponse.json(
        { message: "Incorrect Password!!" },
        { status: 404 }
      );
    }
    const token = jwt.sign(
      {
        id: userExits._id,
        email: userExits.email,
        name: userExits.name,
        comapanyName: userExits.comapanyName,
      },
      process.env.JWT_SECRET, // Ensure JWT_SECRET is defined in your .env
      { expiresIn: "1w" } // Token expiration (1 week)
    );

    // Set the token in a cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
      },
      {
        status: 200,
      }
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true for production
      maxAge: 7 * 24 * 60 * 60, // 1 week in seconds
      path: "/",
    });

    return response;
  } catch (e) {
    return NextResponse.json({ message: e }, { status: 200 });
  }
}
