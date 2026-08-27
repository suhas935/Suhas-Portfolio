import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  ArrowRight, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Sparkles, 
  Code, 
  GraduationCap, 
  Layers, 
  FolderGit2, 
  Award,
  Play
} from 'lucide-react';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenAiAssistant: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenAiAssistant,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery('');
          // trigger open via parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scrollTo = (id: string) => {
    onClose();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const sections = [
    { id: 'about', label: 'About Me & Academics (8.76 CGPA)', icon: GraduationCap, category: 'Navigation' },
    { id: 'skills', label: 'Technical Skills & Competencies', icon: Layers, category: 'Navigation' },
    { id: 'projects', label: 'Featured Software Projects', icon: FolderGit2, category: 'Navigation' },
    { id: 'certifications', label: 'Certifications & Credentials (Oracle & Infosys)', icon: Award, category: 'Navigation' },
    { id: 'github', label: 'GitHub Activity & Stats', icon: Github, category: 'Navigation' },
    { id: 'contact', label: 'Contact Suhas G', icon: Mail, category: 'Navigation' },
  ];

  const actions = [
    {
      label: 'View / Print Suhas\'s Resume',
      icon: FileText,
      category: 'Action',
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      label: 'Ask AI Portfolio Assistant',
      icon: Sparkles,
      category: 'Action',
      action: () => {
        onClose();
        onOpenAiAssistant();
      },
    },
    {
      label: 'Open CareerForge AI Live Deployment',
      icon: FolderGit2,
      category: 'Project',
      action: () => {
        onClose();
        window.open('https://careerforge-ai-production-d453.up.railway.app', '_blank');
      },
    },
    {
      label: 'Copy Direct Email (suhasg0903@gmail.com)',
      icon: Mail,
      category: 'Action',
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        onClose();
      },
    },
  ];

  const filteredSections = sections.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredActions = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div
        id="command-palette-overlay"
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          id="command-palette-dialog"
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-xl bg-[#0d1222] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Input Bar */}
          <div className="px-4 py-3.5 border-b border-slate-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-indigo-400 shrink-0" />
            <input
              autoFocus
              type="text"
              placeholder="Type a command, project, or section..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-sans"
            />
            <kbd className="px-2 py-0.5 text-[10px] font-mono-code bg-slate-800 text-slate-400 rounded border border-slate-700">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-4">
            {/* Quick Actions & Projects */}
            {filteredActions.length > 0 && (
              <div>
                <div className="px-3 py-1 text-[10px] font-mono-code text-indigo-400 font-bold uppercase tracking-wider">
                  Actions & Direct Links
                </div>
                <div className="space-y-1 mt-1">
                  {filteredActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={action.action}
                      className="w-full px-3 py-2 rounded-lg text-left text-xs text-slate-200 hover:bg-indigo-600/30 hover:text-white flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <action.icon className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                        <span>{action.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Sections */}
            {filteredSections.length > 0 && (
              <div>
                <div className="px-3 py-1 text-[10px] font-mono-code text-slate-400 font-bold uppercase tracking-wider">
                  Jump to Section
                </div>
                <div className="space-y-1 mt-1">
                  {filteredSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollTo(section.id)}
                      className="w-full px-3 py-2 rounded-lg text-left text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center justify-between group transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <section.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                        <span>{section.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredActions.length === 0 && filteredSections.length === 0 && (
              <div className="py-8 text-center text-xs text-slate-500 font-mono-code">
                No matching results found for "{query}"
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2.5 bg-[#090d19] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
            <div className="flex items-center gap-3">
              <span>Navigate: <kbd className="px-1 py-0.5 rounded bg-slate-800 text-[10px]">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-slate-800 text-[10px]">↓</kbd></span>
              <span>Select: <kbd className="px-1 py-0.5 rounded bg-slate-800 text-[10px]">↵</kbd></span>
            </div>
            <span>Portfolio Quick Search</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
