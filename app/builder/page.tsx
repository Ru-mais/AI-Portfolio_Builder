
"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Palette, 
  User, 
  Briefcase, 
  Globe, 
  CodeXml as Code2,
  GraduationCap,
  Cpu,
  Upload,
  Trash2,
  Plus
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
  { name: "Obsidian", hex: "#0f172a" },
  { name: "Titanium", hex: "#3f3f46" },
  { name: "Gold", hex: "#d97706" },
  { name: "Emerald", hex: "#059669" },
  { name: "Sapphire", hex: "#0284c7" },
  { name: "Amethyst", hex: "#7e22ce" },
  { name: "Crimson", hex: "#be123c" },
  { name: "Bone", hex: "#f3f4f6" },
];

function BuilderContent() {
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
    jobTitle: "Principal Engineer",
    bio: "I architect resilient digital systems with an uncompromising focus on performance and quality.",
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
    primaryColor: "#3f3f46",
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
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200 font-sans">
      <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#030303]/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <button onClick={() => router.push("/templates")} className="flex items-center gap-2 group text-sm font-semibold text-zinc-500 hover:text-zinc-100 transition-colors">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span>Gallery</span>
            </button>
            <div className="h-6 w-px bg-white/10 hidden md:block"></div>
            <div className="flex items-center gap-2"><Logo className="h-5 w-5 text-amber-400" /><span className="text-sm font-bold tracking-tight text-zinc-100">Portfi Studio</span></div>
          </div>
          <div className="hidden md:flex items-center gap-1 bg-[#0a0a0a] p-1 rounded-full overflow-x-auto max-w-2xl no-scrollbar border border-white/5 shadow-inner">
             {steps.map((step, i) => (
                <button key={step.id} onClick={() => setCurrentStep(i)} className={`builder-nav-item flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap text-xs font-semibold ${currentStep === i ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]" : "text-zinc-500 hover:text-zinc-300"}`}>
                  <step.icon className="h-3.5 w-3.5" /><span>{step.title}</span>
                </button>
             ))}
          </div>
          <div className="flex items-center gap-4">
             <Button 
                className="bg-amber-500 text-black rounded-full px-6 font-bold shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:bg-amber-400 hover:scale-105 transition-all"
                onClick={handleDownload}
             >
                Export HTML
             </Button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-40 px-8 flex flex-col items-center">
        <div className="w-full max-w-4xl mb-12">
           <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="bg-[#0a0a0a] border border-white/5 shadow-2xl rounded-[2rem] p-10 md:p-14 relative overflow-hidden">
                 
                 {/* Decorative background element for the card */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full opacity-50 pointer-events-none transform translate-x-1/2 -translate-y-1/2" />

                 {currentStep === 0 && (
                    <div className="grid md:grid-cols-2 gap-10 relative z-10">
                      <div className="space-y-4">
                        <label className="text-sm font-bold text-zinc-400">Your Name</label>
                        <input type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} className="w-full bg-[#030303] border border-white/5 rounded-xl h-14 px-5 outline-none text-lg font-semibold text-zinc-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-sm font-bold text-zinc-400">Job Title</label>
                        <input type="text" value={formData.jobTitle} onChange={(e) => handleInputChange("jobTitle", e.target.value)} className="w-full bg-[#030303] border border-white/5 rounded-xl h-14 px-5 outline-none text-lg text-zinc-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" />
                      </div>
                      <div className="space-y-4 md:col-span-2">
                        <label className="text-sm font-bold text-zinc-400">About You</label>
                        <textarea value={formData.bio} onChange={(e) => handleInputChange("bio", e.target.value)} className="w-full bg-[#030303] border border-white/5 rounded-2xl p-5 min-h-[160px] outline-none text-base text-zinc-300 leading-relaxed focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" />
                      </div>
                    </div>
                  )}
                  
                  {currentStep === 1 && (
                    <div className="grid md:grid-cols-2 gap-10 relative z-10">
                       <div className="space-y-4">
                          <label className="text-sm font-bold text-zinc-400">Email Address</label>
                          <input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="w-full bg-[#030303] border border-white/5 rounded-xl h-14 px-5 outline-none text-base text-zinc-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" />
                       </div>
                       <div className="space-y-4">
                          <label className="text-sm font-bold text-zinc-400">Social Links</label>
                          <div className="grid gap-4">
                            <input type="text" value={formData.linkedin} onChange={(e) => handleInputChange("linkedin", e.target.value)} placeholder="LinkedIn URL" className="w-full bg-[#030303] border border-white/5 rounded-xl h-12 px-5 outline-none text-sm text-zinc-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" />
                            <input type="text" value={formData.github} onChange={(e) => handleInputChange("github", e.target.value)} placeholder="GitHub URL" className="w-full bg-[#030303] border border-white/5 rounded-xl h-12 px-5 outline-none text-sm text-zinc-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" />
                            <input type="text" value={formData.twitter} onChange={(e) => handleInputChange("twitter", e.target.value)} placeholder="Twitter URL" className="w-full bg-[#030303] border border-white/5 rounded-xl h-12 px-5 outline-none text-sm text-zinc-100 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all shadow-inner" />
                          </div>
                       </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-8 relative z-10">
                       <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold text-zinc-100">Education</h3>
                          <Button onClick={() => addItem('education', { degree: '', school: '', year: '' })} variant="outline" className="rounded-full px-5 font-semibold border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white bg-transparent">
                             <Plus className="h-4 w-4 mr-2" /> Add Entry
                          </Button>
                       </div>
                       <div className="grid gap-6">
                          {formData.education.map(edu => (
                            <div key={edu.id} className="p-8 bg-[#030303] border border-white/5 rounded-2xl relative group shadow-inner">
                               <button onClick={() => removeItem('education', edu.id)} className="absolute top-6 right-6 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Trash2 className="h-5 w-5" />
                               </button>
                               <div className="grid md:grid-cols-3 gap-6">
                                  <div className="space-y-3">
                                     <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Degree</label>
                                     <input type="text" value={edu.degree} onChange={(e) => updateArray('education', edu.id, { degree: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 focus:border-amber-500 h-10 outline-none font-semibold text-zinc-100 transition-colors" />
                                  </div>
                                  <div className="space-y-3">
                                     <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Institution</label>
                                     <input type="text" value={edu.school} onChange={(e) => updateArray('education', edu.id, { school: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 focus:border-amber-500 h-10 outline-none text-zinc-300 transition-colors" />
                                  </div>
                                  <div className="space-y-3">
                                     <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Period</label>
                                     <input type="text" value={edu.year} onChange={(e) => updateArray('education', edu.id, { year: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 focus:border-amber-500 h-10 outline-none text-zinc-400 transition-colors" />
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-8 relative z-10 text-center">
                       <h3 className="text-xl font-bold text-zinc-100">Skills & Technologies</h3>
                       <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                          {formData.skills.map(s => (
                            <div key={s} className="bg-white/5 border border-white/10 text-zinc-200 px-5 py-2 rounded-full group flex items-center gap-3 hover:bg-white/10 transition-colors">
                               <span className="text-sm font-semibold">{s}</span>
                               <button onClick={() => setFormData(prev => ({ ...prev, skills: prev.skills.filter(sk => sk !== s) }))}>
                                  <Trash2 className="h-4 w-4 text-zinc-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                               </button>
                            </div>
                          ))}
                          <input 
                            onKeyDown={(e) => { 
                               if (e.key === 'Enter' && e.currentTarget.value) { 
                                  setFormData(prev => ({ ...prev, skills: [...prev.skills, e.currentTarget.value] })); 
                                  e.currentTarget.value = ''; 
                               } 
                            }} 
                            placeholder="Add Skill + Enter" 
                            className="bg-[#030303] border border-white/10 px-5 py-2 rounded-full text-sm outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 text-zinc-100 min-w-[200px] text-center shadow-inner" 
                          />
                       </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-8 relative z-10">
                       <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold text-zinc-100">Experience</h3>
                          <Button onClick={() => addItem('experiences', { company: '', position: '', year: '', description: '' })} variant="outline" className="rounded-full px-5 font-semibold border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white bg-transparent">
                             <Plus className="h-4 w-4 mr-2" /> Add Experience
                          </Button>
                       </div>
                       <div className="grid gap-6">
                          {formData.experiences.map(exp => (
                            <div key={exp.id} className="p-8 bg-[#030303] border border-white/5 rounded-2xl relative group shadow-inner">
                               <button onClick={() => removeItem('experiences', exp.id)} className="absolute top-6 right-6 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Trash2 className="h-5 w-5" />
                               </button>
                               <div className="grid md:grid-cols-3 gap-6">
                                  <div className="space-y-3">
                                     <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Position</label>
                                     <input type="text" value={exp.position} onChange={(e) => updateArray('experiences', exp.id, { position: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 focus:border-amber-500 h-10 outline-none font-semibold text-zinc-100 transition-colors" />
                                  </div>
                                  <div className="space-y-3">
                                     <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Company</label>
                                     <input type="text" value={exp.company} onChange={(e) => updateArray('experiences', exp.id, { company: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 focus:border-amber-500 h-10 outline-none text-zinc-300 transition-colors" />
                                  </div>
                                  <div className="space-y-3">
                                     <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Years</label>
                                     <input type="text" value={exp.year} onChange={(e) => updateArray('experiences', exp.id, { year: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 focus:border-amber-500 h-10 outline-none text-zinc-400 font-semibold transition-colors" />
                                  </div>
                               </div>
                               <textarea value={exp.description} onChange={(e) => updateArray('experiences', exp.id, { description: e.target.value })} placeholder="Describe your role and achievements..." className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl p-5 mt-6 outline-none text-zinc-400 leading-relaxed focus:border-amber-500 transition-colors shadow-inner" />
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-8 relative z-10">
                       <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold text-zinc-100">Projects</h3>
                          <Button onClick={() => addItem('projects', { title: '', description: '', imageUrl: '' })} variant="outline" className="rounded-full px-5 font-semibold border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white bg-transparent">
                             <Plus className="h-4 w-4 mr-2" /> Add Project
                          </Button>
                       </div>
                       <div className="grid gap-8">
                          {formData.projects.map(proj => (
                            <div key={proj.id} className="p-8 bg-[#030303] border border-white/5 rounded-3xl group relative shadow-inner">
                               <button onClick={() => removeItem('projects', proj.id)} className="absolute top-6 right-6 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                  <Trash2 className="h-5 w-5" />
                               </button>
                               <div className="grid md:grid-cols-[1fr,300px] gap-10">
                                  <div>
                                     <div className="space-y-4">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Project Title</label>
                                        <input type="text" value={proj.title} onChange={(e) => updateArray('projects', proj.id, { title: e.target.value })} className="w-full bg-transparent border-b-2 border-white/10 focus:border-amber-500 h-12 outline-none text-2xl font-bold text-zinc-100 transition-colors" />
                                     </div>
                                     <div className="space-y-4 mt-6">
                                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Description</label>
                                        <textarea value={proj.description} onChange={(e) => updateArray('projects', proj.id, { description: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl p-5 min-h-[120px] outline-none text-zinc-400 leading-relaxed focus:border-amber-500 transition-colors shadow-inner" />
                                     </div>
                                  </div>
                                  <div className="space-y-4">
                                     <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Project Image</label>
                                     <div className="aspect-video bg-[#0a0a0a] rounded-2xl border-2 border-dashed border-white/10 hover:border-amber-500/50 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group/upload transition-colors">
                                        {proj.imageUrl ? 
                                           <img src={proj.imageUrl} className="w-full h-full object-cover transition-transform group-hover/upload:scale-105" /> : 
                                           <div className="flex flex-col items-center gap-2 text-zinc-600 group-hover/upload:text-amber-400 transition-colors">
                                              <Upload className="w-8 h-8" />
                                              <span className="text-xs font-semibold">Upload Image</span>
                                           </div>
                                        }
                                        <input id={`file-${proj.id}`} type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => updateArray('projects', proj.id, { imageUrl: url }))} />
                                     </div>
                                     <div className="space-y-2 pt-2">
                                        <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Or Image URL</label>
                                        <input type="text" value={proj.imageUrl} onChange={(e) => updateArray('projects', proj.id, { imageUrl: e.target.value })} className="w-full bg-[#0a0a0a] border border-white/5 rounded-lg h-10 px-3 text-xs outline-none focus:border-amber-500 transition-colors text-zinc-300 shadow-inner" />
                                     </div>
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {currentStep === 6 && (
                    <div className="grid gap-12 text-center relative z-10">
                      <div className="space-y-6">
                         <label className="text-sm font-bold text-zinc-300">Architecture Foundation</label>
                         <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                            {["minimal", "glass", "neo", "bento", "cyber", "aurora", "dimension"].map((t) => (
                               <button 
                                 key={t} 
                                 onClick={() => handleInputChange("templateId", t)} 
                                 className={`h-14 rounded-xl border transition-all capitalize font-semibold text-xs ${formData.templateId === t ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]' : 'border-white/10 hover:border-white/20 bg-[#030303] text-zinc-500'}`}
                               >
                                  {t}
                               </button>
                            ))}
                         </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-12 text-left">
                        <div className="space-y-6">
                           <label className="text-sm font-bold text-zinc-300">Accent Color</label>
                           <div className="flex gap-4 flex-wrap">
                              {colorPalette.map((c) => (
                                 <button 
                                   key={c.hex} 
                                   onClick={() => handleInputChange("primaryColor", c.hex)} 
                                   className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 shadow-lg ${formData.primaryColor === c.hex ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-transparent'}`} 
                                   style={{ backgroundColor: c.hex }} 
                                   title={c.name}
                                 />
                              ))}
                           </div>
                        </div>
                        <div className="space-y-6">
                           <label className="text-sm font-bold text-zinc-300">Typography Suite</label>
                           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                              {fonts.map((f) => (
                                 <button 
                                   key={f.id} 
                                   onClick={() => handleInputChange("fontId", f.id)} 
                                   className={`h-20 rounded-xl border transition-all flex flex-col items-center justify-center gap-1 ${formData.fontId === f.id ? 'border-amber-500 bg-amber-500/10 text-amber-400' : 'border-white/10 bg-[#030303] hover:border-white/20 text-zinc-400'}`}
                                 >
                                    <span className="text-2xl font-bold" style={{ fontFamily: f.family }}>Aa</span>
                                    <span className="text-[10px] font-semibold">{f.name}</span>
                                 </button>
                              ))}
                           </div>
                        </div>
                      </div>
                    </div>
                  )}
              </motion.div>
           </AnimatePresence>
        </div>

        {/* LIVE PREVIEW CONTAINER */}
        <div className="w-[95%] max-w-[1400px] flex flex-col items-center group relative mt-10">
           <div 
              className="w-full bg-[#030303] border border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden h-[800px]" 
              ref={previewContainerRef}
           >
              {/* Premium Studio Interface Header bar */}
              <div className="absolute top-0 left-0 w-full h-12 bg-[#080808] border-b border-white/5 flex items-center px-6 gap-2 z-30">
                 <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-red-400 transition-colors"></div>
                 <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-amber-400 transition-colors"></div>
                 <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-emerald-400 transition-colors"></div>
                 <div className="mx-auto text-xs font-semibold text-zinc-600 bg-black px-4 py-1 rounded-md border border-white/5 shadow-inner">
                    localhost:3000 / preview
                 </div>
              </div>

              <div className="absolute inset-0 pt-12 overflow-y-auto no-scrollbar scroll-smooth bg-[#050505]">
                 <div 
                    ref={contentRef}
                    className="w-[1440px] origin-top-left min-h-full bg-white" 
                    style={{ transform: `scale(${previewScale})`, height: contentHeight }}
                 >
                    <PortfolioRenderer user={{ ...formData, themeSettings: { layout: formData.templateId, primaryColor: formData.primaryColor, fontFamily: formData.fontId } } as any} />
                 </div>
              </div>
           </div>
           
           <div className="mt-8 flex items-center gap-3 text-zinc-600">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50 animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-wider">Premium Rendering Engine Active</span>
           </div>
        </div>

        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl px-4 py-3 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
           <button 
             onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))} 
             className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white transition-all disabled:opacity-20 disabled:hover:bg-white/5" 
             disabled={currentStep === 0}
           >
             <ArrowLeft className="h-5 w-5" />
           </button>
           
           <Button 
              className="rounded-full h-12 px-10 font-bold text-sm bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:bg-zinc-200 hover:scale-105 transition-all duration-300" 
              onClick={() => { if (currentStep < steps.length - 1) { setCurrentStep(prev => prev + 1); } else { handleDownload(); } }}
           >
              {currentStep === steps.length - 1 ? "Export Source Code" : "Continue"}
           </Button>
           
           <button 
             onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))} 
             className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-white transition-all disabled:opacity-20 disabled:hover:bg-white/5" 
             disabled={currentStep === steps.length - 1}
           >
             <ArrowRight className="h-5 w-5" />
           </button>
        </div>
      </main>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center text-zinc-600 font-bold text-sm tracking-widest animate-pulse">Initializing Premium Studio...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
