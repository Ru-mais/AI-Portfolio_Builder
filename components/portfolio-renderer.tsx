
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
  Send as Twitter
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
  description?: string;
}

interface UserData {
  name: string;
  jobTitle?: string;
  bio?: string;
  email: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
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
    const arr = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
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
          animate(entry.target, {
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1500,
            easing: "outExpo"
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = containerRef.current.querySelectorAll('.stagger-item');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [mounted, layout, user]);

  if (!mounted) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.5em]">Initializing_3D_Engine...</div>;

  const fontStyle = { 
    fontFamily: user.themeSettings?.fontFamily === 'mono' ? "'Space Mono', monospace" : user.themeSettings?.fontFamily === 'serif' ? "'Playfair Display', serif" : "'Inter', sans-serif" 
  };

  const socialsUI = (
    <div className="flex gap-8 items-center">
       {user.email && <a href={`mailto:${user.email}`}><Mail className="w-6 h-6 hover:text-brand transition-colors" style={{ color }} /></a>}
       {user.linkedin && <a href={user.linkedin} target="_blank"><Linkedin className="w-6 h-6 hover:text-brand transition-colors" style={{ color }} /></a>}
       {user.github && <a href={user.github} target="_blank"><Github className="w-6 h-6 hover:text-brand transition-colors" style={{ color }} /></a>}
       {user.twitter && <a href={user.twitter} target="_blank"><Twitter className="w-6 h-6 hover:text-brand transition-colors" style={{ color }} /></a>}
    </div>
  );

  const contactSection = (
    <section className="py-40 px-6 container mx-auto text-center stagger-item relative z-10">
      <div className="bg-white/5 backdrop-blur-3xl p-12 md:p-24 rounded-[3rem] md:rounded-[6rem] border border-white/10 space-y-12">
        <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter">Let's Work.</h2>
        <p className="text-xl md:text-3xl text-slate-400 max-w-2xl mx-auto font-medium">Have a project in mind? Reach out and let's build something exceptional together.</p>
        <div className="flex justify-center">{socialsUI}</div>
        <div className="pt-12">
          <a href={`mailto:${user.email}`} className="px-12 py-6 rounded-full text-2xl font-black uppercase italic hover:scale-110 transition-transform inline-block shadow-2xl text-white" style={{ backgroundColor: color }}>Contact Me</a>
        </div>
      </div>
    </section>
  );

