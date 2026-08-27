import React, { useState } from 'react';
import { Sparkles, Bot } from 'lucide-react';
import { BackgroundGlow } from './components/BackgroundGlow';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { GitHubStatsSection } from './components/GitHubStatsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { AIRecruiterAssistant } from './components/AIRecruiterAssistant';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#070913] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      {/* Initial Animated Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Floating Ambient Mesh Glow & Particle Background */}
      <BackgroundGlow />

      {/* Main Glassmorphic Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 2. About Section & Academic Timeline */}
        <AboutSection />

        {/* 3. Skills Section */}
        <SkillsSection />

        {/* 4. Featured Projects Section */}
        <ProjectsSection />

        {/* 5. Certifications Section */}
        <CertificationsSection />

        {/* 6. GitHub Statistics & Coding Profiles */}
        <GitHubStatsSection />

        {/* 7. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick AI Assistant Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="floating-ai-assistant-btn"
          onClick={() => setIsAiAssistantOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white font-semibold text-xs shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all cursor-pointer border border-indigo-400/30"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-white" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="hidden sm:inline">Ask AI Assistant</span>
          <Sparkles className="w-3.5 h-3.5 text-indigo-200 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* ATS-Friendly Printable & Downloadable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Quick Search Command Palette (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />

      {/* Interactive AI Recruiter Assistant Modal */}
      <AIRecruiterAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />
    </div>
  );
}

