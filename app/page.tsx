
"use client";

import Link from "next/link";
import { ArrowRight, Layout, Zap, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { motion } from "framer-motion";

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-500 selection:text-white font-sans overflow-hidden">
      {/* Colorful Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-indigo-300/40 via-purple-300/40 to-pink-300/40 blur-[100px] opacity-70 animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-cyan-300/40 via-emerald-300/40 to-teal-300/40 blur-[100px] opacity-70 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <header className="border-b border-slate-200/50 bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex h-20 items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-2 rounded-xl shadow-md">
              <Logo className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">Portfi</span>
          </div>
          <Link href="/templates">
            <Button className="bg-slate-900 text-white rounded-full px-6 font-medium hover:bg-indigo-600 transition-colors shadow-sm">
              Start Building
            </Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-32 md:py-48 px-8 relative">
          <div className="container mx-auto max-w-4xl text-center space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-900"
            >
              Build your digital legacy. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Beautiful & Minimal.
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto font-medium"
            >
              A high-performance portfolio builder for professionals. 
              Choose a stunning layout, add your content, and export pure HTML.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center pt-8"
            >
              <Link href="/templates">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center gap-2">
                  View Templates <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-white/60 backdrop-blur-sm border-t border-slate-200/50">
          <div className="container mx-auto px-8 max-w-5xl">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="space-y-4 text-center md:text-left bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
                  <Layout className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Clean Layouts</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Carefully crafted templates designed to put your work front and center.
                </p>
              </div>
              <div className="space-y-4 text-center md:text-left bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Fast Performance</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  No heavy frameworks. Export lightweight, fast-loading static sites.
                </p>
              </div>
              <div className="space-y-4 text-center md:text-left bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Own Your Source</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Download the final source code. Host it anywhere you want, forever.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 text-center border-t border-slate-200/50 bg-white/80">
        <p className="text-slate-500 font-medium text-sm">© {new Date().getFullYear()} Portfi. Professional Portfolio Builder.</p>
      </footer>
    </div>
  );
}
