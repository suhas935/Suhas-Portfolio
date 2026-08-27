import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  FileText, 
  Search, 
  Sparkles, 
  ChevronRight,
  ExternalLink,
  Code2,
  Briefcase
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
  onOpenAiAssistant: () => void;
}

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'github', label: 'GitHub & Stats' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  onOpenCommandPalette,
  onOpenAiAssistant,
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section spy
      const sections = ['hero', ...NAV_ITEMS.map((item) => item.id)];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#070913]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand / Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_22px_rgba(99,102,241,0.5)] transition-all">
              <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center">
                <span className="font-extrabold text-sm tracking-wider bg-gradient-to-r from-indigo-200 via-white to-purple-200 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                  SG
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 text-base tracking-tight group-hover:text-indigo-300 transition-colors">
                  {PERSONAL_INFO.name}
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono-code font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  CGPA 8.76
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono-code hidden sm:block">
                Backend & AI Dev
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 focus:outline-none cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Cmd+K Search Button */}
            <button
              id="cmd-search-btn"
              onClick={onOpenCommandPalette}
              aria-label="Quick Search"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-mono-code transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 rounded border border-slate-700 text-slate-300">
                ⌘K
              </kbd>
            </button>

            {/* Ask AI Assistant Button */}
            <button
              id="nav-ai-assistant-btn"
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/30 text-indigo-300 text-xs font-medium transition-all shadow-[0_0_12px_rgba(99,102,241,0.15)] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>Ask AI</span>
            </button>

            {/* Resume Button */}
            <button
              id="nav-resume-btn"
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-[0_0_16px_rgba(99,102,241,0.3)] transition-all cursor-pointer active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-search-btn"
              onClick={onOpenCommandPalette}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-40 md:hidden bg-[#0a0e1a]/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              <div className="pb-3 mb-2 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-300 font-mono-code">
                    Status: Open for Roles (CGPA 8.76)
                  </span>
                </div>
              </div>

              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800/60 hover:text-indigo-400 transition-colors text-left"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                <button
                  id="mobile-ai-assistant-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAiAssistant();
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Ask AI Info</span>
                </button>

                <button
                  id="mobile-resume-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-medium shadow-md"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Resume</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
