import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Check, PlusCircle, Calendar, Hash, Mail, Phone, Users, Rocket } from 'lucide-react';

export default function SuccessMessage({ registrationResult, onReset }) {
  const [copied, setCopied] = useState(false);

  const { registrationId, data } = registrationResult || {};

  useEffect(() => {
    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ed1c24', '#ffffff', '#f87171', '#38bdf8'],
      });
    } catch (e) {
      console.log('Confetti failed to launch:', e);
    }
  }, []);

  const handleCopyId = () => {
    if (registrationId) {
      navigator.clipboard.writeText(registrationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="py-20 bg-ecell-darkBg relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-8 text-center animate-in zoom-in-95 duration-300">
          
          {/* Top Check Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-emerald-950/80 border-2 border-emerald-500/60 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/50 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              🎉 Registration Successful!
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
              Your registration for the <strong className="text-white">E-Cell UIET KUK Startup Pitch Competition</strong> has been submitted successfully.
            </p>
          </div>

          {/* Registration ID Banner */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 max-w-md mx-auto space-y-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-ecell-red" />
              Unique Registration ID
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-ecell-red tracking-wider">
                {registrationId || 'ECELL-2026-001'}
              </span>
              <button
                onClick={handleCopyId}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors focus:outline-none"
                title="Copy Registration ID"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <p className="text-[11px] font-medium text-emerald-400">Copied to clipboard!</p>
            )}
          </div>

          {/* Submission Details Summary */}
          {data && (
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-left space-y-3 max-w-lg mx-auto text-xs sm:text-sm">
              <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2 mb-2 flex items-center justify-between">
                <span>Summary of Submitted Entry</span>
                <span className="text-[10px] text-slate-400 font-normal">Official Record</span>
              </h4>
              <div className="grid grid-cols-2 gap-3 text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[11px]">Team Leader</span>
                  <span className="font-semibold text-white">{data.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Team Name</span>
                  <span className="font-semibold text-white">{data.teamName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Startup / Idea</span>
                  <span className="font-semibold text-white">{data.startupName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Phone Contact</span>
                  <span className="font-semibold text-white">{data.phone}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={onReset}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-ecell-red to-red-600 text-white font-bold text-sm shadow-glow-red hover:shadow-glow-red-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register Another Team</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
