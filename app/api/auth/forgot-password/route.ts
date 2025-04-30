// /app/api/forgot-password/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // TODO: Check if user exists in DB
    // TODO: Generate token or OTP
    // TODO: Save token to DB
    // TODO: Send reset email

    console.log(`Reset link should be sent to: ${email}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
