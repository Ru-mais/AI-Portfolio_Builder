
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  year?: string;
  description?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface FormData {
  name: string;
  jobTitle: string;
  bio: string;
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  education: Education[];
  skills: string[];
  experiences: Experience[];
  projects: Project[];
  primaryColor: string;
  templateId: string;
  fontId: string;
}

export const fonts = [
  { id: "sans", name: "Standard Sans", family: "'Inter', sans-serif", import: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" },
  { id: "syne", name: "Modern Artistic", family: "'Syne', sans-serif", import: "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap" },
  { id: "bebas", name: "Brutalist Impact", family: "'Bebas Neue', sans-serif", import: "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" },
  { id: "mono", name: "Cyber Terminal", family: "'Space Mono', monospace", import: "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" },
  { id: "pixel", name: "8-Bit Retro", family: "'Press Start 2P', cursive", import: "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" },
  { id: "fraunces", name: "Elegant Serif", family: "'Fraunces', serif", import: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;700;900&display=swap" },
];

export function generatePortfolioHTML(formData: FormData) {
  const selectedFont = fonts.find(f => f.id === formData.fontId) || fonts[0];
  const color = formData.primaryColor;
  
  // Custom font logic based on template
  let fontOverride = selectedFont.family;
  if (formData.fontId === 'sans') { // Only override if user hasn't picked a specific font yet
      switch(formData.templateId) {
          case 'cyber': fontOverride = "'Space Mono', monospace"; break;
          case 'neo': fontOverride = "'Bebas Neue', sans-serif"; break;
          case 'aurora': fontOverride = "'Syne', sans-serif"; break;
          case 'dimension': fontOverride = "'Inter', sans-serif"; break;
      }
  }

  const baseHead = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.name} | Professional Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Syne:wght@400;700;800&family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Press+Start+2P&family=Fraunces:opsz,wght@9..144,400;700;900&display=swap" rel="stylesheet">
    <link href="${selectedFont.import}" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <style>
        body { font-family: ${fontOverride}; scroll-behavior: smooth; overflow-x: hidden; margin: 0; background: #050505; color: white; }
        .text-brand { color: ${color}; }
        .bg-brand { background-color: ${color}; }
        .border-brand { border-color: ${color}; }
        .stagger-item { opacity: 0; transform: translateY(50px); }
        #canvas-container { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; z-index: -1; pointer-events: none; opacity: 0.4; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${color}44; border-radius: 10px; }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(50px); border: 1px solid rgba(255,255,255,0.08); }
        .neo-border { border: 12px solid #000; }
        .cyber-grid { background-image: radial-gradient(${color}22 1px, transparent 1px); background-size: 40px 40px; }
        .break-words { overflow-wrap: break-word; word-break: break-word; }
    </style>
  `;

  const commonThree = `
    let scene, camera, renderer, points;
    function initThree() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      document.getElementById('canvas-container').appendChild(renderer.domElement);
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      for (let i = 0; i < 3000; i++) {
        vertices.push(Math.random() * 2000 - 1000, Math.random() * 2000 - 1000, Math.random() * 2000 - 1000);
      }
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      const material = new THREE.PointsMaterial({ size: 2, color: '${color}', transparent: true, opacity: 0.5 });
      points = new THREE.Points(geometry, material);
      scene.add(points);
      camera.position.z = 800;
    }
    function animateThree() {
      requestAnimationFrame(animateThree);
      points.rotation.y += 0.0003;
      renderer.render(scene, camera);
    }
    initThree();
    animateThree();
  `;

  const socialsHTML = `
    <div class="flex flex-wrap gap-8 items-center justify-center">
      ${formData.email ? `<a href="mailto:${formData.email}" class="hover:text-brand transition-all uppercase font-black italic tracking-widest text-xs">Email_</a>` : ''}
      ${formData.linkedin ? `<a href="${formData.linkedin}" target="_blank" class="hover:text-brand transition-all uppercase font-black italic tracking-widest text-xs">LinkedIn_</a>` : ''}
      ${formData.github ? `<a href="${formData.github}" target="_blank" class="hover:text-brand transition-all uppercase font-black italic tracking-widest text-xs">GitHub_</a>` : ''}
      ${formData.twitter ? `<a href="${formData.twitter}" target="_blank" class="hover:text-brand transition-all uppercase font-black italic tracking-widest text-xs">Twitter_</a>` : ''}
    </div>
  `;

  const techStackHTML = `
    <div class="flex flex-wrap gap-4">
      ${formData.skills.map(s => `<span class="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest">${s}</span>`).join('')}
    </div>
  `;

  const educationHTML = `
    <div class="space-y-8">
      ${formData.education.map(e => `
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
              <h4 class="text-2xl font-bold">${e.degree}</h4>
              <p class="text-brand font-black uppercase tracking-widest italic text-sm mt-1">${e.school}</p>
           </div>
           <span class="text-xl font-bold opacity-20 italic">${e.year}</span>
        </div>
      `).join('')}
    </div>
  `;

  const contactHTML = `
    <section class="py-40 px-6 container mx-auto text-center stagger-item">
      <div class="glass p-8 md:p-24 rounded-[3rem] space-y-12">
        <h2 class="text-5xl md:text-8xl font-black uppercase italic tracking-tighter">Initialize Project.</h2>
        <p class="text-xl md:text-3xl text-slate-400 max-w-2xl mx-auto font-medium">Ready to deploy your next venture? Let's discuss architecture and execution.</p>
        <div class="flex justify-center">${socialsHTML}</div>
        <div class="pt-12">
          <a href="mailto:${formData.email}" class="bg-brand text-white px-12 py-6 rounded-full text-2xl font-black uppercase italic hover:scale-110 transition-transform inline-block shadow-2xl">Send Message</a>
        </div>
      </div>
    </section>
  `;

  let content = "";
  switch (formData.templateId) {
    case 'dimension':
      content = `
        <div id="canvas-container"></div>
        <main class="relative z-10">
          <section class="min-h-screen flex flex-col justify-center px-12 md:px-32">
            <h1 class="text-8xl md:text-[clamp(5rem,15vw,16rem)] font-black tracking-tighter leading-[0.8] uppercase italic break-words" style="color: ${color}">${formData.name}</h1>
            <p class="text-3xl md:text-6xl text-slate-400 max-w-5xl font-medium mt-12 uppercase">${formData.bio}</p>
            <div class="mt-20">${socialsHTML}</div>
          </section>
          <section class="py-40 px-12 md:px-32 grid md:grid-cols-2 gap-40">
             <div class="space-y-16"><h2 class="text-6xl font-black uppercase italic text-brand">Education.</h2>${educationHTML}</div>
             <div class="space-y-16"><h2 class="text-6xl font-black uppercase italic text-brand">Stack.</h2>${techStackHTML}</div>
          </section>
          <section class="py-40 px-12 md:px-32 space-y-60">
            <h2 class="text-8xl font-black uppercase italic text-center text-brand">Projects.</h2>
            ${formData.projects.map((proj, i) => `<div class="flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-20 items-center stagger-item"><div class="w-full md:w-3/5 glass rounded-[2rem] overflow-hidden aspect-video">${proj.imageUrl ? `<img src="${proj.imageUrl}" class="w-full h-full object-cover" />` : ''}</div><div class="w-full md:w-2/5 space-y-8"><h3 class="text-5xl font-black uppercase italic">${proj.title}</h3><p class="text-xl text-slate-400 italic">${proj.description}</p></div></div>`).join('')}
          </section>
          <section class="py-40 px-12 md:px-32">
             <h2 class="text-8xl font-black uppercase italic text-brand mb-20 text-right">Legacy.</h2>
             <div class="grid gap-12">
                ${formData.experiences.map(exp => `
                  <div class="glass p-12 rounded-[3rem] stagger-item flex flex-col md:flex-row justify-between items-center gap-8">
                     <div>
                        <h3 class="text-4xl font-black uppercase italic">${exp.position}</h3>
                        <p class="text-2xl font-bold uppercase tracking-widest text-brand">${exp.company}</p>
                     </div>
                     <span class="text-2xl font-black opacity-20 italic">${exp.year}</span>
                  </div>
                `).join('')}
             </div>
          </section>
          ${contactHTML}
        </main>
      `;
      break;

    case 'aurora':
      content = `
        <div id="canvas-container"></div>
        <main class="relative z-10 min-h-screen flex flex-col items-center">
            <section class="h-screen flex flex-col justify-center items-center text-center px-6 stagger-item">
               <h1 class="text-9xl md:text-[clamp(6rem,18vw,20rem)] font-black tracking-tighter leading-[0.8] mix-blend-overlay italic break-words w-full">${formData.name}</h1>
               <p class="text-2xl md:text-5xl text-slate-500 max-w-5xl font-medium leading-none tracking-tighter italic mt-12">${formData.bio}</p>
               <div class="pt-20 flex justify-center">${socialsHTML}</div>
            </section>
            <section class="w-full max-w-5xl px-6 py-40 space-y-32">
                <div class="grid md:grid-cols-2 gap-20">
                   <div class="space-y-8"><h2 class="text-4xl font-black uppercase italic opacity-20">Education</h2>${educationHTML}</div>
                   <div class="space-y-8"><h2 class="text-4xl font-black uppercase italic opacity-20">Stack</h2>${techStackHTML}</div>
                </div>
                <div class="pt-40 space-y-80">${formData.projects.map(p => `<div class="stagger-item text-center space-y-12"><div class="aspect-video rounded-[3rem] overflow-hidden">${p.imageUrl ? `<img src="${p.imageUrl}" class="w-full h-full object-cover" />` : ''}</div><h3 class="text-6xl font-black uppercase italic tracking-tighter">${p.title}</h3><p class="text-2xl text-slate-500 italic leading-relaxed">${p.description}</p></div>`).join('')}</div>
                <section class="space-y-20"><h2 class="text-4xl font-black uppercase italic opacity-20">Legacy</h2>${formData.experiences.map(exp => `<div class="flex justify-between items-center py-12 border-b border-white/10"><div class="space-y-2"><h3 class="text-5xl font-black uppercase italic">${exp.position}</h3><p class="text-xl font-bold uppercase tracking-widest text-brand" style="color: ${color}">${exp.company}</p></div><span class="text-2xl font-black italic opacity-20">${exp.year}</span></div>`).join('')}</section>
            </section>
            ${contactHTML}
        </main>
      `;
      break;

    case 'glass':
      content = `
        <div id="canvas-container"></div>
        <main class="max-w-[1400px] mx-auto px-6 py-20 space-y-40 relative z-10">
            <div class="glass rounded-[4rem] p-12 md:p-32 space-y-40">
                <section class="text-center"><h1 class="text-7xl md:text-[clamp(4rem,10vw,10rem)] font-black tracking-tighter italic break-words mb-12">${formData.name}</h1><p class="text-3xl text-slate-300 max-w-4xl mx-auto font-medium">${formData.bio}</p><div class="pt-20">${socialsHTML}</div></section>
                <div class="grid md:grid-cols-2 gap-20"><div class="space-y-12"><h2 class="text-5xl font-black uppercase italic">Academic.</h2>${educationHTML}</div><div class="space-y-12"><h2 class="text-5xl font-black uppercase italic">Stack.</h2>${techStackHTML}</div></div>
                <section class="space-y-20"><h2 class="text-7xl font-black uppercase italic">Works.</h2><div class="grid md:grid-cols-2 gap-12">${formData.projects.map(proj => `<div class="glass p-3 rounded-[3rem] overflow-hidden group aspect-video relative">${proj.imageUrl ? `<img src="${proj.imageUrl}" class="w-full h-full object-cover transition-transform group-hover:scale-105" />` : ''}<div class="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity"><h3 class="text-3xl font-black uppercase italic">${proj.title}</h3><p class="text-slate-400 italic">${proj.description}</p></div></div>`).join('')}</div></section>
                <section class="space-y-12">
                   <h2 class="text-7xl font-black uppercase italic">Legacy.</h2>
                   <div class="space-y-8">
                      ${formData.experiences.map(exp => `
                        <div class="glass p-12 rounded-[3rem] flex justify-between items-center stagger-item">
                           <div>
                              <h3 class="text-3xl font-black uppercase italic">${exp.position}</h3>
                              <p class="text-xl font-bold uppercase tracking-widest text-brand">${exp.company}</p>
                           </div>
                           <span class="text-xl font-bold opacity-20 italic">${exp.year}</span>
                        </div>
                      `).join('')}
                   </div>
                </section>
            </div>
            ${contactHTML}
        </main>
      `;
      break;

    case 'bento':
      content = `
        <div id="canvas-container"></div>
        <main class="max-w-[1600px] mx-auto p-4 md:p-12 grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10">
            <div class="md:col-span-4 bg-white text-black p-12 md:p-16 rounded-[4rem] min-h-[500px] flex flex-col justify-between stagger-item">
                <div class="w-20 h-20 rounded-[2rem] shadow-xl" style="background-color: ${color}"></div>
                <div><h1 class="text-7xl md:text-[clamp(4rem,8vw,8rem)] font-black tracking-tighter uppercase leading-[0.9] break-words">${formData.name}</h1><p class="text-3xl text-slate-500 font-bold mt-8">${formData.bio}</p></div>
            </div>
            <div class="md:col-span-2 rounded-[4rem] p-12 md:p-16 flex flex-col justify-between stagger-item" style="background-color: ${color}"><h2 class="text-5xl font-black uppercase text-white italic">Direct.</h2><div class="flex flex-col gap-6 text-white">${socialsHTML}</div></div>
            <div class="md:col-span-3 glass rounded-[4rem] p-12 border border-white/10"><h2 class="text-4xl font-black uppercase italic mb-8 opacity-20 text-white">Education</h2>${educationHTML}</div>
            <div class="md:col-span-3 glass rounded-[4rem] p-12 border border-white/10"><h2 class="text-4xl font-black uppercase italic mb-8 opacity-20 text-white">Stack</h2>${techStackHTML}</div>
            ${formData.projects.map(proj => `<div class="md:col-span-3 glass rounded-[4rem] overflow-hidden stagger-item"><div class="aspect-video">${proj.imageUrl ? `<img src="${proj.imageUrl}" class="w-full h-full object-cover" />` : `<div class="w-full h-full bg-white/5"></div>`}</div><div class="p-12"><h3 class="text-4xl font-black uppercase italic">${proj.title}</h3><p class="text-slate-400 mt-4 italic">${proj.description}</p></div></div>`).join('')}
        </main>
        ${contactHTML}
      `;
      break;

    case 'neo':
      content = `
        <main class="relative z-10 p-6 md:p-12 bg-white text-black min-h-screen">
            <div class="neo-border p-12 md:p-32 space-y-60">
                <section class="stagger-item"><h1 class="text-8xl md:text-[clamp(5rem,14vw,16rem)] font-black uppercase italic tracking-tighter leading-[0.8] border-b-[12px] border-black pb-12 break-words">${formData.name}</h1><p class="text-4xl md:text-8xl font-black uppercase italic mt-12 leading-none">${formData.bio}</p></section>
                <div class="grid md:grid-cols-2 gap-px bg-black border-[6px] border-black"><div class="bg-white p-12"><h2 class="text-5xl font-black uppercase italic mb-6">Academic_</h2>${educationHTML}</div><div class="bg-white p-12"><h2 class="text-5xl font-black uppercase italic mb-6">Stack_</h2>${techStackHTML}</div></div>
                <section class="space-y-40"><h2 class="text-7xl font-black uppercase italic bg-black text-white inline-block px-12 py-4 stagger-item">Projects_</h2><div class="grid md:grid-cols-2 gap-px bg-black">${formData.projects.map(proj => `<div class="bg-white p-12 stagger-item hover:invert transition-all group"><h3 class="text-5xl font-black uppercase italic mb-6">${proj.title}</h3><p class="text-2xl font-bold uppercase">${proj.description}</p></div>`).join('')}</div></section>
                <section class="space-y-12">
                   <h2 class="text-5xl font-black uppercase italic border-b-4 border-black pb-4">Experience_</h2>
                   ${formData.experiences.map(exp => `<div class="flex justify-between items-center py-8 border-b-2 border-black/10"><div><h3 class="text-3xl font-black uppercase italic">${exp.position}</h3><p class="text-xl font-bold uppercase tracking-widest">${exp.company}</p></div><span class="text-2xl font-black italic">${exp.year}</span></div>`).join('')}
                </section>
                <div class="bg-black p-12 text-white">${socialsHTML}</div>
            </div>
        </main>
        ${contactHTML}
      `;
      break;

    case 'cyber':
      content = `
        <div id="canvas-container"></div>
        <main class="relative z-10 font-mono p-4 md:p-12 cyber-grid min-h-screen">
            <div class="border-4 border-brand p-8 md:p-20" style="border-color: ${color}">
                <section class="mb-40"><h1 class="text-7xl md:text-[clamp(4rem,12vw,14rem)] font-black italic tracking-tighter text-brand uppercase leading-none break-words">${formData.name}</h1><p class="text-3xl text-slate-400 mt-8 border-l-8 pl-12 uppercase" style="border-color: ${color}">[STATION_ID]: ${formData.bio}</p></section>
                <section class="grid lg:grid-cols-2 gap-20 mb-40"><div class="space-y-12"><h2 class="text-5xl font-black italic uppercase text-brand">// ACADEMIC_LOG</h2>${educationHTML}</div><div class="space-y-12"><h2 class="text-5xl font-black italic uppercase text-brand">// TECH_ARRAY</h2>${techStackHTML}</div></section>
                <section class="space-y-32 mb-60"><h2 class="text-6xl font-black italic uppercase text-brand">// PROJECT_STACK</h2><div class="grid md:grid-cols-2 gap-12">${formData.projects.map(proj => `<div class="border-2 border-white/10 p-10 bg-black/80 stagger-item group"><h3 class="text-4xl font-black italic text-brand mb-4">>> ${proj.title}</h3><p class="text-slate-500 mb-8 uppercase text-lg">${proj.description}</p>${proj.imageUrl ? `<img src="${proj.imageUrl}" class="w-full grayscale brightness-50 group-hover:brightness-100 transition-all" />` : ''}</div>`).join('')}</div></section>
                <section class="space-y-12"><h2 class="text-6xl font-black italic uppercase text-brand">// EXPERIENCE_SYNC</h2>${formData.experiences.map(exp => `<div class="border-l-4 p-8 bg-white/5 stagger-item flex justify-between items-center" style="border-color: ${color}"><div><h3 class="text-3xl font-black italic uppercase text-white">${exp.position}</h3><p class="text-xl opacity-40 uppercase mt-2 font-black text-white">${exp.company}</p></div><span class="text-2xl font-black opacity-40 italic text-white">[${exp.year}]</span></div>`).join('')} </section>
                <div class="mt-40">${socialsHTML}</div>
            </div>
            ${contactHTML}
        </main>
      `;
      break;

    default:
      content = `
        <div id="canvas-container"></div>
        <main class="relative z-10 grid lg:grid-cols-[1.3fr,0.7fr] min-h-screen">
            <div class="p-8 md:p-32 flex flex-col justify-between border-r border-white/10 lg:sticky lg:top-0 lg:h-screen"><h1 class="text-9xl font-black leading-[0.8] uppercase italic break-words" style="color: ${color}">${formData.name}</h1><p class="text-3xl text-slate-500 max-w-xl italic font-medium">${formData.bio}</p><div class="pt-20">${socialsHTML}</div></div>
            <div class="p-8 md:p-32 space-y-60">
                <section class="space-y-20"><h2 class="text-4xl font-black uppercase tracking-widest opacity-20 italic">Education_</h2>${educationHTML}</section>
                <section class="space-y-20"><h2 class="text-4xl font-black uppercase tracking-widest opacity-20 italic">Stack_</h2>${techStackHTML}</section>
                <section class="space-y-60">
                   <h2 class="text-4xl font-black uppercase tracking-widest opacity-20 italic">Projects_</h2>
                   ${formData.projects.map((proj, i) => `
                    <div class="stagger-item space-y-12">
                       <h3 class="text-7xl font-black uppercase italic tracking-tighter leading-none">${proj.title}</h3>
                       <div class="grid md:grid-cols-2 gap-12 items-end">
                          <p class="text-2xl text-slate-500 italic font-medium leading-relaxed">${proj.description}</p>
                          ${proj.imageUrl ? `<img src="${proj.imageUrl}" class="w-full grayscale opacity-40 hover:opacity-100 rounded-2xl transition-all" />` : '<div class="aspect-video bg-white/5 rounded-2xl"></div>'}
                       </div>
                    </div>
                   `).join('')}
                </section>
                <section class="space-y-32">
                   <h2 class="text-4xl font-black uppercase tracking-widest opacity-20 italic">Legacy_</h2>
                   ${formData.experiences.map(exp => `
                    <div class="stagger-item flex justify-between items-end border-b border-white/10 pb-12">
                        <div class="space-y-4">
                           <h4 class="text-6xl font-black uppercase italic leading-none">${exp.position}</h4>
                           <p class="text-xl font-black uppercase tracking-widest text-brand italic" style={{ color }}>@ ${exp.company}</p>
                        </div>
                        <span class="text-2xl font-black opacity-20 italic">${exp.year}</span>
                    </div>
                   `).join('')}
                </section>
                ${contactHTML}
            </div>
        </main>
      `;
      break;
  }

  const animeScript = `
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({ targets: entry.target, translateY: [50, 0], opacity: [0, 1], duration: 1500, easing: 'easeOutExpo' });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.stagger-item').forEach(el => observer.observe(el));
  `;

  return `<!DOCTYPE html><html lang="en"><head>${baseHead} <style>.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }</style></head><body>${content}<script>window.onload = () => { ${commonThree} ${animeScript} };</script></body></html>`;
}
