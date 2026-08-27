import React from 'react';
import { ChevronUp, Github, Linkedin, Mail, Heart, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <footer id="main-footer" className="relative bg-[#05070e] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Persona */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center">
                  <span className="font-extrabold text-xs text-blue-300">SG</span>
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">{PERSONAL_INFO.name}</span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Computer Science undergraduate (8.76 CGPA) at SJB Institute of Technology. Experienced in building and deploying full-stack AI web applications with Django and REST APIs.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono-code">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Software Development & AI Roles</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono-code text-blue-400 uppercase tracking-wider font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Me (8.76 CGPA)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('skills')} className="hover:text-white transition-colors cursor-pointer">
                  Technical Skills
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('projects')} className="hover:text-white transition-colors cursor-pointer">
                  Featured Projects
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('certifications')} className="hover:text-white transition-colors cursor-pointer">
                  Certifications
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('github')} className="hover:text-white transition-colors cursor-pointer">
                  GitHub Activity
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Connect & Stack */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono-code text-blue-400 uppercase tracking-wider font-bold">
              Connect With Suhas
            </h4>
            <div className="flex gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition-all"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-300 hover:border-slate-700 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-300 hover:border-slate-700 transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono-code text-slate-400">
              <span className="text-blue-400 font-semibold">suhasg0903@gmail.com</span>
              <br />
              <span className="text-slate-500">Bengaluru, Karnataka, India</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Suhas G. Built with React & Tailwind CSS.</span>
          </div>

          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-mono-code cursor-pointer"
          >
            <span>Back to top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
