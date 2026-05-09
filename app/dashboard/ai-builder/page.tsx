"use client";

import { useState } from "react";
import { 
  Wand2, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function AIBuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!prompt) {
      toast.error("Please enter a description of yourself.");
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
        toast.success("Portfolio generated!");
      } else {
        toast.error("AI Generation failed. Please try again.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  };

  const saveToProfile = async () => {
    try {
      // Save bio
      await fetch("/api/user/profile", {
        method: "PATCH",
        body: JSON.stringify({ bio: result.bio }),
      });

      // Save projects (simplified)
      for (const project of result.projects) {
        await fetch("/api/projects", {
          method: "POST",
          body: JSON.stringify(project),
        });
      }

      toast.success("All AI suggestions saved to your profile!");
      setResult(null);
      setPrompt("");
    } catch (err) {
      toast.error("Failed to save some items.");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tight flex items-center justify-center gap-3">
          <Sparkles className="h-8 w-8 text-indigo-600" /> AI Portfolio Builder
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg">
          Describe your career, and let AI build your Legacy.
        </p>
      </div>

      <Card className="border-indigo-100 bg-indigo-50/20 dark:border-indigo-900/20 dark:bg-indigo-900/5 shadow-xl shadow-indigo-100/20 dark:shadow-none">
        <CardHeader>
          <CardTitle>Tell your story</CardTitle>
          <CardDescription>
            Include your skills, past projects, and what you're passionate about.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            placeholder="e.g. I am a fullstack developer with 3 years of experience in React and Node. I built a social media app for pets and I love working on open source..." 
            className="min-h-[150px] text-lg bg-white dark:bg-slate-950 border-indigo-100 dark:border-indigo-900 focus-visible:ring-indigo-600"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button 
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg" 
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Generating your Legacy...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-5 w-5" /> Generate Portfolio
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Bio Suggestion */}
            <Card className="border-emerald-100 dark:border-emerald-900/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-emerald-600 dark:text-emerald-400">Generated Bio</CardTitle>
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <p className="text-lg italic text-slate-700 dark:text-slate-300">"{result.bio}"</p>
              </CardContent>
            </Card>

            {/* Project Suggestions */}
            <div className="grid gap-6 md:grid-cols-2">
              {result.projects.map((p: any, i: number) => (
                <Card key={i} className="border-slate-100 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-indigo-600 dark:text-indigo-400">{p.title}</CardTitle>
                    <CardDescription>{p.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Button size="lg" className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900" onClick={saveToProfile}>
              Apply All Suggestions <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
