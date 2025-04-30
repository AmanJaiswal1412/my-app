// api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { emailOrPhone, password } = body;

  if (!emailOrPhone || !password) {
    return NextResponse.json({ error: 'Email/Phone and password are required' }, { status: 400 });
  }

  // Find user by email or phone (assuming email is the unique identifier)
  const user = await prisma.user.findUnique({
    where: {
      email: emailOrPhone, // You can add logic to search by phone as well
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  // Compare password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }

  // Issue JWT token
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'your_default_secret_key',
    { expiresIn: '7d' }
  );

  return NextResponse.json({ success: true, token });
}
