import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { 
      name, jobTitle, bio, 
      expCompany, expPosition, expDescription,
      eduSchool, eduDegree,
      projTitle, projDescription,
      primaryColor 
    } = body;

    // 1. Update User Profile
    await db.user.update({
      where: { id: session.user.id },
      data: {
        name,
        jobTitle,
        bio,
      },
    });

    // 2. Create Experience (Work)
    if (expCompany && expPosition) {
      await db.experience.create({
        data: {
          type: "WORK",
          company: expCompany,
          position: expPosition,
          description: expDescription,
          startDate: new Date(), // Defaulting for the wizard
          userId: session.user.id,
        },
      });
    }

    // 3. Create Education
    if (eduSchool && eduDegree) {
      await db.experience.create({
        data: {
          type: "EDUCATION",
          company: eduSchool,
          position: eduDegree,
          startDate: new Date(), // Defaulting for the wizard
          userId: session.user.id,
        },
      });
    }

    // 4. Create Project
    if (projTitle && projDescription) {
      await db.project.create({
        data: {
          title: projTitle,
          description: projDescription,
          userId: session.user.id,
        },
      });
    }

    // 5. Update Theme Settings
    await db.themeSettings.upsert({
      where: { userId: session.user.id },
      update: { primaryColor },
      create: {
        userId: session.user.id,
        primaryColor,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[WIZARD_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
