// /app/api/reset-password/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return NextResponse.json({ success: false, message: "Email and new password are required" }, { status: 400 });
    }

    // Check if user exists in the database
    const user = await prisma.user.findUnique({ where: { email } }); 

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // TODO: Find user in your database by email
    // TODO: Hash the new password (very important! Don't store plain text passwords)
    // TODO: Update user's password in DB

    // Update the user's password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    console.log(`Password reset for: ${email} -> ${hashedPassword}`);

    return NextResponse.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "An error occurred during password reset" }, { status: 500 });
  }finally {
    await prisma.$disconnect();
  }
}
