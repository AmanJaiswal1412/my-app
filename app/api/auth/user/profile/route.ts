import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

// Simulated current user (replace this with JWT auth logic)
const getCurrentUserId = () => 1; // Example user ID

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const birthDate = formData.get("birthDate") as string;
    const location = formData.get("location") as string;
    const password = formData.get("password") as string;
    const profilePicture = formData.get("profilePicture") as File | null;

    const userId = getCurrentUserId(); // Replace with actual auth
    const updateData: any = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (birthDate) updateData.birthDate = new Date(birthDate);
    if (location) updateData.location = location;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    // Handle file upload
    if (profilePicture && typeof profilePicture === "object") {
      const buffer = Buffer.from(await profilePicture.arrayBuffer());
      const filename = `${randomUUID()}_${profilePicture.name}`;
      const filePath = path.join(process.cwd(), "public", "uploads", filename);
      await writeFile(filePath, buffer);
      updateData.profilePicture = `/uploads/${filename}`;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
