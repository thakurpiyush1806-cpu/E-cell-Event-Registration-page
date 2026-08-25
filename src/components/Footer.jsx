import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-md bg-slate-900 border border-slate-800">
                <img
                  src="/assets/ecell-logo.jpg"
                  alt="E-Cell UIET KUK Logo"
                  className="h-9 w-auto object-contain rounded"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                E-CELL <span className="text-ecell-red">UIET KUK</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              University Institute of Engineering & Technology (UIET), Kurukshetra University. Fostering entrepreneurship, innovation, and startup spirit across student innovators.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-ecell-red border border-slate-800 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-ecell-red border border-slate-800 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-ecell-red border border-slate-800 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-ecell-red border border-slate-800 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#competition" className="hover:text-white transition-colors">Competition Overview</a></li>
              <li><a href="#why-participate" className="hover:text-white transition-colors">Roadmap & Timeline</a></li>
              <li><a href="#register" className="hover:text-white transition-colors text-ecell-red font-semibold">Register Team →</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact & Venue</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-ecell-red shrink-0 mt-0.5" />
                <span>UIET, Kurukshetra University Campus, Kurukshetra, Haryana 136119</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-ecell-red shrink-0" />
                <span>ecell@uietkuk.ac.in</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-ecell-red shrink-0" />
                <span>www.kuk.ac.in / uietkuk.ac.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} E-Cell UIET KUK. All rights reserved.</p>
          <p>Official Startup Pitch Competition Registration Portal</p>
        </div>

      </div>
    </footer>
  );
}
