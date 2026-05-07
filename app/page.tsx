"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  Layout,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 h-[40%] w-[70%] rounded-full bg-indigo-50 blur-[120px] dark:bg-indigo-900/10" />
      </div>

      {/* Clean Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-50">
              <Sparkles className="h-5 w-5 text-white dark:text-slate-900" />
            </div>
            <span className="text-lg font-bold tracking-tight">Legacy</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-medium">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 pt-24 pb-16 text-center sm:pt-32 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto max-w-4xl"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Showcase your work <br />
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">with style.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 dark:text-slate-400 sm:text-xl">
              The easiest way to create a professional, high-performance portfolio. Focus on your projects while we handle the design and deployment.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="h-12 px-8 bg-slate-900 text-white shadow-lg hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900">
                  Build Your Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="h-12 px-8 border-slate-200 dark:border-slate-800">
                  Explore Templates
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Clean Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-16 container mx-auto max-w-5xl px-4"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="aspect-video w-full rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                 <div className="flex flex-col items-center gap-3 text-slate-400">
                    <Layout className="h-12 w-12 opacity-20" />
                    <span className="text-sm font-medium uppercase tracking-widest opacity-50">Beautiful Minimalist Design</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-3">
              {[
                {
                  icon: <Rocket className="h-6 w-6" />,
                  title: "Fast Setup",
                  desc: "Go from zero to a live, professional portfolio in less than 5 minutes."
                },
                {
                  icon: <ShieldCheck className="h-6 w-6" />,
                  title: "Secure & Reliable",
                  desc: "Your data is protected with industry-standard encryption and secure authentication."
                },
                {
                  icon: <Globe2 className="h-6 w-6" />,
                  title: "Unique URL",
                  desc: "Get a personalized link to share with clients, recruiters, and the world."
                }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950 sm:p-16">
              <h2 className="text-3xl font-bold sm:text-4xl">Ready to get started?</h2>
              <p className="mt-4 text-lg text-slate-500">Create your account today and start building your dream portfolio.</p>
              <div className="mt-8">
                <Link href="/register">
                  <Button size="lg" className="h-12 px-10 bg-indigo-600 text-white hover:bg-indigo-700">
                    Join for Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-12 dark:border-slate-800">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm font-bold text-slate-900 dark:text-white">Legacy</span>
          <p className="text-sm text-slate-400">© 2026. Built for creators.</p>
        </div>
      </footer>
    </div>
  );
}
