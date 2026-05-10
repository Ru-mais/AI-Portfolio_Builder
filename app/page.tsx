
"use client";

import Link from "next/link";
import { 
  Rocket, 
  Download, 
  Layout, 
  Sparkles, 
  Globe, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Palette,
  Terminal,
  Grid,
  Layers,
  Cpu,
  Monitor,
  MousePointer2,
  Lock,
  Workflow,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function MarketingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  const springConfig = { damping: 30, stiffness: 100 };
  const scrollSpring = useSpring(scrollYProgress, springConfig);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-indigo-600/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      </div>

      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="container mx-auto flex h-24 items-center justify-between px-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-12 w-12 bg-white text-black rounded-xl flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white group-hover:rotate-12 transition-all duration-500">
               <Logo className="h-7 w-7" />
            </div>
            <div className="flex flex-col -space-y-1">
                <span className="text-2xl font-black tracking-tighter uppercase italic">Legacy<span className="text-indigo-500">Studio</span></span>
                <span className="text-[8px] font-bold uppercase tracking-[0.6em] opacity-30">Professional Portfolio Builder</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-16 text-[10px] font-black uppercase tracking-[0.4em]">
              <a href="#features" className="opacity-40 hover:opacity-100 hover:text-indigo-400 transition-all">Features</a>
              <a href="#templates" className="opacity-40 hover:opacity-100 hover:text-indigo-400 transition-all">Templates</a>
              <a href="#tech" className="opacity-40 hover:opacity-100 hover:text-indigo-400 transition-all">Technology</a>
          </nav>
          <Link href="/templates">
            <Button className="bg-white text-black rounded-full h-12 px-10 font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white hover:scale-105 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]">
              Build Legacy
            </Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative container mx-auto px-8 pt-64 pb-32">
          <motion.div
            style={{ opacity, scale }}
            className="text-center space-y-12 max-w-6xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-xl">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
               New: 7 Premium Design Templates Live
            </div>
            <h1 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.75] uppercase italic">
               Design for <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Immortality.</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium leading-tight max-w-3xl mx-auto py-4">
               High-performance portfolio builder for developers and designers. Build in our Studio, export a dependency-free professional site.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-12">
               <Link href="/templates">
                 <Button size="lg" className="h-24 px-16 rounded-[2rem] bg-indigo-600 text-white text-2xl font-black uppercase tracking-widest hover:bg-indigo-500 hover:shadow-[0_25px_60px_rgba(79,70,229,0.4)] transition-all group border-b-[6px] border-indigo-900 active:border-b-0 active:translate-y-1">
                    Start Building <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-3 transition-transform" />
                 </Button>
               </Link>
               <Link href="#features" className="text-sm font-black uppercase tracking-[0.5em] opacity-30 hover:opacity-100 transition-opacity flex items-center gap-4">
                  Explore Features <MousePointer2 className="w-4 h-4" />
               </Link>
            </div>
          </motion.div>
        </section>

        {/* Marquee Features */}
        <div className="w-full border-y border-white/5 bg-black/20 py-8 overflow-hidden whitespace-nowrap">
            <div className="flex animate-marquee gap-24 items-center">
                {[1,2,3,4].map(i => (
                    <div key={i} className="flex gap-24 items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] opacity-20">Full Source Ownership</span>
                        <div className="w-2 h-2 rounded-full bg-indigo-500/40"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] opacity-20">No Maintenance Required</span>
                        <div className="w-2 h-2 rounded-full bg-indigo-500/40"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] opacity-20">Premium Motion Design</span>
                        <div className="w-2 h-2 rounded-full bg-indigo-500/40"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.8em] opacity-20">Zero Platform Dependencies</span>
                        <div className="w-2 h-2 rounded-full bg-indigo-500/40"></div>
                    </div>
                ))}
            </div>
        </div>

        {/* Feature Grid */}
        <section id="features" className="py-40 relative">
           <div className="container mx-auto px-8">
              <div className="grid md:grid-cols-4 gap-1 border border-white/5 bg-white/5 rounded-[4rem] overflow-hidden">
                 {[
                   { icon: Terminal, title: "Zero Lock-in", desc: "Download pure HTML/JS source code. Own your project forever.", color: "indigo" },
                   { icon: Cpu, title: "Motion SDK", desc: "Integrated cinematic scroll experiences in every template.", color: "purple" },
                   { icon: Layers, title: "Design Systems", desc: "7 distinct templates from Bento grids to Liquid HUDs.", color: "pink" },
                   { icon: ShieldCheck, title: "SEO Optimized", desc: "Automated schema metadata for maximum search performance.", color: "emerald" }
                 ].map((feature, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                     className="bg-[#080808] p-16 space-y-8 border-r border-white/5 last:border-0"
                   >
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                         <feature.icon className={`h-8 w-8 text-${feature.color}-500`} />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter italic">{feature.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-sm font-medium">{feature.desc}</p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Technology Stack */}
        <section id="tech" className="py-20">
            <div className="container mx-auto px-8 text-center space-y-16">
                <h3 className="text-xs font-black uppercase tracking-[1em] opacity-20">Powered By</h3>
                <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-40 grayscale hover:grayscale-0 transition-all">
                    <div className="flex items-center gap-4"><Logo className="w-8 h-8" /><span className="font-bold text-xl uppercase tracking-widest">Next.js</span></div>
                    <div className="flex items-center gap-4"><Zap className="w-8 h-8 text-yellow-500" /><span className="font-bold text-xl uppercase tracking-widest">Three.js</span></div>
                    <div className="flex items-center gap-4"><Rocket className="w-8 h-8 text-indigo-500" /><span className="font-bold text-xl uppercase tracking-widest">Anime.js</span></div>
                    <div className="flex items-center gap-4"><Lock className="w-8 h-8 text-emerald-500" /><span className="font-bold text-xl uppercase tracking-widest">Tailwind</span></div>
                </div>
            </div>
        </section>

        {/* Template Gallery Preview */}
        <section id="templates" className="py-40 bg-[#080808] relative overflow-hidden">
           <div className="container mx-auto px-8">
              <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
                 <div className="space-y-6">
                    <h2 className="text-7xl md:text-9xl font-black tracking-tighter leading-none uppercase italic">Templates.</h2>
                    <p className="text-2xl text-slate-500 max-w-xl font-medium">Curated design systems for your professional identity.</p>
                 </div>
                 <Link href="/templates">
                   <Button variant="outline" className="h-20 px-12 rounded-full font-black uppercase tracking-widest text-[10px] border-white/10 hover:bg-white hover:text-black transition-all">
                     View All Templates
                   </Button>
                 </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                 {[
                   { name: "Cyber HUD", layout: "HUD Layout", color: "from-indigo-500/20" },
                   { name: "Glass Studio", layout: "Glassmorphism", color: "from-purple-500/20" },
                   { name: "Bento Grid", layout: "Bento Style", color: "from-pink-500/20" },
                   { name: "Aurora Liquid", layout: "Fluid Motion", color: "from-emerald-500/20" },
                   { name: "Neo Brutalist", layout: "Modern Art", color: "from-orange-500/20" },
                   { name: "Classic Minimal", layout: "Minimalist", color: "from-slate-500/20" }
                 ].map((tmpl, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ y: -20, scale: 1.02 }}
                     className="group aspect-[4/5] rounded-[4rem] bg-black border border-white/5 p-16 flex flex-col justify-between relative overflow-hidden transition-shadow hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
                   >
                      <div className={`absolute inset-0 bg-gradient-to-br ${tmpl.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                      <div className="space-y-3 relative z-10">
                         <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 group-hover:opacity-100 transition-opacity">{tmpl.layout}</span>
                         <h3 className="text-4xl font-black uppercase tracking-tighter italic">{tmpl.name}</h3>
                      </div>
                      <div className="space-y-8 relative z-10">
                        <div className="h-px bg-white/10 w-full">
                            <motion.div 
                              className="h-full bg-white" 
                              initial={{ width: 0 }}
                              whileInView={{ width: "40%" }}
                            />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-20 group-hover:opacity-100 transition-opacity">
                            <span>Ready to build</span>
                            <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Final CTA */}
        <section className="py-64 text-center relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[150px] -z-10 animate-pulse" />
           <div className="container mx-auto px-8 space-y-16">
              <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter leading-[0.8] uppercase italic">Build your <br/> <span className="text-indigo-500">Digital Legacy.</span></h2>
              <p className="text-2xl text-slate-400 max-w-2xl mx-auto font-medium">Zero maintenance. Professional quality. Cinematic performance.</p>
              <div className="pt-12">
                 <Link href="/templates">
                    <Button size="lg" className="h-28 px-24 rounded-[3rem] bg-white text-black text-3xl font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white hover:scale-110 transition-all shadow-[0_40px_100px_rgba(255,255,255,0.1)]">
                       Initialize Studio
                    </Button>
                 </Link>
              </div>
           </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            display: inline-flex;
            animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
