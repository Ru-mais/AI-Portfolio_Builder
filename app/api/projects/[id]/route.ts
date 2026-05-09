import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;

    const project = await db.project.findUnique({
      where: { id }
    });

    if (!project || project.userId !== session.user.id) {
      return new NextResponse("Not Found", { status: 404 });
    }

    await db.project.delete({
      where: { id },
    });

    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    console.error("[PROJECT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    const { title, description, imageUrl, projectUrl, githubUrl } = body;

    const project = await db.project.findUnique({
      where: { id }
    });

    if (!project || project.userId !== session.user.id) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const updatedProject = await db.project.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        projectUrl,
        githubUrl,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("[PROJECT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
