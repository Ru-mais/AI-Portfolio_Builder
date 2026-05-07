"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  User, 
  Settings, 
  LogOut, 
  Sparkles,
  ChevronRight
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Projects",
    href: "/dashboard/projects",
    icon: Briefcase,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Theme Settings",
    href: "/dashboard/theme",
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userInitials = session?.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U";

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:flex">
        <div className="flex h-16 items-center px-6">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-50">
              <Sparkles className="h-5 w-5 text-white dark:text-slate-900" />
            </div>
            <span className="text-lg font-black uppercase tracking-tighter">Legacy</span>
          </Link>
        </div>

        <ScrollArea className="flex-1 px-4 py-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                  pathname === item.href
                    ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
                {pathname === item.href && (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </Link>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-auto p-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-white shadow-sm dark:border-slate-800">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback className="bg-slate-200 text-xs font-bold dark:bg-slate-800">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-bold">{session?.user?.name || "User"}</span>
                <span className="truncate text-[10px] text-slate-500">{session?.user?.email}</span>
              </div>
            </div>
            <Separator className="my-3 opacity-50" />
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 px-2 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
           <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-50">
              <Sparkles className="h-5 w-5 text-white dark:text-slate-900" />
            </div>
            <span className="text-lg font-black uppercase tracking-tighter">Legacy</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut className="h-5 w-5 text-red-500" />
          </Button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
