import React from 'react';
import { motion } from 'motion/react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  ArrowUpRight,
  Bus,
  Bot
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-blue-500/10 border border-blue-500/20 text-blue-300 mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Engineering robust applications from backend architecture to production deployment.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative flex flex-col justify-between rounded-2xl bg-[#0c101d]/90 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_16px_40px_-10px_rgba(59,130,246,0.2)] overflow-hidden shadow-xl"
            >
              {/* Top Subtle Gradient Glow */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br ${project.gradient} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none`} />

              <div>
                {/* Visual Header / Banner */}
                <div className="relative h-48 bg-gradient-to-br from-slate-900 via-[#0a0e1a] to-blue-950/30 p-6 flex flex-col justify-between border-b border-slate-800/80 overflow-hidden">
                  {/* Background Watermark Graphic */}
                  <div className="absolute -right-4 -bottom-4 opacity-10 text-white pointer-events-none">
                    {project.id === 'careerforge-ai' ? (
                      <Bot className="w-36 h-36" />
                    ) : (
                      <Bus className="w-36 h-36" />
                    )}
                  </div>

                  {/* Top tags */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-slate-900/90 text-blue-300 border border-blue-500/30">
                      {project.id === 'careerforge-ai' ? 'Full-Stack Web App' : 'Transportation Management'}
                    </span>

                    {project.liveDemoUrl && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live in Production
                      </span>
                    )}
                  </div>

                  {/* Project Title Banner */}
                  <div className="relative z-10">
                    <div className="text-xs font-mono-code text-blue-400 mb-1">
                      {project.id === 'careerforge-ai' ? 'Django • PostgreSQL • AI & LLM APIs' : 'Django • Google Maps API • ReportLab'}
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Metrics strip */}
                  {project.metrics && (
                    <div className="relative z-10 flex items-center gap-4 pt-2 border-t border-slate-800/80 text-[11px] font-mono-code">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-slate-300">
                          <span className="text-blue-400 font-bold">{m.value}</span>{' '}
                          <span className="text-slate-500 text-[10px]">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content & Features */}
                <div className="p-6 md:p-7">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Bullet points from prompt */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-[11px] font-mono-code text-slate-400 font-semibold uppercase tracking-wider block">
                      Key Highlights & Architecture:
                    </span>
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono-code bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex flex-wrap items-center gap-3 border-t border-slate-800/80 mt-4">
                {/* Live Demo Link (if available) */}
                {project.liveDemoUrl && (
                  <a
                    id={`project-live-url-${project.id}`}
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-all cursor-pointer"
                  >
                    <span>View Live Deployment</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {/* GitHub Code Repository */}
                <a
                  id={`project-github-${project.id}`}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${
                    project.liveDemoUrl ? 'py-2.5 px-5' : 'flex-1 py-2.5 px-4'
                  } rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-all`}
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
