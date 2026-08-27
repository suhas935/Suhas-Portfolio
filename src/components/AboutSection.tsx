import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Award, 
  Server, 
  BrainCircuit, 
  Code2, 
  Layers, 
  CheckCircle, 
  Sparkles,
  MapPin,
  Flame,
  ArrowRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      title: 'Full-Stack & Backend Systems',
      icon: Server,
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20',
      description: 'Designing scalable Django and Django REST Framework backends, PostgreSQL schemas, and robust API endpoints with clean modular architecture.',
    },
    {
      title: 'LLM & AI Integration',
      icon: BrainCircuit,
      iconColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10 border-indigo-500/20',
      description: 'Integrating AI APIs and LLMs for real-time resume analysis, intelligent recommendation algorithms, and conversational interview bots.',
    },
    {
      title: 'End-to-End Deployment',
      icon: Layers,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
      description: 'Shipping production applications to Railway with managed PostgreSQL, Cloudinary cloud storage, and WhiteNoise static asset pipelines.',
    },
  ];

  return (
    <section id="about" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-blue-500/10 border border-blue-500/20 text-blue-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT & SUMMARY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Software Developer and Computer Science undergraduate specializing in backend architecture, AI integration, and production systems.
          </p>
        </div>

        {/* Main Bio Showcase Card */}
        <div className="glass-card rounded-2xl p-8 md:p-10 border border-slate-800 relative overflow-hidden mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Bio Text */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-mono-code bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Engineering Profile
                </span>
                <span className="flex items-center gap-1 text-xs font-mono-code text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  Bengaluru, Karnataka
                </span>
              </div>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                {PERSONAL_INFO.bio}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono-code text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>Full-Stack AI Solutions</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>Scalable Django REST APIs</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>Production Cloud Deployment</span>
                </div>
              </div>
            </div>

            {/* Right: Quick Merit & Standing Box */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono-code text-slate-400 uppercase">Institution</div>
                  <div className="text-sm font-bold text-white leading-snug">
                    SJB Institute of Technology
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">B.E in Computer Science (2023–Present)</div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-500/30 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-mono-code text-emerald-400 uppercase font-semibold">Academic Merit</div>
                  <div className="text-2xl font-extrabold text-white">
                    8.76 <span className="text-sm font-normal text-slate-400">/ 10.0 CGPA</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Consistent Top-Tier Performance</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Focus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center ${item.iconColor} mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
