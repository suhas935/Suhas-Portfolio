import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  FileDown, 
  Mail, 
  Github, 
  Linkedin, 
  Terminal, 
  Sparkles, 
  Code, 
  CheckCircle2, 
  Database,
  Layers,
  Award,
  ChevronDown,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

const ROLES = [
  'Aspiring Software Developer',
  'Backend Engineer (Django & REST APIs)',
  'AI & Machine Learning Enthusiast',
  'Full Stack Systems Builder',
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Typing animation
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] pt-32 pb-16 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Introduction & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Status & Location Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-code bg-blue-950/60 border border-blue-500/30 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span>Seeking Software Development & AI Internships</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono-code bg-slate-900/80 border border-slate-700/60 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Bengaluru, Karnataka</span>
              </span>
            </div>

            {/* Greeting & Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Tagline / Dynamic Typing Title */}
            <div className="h-12 sm:h-14 flex items-center mb-4">
              <p className="text-lg sm:text-2xl font-semibold text-slate-300 flex items-center gap-2">
                <span className="text-blue-400 font-mono-code">&gt;</span>
                <span>{displayedText}</span>
                <span className="inline-block w-2.5 h-6 bg-blue-400 animate-pulse ml-0.5" />
              </p>
            </div>

            {/* One-line Hook & Summary */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              {PERSONAL_INFO.hook}
            </p>

            {/* Primary Action CTAs: View Projects, Download Resume, Contact Me */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
              {/* View Projects */}
              <button
                id="hero-cta-projects"
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Download / View Resume */}
              <button
                id="hero-cta-resume"
                onClick={onOpenResume}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-100 font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-sm"
              >
                <FileDown className="w-4 h-4 text-blue-400" />
                <span>Download Resume</span>
              </button>

              {/* Contact Me */}
              <button
                id="hero-cta-contact"
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-300 hover:text-white font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social Links & Quick Email Copy */}
            <div className="flex flex-wrap items-center gap-3.5 text-xs text-slate-400 font-mono-code pt-4 border-t border-slate-800/80 w-full">
              <span className="text-slate-500">Connect:</span>

              <a
                id="hero-social-github"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                id="hero-social-linkedin"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-blue-300 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <button
                id="hero-copy-email"
                onClick={copyEmail}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-blue-300 transition-all cursor-pointer"
                title="Click to copy email address"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{copiedEmail ? 'Copied to Clipboard!' : PERSONAL_INFO.email}</span>
              </button>
            </div>
          </motion.div>

          {/* Right Hero Column: Interactive Terminal / Developer Architecture Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Decorative behind glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/25 via-indigo-500/20 to-cyan-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-1000" />

              {/* Code Card Shell */}
              <div className="relative rounded-2xl bg-[#0c101d]/90 border border-slate-800 shadow-2xl backdrop-blur-xl overflow-hidden">
                {/* Terminal Header */}
                <div className="px-4 py-3 bg-[#080c16] border-b border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono-code text-slate-400 flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-blue-400" />
                      suhas_profile.py
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 text-blue-400 text-[10px] font-mono-code">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    ONLINE
                  </div>
                </div>

                {/* Terminal Code Content */}
                <div className="p-5 font-mono-code text-xs leading-relaxed overflow-x-auto text-slate-300">
                  <div className="text-slate-500 italic mb-2"># Suhas G - Developer Profile</div>
                  <div>
                    <span className="text-purple-400">class</span>{' '}
                    <span className="text-cyan-300 font-bold">SoftwareDeveloper</span>:
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">def</span>{' '}
                    <span className="text-blue-400">__init__</span>(self):
                  </div>
                  <div className="pl-8 text-slate-300">
                    self.name = <span className="text-emerald-300">"{PERSONAL_INFO.name}"</span><br />
                    self.role = <span className="text-emerald-300">"Software Developer"</span><br />
                    self.college = <span className="text-emerald-300">"SJB Institute of Technology"</span><br />
                    self.cgpa = <span className="text-amber-300">{PERSONAL_INFO.cgpa}</span> <span className="text-slate-500"># 8.76 / 10</span><br />
                    self.languages = [<span className="text-emerald-300">"Python"</span>, <span className="text-emerald-300">"Java"</span>, <span className="text-emerald-300">"C"</span>, <span className="text-emerald-300">"SQL"</span>, <span className="text-emerald-300">"JavaScript"</span>]<br />
                    self.frameworks = [<span className="text-emerald-300">"Django"</span>, <span className="text-emerald-300">"REST APIs"</span>]<br />
                    self.open_to = <span className="text-emerald-300">"Software Development Roles"</span>
                  </div>

                  <div className="pl-4 mt-2">
                    <span className="text-purple-400">def</span>{' '}
                    <span className="text-blue-400">passions</span>(self):
                  </div>
                  <div className="pl-8 text-indigo-300">
                    <span className="text-purple-400">return</span> [<br />
                    &nbsp;&nbsp;<span className="text-amber-300">"Backend Architecture & Clean APIs"</span>,<br />
                    &nbsp;&nbsp;<span className="text-amber-300">"AI & Machine Learning Integration"</span>,<br />
                    &nbsp;&nbsp;<span className="text-amber-300">"Scalable Cloud Deployment"</span><br />
                    ]
                  </div>
                </div>

                {/* Quick Navigation Footer on the card */}
                <div className="px-5 py-3.5 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-[11px] font-mono-code text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Open to Software Roles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      id="hero-card-view-projects"
                      onClick={() => scrollTo('projects')}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-[11px] font-mono-code transition-colors cursor-pointer"
                    >
                      View Work ↓
                    </button>
                    <button
                      id="hero-card-contact"
                      onClick={() => scrollTo('contact')}
                      className="px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 text-[11px] font-mono-code transition-colors cursor-pointer"
                    >
                      Contact →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-blue-400 transition-colors text-xs font-mono-code cursor-pointer"
            aria-label="Scroll down to About section"
          >
            <span>ABOUT SUHAS</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
