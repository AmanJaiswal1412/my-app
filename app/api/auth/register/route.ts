import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { 
    email,
    otp,
    firstName,
    lastName,
    phone,
    birthDate,
    location,
    password
  } = body;

  if (!email || !otp || !firstName || !lastName || !phone || !birthDate || !location || !password) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // 1. Verify OTP
  // (For now assume OTP is always 123456)
  if (otp !== '123456') {
    return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
  }

  // 2. Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Create user
  const newUser = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      phone,
      birthDate: new Date(birthDate),
      location,
      password: hashedPassword,
    },
  });

  // 5. Issue JWT
  const token = jwt.sign(
    {
      id: newUser.id,
      email: newUser.email,
      name: `${newUser.firstName} ${newUser.lastName}`,
    },
    process.env.JWT_SECRET || 'your_default_secret_key',
    { expiresIn: '7d' }
  );

  return NextResponse.json({ success: true, token });
}