  const renderTemplate = () => {
    switch (layout) {
      case "dimension":
        return (
          <main className="relative z-10">
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-8">
                <div className="stagger-item space-y-6">
                   <span className="text-[10px] font-black tracking-[0.8em] opacity-40 uppercase">3D Dimension Architecture</span>
                   <h1 className="text-7xl md:text-[14rem] font-black tracking-tighter leading-none uppercase italic" style={{ color }}>{user.name}</h1>
                   <p className="text-2xl md:text-4xl text-slate-400 max-w-4xl font-medium leading-tight">{user.bio}</p>
                   <div className="pt-12 flex justify-center">{socialsUI}</div>
                </div>
             </section>
             <section className="container mx-auto px-6 py-40 space-y-40">
                <h2 className="text-6xl md:text-9xl font-black uppercase italic text-center" style={{ color }}>Projects.</h2>
                {user.projects.map((proj, i) => (
                  <div key={proj.id} className={`grid md:grid-cols-2 gap-20 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="stagger-item space-y-12">
                       <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/10 border-l-8" style={{ borderLeftColor: color }}>
                          <h3 className="text-4xl font-bold mb-4">{proj.title}</h3>
                          <p className="text-2xl text-slate-400 leading-relaxed font-medium">{proj.description}</p>
                       </div>
                    </div>
                    <div className="stagger-item">
                       <div className="bg-white/5 p-4 rounded-[4rem] border border-white/10 group overflow-hidden">
                          {proj.imageUrl ? <img src={proj.imageUrl} className="w-full h-[600px] object-cover rounded-[3.5rem] grayscale group-hover:grayscale-0 transition-all duration-1000" /> : <div className="h-[600px] bg-white/5"></div>}
                       </div>
                    </div>
                  </div>
                ))}
             </section>
             {contactSection}
          </main>
        );

      case "glass":
        return (
          <main className="max-w-7xl mx-auto px-6 py-20 space-y-40 relative z-10">
            <section className="min-h-[80vh] flex flex-col justify-center">
                <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] mb-12 stagger-item" style={{ color }}>Identity // v2</span>
                <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-12 stagger-item">{user.name}</h1>
                <p className="text-3xl text-slate-400 max-w-3xl stagger-item leading-tight font-medium mb-12">{user.bio}</p>
                <div className="stagger-item">{socialsUI}</div>
            </section>
            <section className="space-y-20">
               <h2 className="text-6xl md:text-8xl font-black uppercase italic">Selected Works.</h2>
               <div className="grid md:grid-cols-2 gap-16">
                  {user.projects.map(proj => (
                    <div key={proj.id} className="bg-white/5 backdrop-blur-3xl p-4 rounded-[4rem] border border-white/10 stagger-item group">
                        {proj.imageUrl ? <img src={proj.imageUrl} className="w-full h-[600px] object-cover rounded-[3.5rem] grayscale group-hover:grayscale-0 transition-all duration-1000" /> : <div className="h-[600px] bg-white/5"></div>}
                        <div className="p-12">
                          <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{proj.title}</h3>
                          <p className="text-slate-400 leading-relaxed text-lg">{proj.description}</p>
                        </div>
                    </div>
                  ))}
               </div>
            </section>
            {contactSection}
          </main>
        );

      case "cyber":
        return (
          <main className="relative z-10 font-mono p-4 md:p-8">
            <section className="min-h-screen flex flex-col justify-center px-8 lg:px-24">
                <div className="stagger-item border-l-8 pl-12" style={{ borderColor: color }}>
                   <h1 className="text-8xl lg:text-[14rem] font-black italic tracking-tighter leading-none uppercase mb-10" style={{ color }}>{user.name}</h1>
                   <p className="text-3xl text-slate-400 max-w-4xl font-medium leading-tight uppercase mb-12">{user.bio}</p>
                   {socialsUI}
                </div>
             </section>
             <section className="px-8 lg:px-24 py-40 space-y-32">
                <h2 className="text-7xl font-black italic uppercase" style={{ color }}>// DATA_ARCHIVE</h2>
                <div className="grid lg:grid-cols-2 gap-16">
                  {user.projects.map(proj => (
                    <div key={proj.id} className="bg-black/80 border-4 border-white/5 p-4 stagger-item group">
                        <div className="relative overflow-hidden">
                          {proj.imageUrl ? <img src={proj.imageUrl} className="w-full grayscale brightness-50 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-1000" /> : <div className="h-96 bg-white/5"></div>}
                        </div>
                        <div className="p-10">
                          <h3 className="text-4xl font-black uppercase italic mb-4" style={{ color }}>{" >> "} {proj.title}</h3>
                          <p className="text-xl text-slate-500">{proj.description}</p>
                        </div>
                    </div>
                  ))}
                </div>
             </section>
             {contactSection}
          </main>
        );

      default:
        return (
          <main className="relative z-10 grid lg:grid-cols-[1.3fr,0.7fr]">
            <div className="p-8 md:p-32 flex flex-col justify-between border-r border-white/5 bg-[#080808]/80 backdrop-blur-md min-h-screen lg:sticky lg:top-0">
                <div className="stagger-item"><span className="text-[10px] font-black uppercase tracking-[0.8em] opacity-30">Studio // 2024</span></div>
                <div>
                    <h1 className="text-8xl lg:text-[14rem] font-black tracking-tighter leading-none uppercase italic" style={{ color }}>{user.name}</h1>
                    <div className="h-[2px] bg-white/10 w-full my-12 opacity-10"></div>
                    <p className="text-3xl text-slate-500 max-w-xl leading-tight italic">{user.bio}</p>
                </div>
                <div className="space-y-12">
                   <div className="flex flex-col gap-6">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-20">Direct Inquiries</span>
                      <a href={`mailto:${user.email}`} className="text-4xl font-bold hover:italic transition-all border-b-4 border-white/10 w-fit">{user.email}</a>
                   </div>
                   <div className="stagger-item">{socialsUI}</div>
                </div>
            </div>
            <div className="p-8 md:p-32 space-y-60 bg-[#050505]/50">
                <section className="space-y-60">
                   {user.projects.map((proj, i) => (
                    <div key={proj.id} className="stagger-item space-y-12">
                       <span className="text-[10px] font-black opacity-20 tracking-widest uppercase">P_00{i+1} // ARCHIVE</span>
                       {proj.imageUrl && <img src={proj.imageUrl} className="w-full grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-1000" />}
                       <h3 className="text-6xl font-black uppercase italic tracking-tighter">{proj.title}</h3>
                       <p className="text-2xl text-slate-600 leading-relaxed font-medium">{proj.description}</p>
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
    <div ref={containerRef} className="relative min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden" style={fontStyle}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Playfair+Display:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticlesBackground color={color} />
        </Canvas>
      </div>

      {renderTemplate()}
    </div>
  );
}
