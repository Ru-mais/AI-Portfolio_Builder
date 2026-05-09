
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
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MarketingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500 overflow-hidden">
      {/* Immersive Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-indigo-600/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      </div>

      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-2xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
               <Logo className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">Legacy<span className="text-indigo-500">Studio</span></span>
          </div>
          <nav className="hidden md:flex gap-12 text-[11px] font-bold uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">
              <a href="#features" className="hover:text-indigo-400">Architecture</a>
              <a href="#templates" className="hover:text-indigo-400">Library</a>
          </nav>
          <Link href="/templates">
            <Button className="bg-white text-black rounded-full h-12 px-10 font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Build Legacy
            </Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative container mx-auto px-8 pt-60 pb-40">
          <motion.div
            style={{ opacity, scale }}
            className="text-center space-y-10 max-w-6xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.4em]">
               <Sparkles className="h-3 w-3" /> System Update: 6 Designer Architectures Live
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] uppercase italic">
               Deploy your <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Digital Soul.</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-400 font-medium leading-tight max-w-3xl mx-auto py-8">
               High-performance portfolio architecture for the modern elite. Build in Studio, deploy to your own metal.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
               <Link href="/templates">
                 <Button size="lg" className="h-20 px-14 rounded-2xl bg-indigo-600 text-white text-xl font-black uppercase tracking-widest hover:shadow-[0_20px_40px_rgba(79,70,229,0.3)] transition-all group border-b-4 border-indigo-800">
                    Enter Studio <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                 </Button>
               </Link>
               <Button size="lg" variant="outline" className="h-20 px-14 rounded-2xl border-2 border-white/10 text-xl font-bold hover:bg-white hover:text-black transition-all">
                  Documentation
               </Button>
            </div>
          </motion.div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-0 w-64 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
          <div className="absolute top-1/2 right-0 w-64 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
        </section>

        {/* Dynamic Features Grid */}
        <section id="features" className="py-40 relative">
           <div className="container mx-auto px-8">
              <div className="grid md:grid-cols-4 gap-1 border-t border-b border-white/5 bg-white/5">
                 {[
                   { icon: Terminal, title: "Zero Dependencies", desc: "Pure HTML/CSS/JS export. No bloat, just speed.", color: "indigo" },
                   { icon: Cpu, title: "Anime.js Engine", desc: "Pre-configured motion systems in every template.", color: "purple" },
                   { icon: Layers, title: "6 Architectures", desc: "Bento, HUD, Glass, and more unique structures.", color: "pink" },
                   { icon: Grid, title: "Auto-Layout", desc: "Responsive by design, perfect on every screen.", color: "emerald" }
                 ].map((feature, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                     className="bg-[#080808] p-12 space-y-6 border-x border-white/5"
                   >
                      <feature.icon className={`h-10 w-10 text-${feature.color}-500`} />
                      <h3 className="text-2xl font-bold uppercase tracking-tighter">{feature.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Immersive Gallery Section */}
        <section id="templates" className="py-40 bg-[#080808] relative overflow-hidden">
           <div className="container mx-auto px-8">
              <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
                 <div className="space-y-6">
                    <h2 className="text-7xl font-black tracking-tighter leading-none uppercase italic">The Library.</h2>
                    <p className="text-2xl text-slate-500 max-w-xl">Curated design systems for different professional identities.</p>
                 </div>
                 <Link href="/templates">
                   <Button variant="outline" className="h-16 px-10 rounded-full font-black uppercase tracking-widest text-[10px] border-white/10 hover:border-white transition-all">
                     View All Systems
                   </Button>
                 </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                 {[
                   { name: "Cyber HUD", layout: "Dynamic HUD", color: "from-indigo-500/20" },
                   { name: "Glass Studio", layout: "Blur Architect", color: "from-purple-500/20" },
                   { name: "Bento Dashboard", layout: "Grid Master", color: "from-pink-500/20" },
                   { name: "Aurora Liquid", layout: "Fluid Monolith", color: "from-emerald-500/20" },
                   { name: "Neo Brutalist", layout: "Punk Zine", color: "from-orange-500/20" },
                   { name: "Classic Minimal", layout: "Swiss Split", color: "from-slate-500/20" }
                 ].map((tmpl, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ y: -20 }}
                     className="group aspect-[4/5] rounded-[3rem] bg-black border border-white/5 p-12 flex flex-col justify-between relative overflow-hidden"
                   >
                      <div className={`absolute inset-0 bg-gradient-to-br ${tmpl.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                      <div className="space-y-2 relative z-10">
                         <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">{tmpl.layout}</span>
                         <h3 className="text-3xl font-black uppercase tracking-tighter">{tmpl.name}</h3>
                      </div>
                      <div className="h-1 bg-white/10 w-full relative z-10">
                        <motion.div 
                          className="h-full bg-white" 
                          initial={{ width: 0 }}
                          whileInView={{ width: "30%" }}
                        />
                      </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Final CTA */}
        <section className="py-60 text-center relative">
           <div className="container mx-auto px-8 space-y-12">
              <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none uppercase italic">Your legacy starts <br/> <span className="text-indigo-500">right here.</span></h2>
              <p className="text-2xl text-slate-400 max-w-2xl mx-auto">Zero friction. Zero maintenance. 100% Ownership.</p>
              <div className="pt-12">
                 <Link href="/templates">
                    <Button size="lg" className="h-24 px-20 rounded-full bg-white text-black text-2xl font-black uppercase tracking-widest hover:scale-105 hover:bg-indigo-500 hover:text-white transition-all">
                       Initialize Build
                    </Button>
                 </Link>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center bg-black">
         <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30">
            <div className="flex items-center gap-2">
               <Logo className="h-5 w-5" />
               <span className="text-xs font-bold uppercase tracking-widest">Legacy Studio</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest">© 2026 // ALL_SYSTEMS_OPERATIONAL</p>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
               <a>Github</a>
               <a>Terms</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
