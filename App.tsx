import React, { useState } from 'react';
import { ArrowDown, ExternalLink, Sparkles } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Section } from './components/Section';
import { MicrosoftFolder } from './components/MicrosoftFolder';
import { CountUp } from './components/CountUp';
import { Toast } from './components/Toast';
import { FloatingEmoji } from './components/FloatingEmoji';
import { PROJECTS, WHY_ME, HOBBIES, SOCIALS } from './constants';

const BASE_STATS = [
  { value: 3, suffix: '', line1: 'YEARS OF', line2: 'experience', isDynamic: false },
  { value: 15, suffix: '', line1: 'PROJECTS', line2: 'completed', isDynamic: false },
  { value: 10, suffix: '', line1: 'DESIGN & ART', line2: 'honors', isDynamic: false },
  { value: 100, suffix: '', line1: 'TOTAL SITE', line2: 'visits', isDynamic: true },
];

function App() {
  const [showToast, setShowToast] = useState(false);
  const [realVisits, setRealVisits] = useState(0);

  // Simulate fetching real visit count (you can replace with actual API call)
  useState(() => {
    // This would be replaced with actual analytics API
    const fakeRealVisits = Math.floor(Math.random() * 500); // Simulated real visits
    setRealVisits(fakeRealVisits);
  });

  const STATS = BASE_STATS.map(stat =>
    stat.isDynamic ? { ...stat, value: stat.value + realVisits } : stat
  );

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('hi@wangaoyun.cc');
      setShowToast(true);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-gray-900 selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      <Toast message="邮箱已复制成功" isVisible={showToast} onClose={() => setShowToast(false)} />

      {/* === HERO SECTION === */}
      <section id="hero" className="relative min-h-screen w-full flex flex-col justify-between px-8 pt-20 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 items-center flex-1">

          {/* Text Content - Left Aligned to match request (standard alignment) */}
          <div className="space-y-5 animate-fade-in-up z-10 max-w-2xl flex flex-col items-start text-left justify-self-center">
            <h2 className="text-lg md:text-xl font-mono text-gray-500 tracking-wider uppercase flex items-center gap-2">
              <Sparkles size={16} className="text-emerald-500" />
              UI Designer
            </h2>

            <div className="space-y-0 pb-2">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 leading-tight">
                Hello I'm
              </h1>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 leading-tight pb-2">
                Wang Aoyun
              </h1>
            </div>

            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              I excel at crafting elegant digital experiences and I am proficient in various design tools and methodologies to bring user-centric products to life.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-gray-900 text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
              >
                Explore Projects
                <ArrowDown className="w-5 h-5" />
              </a>

              <div className="flex items-center gap-3">
                {SOCIALS.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    onClick={social.name === 'Email' ? handleEmailClick : undefined}
                    className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 transition-all hover:scale-110"
                    title={social.name}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Circular Image - Center Aligned */}
          <div className="hidden md:flex relative h-[500px] w-full items-center justify-center">
            {/* Rotating Rings */}
            <div className="absolute w-[420px] h-[420px] rounded-full border border-emerald-100/60 animate-[spin_15s_linear_infinite]" />

            {/* BOLD GREEN DASHED LINE - Refined Pattern based on Reference */}
            <svg className="absolute w-[370px] h-[370px] animate-[spin_30s_linear_infinite_reverse] opacity-80" viewBox="0 0 440 440">
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

            <div className="absolute w-[460px] h-[460px] rounded-full border-[0.5px] border-gray-200 animate-[pulse_4s_ease-in-out_infinite]" />

            {/* Image Container with Hover Zoom */}
            <div className="relative w-[340px] h-[340px] rounded-full overflow-hidden shadow-2xl z-10 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 mix-blend-overlay z-10 pointer-events-none" />
              <img
                src="/hero_image_new.jpg"
                alt="Wang Aoyun"
                className="w-full h-full object-cover scale-[1.3] transition-transform duration-700 ease-in-out group-hover:scale-[1.4]"
              />
            </div>

            {/* Floating 3D Emojis */}
            <FloatingEmoji className="top-10 right-20" initialDelay={0} />
            <FloatingEmoji className="bottom-20 right-10" initialDelay={1.5} />
            <FloatingEmoji className="bottom-32 left-10" initialDelay={0.8} />

          </div>

        </div>

        {/* Stats Bar */}
        <div className="max-w-7xl mx-auto w-full mt-4">
          <div className="flex w-[90%] items-center justify-between">
            {STATS.map((stat, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-6">
                  <span className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight tabular-nums min-w-[80px] md:min-w-[100px] text-right">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-gray-500 text-sm leading-tight text-left">
                    {stat.line1}<br />
                    {stat.line2}
                  </span>
                </div>
                {idx < STATS.length - 1 && (
                  <div className="flex-1 flex justify-center">
                    <div className="w-px h-12 bg-gray-200"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
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