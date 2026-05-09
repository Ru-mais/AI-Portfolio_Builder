import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { prompt } = await req.json();

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    /**
     * NOTE: This is where you would normally call an AI API like OpenAI or Anthropic.
     * For this demonstration, we are using a sophisticated simulation that structures
     * the user's input into a professional portfolio format.
     */
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simple keyword extraction for the simulation
    const bio = `A passionate professional focused on ${prompt.substring(0, 100)}... dedicated to delivering high-impact solutions and building innovative digital experiences.`;
    
    const projects = [
      {
        title: "Innovative Project Alpha",
        description: `A sophisticated implementation based on your interest in ${prompt.split(' ')[0] || 'technology'}. Built with performance and scalability in mind.`,
      },
      {
        title: "Enterprise Solution Beta",
        description: "A comprehensive tool designed to solve complex business challenges using modern web standards.",
      }
    ];

    const result = {
      bio,
      projects,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("[AI_GENERATE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
