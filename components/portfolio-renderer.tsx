
"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { animate } from "animejs";
import { 
  Globe, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Monitor,
  Globe as Github,
  Briefcase as Linkedin,
  Send as Twitter,
  Zap,
  Layout as BentoIcon,
  Cpu,
  Layers,
  Terminal,
  MousePointer2,
  GraduationCap,
  Image as ImageIcon
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  year?: string;
  description?: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

interface UserData {
  name: string;
  jobTitle?: string;
  bio?: string;
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  skills: string[];
  education: Education[];
  projects: Project[];
  experiences: Experience[];
  themeSettings?: {
    primaryColor: string;
    layout: string;
    fontFamily: string;
  };
}

function ParticlesBackground({ color }: { color: string }) {
  const ref = useRef<any>(null);
  const sphere = useMemo(() => {
    const arr = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 35;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color={color} size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
      </Points>
    </group>
  );
}

export default function PortfolioRenderer({ user }: { user: UserData }) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const layout = user.themeSettings?.layout || "minimal";
  const color = user.themeSettings?.primaryColor || "#6366f1";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target, { translateY: [50, 0], opacity: [0, 1], duration: 1500, easing: "outExpo" });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    containerRef.current.querySelectorAll('.stagger-item').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [mounted, layout, user]);

  if (!mounted) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[1em]">Initializing...</div>;

  const getFontFamily = (id: string) => {
    switch(id) {
      case 'syne': return "'Syne', sans-serif";
      case 'bebas': return "'Bebas Neue', sans-serif";
      case 'mono': return "'Space Mono', monospace";
      case 'pixel': return "'Press Start 2P', cursive";
      case 'fraunces': return "'Fraunces', serif";
      default: return "'Inter', sans-serif";
    }
  };

  const fontStyle = { fontFamily: getFontFamily(user.themeSettings?.fontFamily || 'sans') };

  const socialsUI = (
    <div className="flex flex-wrap gap-6 md:gap-10 items-center justify-center">
       {user.email && <a href={`mailto:${user.email}`} className="hover:scale-125 transition-transform"><Mail className="w-6 h-6" style={{ color }} /></a>}
       {user.linkedin && <a href={user.linkedin} target="_blank" className="hover:scale-125 transition-transform"><Linkedin className="w-6 h-6" style={{ color }} /></a>}
       {user.github && <a href={user.github} target="_blank" className="hover:scale-125 transition-transform"><Github className="w-6 h-6" style={{ color }} /></a>}
       {user.twitter && <a href={user.twitter} target="_blank" className="hover:scale-125 transition-transform"><Twitter className="w-6 h-6" style={{ color }} /></a>}
    </div>
  );

  const contactSection = (
    <section className="py-20 md:py-40 px-6 container mx-auto text-center stagger-item relative z-10 w-full">
      <div className="bg-white/5 backdrop-blur-3xl p-8 md:p-24 rounded-[3rem] border border-white/10 space-y-8 md:space-y-12">
        <h2 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">Let's Work.</h2>
        <p className="text-lg md:text-3xl text-slate-400 max-w-2xl mx-auto font-medium">Have a project in mind? Reach out and let's build something exceptional together.</p>
        <div className="flex justify-center w-full">{socialsUI}</div>
        <div className="pt-6 md:pt-12">
          <a href={`mailto:${user.email}`} className="px-8 md:px-16 py-4 md:py-8 rounded-full text-xl md:text-3xl font-black uppercase italic hover:scale-110 transition-transform inline-block text-white w-full md:w-auto" style={{ backgroundColor: color }}>Direct_Inquiry</a>
        </div>
      </div>
    </section>
  );

  const techStackUI = (
    <div className="flex flex-wrap gap-4 stagger-item">
      {user.skills?.map(skill => (
        <span key={skill} className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-black uppercase tracking-widest">{skill}</span>
      ))}
    </div>
  );

  const educationUI = (
    <div className="space-y-8 stagger-item">
      {user.education?.map(edu => (
        <div key={edu.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
              <h4 className="text-2xl font-bold">{edu.degree}</h4>
              <p className="text-lg opacity-40 uppercase font-black italic tracking-widest">{edu.school}</p>
           </div>
           <span className="text-xl font-bold opacity-20 italic">{edu.year}</span>
        </div>
      ))}
    </div>
  );

  const renderTemplate = () => {
    switch (layout) {
      case "dimension":
        return (
          <main className="relative z-10 w-full">
            <section className="min-h-screen flex flex-col justify-center px-6 md:px-32 w-full">
                <div className="stagger-item space-y-12">
                   <h1 className="text-7xl md:text-[clamp(5rem,15vw,16rem)] font-black tracking-tighter leading-[0.85] uppercase italic break-words" style={{ color }}>{user.name}</h1>
                   <p className="text-2xl md:text-5xl text-slate-400 max-w-5xl font-medium leading-[0.9] tracking-tighter uppercase">{user.bio}</p>
                   <div className="flex justify-start">{socialsUI}</div>
                </div>
            </section>
            <section className="py-40 px-6 md:px-32 grid md:grid-cols-2 gap-40 w-full">
               <div className="space-y-20"><h2 className="text-6xl font-black uppercase italic text-brand" style={{ color }}>Education.</h2>{educationUI}</div>
               <div className="space-y-20"><h2 className="text-6xl font-black uppercase italic text-brand" style={{ color }}>Stack.</h2>{techStackUI}</div>
            </section>
            <section className="py-40 px-6 md:px-32 space-y-40 w-full">
                <h2 className="text-6xl md:text-[10rem] font-black uppercase italic text-brand text-center" style={{ color }}>Projects.</h2>
                {user.projects.map((proj, i) => (
                  <div key={proj.id} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-20 items-center stagger-item w-full`}>
                      <div className="w-full md:w-3/5 aspect-video overflow-hidden rounded-[2rem] glass">
                         {proj.imageUrl ? <img src={proj.imageUrl} className="w-full h-full object-cover" /> : <div className="h-full bg-white/5"></div>}
                      </div>
                      <div className="w-full md:w-2/5 space-y-8">
                         <h3 className="text-6xl font-black uppercase italic tracking-tighter">{proj.title}</h3>
                         <p className="text-2xl text-slate-400 leading-relaxed italic">{proj.description}</p>
                      </div>
                  </div>
                ))}
            </section>
            <section className="py-40 px-6 md:px-32 w-full">
               <h2 className="text-6xl md:text-[10rem] font-black uppercase italic text-brand mb-20" style={{ color }}>Experience.</h2>
               <div className="grid gap-px bg-white/10 border border-white/10 w-full">
                  {user.experiences.map((exp) => (
                   <div key={exp.id} className="stagger-item bg-black p-16 flex flex-col md:flex-row justify-between items-center group hover:bg-white/5 transition-colors">
                       <div className="space-y-2"><h3 className="text-4xl font-black uppercase italic">{exp.position}</h3><p className="text-xl font-bold uppercase tracking-widest text-brand" style={{ color }}>{exp.company}</p></div>
                       <span className="text-2xl font-black opacity-20 italic">{exp.year}</span>
                   </div>
                 ))}
               </div>
            </section>
            {contactSection}
          </main>
        );

      case "glass":
        return (
          <main className="w-full max-w-[1440px] mx-auto px-6 py-20 space-y-40 relative z-10">
            <div className="glass rounded-[4rem] p-8 md:p-32 space-y-40 w-full">
                <section className="text-center w-full"><h1 className="text-7xl md:text-[clamp(4rem,10vw,10rem)] font-black tracking-tighter mb-12 italic break-words">{user.name}</h1><p className="text-3xl text-slate-300 max-w-4xl mx-auto stagger-item font-medium">{user.bio}</p><div className="pt-20">{socialsUI}</div></section>
                <div className="grid md:grid-cols-2 gap-20 w-full"><section className="space-y-12"><h2 className="text-5xl font-black uppercase italic">Academic.</h2>{educationUI}</section><section className="space-y-12"><h2 className="text-5xl font-black uppercase italic">Technologies.</h2>{techStackUI}</section></div>
                <section className="space-y-20 w-full"><h2 className="text-7xl font-black uppercase italic">Works.</h2><div className="grid md:grid-cols-2 gap-12">{user.projects.map(proj => (<div key={proj.id} className="stagger-item group rounded-[3rem] overflow-hidden glass relative aspect-video w-full">{proj.imageUrl && <img src={proj.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}<div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity"><h3 className="text-3xl font-black uppercase italic">{proj.title}</h3><p className="text-slate-400 italic">{proj.description}</p></div></div>))}</div></section>
                <section className="space-y-12 w-full"><h2 className="text-7xl font-black uppercase italic">Legacy.</h2><div className="space-y-8">{user.experiences.map((exp) => (<div key={exp.id} className="glass p-12 rounded-[3rem] flex justify-between items-center stagger-item hover:bg-white/5 transition-colors"><div><h3 className="text-3xl font-black uppercase italic">{exp.position}</h3><p className="text-xl font-bold uppercase tracking-widest text-brand" style={{ color }}>{exp.company}</p></div><span className="text-xl font-bold opacity-20 italic">{exp.year}</span></div>))}</div></section>
            </div>
            {contactSection}
          </main>
        );

      case "cyber":
        return (
          <main className="relative z-10 font-mono p-4 md:p-12 w-full">
            <div className="border-4 p-8 md:p-20 w-full" style={{ borderColor: color }}>
                <section className="mb-40 w-full"><h1 className="text-7xl md:text-[clamp(4rem,12vw,14rem)] font-black italic tracking-tighter uppercase leading-none break-words" style={{ color }}>{user.name}</h1><p className="text-2xl text-slate-400 mt-8 border-l-8 pl-12 uppercase" style={{ borderColor: color }}>[BIO_DATA]: {user.bio}</p></section>
                <section className="grid lg:grid-cols-2 gap-20 mb-40 w-full"><div className="space-y-12"><h2 className="text-5xl font-black italic uppercase" style={{ color }}>// ACADEMIC_LOG</h2>{educationUI}</div><div className="space-y-12"><h2 className="text-5xl font-black italic uppercase" style={{ color }}>// TECH_ARRAY</h2>{techStackUI}</div></section>
                <section className="space-y-20 mb-40 w-full"><h2 className="text-6xl font-black italic uppercase" style={{ color }}>// ARCHIVES</h2><div className="grid md:grid-cols-2 gap-12">{user.projects.map(proj => (<div key={proj.id} className="border-2 border-white/5 p-10 bg-black/80 stagger-item group w-full"><h3 className="text-4xl font-black italic mb-4" style={{ color }}>{">> "} {proj.title}</h3><p className="text-slate-500 mb-8 italic uppercase">{proj.description}</p>{proj.imageUrl && <img src={proj.imageUrl} className="w-full grayscale brightness-50 group-hover:brightness-100 transition-all" />}</div>))}</div></section>
                <section className="space-y-12 w-full"><h2 className="text-6xl font-black italic uppercase" style={{ color }}>// EXPERIENCE_SYNC</h2>{user.experiences.map((exp) => (<div key={exp.id} className="border-l-4 p-8 bg-white/5 stagger-item flex justify-between items-center w-full" style={{ borderColor: color }}><div><h3 className="text-3xl font-black italic uppercase">{exp.position}</h3><p className="text-xl opacity-40 uppercase mt-2 font-black">{exp.company}</p></div><span className="text-2xl font-black opacity-40 italic">[{exp.year}]</span></div>))} </section>
                <div className="mt-40">{socialsUI}</div>
            </div>
            {contactSection}
          </main>
        );

      case "bento":
        return (
          <main className="relative z-10 p-4 md:p-12 w-full max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
                <div className="md:col-span-4 lg:col-span-4 bg-white text-black p-12 md:p-16 rounded-[4rem] flex flex-col justify-between min-h-[500px]">
                    <div className="flex justify-between items-start"><BentoIcon className="w-12 h-12 opacity-10" /><div className="w-20 h-20 rounded-[2rem] shadow-2xl" style={{ backgroundColor: color }}></div></div>
                    <div><h1 className="text-6xl md:text-[clamp(4rem,8vw,8rem)] font-black tracking-tighter leading-[0.9] uppercase italic break-words">{user.name}</h1><p className="text-2xl md:text-3xl text-slate-500 max-w-2xl font-semibold mt-8">{user.bio}</p></div>
                </div>
                <div className="md:col-span-4 lg:col-span-2 rounded-[4rem] p-12 md:p-16 flex flex-col justify-between" style={{ backgroundColor: color }}>
                    <h2 className="text-4xl font-black uppercase text-white italic">Neural Link</h2>
                    <div className="flex flex-col gap-4 text-xl font-black text-white/90 italic">{socialsUI}</div>
                </div>
                <div className="md:col-span-3 lg:col-span-3 bg-white/5 p-12 rounded-[4rem] border border-white/10"><h2 className="text-4xl font-black uppercase italic mb-8 opacity-20">Education</h2>{educationUI}</div>
                <div className="md:col-span-3 lg:col-span-3 bg-white/5 p-12 rounded-[4rem] border border-white/10"><h2 className="text-4xl font-black uppercase italic mb-8 opacity-20">Stack</h2>{techStackUI}</div>
                {user.projects.map(proj => (
                  <div key={proj.id} className="md:col-span-3 bg-white/5 rounded-[4rem] overflow-hidden border border-white/10 group">
                      {proj.imageUrl ? <img src={proj.imageUrl} className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all" /> : <div className="h-80 bg-white/5"></div>}
                      <div className="p-12"><h3 className="text-3xl font-black uppercase italic">{proj.title}</h3><p className="text-lg text-slate-500 italic mt-4">{proj.description}</p></div>
                  </div>
                ))}
            </div>
            {contactSection}
          </main>
        );

      case "neo":
        return (
          <main className="relative z-10 p-6 md:p-12 bg-white text-black min-h-screen w-full">
            <div className="border-[12px] border-black p-8 md:p-24 space-y-40 w-full">
                <section className="w-full"><h1 className="text-7xl md:text-[clamp(5rem,14vw,16rem)] font-black uppercase italic border-b-[12px] border-black pb-12 leading-[0.8] break-words">{user.name}</h1><p className="text-3xl md:text-6xl font-black uppercase italic mt-12">{user.bio}</p></section>
                <div className="grid md:grid-cols-2 gap-px bg-black border-[6px] border-black w-full"><div className="bg-white p-12"><h2 className="text-5xl font-black uppercase italic mb-10">Academic_</h2>{educationUI}</div><div className="bg-white p-12"><h2 className="text-5xl font-black uppercase italic mb-10">Stack_</h2>{techStackUI}</div></div>
                <section className="space-y-20 w-full"><h2 className="text-6xl font-black uppercase italic bg-black text-white px-8 py-2 inline-block">Projects_</h2><div className="grid md:grid-cols-2 gap-1 w-full">{user.projects.map(proj => (<div key={proj.id} className="border-[6px] border-black p-12 hover:bg-black hover:text-white transition-colors group w-full">{proj.imageUrl && <img src={proj.imageUrl} className="w-full grayscale border-4 border-black mb-8" />}<h3 className="text-4xl font-black uppercase italic">{proj.title}</h3><p className="text-xl font-bold uppercase mt-4">{proj.description}</p></div>))}</div></section>
                <section className="space-y-12 w-full">
                   <h2 className="text-5xl font-black uppercase italic border-b-4 border-black pb-4">Experience_</h2>
                   {user.experiences.map((exp) => (<div key={exp.id} className="flex justify-between items-center py-8 border-b-2 border-black/10 w-full"><div><h3 className="text-3xl font-black uppercase italic">{exp.position}</h3><p className="text-xl font-bold uppercase tracking-widest">{exp.company}</p></div><span className="text-2xl font-black italic">{exp.year}</span></div>))}
                </section>
                <div className="bg-black p-12 w-full">{socialsUI}</div>
            </div>
            {contactSection}
          </main>
        );

      case "aurora":
        return (
          <main className="relative z-10 min-h-screen flex flex-col items-center w-full">
            <section className="h-screen flex flex-col justify-center items-center text-center px-6 stagger-item w-full">
               <h1 className="text-[7rem] md:text-[clamp(6rem,18vw,20rem)] font-black tracking-tighter leading-[0.8] mix-blend-overlay italic w-full break-words">{user.name}</h1>
               <p className="text-2xl md:text-5xl text-slate-500 max-w-5xl font-medium leading-none tracking-tighter italic mt-12 w-full">{user.bio}</p>
               <div className="pt-20 flex justify-center w-full">{socialsUI}</div>
            </section>
            <section className="w-full max-w-[1440px] px-6 py-40 space-y-32">
                <div className="grid md:grid-cols-2 gap-20 w-full"><div className="space-y-8"><h2 className="text-4xl font-black uppercase italic opacity-20">Education</h2>{educationUI}</div><div className="space-y-8"><h2 className="text-4xl font-black uppercase italic opacity-20">Stack</h2>{techStackUI}</div></div>
                <div className="pt-40 space-y-80 w-full">{user.projects.map(p => (<div key={p.id} className="stagger-item text-center space-y-12 w-full"><div className="aspect-video rounded-[3rem] overflow-hidden w-full">{p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover" /> : <div className="h-full bg-white/5"></div>}</div><h3 className="text-6xl font-black uppercase italic tracking-tighter">{p.title}</h3><p className="text-2xl text-slate-500 italic leading-relaxed">{p.description}</p></div>))}</div>
                <section className="space-y-20 w-full"><h2 className="text-4xl font-black uppercase italic opacity-20">Legacy</h2>{user.experiences.map((exp) => (<div key={exp.id} className="flex justify-between items-center py-12 border-b border-white/10 w-full"><div className="space-y-2"><h3 className="text-5xl font-black uppercase italic">{exp.position}</h3><p className="text-xl font-bold uppercase tracking-widest text-brand" style={{ color }}>{exp.company}</p></div><span className="text-2xl font-black italic opacity-20">{exp.year}</span></div>))}</section>
            </section>
            {contactSection}
          </main>
        );

      default:
        return (
          <main className="relative z-10 grid lg:grid-cols-[1.3fr,0.7fr] w-full">
            <div className="p-8 md:p-32 flex flex-col justify-between border-r border-white/10 lg:sticky lg:top-0 lg:h-screen w-full">
                <div className="stagger-item space-y-12">
                   <h1 className="text-8xl lg:text-[clamp(5rem,12vw,14rem)] font-black leading-[0.8] tracking-tighter uppercase italic break-words" style={{ color }}>{user.name}</h1>
                   <p className="text-3xl text-slate-500 max-w-xl italic font-medium">{user.bio}</p>
                </div>
                <div className="pt-20">{socialsUI}</div>
            </div>
            <div className="p-8 md:p-32 space-y-60 w-full">
                <section className="space-y-20 w-full"><h2 className="text-5xl font-black uppercase tracking-widest opacity-20 italic">Education_</h2>{educationUI}</section>
                <section className="space-y-20 w-full"><h2 className="text-5xl font-black uppercase tracking-widest opacity-20 italic">Stack_</h2>{techStackUI}</section>
                <section className="space-y-60 w-full">
                   <h2 className="text-5xl font-black uppercase tracking-widest opacity-20 italic">Projects_</h2>
                   {user.projects.map((proj, i) => (
                    <div key={proj.id} className="stagger-item space-y-12 w-full">
                       <h3 className="text-7xl font-black uppercase italic tracking-tighter leading-none">{proj.title}</h3>
                       <div className="grid md:grid-cols-2 gap-12 items-end">
                          <p className="text-2xl text-slate-500 italic font-medium leading-relaxed">{proj.description}</p>
                          {proj.imageUrl ? <img src={proj.imageUrl} className="w-full grayscale opacity-40 hover:opacity-100 rounded-2xl transition-all" /> : <div className="aspect-video bg-white/5 rounded-2xl"></div>}
                       </div>
                    </div>
                  ))}
                </section>
                <section className="space-y-32 w-full">
                   <h2 className="text-5xl font-black uppercase tracking-widest opacity-20 italic">Legacy_</h2>
                   {user.experiences.map((exp) => (
                    <div key={exp.id} className="stagger-item flex justify-between items-end border-b border-white/10 pb-12 w-full">
                        <div className="space-y-4">
                           <h4 className="text-6xl font-black uppercase italic leading-none">{exp.position}</h4>
                           <p className="text-xl font-black uppercase tracking-widest text-brand italic" style={{ color }}>@ {exp.company}</p>
                        </div>
                        <span className="text-2xl font-black opacity-20 italic">{exp.year}</span>
                    </div>
                   ))}
                </section>
                {contactSection}
            </div>
          </main>
        );
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden w-full" style={fontStyle}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Syne:wght@400;700;800&family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Press+Start+2P&family=Fraunces:opsz,wght@9..144,400;700;900&display=swap" rel="stylesheet" />
      <div className="absolute inset-0 z-0 pointer-events-none w-full">
        <div className="sticky top-0 h-screen w-full opacity-40">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <ParticlesBackground color={color} />
          </Canvas>
        </div>
      </div>
      {renderTemplate()}
    </div>
  );
}
