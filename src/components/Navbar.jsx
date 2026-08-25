import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Competition', href: '#competition' },
    { name: 'Why Participate', href: '#why-participate' },
    { name: 'Register', href: '#register' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ecell-darkBg/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-ecell-red/50 rounded-lg p-1"
            aria-label="E-Cell UIET KUK Home"
          >
            <div className="relative overflow-hidden rounded-md flex items-center justify-center p-1 bg-slate-950/60 border border-slate-800/80 group-hover:border-ecell-red/40 transition-colors">
              <img
                src="/assets/ecell-logo.jpg"
                alt="E-Cell UIET KUK Official Logo"
                className="h-10 w-auto object-contain max-w-[140px] sm:max-w-[160px] rounded transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors">
                E-CELL <span className="text-ecell-red">UIET KUK</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold hidden sm:inline-block">
                Entrepreneurship Cell
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  link.name === 'Register'
                    ? 'bg-gradient-to-r from-ecell-red to-red-600 text-white shadow-glow-red hover:shadow-glow-red-lg hover:brightness-110 ml-2 font-semibold flex items-center gap-1.5'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.name === 'Register' && <Rocket className="w-4 h-4" />}
                {link.name}
              </a>
            ))}

            {/* Organizer Portal Drawer Button */}
            <button
              onClick={onOpenAdmin}
              className="ml-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg border border-slate-800 transition-colors flex items-center gap-1"
              title="View Registered Submissions (Admin)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Organizer View</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 border border-slate-800/80 focus:outline-none focus:ring-2 focus:ring-ecell-red/50"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ecell-darkBg/95 backdrop-blur-xl border-b border-slate-800/80 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${
                link.name === 'Register'
                  ? 'bg-gradient-to-r from-ecell-red to-red-600 text-white text-center shadow-glow-red mt-3 font-semibold'
                  : 'text-slate-200 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          
          <div className="pt-2 border-t border-slate-800/60 mt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:bg-slate-800/60 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                Organizer Registrations Log
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
