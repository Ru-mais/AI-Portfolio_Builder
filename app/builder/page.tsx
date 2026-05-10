
"use client";

import { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Sparkles, 
  Download, 
  ArrowRight, 
  Eye, 
  ChevronRight, 
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
  CodeXml as Code2,
  Maximize2,
  GraduationCap,
  Cpu,
  Image as ImageIcon,
  Upload,
  Type
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

const steps = [
  { id: "personal", title: "Information", icon: User },
  { id: "social", title: "Connect", icon: Globe },
  { id: "education", title: "Education", icon: GraduationCap },
  { id: "techstack", title: "Skills", icon: Cpu },
  { id: "experience", title: "Experience", icon: Briefcase },
  { id: "projects", title: "Projects", icon: Code2 },
  { id: "theme", title: "Visuals", icon: Palette },
];

const colorPalette = [
  { name: "Indigo", hex: "#6366f1" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Rose", hex: "#f43f5e" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Violet", hex: "#8b5cf6" },
  { name: "White", hex: "#ffffff" },
  { name: "Lime", hex: "#84cc16" },
];

export default function BuilderPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateParam = searchParams.get("template") || "minimal";
  
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [previewScale, setPreviewScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "Alex Rivera",
    jobTitle: "Full-Stack Developer",
    bio: "I build modern web applications with a focus on performance, scalability, and user experience.",
    email: "alex@example.com",
    linkedin: "",
    github: "",
    twitter: "",
    education: [
      { id: "1", degree: "Computer Science", school: "University of Technology", year: "2020-2024" }
    ],
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    experiences: [
      { id: "1", company: "Tech Solutions Inc", position: "Senior Developer", year: "2022 - Present", description: "Leading the development of high-traffic SaaS platforms." }
    ],
    projects: [
      { id: "1", title: "E-Commerce Suite", description: "A high-performance online store with real-time inventory management.", imageUrl: "" }
    ],
    primaryColor: "#6366f1",
    templateId: templateParam,
    fontId: "sans",
  });

  useEffect(() => {
    const updateMetrics = () => {
      if (previewContainerRef.current && contentRef.current) {
        const containerWidth = previewContainerRef.current.offsetWidth;
        const targetWidth = 1440;
        const scale = containerWidth / targetWidth;
        setPreviewScale(scale);
        
        setTimeout(() => {
           if (contentRef.current) {
              setContentHeight(contentRef.current.scrollHeight);
           }
        }, 100);
      }
    };
    
    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    const observer = new ResizeObserver(updateMetrics);
    if (contentRef.current) observer.observe(contentRef.current);
    
    return () => {
       window.removeEventListener("resize", updateMetrics);
       observer.disconnect();
    };
  }, [formData.templateId, formData.fontId]);

  useEffect(() => {
    animate(".builder-nav-item", { opacity: [0, 1], translateY: [10, 0], delay: stagger(50), duration: 800, easing: "outExpo" });
  }, []);

  const handleInputChange = (field: string, value: any) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    const content = generatePortfolioHTML(formData as any);
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    saveAs(blob, `${formData.name.toLowerCase().replace(/ /g, "_")}_portfolio.html`);
    toast.success("Portfolio downloaded successfully!");
  };

  const updateArray = (field: 'education' | 'experiences' | 'projects', id: string, data: any) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].map(item => item.id === id ? { ...item, ...data } : item) }));
  };

  const addItem = (field: 'education' | 'experiences' | 'projects', emptyObj: any) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], { ...emptyObj, id: Math.random().toString(36).substr(2, 9) }] }));
  };

  const removeItem = (field: 'education' | 'experiences' | 'projects', id: string) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter(item => item.id !== id) }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-indigo-500 selection:text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/80 backdrop-blur-2xl">
        <div className="container mx-auto flex h-24 items-center justify-between px-8">
          <div className="flex items-center gap-12">
            <button onClick={() => router.push("/templates")} className="flex items-center gap-3 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-2 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Templates</span>
            </button>
            <div className="flex items-center gap-4"><Logo className="h-8 w-8" /><div className="h-8 w-px bg-white/10"></div><span className="text-sm font-black tracking-widest uppercase italic">Legacy Studio</span></div>
          </div>
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 overflow-x-auto max-w-2xl no-scrollbar">
             {steps.map((step, i) => (
                <button key={step.id} onClick={() => setCurrentStep(i)} className={`builder-nav-item flex items-center gap-3 px-6 py-3 rounded-full transition-all whitespace-nowrap ${currentStep === i ? "bg-white text-black" : "text-white/40 hover:text-white"}`}>
                  <step.icon className="h-4 w-4" /><span className="text-[10px] font-black uppercase tracking-widest">{step.title}</span>
                </button>
             ))}
          </div>
          <div className="flex items-center gap-4">
             <Button 
                className="bg-white text-black rounded-full h-12 px-8 font-black uppercase text-[10px] tracking-widest transition-all duration-300"
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = formData.primaryColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                onClick={handleDownload}
             >
                Export HTML
             </Button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-40 px-8 flex flex-col items-center">
        <div className="w-full max-w-5xl mb-12">
           <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-[#111] border border-white/10 rounded-[3rem] p-12">
                 {currentStep === 0 && (
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-6"><label className="text-[10px] font-black uppercase tracking-widest text-white/30">Your Name</label><input type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} className="w-full bg-black border border-white/5 rounded-2xl h-16 px-6 outline-none text-2xl font-bold italic" /></div>
                      <div className="space-y-6"><label className="text-[10px] font-black uppercase tracking-widest text-white/30">About You</label><textarea value={formData.bio} onChange={(e) => handleInputChange("bio", e.target.value)} className="w-full bg-black border border-white/5 rounded-3xl p-8 min-h-[200px] outline-none text-xl italic leading-relaxed" /></div>
                    </div>
                  )}
                  {currentStep === 1 && (
                    <div className="grid md:grid-cols-2 gap-12">
                       <div className="space-y-6"><label className="text-[10px] font-black uppercase tracking-widest text-white/30">Email Address</label><input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-full bg-black border border-white/5 rounded-2xl h-16 px-6 outline-none text-xl" /></div>
                       <div className="space-y-6"><label className="text-[10px] font-black uppercase tracking-widest text-white/30">Social Links</label><div className="grid gap-4"><input type="text" value={formData.linkedin} onChange={(e) => handleInputChange("linkedin", e.target.value)} placeholder="LinkedIn URL" className="w-full bg-black border border-white/5 rounded-xl h-14 px-6 outline-none" /><input type="text" value={formData.github} onChange={(e) => handleInputChange("github", e.target.value)} placeholder="GitHub URL" className="w-full bg-black border border-white/5 rounded-xl h-14 px-6 outline-none" /><input type="text" value={formData.twitter} onChange={(e) => handleInputChange("twitter", e.target.value)} placeholder="Twitter URL" className="w-full bg-black border border-white/5 rounded-xl h-14 px-6 outline-none" /></div></div>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="space-y-10">
                       <div className="flex justify-between items-center"><h3 className="text-xs font-black uppercase tracking-[0.5em] text-white/20">Education</h3><Button onClick={() => addItem('education', { degree: '', school: '', year: '' })} variant="outline" className="rounded-full h-12 px-8 uppercase text-[10px] font-black tracking-widest"><Plus className="h-4 w-4 mr-2" /> Add Entry</Button></div>
                       <div className="grid gap-8">{formData.education.map(edu => (<div key={edu.id} className="p-12 bg-black/40 border border-white/5 rounded-[3rem] relative group"><button onClick={() => removeItem('education', edu.id)} className="absolute top-10 right-10 text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-6 w-6" /></button><div className="grid md:grid-cols-3 gap-8"><div className="space-y-4"><label className="text-[10px] font-black uppercase tracking-widest text-white/20">Degree</label><input type="text" value={edu.degree} onChange={(e) => updateArray('education', edu.id, { degree: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 h-14 outline-none font-bold text-xl" /></div><div className="space-y-4"><label className="text-[10px] font-black uppercase tracking-widest text-white/20">Institution</label><input type="text" value={edu.school} onChange={(e) => updateArray('education', edu.id, { school: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 h-14 outline-none" /></div><div className="space-y-4"><label className="text-[10px] font-black uppercase tracking-widest text-white/20">Period</label><input type="text" value={edu.year} onChange={(e) => updateArray('education', edu.id, { year: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 h-14 outline-none italic" /></div></div></div>))}</div>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="space-y-10">
                       <h3 className="text-xs font-black uppercase tracking-[0.5em] text-white/20 text-center">Skills Array</h3>
                       <div className="flex flex-wrap gap-4 justify-center">{formData.skills.map(s => (<div key={s} className="bg-white/5 border border-white/10 px-8 py-4 rounded-full group flex items-center gap-4 hover:bg-white/10 transition-colors"><span className="text-sm font-black uppercase tracking-widest">{s}</span><button onClick={() => setFormData(prev => ({ ...prev, skills: prev.skills.filter(sk => sk !== s) }))}><Trash2 className="h-4 w-4 text-red-500 opacity-0 group-hover:opacity-100" /></button></div>))}<input onKeyDown={(e) => { if (e.key === 'Enter' && e.currentTarget.value) { setFormData(prev => ({ ...prev, skills: [...prev.skills, e.currentTarget.value] })); e.currentTarget.value = ''; } }} placeholder="Add Skill + Enter" className="bg-transparent border-b-2 border-white/10 px-8 py-4 text-sm outline-none focus:border-white text-center min-w-[300px]" /></div>
                    </div>
                  )}
                  {currentStep === 4 && (
                    <div className="space-y-10">
                       <div className="flex justify-between items-center"><h3 className="text-xs font-black uppercase tracking-[0.5em] text-white/20">Experience</h3><Button onClick={() => addItem('experiences', { company: '', position: '', year: '', description: '' })} variant="outline" className="rounded-full h-12 px-8 uppercase text-[10px] font-black tracking-widest"><Plus className="h-4 w-4 mr-2" /> Add Experience</Button></div>
                       <div className="grid gap-8">{formData.experiences.map(exp => (<div key={exp.id} className="p-12 bg-black/40 border border-white/5 rounded-[3rem] relative group"><button onClick={() => removeItem('experiences', exp.id)} className="absolute top-10 right-10 text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-6 w-6" /></button><div className="grid md:grid-cols-3 gap-8"><div className="space-y-4"><label className="text-[10px] font-black uppercase tracking-widest text-white/20">Position</label><input type="text" value={exp.position} onChange={(e) => updateArray('experiences', exp.id, { position: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 h-14 outline-none font-black italic text-xl" /></div><div className="space-y-4"><label className="text-[10px] font-black uppercase tracking-widest text-white/20">Company</label><input type="text" value={exp.company} onChange={(e) => updateArray('experiences', exp.id, { company: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 h-14 outline-none uppercase tracking-widest" /></div><div className="space-y-4"><label className="text-[10px] font-black uppercase tracking-widest text-white/20">Years</label><input type="text" value={exp.year} onChange={(e) => updateArray('experiences', exp.id, { year: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 h-14 outline-none italic font-bold" style={{ color: formData.primaryColor }} /></div></div><textarea value={exp.description} onChange={(e) => updateArray('experiences', exp.id, { description: e.target.value })} placeholder="Describe your role..." className="w-full bg-transparent border border-white/5 rounded-2xl p-8 mt-10 outline-none italic text-white/40 leading-relaxed" /></div>))}</div>
                    </div>
                  )}
                  {currentStep === 5 && (
                    <div className="space-y-10">
                       <div className="flex justify-between items-center"><h3 className="text-xs font-black uppercase tracking-[0.5em] text-white/20">Projects</h3><Button onClick={() => addItem('projects', { title: '', description: '', imageUrl: '' })} variant="outline" className="rounded-full h-12 px-8 uppercase text-[10px] font-black tracking-widest"><Plus className="h-4 w-4 mr-2" /> Add Project</Button></div>
                       <div className="grid gap-12">{formData.projects.map(proj => (<div key={proj.id} className="p-12 bg-black/40 border border-white/5 rounded-[4rem] group relative"><button onClick={() => removeItem('projects', proj.id)} className="absolute top-12 right-12 text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-7 w-7" /></button><div className="grid md:grid-cols-[1fr,400px] gap-16"><div><div className="space-y-6"><label className="text-[10px] font-black uppercase tracking-widest text-white/20">Project Title</label><input type="text" value={proj.title} onChange={(e) => updateArray('projects', proj.id, { title: e.target.value })} className="w-full bg-transparent border-b-4 border-white/10 h-20 outline-none text-4xl font-black uppercase italic" /></div><div className="space-y-6 mt-10"><label className="text-[10px] font-black uppercase tracking-widest text-white/20">Description</label><textarea value={proj.description} onChange={(e) => updateArray('projects', proj.id, { description: e.target.value })} className="w-full bg-transparent border border-white/5 rounded-3xl p-8 outline-none italic text-white/50 text-xl leading-relaxed" /></div></div><div className="space-y-6"><label className="text-[10px] font-black uppercase tracking-widest text-white/20">Project Image</label><div className="aspect-video bg-white/5 rounded-[3rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group/upload" onClick={() => document.getElementById(`file-${proj.id}`)?.click()}>{proj.imageUrl ? <img src={proj.imageUrl} className="w-full h-full object-cover transition-transform group-hover/upload:scale-105" /> : <div className="flex flex-col items-center gap-4"><Upload className="w-10 h-10 opacity-20" /><span className="text-[10px] font-black uppercase tracking-widest opacity-20">Upload Image</span></div>}<input id={`file-${proj.id}`} type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => updateArray('projects', proj.id, { imageUrl: url }))} /></div><div className="space-y-4"><label className="text-[8px] font-black uppercase tracking-widest text-white/20">Or Image URL</label><input type="text" value={proj.imageUrl} onChange={(e) => updateArray('projects', proj.id, { imageUrl: e.target.value })} className="w-full bg-black/60 border border-white/5 rounded-2xl h-12 px-6 text-[10px] outline-none font-mono" /></div></div></div></div>))}</div>
                    </div>
                  )}
                  {currentStep === 6 && (
                    <div className="grid gap-16 text-center">
                      <div className="space-y-8"><label className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">Design Template</label><div className="grid grid-cols-4 sm:grid-cols-7 gap-6">{["minimal", "glass", "neo", "bento", "cyber", "aurora", "dimension"].map((t) => (<button key={t} onClick={() => handleInputChange("templateId", t)} className={`h-20 rounded-[2rem] border-2 transition-all capitalize font-black text-[12px] tracking-widest ${formData.templateId === t ? 'border-white bg-white text-black scale-110 shadow-2xl' : 'border-white/5 hover:border-white/20 text-white/40'}`}>{t}</button>))}</div></div>
                      <div className="grid md:grid-cols-2 gap-20 text-left">
                        <div className="space-y-8"><label className="text-[10px] font-black uppercase tracking-widest text-white/30">Theme Color</label><div className="flex gap-6 flex-wrap">{colorPalette.map((c) => (<button key={c.hex} onClick={() => handleInputChange("primaryColor", c.hex)} className={`w-16 h-16 rounded-full border-4 ${formData.primaryColor === c.hex ? 'border-white scale-125 shadow-2xl' : 'border-transparent'} transition-all hover:scale-110`} style={{ backgroundColor: c.hex }} />))}</div></div>
                        <div className="space-y-8"><label className="text-[10px] font-black uppercase tracking-widest text-white/30">Typography</label><div className="grid grid-cols-3 gap-6">{fonts.map((f) => (<button key={f.id} onClick={() => handleInputChange("fontId", f.id)} className={`h-24 rounded-[2rem] border-2 transition-all flex flex-col items-center justify-center gap-2 ${formData.fontId === f.id ? 'border-white bg-white/10 scale-105' : 'border-white/5 hover:border-white/10'}`}><span className="text-3xl font-black" style={{ fontFamily: f.family }}>Aa</span><span className="text-[10px] uppercase font-black tracking-widest opacity-40">{f.name}</span></button>))}</div></div>
                      </div>
                    </div>
                  )}
              </motion.div>
           </AnimatePresence>
        </div>

        {/* LIVE PREVIEW CONTAINER */}
        <div className="w-[90%] max-w-[1600px] flex flex-col items-center group relative mt-20">
           <div 
              className="w-full bg-[#050505] border border-white/10 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative ring-1 ring-white/10 overflow-hidden h-[800px]" 
              ref={previewContainerRef}
           >
              <div className="absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth">
                 <div 
                    ref={contentRef}
                    className="w-[1440px] origin-top-left min-h-full" 
                    style={{ transform: `scale(${previewScale})`, height: contentHeight }}
                 >
                    <PortfolioRenderer user={{ ...formData, themeSettings: { layout: formData.templateId, primaryColor: formData.primaryColor, fontFamily: formData.fontId } } as any} />
                 </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-20"></div>
           </div>
           <div className="mt-12 flex items-center gap-6 text-white/20">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
              <span className="text-xs font-black uppercase tracking-[0.5em]">Live Studio Preview // High-Fidelity Rendering</span>
           </div>
        </div>

        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 z-50">
           <button onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-2xl disabled:opacity-20" disabled={currentStep === 0}><ArrowLeft className="h-8 w-8" /></button>
           <Button 
              className="rounded-full h-20 px-16 font-black uppercase text-sm tracking-[0.3em] bg-white text-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300" 
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = formData.primaryColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(prev => prev + 1); } else { handleDownload(); } }}
           >
              {currentStep === steps.length - 1 ? "Export Portfolio" : "Continue"}
           </Button>
           <button onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))} className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-2xl disabled:opacity-20" disabled={currentStep === steps.length - 1}><ArrowRight className="h-8 w-8" /></button>
        </div>
      </main>
    </div>
  );
}
