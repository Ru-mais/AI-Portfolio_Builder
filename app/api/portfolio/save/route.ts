
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    const body = await req.json();
    const { 
      name, 
      jobTitle, 
      bio, 
      email,
      linkedin,
      github,
      twitter,
      templateId, 
      primaryColor, 
      fontId,
      projects,
      experiences
    } = body;

    // If no session, we skip the DB save but return success to allow the UI to continue
    // This allows "No Login Required" mode where users can still design and download
    if (!session?.user?.email) {
      return NextResponse.json({ 
        message: "Guest session: Portfolio generated successfully. Download source code to save permanently.",
        isGuest: true 
      });
    }

    const user = await db.user.update({
      where: { email: session.user.email },
      data: {
        name,
        jobTitle,
        bio,
        github,
        linkedin,
        twitter,
        themeSettings: {
          upsert: {
            create: {
              layout: templateId,
              primaryColor: primaryColor,
              fontFamily: fontId
            },
            update: {
              layout: templateId,
              primaryColor: primaryColor,
              fontFamily: fontId
            }
          }
        },
        projects: {
          deleteMany: {}, 
          create: projects.map((p: any) => ({
            title: p.title || "Untitled Project",
            description: p.description || "",
            imageUrl: p.imageUrl,
            published: true
          }))
        },
        experiences: {
          deleteMany: {},
          create: experiences.map((e: any) => ({
            company: e.company || "Unknown Company",
            position: e.position || "Unknown Role",
            startDate: new Date(),
          }))
        }
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[PORTFOLIO_SAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
