import React from 'react';
import { ArrowDown, ExternalLink, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Section } from './components/Section';
import { MicrosoftFolder } from './components/MicrosoftFolder';
import { PROJECTS, WHY_ME, HOBBIES, SOCIALS } from './constants';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-gray-900 selection:bg-blue-200 selection:text-blue-900">
      <Navbar />

      {/* === HERO SECTION === */}
      <section id="hero" className="relative min-h-screen w-full flex flex-col justify-center px-8 pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

          {/* Text Content - Left Aligned to match request (standard alignment) */}
          <div className="space-y-6 animate-fade-in-up z-10 max-w-2xl flex flex-col items-start text-left justify-self-center">
            <h2 className="text-lg md:text-xl font-mono text-gray-500 tracking-wider uppercase flex items-center gap-2">
              <Sparkles size={16} className="text-emerald-500" />
              UI Designer
            </h2>

            <div className="space-y-0 pb-4">
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-gray-900 leading-tight">
                Hello I'm
              </h1>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 leading-tight pb-2">
                Wang Aoyun
              </h1>
            </div>

            <p className="text-xl text-gray-600 max-w-lg leading-relaxed pt-2">
              I excel at crafting elegant digital experiences and I am proficient in various design tools and methodologies to bring user-centric products to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                Explore Projects
                <ArrowDown className="w-5 h-5" />
              </a>

              <div className="flex items-center gap-4">
                {SOCIALS.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 transition-all hover:scale-110"
                    title={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Circular Image - Center Aligned */}
          <div className="hidden md:flex relative h-[600px] w-full items-center justify-center">
            {/* Rotating Rings */}
            <div className="absolute w-[500px] h-[500px] rounded-full border border-emerald-100/60 animate-[spin_15s_linear_infinite]" />

            {/* BOLD GREEN DASHED LINE - Refined Pattern based on Reference */}
            {/* 
                 Changes:
                 - Pattern: Long(60) Gap(35) Short(8) Gap(35)
                 - Increased gap from 20 to 35 as requested
             */}
            <svg className="absolute w-[440px] h-[440px] animate-[spin_30s_linear_infinite_reverse] opacity-80" viewBox="0 0 440 440">
              <circle
                cx="220"
                cy="220"
                r="217"
                fill="none"
                stroke="#10b981"
                strokeWidth="5"
                strokeDasharray="60 35 8 35"
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute w-[540px] h-[540px] rounded-full border-[0.5px] border-gray-200 animate-[pulse_4s_ease-in-out_infinite]" />

            {/* Image Container with Hover Zoom */}
            <div className="relative w-[400px] h-[400px] rounded-full overflow-hidden shadow-2xl z-10 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 mix-blend-overlay z-10 pointer-events-none" />
              <img
                src="https://pic.allhistory.com/T18XKCBXET1RCvBVdK.jpeg"
                alt="Wang Aoyun"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              />
            </div>
          </div>

        </div>
      </section>

      {/* === ABOUT ME === */}
      <Section id="about" title="关于我" englishTitle="About Me">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6 text-xl leading-relaxed font-light">
              I am a digital artisan focused on creating meaningful interfaces that bridge the gap between human intent and machine execution.
            </p>
            <p className="leading-relaxed">
              With over 5 years of experience in the design industry, I strive to build digital products that are not only visually stunning but also intuitively functional. My philosophy is simple: clarity above all else.
            </p>
          </div>
          <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200 group">
            <img
              src="https://picsum.photos/800/1000?grayscale"
              alt="Wang Aoyun"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </Section>

      {/* === WHY ME === */}
      <Section id="whyme" title="我的优势" englishTitle="My Advantages" className="bg-white">
        <div className="grid md:grid-cols-3 gap-8">
          {WHY_ME.map((point, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-100">
              <h3 className="text-2xl font-bold mb-4">{point.title}</h3>
              <p className="text-gray-600 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* === PROJECTS === */}
      <Section id="projects" title="项目展示" englishTitle="Selected Works" subtitle="A collection of my recent endeavors.">
        {/* Force 3 columns on desktop for the 3 projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {PROJECTS.map((project) => (
            <MicrosoftFolder key={project.id} project={project} />
          ))}
        </div>
      </Section>

      {/* === AFTER WORK === */}
      <Section id="afterwork" title="工作之余" englishTitle="Life After Work" subtitle="When the design tools are closed, this is where you'll find me.">
        <div className="grid md:grid-cols-3 gap-6">
          {HOBBIES.map((hobby, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-xl aspect-[3/4] cursor-default">
              <img
                src={hobby.image}
                alt={hobby.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-0 left-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="text-xl font-bold mb-2">{hobby.title}</h4>
                <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{hobby.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* === CONTACT === */}
      <Section id="contact" className="bg-stone-50 pb-32" title="联系我" englishTitle="Get In Touch">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Let's create together.</h2>
          <p className="text-xl text-gray-500 mb-12">
            Currently available for freelance projects and full-time opportunities.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-800 hover:border-black hover:shadow-lg transition-all"
              >
                <social.icon size={20} />
                <span className="font-medium">{social.name}</span>
                {social.name === 'Email' && <ExternalLink size={14} className="ml-1 opacity-50" />}
              </a>
            ))}
          </div>

          <footer className="mt-32 text-gray-400 text-sm">
            © {new Date().getFullYear()} Wang Aoyun. All rights reserved.
          </footer>
        </div>
      </Section>
    </div>
  );
}

export default App;