
"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  Layout, 
  Layers, 
  Grid, 
  Terminal, 
  Cpu, 
  Monitor,
  Globe,
  CheckCircle2
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
    color: "bg-slate-900",
    gradient: "from-slate-500/20",
    features: ["Split Layout", "High Contrast", "Swiss Typography"]
  },
  {
    id: "glass",
    name: "Glass Studio",
    description: "Immersive glassmorphism with floating background orbs and sleek sidebars.",
    icon: Layers,
    color: "bg-indigo-600",
    gradient: "from-indigo-500/20",
    features: ["Mesh Gradients", "Backdrop Blur", "Sidebar Navigation"]
  },
  {
    id: "bento",
    name: "The Bento Suite",
    description: "iOS-style dashboard grid. Perfect for showcasing a diverse range of projects.",
    icon: Grid,
    color: "bg-emerald-600",
    gradient: "from-emerald-500/20",
    features: ["Dashboard Grid", "Rounded UI", "Interactive Cards"]
  },
  {
    id: "cyber",
    name: "Midnight Cyber",
    description: "Futuristic HUD interface with terminal aesthetics and glitch effects.",
    icon: Terminal,
    color: "bg-rose-600",
    gradient: "from-rose-500/20",
    features: ["HUD Layout", "Scanlines", "Glitch Engine"]
  },
  {
    id: "aurora",
    name: "Aurora Liquid",
    description: "Soft, fluid monolith with mesh gradients and liquid entrance animations.",
    icon: Cpu,
    color: "bg-purple-600",
    gradient: "from-purple-500/20",
    features: ["Liquid Motion", "Centered Layout", "Aurora Blobs"]
  },
  {
    id: "neo",
    name: "Neo Brutalist",
    description: "High-impact, high-contrast zine layout with heavy shadows and marquees.",
    icon: Zap,
    color: "bg-yellow-400",
    gradient: "from-yellow-500/20",
    features: ["Zine Style", "Elastic Motion", "Heavy Borders"]
  },
  {
    id: "dimension",
    name: "Dimension 3D",
    description: "Immersive Three.js environment with interactive particle systems and depth.",
    icon: Globe,
    color: "bg-blue-600",
    gradient: "from-blue-500/20",
    features: ["Three.js Engine", "Particle Physics", "Scroll Depth"]
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[50%] w-[50%] rounded-full bg-indigo-600/5 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[40%] w-[40%] rounded-full bg-purple-600/5 blur-[150px]" />
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-2xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => router.push("/")}
              className="flex items-center gap-2 group text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back Home</span>
            </button>
            <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
            <div className="flex items-center gap-2">
              <Logo className="h-6 w-6" />
              <span className="text-sm font-bold tracking-tight uppercase">Legacy Gallery</span>
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
            Professional Design Templates
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 py-24">
        <div className="max-w-4xl space-y-6 mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.3em]">
             <Sparkles className="h-3 w-3" /> Step 1: Select Architecture
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">Choose your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Design System.</span></h1>
          <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
            Every architecture is engineered for performance and compatibility. 
            Select a design to start building in the Studio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, i) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative flex flex-col bg-[#080808] border border-white/5 rounded-[3rem] p-10 overflow-hidden cursor-pointer"
              onClick={() => router.push(`/builder?template=${template.id}`)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl ${template.color} flex items-center justify-center mb-8 shadow-2xl`}>
                  <template.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-indigo-400 transition-colors">
                  {template.name}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {template.description}
                </p>
                
                <div className="mt-auto space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {template.features.map(f => (
                      <span key={f} className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/5 opacity-60">
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="h-[1px] bg-white/10 w-full" />
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-indigo-500">Start Project</span>
                    <ArrowLeft className="h-4 w-4 rotate-180 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
