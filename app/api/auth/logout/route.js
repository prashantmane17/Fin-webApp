import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const response = NextResponse.json(
      { success: true, message: "User logged out successfully" },
      { status: 200 }
    );

    response.cookies.set("authToken", "", { maxAge: 0 });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Logout failed", error: error.message },
      { status: 500 }
    );
  }
}
