
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    const user = await db.user.findUnique({
      where: { username },
      include: {
        projects: {
          orderBy: { createdAt: "desc" },
        },
        experiences: {
          orderBy: { startDate: "desc" },
        },
        themeSettings: true,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("[PORTFOLIO_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
