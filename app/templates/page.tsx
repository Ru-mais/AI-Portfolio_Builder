
"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Layout, 
  Layers, 
  Grid, 
  Terminal, 
  Cpu, 
  Monitor,
  Globe,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const templates = [
  {
    id: "minimal",
    name: "Classic Minimal",
    description: "Swiss-inspired split-screen layout. For those who let their work speak.",
    icon: Monitor,
    color: "text-slate-600 bg-slate-100",
  },
  {
    id: "glass",
    name: "Glass Studio",
    description: "Immersive glassmorphism with sleek sidebars.",
    icon: Layers,
    color: "text-indigo-600 bg-indigo-100",
  },
  {
    id: "bento",
    name: "The Bento Suite",
    description: "iOS-style dashboard grid. Perfect for showcasing diverse projects.",
    icon: Grid,
    color: "text-emerald-600 bg-emerald-100",
  },
  {
    id: "cyber",
    name: "Midnight Cyber",
    description: "Futuristic HUD interface with terminal aesthetics.",
    icon: Terminal,
    color: "text-rose-600 bg-rose-100",
  },
  {
    id: "aurora",
    name: "Aurora Liquid",
    description: "Soft, fluid monolith with liquid entrance animations.",
    icon: Cpu,
    color: "text-purple-600 bg-purple-100",
  },
  {
    id: "neo",
    name: "Neo Brutalist",
    description: "High-impact, high-contrast zine layout with heavy shadows.",
    icon: Layout,
    color: "text-yellow-600 bg-yellow-100",
  },
  {
    id: "dimension",
    name: "Dimension 3D",
    description: "Immersive environment with interactive particle systems.",
    icon: Globe,
    color: "text-blue-600 bg-blue-100",
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white font-sans">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => router.push("/")}
              className="flex items-center gap-2 group text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back Home</span>
            </button>
            <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />
            <div className="flex items-center gap-2 text-slate-800">
              <Logo className="h-5 w-5" />
              <span className="text-sm font-bold tracking-tight">Portfi Gallery</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 py-16 max-w-4xl">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Select a Template.
          </h1>
          <p className="text-lg text-slate-500 font-medium">
            Choose a professional design system to start building your portfolio.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {templates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-lg hover:border-indigo-200 transition-all cursor-pointer"
              onClick={() => router.push(`/builder?template=${template.id}`)}
            >
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${template.color}`}>
                  <template.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    {template.description}
                  </p>
                </div>
              </div>
              
              <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                <span className="text-sm font-semibold text-indigo-600">Select</span>
                <ArrowRight className="h-4 w-4 text-indigo-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
