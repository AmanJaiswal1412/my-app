import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Simulate sending OTP
  const generatedOTP = '123456'; // You would generate a real random OTP in production

  console.log(`Sending OTP ${generatedOTP} to email/phone: ${email}`);

  // In real-world apps:
  // Save OTP to DB mapped to the email
  // Send OTP using email service like SendGrid / SMS service like Twilio

  return NextResponse.json({ success: true, message: 'OTP sent successfully' });
}
