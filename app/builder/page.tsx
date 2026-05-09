
"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Sparkles, 
  Download, 
  ArrowRight, 
  Eye, 
  ChevronRight, 
  Monitor, 
  Smartphone,
  Palette, 
  User, 
  Briefcase, 
  CircleCheckBig as CheckCircle2,
  Settings,
  Mail,
  Plus,
  Trash2,
  Globe,
  Send,
  CodeXml as Code2
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { motion, AnimatePresence } from "framer-motion";
import { saveAs } from "file-saver";
import { generatePortfolioHTML, fonts } from "@/utils/template-generator";
import { toast } from "sonner";
import { animate, stagger } from "animejs";
import PortfolioRenderer from "@/components/portfolio-renderer";

// Fallback for brand icons if they are missing in lucide version
const Linkedin = Briefcase;
const Github = Globe;
const Twitter = Send;

const steps = [
  { id: "personal", title: "Identity", icon: User },
  { id: "social", title: "Connect", icon: Globe },
  { id: "experience", title: "Experience", icon: Briefcase },
  { id: "projects", title: "Projects", icon: Code2 },
  { id: "theme", title: "Refinement", icon: Palette },
];

export default function BuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template") || "minimal";

  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [isPublishing, setIsPublishing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    bio: "",
    email: "",
    linkedin: "",
    github: "",
    twitter: "",
    experiences: [
      { id: "1", company: "", position: "", description: "Creative developer." }
    ],
    projects: [
      { id: "1", title: "", description: "", imageUrl: "" }
    ],
    primaryColor: "#6366f1",
    templateId: templateParam,
    fontId: "sans",
  });

  useEffect(() => {
    animate(".builder-header-content", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1000,
      easing: "outExpo"
    });
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { id: Math.random().toString(), company: "", position: "", description: "" }]
    }));
  };

  const removeExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: Math.random().toString(), title: "", description: "", imageUrl: "" }]
    }));
  };

  const removeProject = (id: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const updateProject = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const handleDownload = () => {
    const content = generatePortfolioHTML(formData);
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    saveAs(blob, `${formData.name.toLowerCase().replace(/ /g, "_")}_portfolio.html`);
    toast.success("Project Exported Successfully!");
  };

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const res = await fetch("/api/portfolio/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success("Portfolio Published Live!");
    } catch (error) {
      toast.error("Error publishing portfolio.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/70 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/70">
        <div className="container mx-auto flex h-20 items-center justify-between px-8">
          <button onClick={() => router.push("/templates")} className="flex items-center gap-2 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Gallery</span>
          </button>
          <div className="flex items-center gap-3">
            <Logo className="h-7 w-7" />
            <span className="text-sm font-bold tracking-tight uppercase">Legacy Studio</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="rounded-full h-11 px-8 font-bold border-slate-200" onClick={handlePublish} disabled={isPublishing}>
              {isPublishing ? "Publishing..." : "Publish Live"}
            </Button>
            <Button className="bg-slate-900 text-white rounded-full h-11 px-8 font-bold shadow-xl shadow-slate-200 dark:shadow-none" onClick={handleDownload}>
              Download Source
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 pt-32 pb-20">
        <div className="grid gap-16 lg:grid-cols-[1fr,480px]">
          {/* Builder UI */}
          <div className="space-y-12">
            <div className="space-y-2 builder-header-content">
              <h1 className="text-5xl font-black tracking-tight">Studio Mode.</h1>
              <p className="text-slate-500 text-lg">Architecting your <span className="capitalize font-bold text-slate-900 dark:text-white">{formData.templateId}</span> layout.</p>
            </div>

            <div className="flex items-center gap-4 border-b border-slate-100 pb-8 overflow-x-auto no-scrollbar">
              {steps.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(i)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all whitespace-nowrap ${
                    currentStep === i 
                      ? "bg-white shadow-md border border-slate-100 text-indigo-600 scale-105" 
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">{step.title}</span>
                </button>
              ))}
            </div>

            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {currentStep === 0 && (
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your Name"
                          className="w-full bg-white border border-slate-100 rounded-2xl h-16 px-6 focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-medium" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Bio</label>
                        <textarea 
                          value={formData.bio}
                          onChange={(e) => handleInputChange("bio", e.target.value)}
                          placeholder="Tell your story..."
                          className="w-full bg-white border border-slate-100 rounded-3xl p-6 min-h-[150px] focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-medium transition-all" 
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="hello@example.com"
                            className="w-full bg-white border border-slate-100 rounded-2xl h-16 pl-16 pr-6 focus:ring-2 focus:ring-indigo-500 outline-none" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">LinkedIn Profile</label>
                        <div className="relative">
                          <Linkedin className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                          <input 
                            type="text" 
                            value={formData.linkedin}
                            onChange={(e) => handleInputChange("linkedin", e.target.value)}
                            placeholder="linkedin.com/in/..."
                            className="w-full bg-white border border-slate-100 rounded-2xl h-16 pl-16 pr-6 focus:ring-2 focus:ring-indigo-500 outline-none" 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">GitHub</label>
                          <div className="relative">
                            <Github className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                            <input 
                              type="text" 
                              value={formData.github}
                              onChange={(e) => handleInputChange("github", e.target.value)}
                              placeholder="github.com/..."
                              className="w-full bg-white border border-slate-100 rounded-2xl h-16 pl-16 pr-6 focus:ring-2 focus:ring-indigo-500 outline-none" 
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Twitter (X)</label>
                          <div className="relative">
                            <Twitter className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                            <input 
                              type="text" 
                              value={formData.twitter}
                              onChange={(e) => handleInputChange("twitter", e.target.value)}
                              placeholder="@handle"
                              className="w-full bg-white border border-slate-100 rounded-2xl h-16 pl-16 pr-6 focus:ring-2 focus:ring-indigo-500 outline-none" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-8">
                      {formData.experiences.map((exp, index) => (
                        <div key={exp.id} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] relative group shadow-sm">
                          <button onClick={() => removeExperience(exp.id)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                             <Trash2 className="h-5 w-5" />
                          </button>
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-6 block">Position #0{index + 1}</span>
                          <div className="grid gap-6">
                            <input 
                              type="text" 
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                              placeholder="Job Title"
                              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl h-14 px-6 focus:ring-2 focus:ring-indigo-500 outline-none font-bold" 
                            />
                            <input 
                              type="text" 
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                              placeholder="Company Name"
                              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl h-14 px-6 focus:ring-2 focus:ring-indigo-500 outline-none" 
                            />
                          </div>
                        </div>
                      ))}
                      <Button onClick={addExperience} variant="outline" className="w-full h-16 rounded-2xl border-dashed border-2 gap-2 text-slate-400 hover:text-indigo-600">
                        <Plus className="h-5 w-5" /> Add Experience Record
                      </Button>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-8">
                      {formData.projects.map((proj, index) => (
                        <div key={proj.id} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] relative group shadow-sm">
                           <button onClick={() => removeProject(proj.id)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                             <Trash2 className="h-5 w-5" />
                          </button>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-6 block">Case Study #0{index + 1}</span>
                          <div className="grid gap-6">
                            <input 
                              type="text" 
                              value={proj.title}
                              onChange={(e) => updateProject(proj.id, "title", e.target.value)}
                              placeholder="Project Title"
                              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl h-14 px-6 focus:ring-2 focus:ring-indigo-500 outline-none font-bold" 
                            />
                            <textarea 
                              value={proj.description}
                              onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                              placeholder="Brief description..."
                              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl p-6 min-h-[100px] focus:ring-2 focus:ring-indigo-500 outline-none" 
                            />
                            <input 
                              type="text" 
                              value={proj.imageUrl}
                              onChange={(e) => updateProject(proj.id, "imageUrl", e.target.value)}
                              placeholder="Cover Image URL"
                              className="w-full bg-slate-50/50 border border-slate-100 rounded-xl h-14 px-6 focus:ring-2 focus:ring-indigo-500 outline-none text-xs" 
                            />
                          </div>
                        </div>
                      ))}
                      <Button onClick={addProject} variant="outline" className="w-full h-16 rounded-2xl border-dashed border-2 gap-2 text-slate-400 hover:text-emerald-600">
                        <Plus className="h-5 w-5" /> Add New Project
                      </Button>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="grid gap-8">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Architectural Core</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                           {["minimal", "glass", "neo", "bento", "cyber", "aurora", "dimension"].map((t) => (
                              <button
                                key={t}
                                onClick={() => handleInputChange("templateId", t)}
                                className={`p-4 rounded-2xl border-2 transition-all capitalize font-bold text-xs ${formData.templateId === t ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 hover:border-slate-200'}`}
                              >
                                 {t}
                              </button>
                           ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Branding</label>
                        <div className="flex gap-4 flex-wrap">
                          {["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#000000"].map((c) => (
                            <button
                              key={c}
                              onClick={() => handleInputChange("primaryColor", c)}
                              className={`w-12 h-12 rounded-full border-4 ${formData.primaryColor === c ? 'border-indigo-600 scale-110 shadow-lg' : 'border-white'} transition-all`}
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Typography Suite</label>
                        <div className="grid grid-cols-3 gap-4">
                          {fonts.map((f) => (
                            <button
                              key={f.id}
                              onClick={() => handleInputChange("fontId", f.id)}
                              className={`p-6 rounded-2xl border-2 transition-all ${formData.fontId === f.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 bg-white'}`}
                              style={{ fontFamily: f.family }}
                            >
                              <span className="text-xl font-bold">Aa</span>
                              <p className="text-[10px] uppercase font-black tracking-widest mt-2">{f.name}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between items-center pt-10 border-t border-slate-100">
               <button 
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity disabled:opacity-0"
                  disabled={currentStep === 0}
               >
                  Previous Section
               </button>
               <Button 
                  className="rounded-full h-14 px-10 font-bold bg-indigo-600 text-white"
                  onClick={() => {
                    if (currentStep < steps.length - 1) {
                      setCurrentStep(prev => prev + 1);
                    } else {
                      handleDownload();
                    }
                  }}
                >
                  {currentStep === steps.length - 1 ? "Complete & Export" : "Next Architecture"}
               </Button>
            </div>
          </div>

          {/* Live Preview Panel - Device Frame with Toggle */}
          <div className="sticky top-32 lg:h-[800px]">
            <div className="h-full w-full rounded-[3.5rem] border-[12px] border-slate-900 bg-white shadow-3xl overflow-hidden relative group">
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-black/80 p-1 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                 <button 
                    onClick={() => setViewMode("desktop")}
                    className={`p-2 rounded-full transition-all ${viewMode === "desktop" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
                 >
                    <Monitor className="h-4 w-4" />
                 </button>
                 <button 
                    onClick={() => setViewMode("mobile")}
                    className={`p-2 rounded-full transition-all ${viewMode === "mobile" ? "bg-white text-black" : "text-white hover:bg-white/10"}`}
                 >
                    <Smartphone className="h-4 w-4" />
                 </button>
              </div>

              <div className="h-full w-full overflow-y-auto overflow-x-hidden no-scrollbar pb-20 bg-[#050505]">
                <motion.div 
                  animate={{ 
                    width: viewMode === "desktop" ? "1200px" : "450px",
                    scale: viewMode === "desktop" ? 0.38 : 1
                  }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="origin-top-left h-auto min-h-full"
                >
                   <PortfolioRenderer user={{
                     name: formData.name || "Preview Name",
                     jobTitle: formData.jobTitle || "Role Title",
                     bio: formData.bio || "The journey starts with a single pixel. Welcome to my creative legacy.",
                     email: formData.email || "hello@legacy.com",
                     github: formData.github,
                     linkedin: formData.linkedin,
                     twitter: formData.twitter,
                     projects: formData.projects.length > 0 ? formData.projects : [{
                        id: "preview-1",
                        title: "Project Sample",
                        description: "Sample project description...",
                        imageUrl: ""
                     }],
                     experiences: formData.experiences.length > 0 ? formData.experiences : [{
                        id: "exp-1",
                        company: "Company Name",
                        position: "Role Name",
                        description: "Creative developer."
                     }],
                     themeSettings: {
                        layout: formData.templateId,
                        primaryColor: formData.primaryColor,
                        fontFamily: formData.fontId
                     }
                  }} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
