import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db_Connect from "@/helper/dbConnect";
import Owner from "@/model/userSchema";

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

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new Owner({
      name,
      email,
      phone,
      companyName,
      password: hashPassword,
    });
    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        comapanyName: newUser.comapanyName,
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
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
