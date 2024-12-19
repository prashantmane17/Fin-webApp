import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("authToken")?.value;

  const urlPath = req.nextUrl.pathname;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);

      // Redirect to dashboard if already logged in and visiting login or signup
      if (urlPath === "/login" || urlPath === "/signup") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      // Allow access to protected routes
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware: Invalid or expired token:", error.message);
      // If token is invalid or expired, clear it and redirect to login
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("authToken");
      return response;
    }
  }

  // If no token and visiting protected routes, redirect to login
  if (urlPath.startsWith("/dashboard")) {
    console.log("Middleware: No token found, redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow access to public routes (e.g., login, signup)
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
