
"use client";

import Link from "next/link";
import { ArrowRight, Layout, Zap, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { motion } from "framer-motion";

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200 font-sans overflow-hidden">
      {/* Premium Ambient Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-amber-900/10 via-zinc-800/10 to-transparent blur-[120px] opacity-50" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-zinc-800/20 via-stone-800/10 to-transparent blur-[120px] opacity-50" />
      </div>

      <header className="border-b border-white/5 bg-[#030303]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-200 to-amber-500 text-black p-2 rounded-xl shadow-[0_0_15px_rgba(251,191,36,0.15)]">
              <Logo className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-100">Portfi</span>
          </div>
          <Link href="/templates">
            <Button className="bg-white text-black rounded-full px-6 font-semibold hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              Start Building
            </Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-32 md:py-48 px-8 relative">
          <div className="container mx-auto max-w-4xl text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-amber-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> The Premium Standard
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white"
            >
              Craft your digital legacy. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600">
                Uncompromising Quality.
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium"
            >
              An elite portfolio builder engineered for top-tier professionals. 
              Select a world-class architecture and export pure HTML.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center pt-8"
            >
              <Link href="/templates">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-gradient-to-r from-amber-200 to-amber-500 text-black hover:scale-105 transition-transform shadow-[0_0_30px_rgba(251,191,36,0.2)] flex items-center gap-2 font-bold">
                  View Gallery <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-[#050505] border-t border-white/5">
          <div className="container mx-auto px-8 max-w-5xl">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4 text-center md:text-left bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-zinc-900 border border-white/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner">
                  <Layout className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100">Immaculate Layouts</h3>
                <p className="text-zinc-500 leading-relaxed font-medium">
                  Architectural precision designed to showcase your highest-caliber work.
                </p>
              </div>
              <div className="space-y-4 text-center md:text-left bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-zinc-900 border border-white/10 text-zinc-100 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100">Peak Performance</h3>
                <p className="text-zinc-500 leading-relaxed font-medium">
                  Zero framework bloat. Lightning-fast static delivery engineered for speed.
                </p>
              </div>
              <div className="space-y-4 text-center md:text-left bg-[#0a0a0a] p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-zinc-900 border border-white/10 text-stone-300 rounded-2xl flex items-center justify-center mx-auto md:mx-0 shadow-inner">
                  <Download className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-zinc-100">Absolute Ownership</h3>
                <p className="text-zinc-500 leading-relaxed font-medium">
                  Export the pristine source code. Host it on your own terms.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 text-center border-t border-white/5 bg-[#030303]">
        <p className="text-zinc-600 font-medium text-sm">© {new Date().getFullYear()} Portfi. Premium Segment.</p>
      </footer>
    </div>
  );
}
