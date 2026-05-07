import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/utils/validations/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedFields = RegisterSchema.safeParse(body);

    if (!validatedFields.success) {
      return new NextResponse("Invalid fields", { status: 400 });
    }

    const { email, password, name, phone, username } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingEmail = await db.user.findUnique({
      where: { email }
    });

    if (existingEmail) {
      return new NextResponse("Email already in use", { status: 400 });
    }

    if (phone) {
      const existingPhone = await db.user.findUnique({
        where: { phone }
      });
      if (existingPhone) {
        return new NextResponse("Phone number already registered", { status: 400 });
      }
    }

    // Generate a default username if not provided
    const finalUsername = username || email.split("@")[0] + Math.floor(Math.random() * 1000);

    const user = await db.user.create({
      data: {
        email,
        name,
        phone,
        username: finalUsername,
        password: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("REGISTRATION_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
