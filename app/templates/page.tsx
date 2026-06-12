
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
    color: "text-zinc-300 bg-zinc-900 border border-white/10",
  },
  {
    id: "glass",
    name: "Glass Studio",
    description: "Immersive glassmorphism with sleek sidebars.",
    icon: Layers,
    color: "text-zinc-300 bg-zinc-900 border border-white/10",
  },
  {
    id: "bento",
    name: "The Bento Suite",
    description: "iOS-style dashboard grid. Perfect for showcasing diverse projects.",
    icon: Grid,
    color: "text-zinc-300 bg-zinc-900 border border-white/10",
  },
  {
    id: "cyber",
    name: "Midnight Cyber",
    description: "Futuristic HUD interface with terminal aesthetics.",
    icon: Terminal,
    color: "text-zinc-300 bg-zinc-900 border border-white/10",
  },
  {
    id: "aurora",
    name: "Aurora Liquid",
    description: "Soft, fluid monolith with liquid entrance animations.",
    icon: Cpu,
    color: "text-zinc-300 bg-zinc-900 border border-white/10",
  },
  {
    id: "neo",
    name: "Neo Brutalist",
    description: "High-impact, high-contrast zine layout with heavy shadows.",
    icon: Layout,
    color: "text-zinc-300 bg-zinc-900 border border-white/10",
  },
  {
    id: "dimension",
    name: "Dimension 3D",
    description: "Immersive environment with interactive particle systems.",
    icon: Globe,
    color: "text-zinc-300 bg-zinc-900 border border-white/10",
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200 font-sans">
      <header className="border-b border-white/5 bg-[#030303]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => router.push("/")}
              className="flex items-center gap-2 group text-sm font-semibold text-zinc-500 hover:text-zinc-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
            <div className="flex items-center gap-2 text-zinc-100">
              <Logo className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-bold tracking-tight">Portfi Gallery</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 py-16 max-w-4xl">
        <div className="space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-amber-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
            Step 1
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Select an Architecture.
          </h1>
          <p className="text-lg text-zinc-500 font-medium">
            Choose a premium design system to start building your portfolio.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {templates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 flex items-center justify-between hover:border-amber-500/50 hover:bg-[#0f0f0f] transition-all cursor-pointer"
              onClick={() => router.push(`/builder?template=${template.id}`)}
            >
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${template.color}`}>
                  <template.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-zinc-500 text-sm mt-1 font-medium">
                    {template.description}
                  </p>
                </div>
              </div>
              
              <div className="hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">
                <span className="text-sm font-semibold text-amber-400">Select</span>
                <ArrowRight className="h-4 w-4 text-amber-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
