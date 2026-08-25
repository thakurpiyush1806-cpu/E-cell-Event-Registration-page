import React from 'react';
import { ArrowRight, Sparkles, Trophy, Users, Lightbulb, Presentation } from 'lucide-react';

export default function Hero() {
  const scrollToRegister = (e) => {
    e.preventDefault();
    const element = document.querySelector('#register');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial-gradient from-slate-900 via-ecell-darkBg to-slate-950">
      
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-ecell-red/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0f_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Organization Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 text-xs sm:text-sm font-semibold tracking-wide badge-glow">
            <span className="flex h-2 w-2 rounded-full bg-ecell-red animate-ping" />
            <span className="text-ecell-red font-bold">E-CELL UIET KUK</span>
            <span className="text-slate-500">•</span>
            <span>Annual Innovation Summit 2026</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            STARTUP PITCH <br className="hidden sm:inline" />
            <span className="text-gradient-red drop-shadow-sm">COMPETITION</span>
          </h1>

          {/* Tagline Description */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Have an innovative idea? Turn your vision into reality. Register your team and get the opportunity to pitch your startup idea.
          </p>

          {/* CTA Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#register"
              onClick={scrollToRegister}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-ecell-red via-red-600 to-red-700 text-white font-bold text-base shadow-glow-red hover:shadow-glow-red-lg hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Register Your Startup</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#competition"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#competition')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-base border border-slate-800 hover:border-slate-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Explore Guidelines</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl glass-panel text-center">
              <div className="flex items-center justify-center text-ecell-red mb-1">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">₹50,000+</div>
              <div className="text-xs text-slate-400">Prizes & Seed Perks</div>
            </div>

            <div className="p-4 rounded-xl glass-panel text-center">
              <div className="flex items-center justify-center text-ecell-red mb-1">
                <Presentation className="w-5 h-5" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">1-on-1</div>
              <div className="text-xs text-slate-400">Mentor Guidance</div>
            </div>

            <div className="p-4 rounded-xl glass-panel text-center">
              <div className="flex items-center justify-center text-ecell-red mb-1">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">Incubation</div>
              <div className="text-xs text-slate-400">Support from UIET</div>
            </div>

            <div className="p-4 rounded-xl glass-panel text-center">
              <div className="flex items-center justify-center text-ecell-red mb-1">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">Certificates</div>
              <div className="text-xs text-slate-400">For All Participants</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
