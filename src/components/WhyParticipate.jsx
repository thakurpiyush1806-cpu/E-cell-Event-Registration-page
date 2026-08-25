import React, { useState } from 'react';
import { Calendar, CheckCircle2, ChevronDown, Award, Target, HelpCircle } from 'lucide-react';

export default function WhyParticipate() {
  const [activeFaq, setActiveFaq] = useState(null);

  const timelineSteps = [
    {
      phase: 'Phase 1',
      title: 'Online Registration',
      date: 'Open Now',
      desc: 'Fill out the team details and submit your startup idea description through this portal.',
      status: 'Active',
    },
    {
      phase: 'Phase 2',
      title: 'Idea Screening',
      date: 'September 2026',
      desc: 'Expert committee reviews all submitted pitches to shortlist top innovative teams.',
      status: 'Upcoming',
    },
    {
      phase: 'Phase 3',
      title: 'Mentorship Bootcamp',
      date: 'October 2026',
      desc: 'Shortlisted teams receive guidance from industry mentors to refine deck & business model.',
      status: 'Upcoming',
    },
    {
      phase: 'Phase 4',
      title: 'Grand Finale Pitching',
      date: 'November 2026',
      desc: 'Live pitching session in front of investors and judges at UIET KUK Auditorium.',
      status: 'Upcoming',
    },
  ];

  const faqs = [
    {
      question: 'Who is eligible to participate in the E-Cell UIET KUK Pitch Competition?',
      answer: 'All undergraduate and postgraduate students from UIET Kurukshetra University as well as participating colleges are eligible. You can register as an individual or in a team of up to 4 members.',
    },
    {
      question: 'Does our startup need to be fully registered or operational?',
      answer: 'No! Ideas at all stages — from early napkin concepts and prototypes to early-stage MVPs — are welcome. We evaluate innovation, problem feasibility, and presentation clarity.',
    },
    {
      question: 'Is there any registration fee for the competition?',
      answer: 'No, registration is 100% free of charge for all participating student teams.',
    },
    {
      question: 'What happens after I submit the registration form?',
      answer: 'Upon submission, you will receive a unique Registration ID (e.g. ECELL-2026-001). Our team will send confirmation details and next-step guidelines to your registered email.',
    },
  ];

  return (
    <section id="why-participate" className="py-20 bg-slate-950/70 border-t border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Timeline Section */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-ecell-red px-3 py-1 rounded-full bg-red-950/50 border border-red-900/50">
              Competition Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Event Timeline & Phases
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Follow our structured evaluation journey from initial registration to final pitch victory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelineSteps.map((step, idx) => (
              <div
                key={step.phase}
                className="glass-panel p-6 rounded-2xl relative space-y-3 border-l-4 border-l-ecell-red hover:border-l-red-500 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-ecell-red">
                    {step.phase}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    step.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {step.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-20 pt-16 border-t border-slate-800/80 max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-ecell-red text-xs font-bold uppercase tracking-widest">
              <HelpCircle className="w-4 h-4" />
              Got Questions?
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl glass-panel overflow-hidden transition-colors border border-slate-800"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-4.5 text-left font-semibold text-white flex items-center justify-between gap-4 hover:text-ecell-red transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-ecell-red' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-slate-300 leading-relaxed border-t border-slate-800/50 pt-3 bg-slate-900/30">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
