import React from 'react';
import { Lightbulb, Rocket, Mic, Users2 } from 'lucide-react';

export default function CompetitionInfo() {
  const cards = [
    {
      icon: Lightbulb,
      title: 'Showcase Your Idea',
      description: 'Present your innovative idea and turn your concept into something meaningful.',
      accentColor: 'from-amber-500/20 to-red-500/10',
      badge: 'Ideation',
    },
    {
      icon: Rocket,
      title: 'Build Your Startup',
      description: 'Take the first step toward transforming your idea into a startup.',
      accentColor: 'from-red-500/20 to-orange-500/10',
      badge: 'Execution',
    },
    {
      icon: Mic,
      title: 'Pitch Your Vision',
      description: 'Get an opportunity to present your idea confidently.',
      accentColor: 'from-rose-500/20 to-red-500/10',
      badge: 'Presentation',
    },
    {
      icon: Users2,
      title: 'Connect & Network',
      description: 'Meet like-minded students, innovators and entrepreneurs.',
      accentColor: 'from-blue-500/20 to-red-500/10',
      badge: 'Community',
    },
  ];

  return (
    <section id="competition" className="py-20 bg-ecell-darkBg relative overflow-hidden">
      
      {/* Background glow circle */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-ecell-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Turn Your Idea Into <span className="text-ecell-red">Impact</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            The Startup Pitch Competition organized by <strong className="text-white font-semibold">E-Cell UIET KUK</strong> is designed to empower young visionaries. Showcase your innovative startup ideas, refine your pitch with mentors, and present your concepts directly to an esteemed panel of judges.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative rounded-2xl p-6 sm:p-7 glass-panel glass-panel-hover flex flex-col justify-between"
              >
                {/* Card Glow Gradient Background on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10 space-y-4">
                  
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-center justify-center text-ecell-red group-hover:scale-110 group-hover:border-ecell-red/50 transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-900/80 text-slate-400 border border-slate-800">
                      0{index + 1} • {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Decorative Line */}
                <div className="relative z-10 pt-6 mt-4 border-t border-slate-800/60 group-hover:border-ecell-red/30 transition-colors">
                  <div className="text-xs font-semibold text-slate-400 group-hover:text-ecell-red flex items-center gap-1 transition-colors">
                    <span>E-Cell UIET Opportunity</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
