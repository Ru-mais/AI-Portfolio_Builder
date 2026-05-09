
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
  description?: string;
}

export interface FormData {
  name: string;
  jobTitle: string;
  bio: string;
  email: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  experiences: Experience[];
  projects: Project[];
  primaryColor: string;
  templateId: string;
  fontId: string;
}

export const fonts = [
  { id: "sans", name: "Modern Sans", family: "'Inter', sans-serif", import: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" },
  { id: "serif", name: "Classic Serif", family: "'Playfair Display', serif", import: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap" },
  { id: "mono", name: "Tech Mono", family: "'Space Mono', monospace", import: "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" },
];

export function generatePortfolioHTML(formData: FormData) {
  const selectedFont = fonts.find(f => f.id === formData.fontId) || fonts[0];
  const color = formData.primaryColor;
  
  const baseHead = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.name} | Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="${selectedFont.import}" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <style>
        body { font-family: ${selectedFont.family}; scroll-behavior: smooth; overflow-x: hidden; margin: 0; background: #050505; color: white; }
        .text-brand { color: ${color}; }
        .bg-brand { background-color: ${color}; }
        .border-brand { border-color: ${color}; }
        .stagger-item { opacity: 0; transform: translateY(30px); }
        #canvas-container { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; z-index: -1; pointer-events: none; opacity: 0.6; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${color}44; border-radius: 10px; }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }
        .neo-shadow { box-shadow: 10px 10px 0px 0px #000; }
        @media (max-width: 768px) { .neo-shadow { box-shadow: 5px 5px 0px 0px #000; } }
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
      const material = new THREE.PointsMaterial({ size: 3, color: '${color}', transparent: true, opacity: 0.8 });
      points = new THREE.Points(geometry, material);
      scene.add(points);
      camera.position.z = 800;
    }
    
    function animateThree() {
      requestAnimationFrame(animateThree);
      points.rotation.y += 0.0005;
      points.rotation.x += 0.0002;
      const scrollY = window.scrollY;
      points.position.y = scrollY * 0.4;
      camera.position.z = 800 + Math.sin(scrollY * 0.001) * 100;
      renderer.render(scene, camera);
    }
    initThree();
    animateThree();
    
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  `;

  const socialsHTML = `
    <div class="flex gap-6 items-center">
      ${formData.email ? `<a href="mailto:${formData.email}" class="hover:text-brand transition-colors">Email</a>` : ''}
      ${formData.linkedin ? `<a href="${formData.linkedin}" target="_blank" class="hover:text-brand transition-colors">LinkedIn</a>` : ''}
      ${formData.github ? `<a href="${formData.github}" target="_blank" class="hover:text-brand transition-colors">GitHub</a>` : ''}
      ${formData.twitter ? `<a href="${formData.twitter}" target="_blank" class="hover:text-brand transition-colors">Twitter</a>` : ''}
    </div>
  `;

  const contactHTML = `
    <section class="py-40 px-6 container mx-auto text-center stagger-item">
      <div class="glass p-12 md:p-24 rounded-[3rem] md:rounded-[6rem] space-y-12">
        <h2 class="text-5xl md:text-8xl font-black uppercase italic">Let's Connect.</h2>
        <p class="text-xl md:text-3xl text-slate-400 max-w-2xl mx-auto font-medium">Interested in working together or just want to say hi? Reach out through any of the platforms below.</p>
        <div class="flex justify-center">${socialsHTML}</div>
        <div class="pt-12">
          <a href="mailto:${formData.email}" class="bg-brand text-white px-12 py-6 rounded-full text-2xl font-black uppercase italic hover:scale-110 transition-transform inline-block shadow-2xl">Send a Message</a>
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
          <section class="min-h-screen flex flex-col justify-center items-center text-center p-6">
            <div class="space-y-6 stagger-item">
              <span class="text-brand font-mono tracking-[0.4em] text-xs uppercase">Welcome</span>
              <h1 class="text-5xl md:text-9xl font-black tracking-tighter uppercase italic leading-none">${formData.name}</h1>
              <p class="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium leading-tight">${formData.bio}</p>
              <div class="pt-8 flex justify-center">${socialsHTML}</div>
            </div>
          </section>

          <section class="py-40 px-6 container mx-auto space-y-40">
            <h2 class="text-6xl md:text-9xl font-black uppercase italic text-brand text-center">Projects.</h2>
            ${formData.projects.map((proj, i) => `
              <div class="grid md:grid-cols-2 gap-20 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}">
                <div class="stagger-item space-y-8">
                  <div class="glass p-12 rounded-[3rem] border-l-8 border-brand">
                    <h3 class="text-4xl font-bold mb-4">${proj.title}</h3>
                    <p class="text-xl text-slate-400 leading-relaxed">${proj.description}</p>
                  </div>
                </div>
                <div class="stagger-item">
                  <div class="glass p-4 rounded-[4rem] overflow-hidden group">
                    ${proj.imageUrl ? `<img src="${proj.imageUrl}" class="w-full h-[600px] object-cover rounded-[3.5rem] grayscale group-hover:grayscale-0 transition-all duration-1000" />` : `<div class="h-[600px] bg-white/5 rounded-[3.5rem]"></div>`}
                  </div>
                </div>
              </div>
            `).join('')}
          </section>

          <section class="py-40 px-6 container mx-auto">
             <h2 class="text-6xl md:text-9xl font-black uppercase italic text-brand text-center mb-20">Journey.</h2>
             <div class="space-y-12 max-w-4xl mx-auto">
                ${formData.experiences.map(exp => `
                  <div class="glass p-12 rounded-[3rem] stagger-item">
                    <h3 class="text-3xl font-black uppercase italic mb-2">${exp.position}</h3>
                    <p class="text-brand font-bold text-xl">@ ${exp.company}</p>
                    ${exp.description ? `<p class="mt-4 text-slate-400 text-lg">${exp.description}</p>` : ''}
                  </div>
                `).join('')}
             </div>
          </section>

          ${contactHTML}
        </main>
      `;
      break;

    case 'glass':
      content = `
        <div id="canvas-container"></div>
        <nav class="p-8 flex justify-between items-center glass sticky top-0 z-50 stagger-item">
            <span class="text-3xl font-black tracking-tighter uppercase italic">${formData.name?.split(' ')[0]}</span>
            ${socialsHTML}
        </nav>
        <main class="max-w-7xl mx-auto px-6 py-20 space-y-40 relative z-10">
            <section class="min-h-[80vh] flex flex-col justify-center">
                <span class="text-brand text-sm font-black uppercase tracking-[0.4em] mb-12 stagger-item">Introduction</span>
                <h1 class="text-6xl md:text-[12rem] font-black tracking-tighter leading-[0.8] mb-12 stagger-item">${formData.name}</h1>
                <p class="text-3xl text-slate-400 max-w-3xl stagger-item leading-tight font-medium">${formData.bio}</p>
            </section>
            
            <section class="space-y-20">
               <h2 class="text-7xl font-black uppercase italic">Selected Works.</h2>
               <div class="grid md:grid-cols-2 gap-16">
                  ${formData.projects.map(proj => `
                    <div class="glass p-3 rounded-[4rem] stagger-item group">
                        ${proj.imageUrl ? `<img src="${proj.imageUrl}" class="w-full h-[600px] object-cover rounded-[3.5rem] grayscale group-hover:grayscale-0 transition-all duration-1000" />` : `<div class="h-[600px] bg-white/5 rounded-[3.5rem]"></div>`}
                        <div class="p-12">
                          <h3 class="text-4xl font-bold mb-4 tracking-tight">${proj.title}</h3>
                          <p class="text-slate-400 leading-relaxed text-lg">${proj.description}</p>
                        </div>
                    </div>
                  `).join('')}
               </div>
            </section>

            <section class="space-y-20">
               <h2 class="text-7xl font-black uppercase italic">Background.</h2>
               <div class="grid gap-12">
                  ${formData.experiences.map(exp => `
                    <div class="glass p-12 rounded-[4rem] stagger-item border-l-8 border-brand">
                        <h3 class="text-4xl font-bold mb-2">${exp.position}</h3>
                        <p class="text-slate-400 text-2xl font-medium">${exp.company}</p>
                    </div>
                  `).join('')}
               </div>
            </section>

            ${contactHTML}
        </main>
      `;
      break;

    case 'cyber':
      content = `
        <div id="canvas-container"></div>
        <main class="relative z-10 font-mono">
            <nav class="border-b border-white/10 p-8 flex justify-between items-center backdrop-blur-3xl sticky top-0 z-50">
               <span class="text-xs font-black tracking-[1em] text-brand uppercase">CORE_IDENTITY: ${formData.name?.toUpperCase()}</span>
               <div class="flex gap-8 text-[10px] uppercase font-bold">
                 ${formData.email ? `<a href="mailto:${formData.email}" class="text-brand">[MAIL]</a>` : ''}
                 ${formData.linkedin ? `<a href="${formData.linkedin}" class="text-brand">[LINKEDIN]</a>` : ''}
               </div>
            </nav>
            <section class="h-screen flex flex-col justify-center px-8 lg:px-24">
               <div class="border-l-8 border-brand pl-12 stagger-item">
                 <h1 class="text-7xl lg:text-[14rem] font-black italic tracking-tighter mb-8 text-brand leading-none uppercase">${formData.name}</h1>
                 <p class="text-3xl text-slate-400 max-w-4xl font-medium leading-tight uppercase underline decoration-brand/30 underline-offset-8">${formData.bio}</p>
               </div>
            </section>

            <section class="px-8 lg:px-24 py-40 space-y-40">
              <h2 class="text-8xl font-black italic text-brand">// ARCHIVES</h2>
              <div class="grid lg:grid-cols-2 gap-16">
                 ${formData.projects.map(proj => `
                    <div class="border-4 border-white/5 bg-black/90 p-4 stagger-item group">
                       <div class="relative overflow-hidden">
                          ${proj.imageUrl ? `<img src="${proj.imageUrl}" class="w-full grayscale brightness-50 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-1000" />` : `<div class="h-96 bg-white/5"></div>`}
                       </div>
                       <div class="p-10">
                          <h3 class="text-4xl font-black uppercase italic mb-4 text-brand">>> ${proj.title}</h3>
                          <p class="text-xl text-slate-500">${proj.description}</p>
                       </div>
                    </div>
                 `).join('')}
              </div>
            </section>

            <section class="px-8 lg:px-24 py-40">
               <h2 class="text-8xl font-black italic text-brand mb-20">// LEGACY</h2>
               <div class="grid gap-8">
                  ${formData.experiences.map(exp => `
                    <div class="border-4 border-white/5 bg-black/90 p-12 stagger-item">
                       <h3 class="text-5xl font-black uppercase italic text-brand">${exp.position}</h3>
                       <p class="text-2xl text-slate-500 mt-4 underline decoration-brand">STATION: ${exp.company}</p>
                    </div>
                  `).join('')}
               </div>
            </section>

            ${contactHTML}
        </main>
      `;
      break;

    case 'bento':
      content = `
        <div id="canvas-container"></div>
        <main class="max-w-[1600px] mx-auto p-4 md:p-12 grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-10 relative z-10">
            <div class="md:col-span-4 bg-white rounded-[4rem] p-16 shadow-sm flex flex-col justify-between min-h-[550px] stagger-item">
                <div class="w-32 h-32 rounded-[2.5rem] shadow-2xl" style="background-color: ${color}"></div>
                <div>
                    <h1 class="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-10 uppercase text-black">${formData.name}</h1>
                    <p class="text-4xl text-slate-400 max-w-2xl font-semibold leading-tight">${formData.bio}</p>
                </div>
            </div>
            <div class="md:col-span-2 rounded-[4rem] p-16 shadow-2xl text-white flex flex-col justify-between stagger-item" style="background-color: ${color}">
                <h2 class="text-5xl font-black uppercase italic tracking-tighter">Connection</h2>
                <div class="flex flex-col gap-4 text-2xl font-bold">
                   ${formData.email ? `<a href="mailto:${formData.email}" class="hover:underline">Mail</a>` : ''}
                   ${formData.linkedin ? `<a href="${formData.linkedin}" class="hover:underline">LinkedIn</a>` : ''}
                   ${formData.github ? `<a href="${formData.github}" class="hover:underline">GitHub</a>` : ''}
                </div>
            </div>

            ${formData.projects.map((proj, i) => `
              <div class="md:col-span-3 bg-white rounded-[4rem] overflow-hidden shadow-sm stagger-item group">
                  ${proj.imageUrl ? `<img src="${proj.imageUrl}" class="w-full h-[500px] object-cover" />` : `<div class="h-[500px] bg-slate-50"></div>`}
                  <div class="p-16">
                    <h3 class="text-5xl font-black mb-6 tracking-tighter uppercase text-black">${proj.title}</h3>
                    <p class="text-2xl text-slate-500 leading-relaxed">${proj.description}</p>
                  </div>
              </div>
            `).join('')}

            <div class="md:col-span-6 bg-slate-50 rounded-[4rem] p-24 stagger-item">
               <h2 class="text-7xl font-black uppercase tracking-tighter text-black mb-16">Experience</h2>
               <div class="grid md:grid-cols-2 gap-12">
                  ${formData.experiences.map(exp => `
                    <div class="bg-white p-12 rounded-[3rem] shadow-sm">
                       <h4 class="text-4xl font-black text-black uppercase mb-2">${exp.position}</h4>
                       <p class="text-2xl font-bold text-slate-400">${exp.company}</p>
                    </div>
                  `).join('')}
               </div>
            </div>
            
            <div class="md:col-span-6">
              ${contactHTML}
            </div>
        </main>
      `;
      break;

    default:
      content = `
        <div id="canvas-container"></div>
        <main class="relative z-10 grid lg:grid-cols-[1.3fr,0.7fr]">
            <div class="p-8 md:p-32 flex flex-col justify-between border-r border-white/5 bg-[#080808]/80 backdrop-blur-md min-h-screen lg:sticky lg:top-0">
                <div class="stagger-item"><span class="text-[10px] font-black uppercase tracking-[0.8em] opacity-30">Selection // 24</span></div>
                <div>
                    <h1 class="text-8xl lg:text-[14rem] font-black tracking-tighter leading-none uppercase italic" style="color: ${color}">${formData.name}</h1>
                    <div class="h-[2px] bg-white w-full my-16 opacity-10"></div>
                    <p class="text-3xl text-slate-500 max-w-xl leading-tight italic">${formData.bio}</p>
                </div>
                <div class="space-y-12">
                   <div class="flex flex-col gap-6">
                      <span class="text-[10px] font-black uppercase tracking-widest opacity-20">Inquiries</span>
                      <a href="mailto:${formData.email}" class="text-4xl font-bold hover:italic transition-all border-b-4 border-white/10 w-fit">${formData.email}</a>
                   </div>
                   <div class="pt-8">${socialsHTML}</div>
                </div>
            </div>
            <div class="p-8 md:p-32 space-y-60 bg-[#050505]/50">
                <section class="space-y-40">
                  ${formData.projects.map((proj, i) => `
                    <div class="stagger-item space-y-12">
                       <span class="text-[10px] font-black opacity-20 tracking-widest uppercase">Archive // 00${i+1}</span>
                       ${proj.imageUrl ? `<img src="${proj.imageUrl}" class="w-full grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-1000" />` : ''}
                       <h3 class="text-6xl font-black uppercase italic tracking-tighter">${proj.title}</h3>
                       <p class="text-2xl text-slate-600 leading-relaxed font-medium">${proj.description}</p>
                    </div>
                  `).join('')}
                </section>

                <section class="space-y-40">
                   <h2 class="text-8xl font-black uppercase italic border-b-8 border-white/5 pb-8">Legacy.</h2>
                   ${formData.experiences.map(exp => `
                    <div class="stagger-item space-y-4">
                       <h4 class="text-5xl font-black uppercase italic leading-none">${exp.position}</h4>
                       <p class="text-3xl text-slate-500 font-medium">@ ${exp.company}</p>
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
          anime({
            targets: entry.target,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1500,
            easing: 'easeOutExpo'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.stagger-item').forEach(el => observer.observe(el));
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    ${baseHead}
</head>
<body>
    ${content}
    <script>
      window.onload = () => {
        ${commonThree}
        ${animeScript}
      };
    </script>
</body>
</html>`;
}
