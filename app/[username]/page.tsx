
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import PortfolioRenderer from "@/components/portfolio-renderer";

interface PortfolioPageProps {
  params: {
    username: string;
  };
}

// This page uses the internal data layer to build the portfolio dynamically
async function getPortfolioData(username: string) {
  try {
    // We use the direct DB access for the server component to avoid self-referencing fetch issues in some environments,
    // while keeping the logic consistent with our API structure.
    const user = await db.user.findUnique({
      where: { username },
      include: {
        projects: { orderBy: { createdAt: "desc" } },
        experiences: { orderBy: { startDate: "desc" } },
        themeSettings: true,
      },
    });
    
    return user;
  } catch (error) {
    return null;
  }
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { username } = params;
  const user = await getPortfolioData(username);

  if (!user) {
    return notFound();
  }

  return <PortfolioRenderer user={user as any} />;
}
