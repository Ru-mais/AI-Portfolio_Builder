"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  ExternalLink, 
  Eye, 
  Plus,
  Rocket,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: session } = useSession();

  const firstName = session?.user?.name?.split(" ")[0] || "User";

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
          Welcome back, <span className="text-indigo-600">{firstName}!</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Here's what's happening with your Legacy portfolio today.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-slate-100 shadow-sm dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-slate-500 mt-1">Start by adding your first project</p>
          </CardContent>
        </Card>
        <Card className="border-slate-100 shadow-sm dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Views</CardTitle>
            <Eye className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-slate-500 mt-1">Share your link to get views</p>
          </CardContent>
        </Card>
        <Card className="border-slate-100 shadow-sm dark:border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <Rocket className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Draft</div>
            <p className="text-xs text-slate-500 mt-1">Publish to make it live</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-blue-100 bg-blue-50/30 dark:border-blue-900/20 dark:bg-blue-900/10">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get your portfolio ready for the world</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900">
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Button>
            <Button variant="outline" className="border-slate-200 dark:border-slate-800">
              Edit Theme
            </Button>
            <Button variant="outline" className="border-slate-200 dark:border-slate-800">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="border-slate-100 dark:border-slate-800">
          <CardHeader>
             <div className="flex items-center justify-between">
                <CardTitle>Live Preview</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-indigo-600">
                   View Site <ExternalLink className="h-3 w-3" />
                </Button>
             </div>
          </CardHeader>
          <CardContent>
             <div className="aspect-video w-full rounded-xl border border-dashed border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 flex flex-col items-center justify-center gap-2 text-slate-400">
                <LayoutDashboard className="h-8 w-8 opacity-20" />
                <span className="text-xs font-medium">Add content to see preview</span>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
