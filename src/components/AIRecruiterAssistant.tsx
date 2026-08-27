import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ExternalLink,
  FileText,
  Mail,
  Github,
  Linkedin,
  GraduationCap,
  Code2,
  Layers,
  Award
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, CERTIFICATIONS, SKILL_CATEGORIES } from '../data/portfolioData';

interface AIRecruiterAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  options?: { label: string; action: () => void }[];
}

export const AIRecruiterAssistant: React.FC<AIRecruiterAssistantProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `Hello! I'm Suhas's AI Portfolio Assistant. Ask me anything about his technical stack (Django, Python, PostgreSQL, REST APIs), academic standing (8.76 CGPA at SJB Institute of Technology), verified projects (CareerForge AI), or role availability!`,
      options: [
        { label: '🎓 CGPA & Academics', action: () => handlePreset('What is Suhas\'s CGPA & Academic background?') },
        { label: '🚀 CareerForge AI Project', action: () => handlePreset('Tell me about CareerForge AI') },
        { label: '💻 Tech Stack & Backend Skills', action: () => handlePreset('What technical skills and backend technologies does he know?') },
        { label: '💼 Availability & Hiring', action: () => handlePreset('Is Suhas available for software development internships / roles?') },
      ],
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  if (!isOpen) return null;

  const handlePreset = (query: string) => {
    sendMessage(query);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    sendMessage(inputQuery.trim());
    setInputQuery('');
  };

  const generateAnswer = (query: string): { text: string; options?: { label: string; action: () => void }[] } => {
    const q = query.toLowerCase().trim();

    // Greetings
    if (q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hello') || q.startsWith('hi ') || q.startsWith('hey ')) {
      return {
        text: `Hi there! I am Suhas's portfolio assistant. How can I help you today? You can ask me about his technical skills, university background, live deployed projects, or how to contact him.`,
        options: [
          { label: 'Tell me about Suhas', action: () => handlePreset('Tell me about Suhas') },
          { label: 'View Technical Skills', action: () => handlePreset('What technical skills does Suhas have?') },
          { label: 'View Projects', action: () => handlePreset('What projects has Suhas built?') },
          { label: 'Contact Info', action: () => handlePreset('How can I contact Suhas?') },
        ]
      };
    }

    // Who is Suhas / About
    if (q.includes('who is') || q.includes('about suhas') || q.includes('tell me about him') || q.includes('introduce') || q.includes('bio') || q.includes('summary')) {
      return {
        text: `Suhas G is a Computer Science undergraduate (8.76 CGPA) at SJB Institute of Technology, Bengaluru. He specializes in full-stack backend development using Python, Django, Django REST Framework, and PostgreSQL, with hands-on experience integrating AI/LLM APIs and computer vision systems. He is currently seeking Software Development and AI Engineer internship opportunities.`,
        options: [
          { label: '📄 View Printable Resume', action: () => { onClose(); onOpenResume(); } },
          { label: '🚀 Explore CareerForge AI', action: () => { window.open('https://careerforge-ai-production-d453.up.railway.app', '_blank'); } },
        ]
      };
    }

    // CGPA & Academics & College
    if (q.includes('cgpa') || q.includes('academic') || q.includes('college') || q.includes('degree') || q.includes('sjb') || q.includes('grade') || q.includes('marks') || q.includes('percentage') || q.includes('education') || q.includes('coursework')) {
      return {
        text: `Suhas is pursuing a Bachelor of Engineering in Computer Science and Engineering at SJB Institute of Technology, Bengaluru (2023 – Present), maintaining an outstanding CGPA of 8.76 / 10.0.\n\nCore Coursework includes:\n• Data Structures & Algorithms (DSA)\n• Database Management Systems (DBMS)\n• Object-Oriented Programming (OOP)\n• Operating Systems & Computer Networks\n• System Design & Software Architecture`,
        options: [
          { label: '📄 View Academic Details in Resume', action: () => { onClose(); onOpenResume(); } },
        ]
      };
    }

    // CareerForge AI Project
    if (q.includes('careerforge') || q.includes('career forge') || (q.includes('ai') && q.includes('project')) || q.includes('resume analyzer') || q.includes('interview coach')) {
      return {
        text: `CareerForge AI is Suhas's flagship production platform featuring 9 integrated career modules:\n\n• Real-Time Resume Analysis & Scoring\n• Conversational AI Mock Interview Coach\n• Personalized Learning Roadmaps & Skill Gap Analysis\n• Kanban-style Application Tracker\n• Placement Readiness Score Engine\n\nTech Stack: Django, Python, PostgreSQL, AI APIs, Cloudinary, WhiteNoise, and hosted live on Railway.`,
        options: [
          { label: '🚀 Open Live Deployment', action: () => { window.open('https://careerforge-ai-production-d453.up.railway.app', '_blank'); } },
          { label: '📄 GitHub Repository', action: () => { window.open('https://github.com/suhas935/careerforge-ai', '_blank'); } }
        ]
      };
    }

    // College Transportation Project
    if (q.includes('transport') || q.includes('bus') || q.includes('route') || q.includes('reportlab')) {
      return {
        text: `The College Transportation Management System is a full-stack Django web application that digitizes campus transit operations:\n\n• Role-based access control for students and transit administrators\n• Real-time bus route tracking with Google Maps API\n• Automated digital PDF pass & receipt generation using ReportLab\n• Centralized dashboard for bus fee payments and notifications.`,
        options: [
          { label: '📄 View GitHub Repository', action: () => { window.open('https://github.com/suhas935/College_Transportation_System', '_blank'); } }
        ]
      };
    }

    // Projects in General
    if (q.includes('project') || q.includes('portfolio') || q.includes('what did he build') || q.includes('work')) {
      return {
        text: `Suhas has built two major full-stack web systems:\n\n1. CareerForge AI: Full-stack AI career platform with 9 modules, real-time resume scoring, and mock interview coaching (Django, Python, PostgreSQL, Railway).\n\n2. College Transportation System: Transit management system with route tracking via Google Maps API and automated PDF receipt generation via ReportLab (Django, Python, ReportLab).`,
        options: [
          { label: '🚀 Open CareerForge Live Site', action: () => { window.open('https://careerforge-ai-production-d453.up.railway.app', '_blank'); } },
          { label: '📂 Visit GitHub Profile', action: () => { window.open('https://github.com/suhas935', '_blank'); } }
        ]
      };
    }

    // Technical Skills & Backend Stack
    if (q.includes('skill') || q.includes('tech stack') || q.includes('stack') || q.includes('backend') || q.includes('django') || q.includes('python') || q.includes('database') || q.includes('sql') || q.includes('framework') || q.includes('language') || q.includes('java') || q.includes('c++') || q.includes('javascript')) {
      return {
        text: `Here is a summary of Suhas's technical skills:\n\n• Languages: Python (Primary), Java, C, SQL, JavaScript\n• Backend & Web: Django, Django REST Framework, RESTful APIs, HTML5, CSS3, Tailwind CSS\n• AI / ML: AI & LLM APIs, YOLOv8, OpenCV, MediaPipe, DeepSORT\n• Databases: PostgreSQL, MySQL, SQLite\n• Cloud & DevOps: Railway, Cloudinary, AWS, GCP, Oracle Cloud Infrastructure\n• Tools: Git, GitHub, VS Code, IntelliJ IDEA, Eclipse`,
        options: [
          { label: '📄 Download / Print Resume', action: () => { onClose(); onOpenResume(); } }
        ]
      };
    }

    // AI / ML / Vision
    if (q.includes('ai') || q.includes('ml') || q.includes('vision') || q.includes('opencv') || q.includes('yolo') || q.includes('mediapipe') || q.includes('deepsort') || q.includes('machine learning')) {
      return {
        text: `Suhas has hands-on experience integrating AI capabilities into practical applications:\n\n• AI & LLM APIs: Prompt engineering, resume analysis pipelines, structured responses, and mock interview engines.\n• Computer Vision: Object detection using YOLOv8, OpenCV image processing, MediaPipe pose tracking, and DeepSORT multi-object tracking.`,
      };
    }

    // Certifications
    if (q.includes('certif') || q.includes('oracle') || q.includes('oci') || q.includes('cisco') || q.includes('nptel') || q.includes('hackerrank') || q.includes('credential')) {
      return {
        text: `Suhas holds verified credentials including:\n\n1. Oracle Cloud Infrastructure 2025 Certified Foundations Associate (Oracle)\n2. Python (Basic) Certified (HackerRank)\n3. Privacy and Security in Online Social Media - Elite Certificate (NPTEL)`,
        options: [
          { label: '📄 View All in Resume Modal', action: () => { onClose(); onOpenResume(); } }
        ]
      };
    }

    // Hiring & Availability
    if (q.includes('hire') || q.includes('internship') || q.includes('available') || q.includes('job') || q.includes('role') || q.includes('opportunity') || q.includes('notice') || q.includes('recruit')) {
      return {
        text: `Yes! Suhas is actively seeking Software Development and AI Engineer internship opportunities. He brings strong foundations in Django backend architecture, REST APIs, database design, and end-to-end cloud deployments.`,
        options: [
          { label: '✉️ Send an Email', action: () => { window.location.href = `mailto:${PERSONAL_INFO.email}?subject=Internship%20Opportunity`; } },
          { label: '📄 View Printable Resume', action: () => { onClose(); onOpenResume(); } },
          { label: '🔗 Connect on LinkedIn', action: () => { window.open('https://www.linkedin.com/in/suhasg0305', '_blank'); } }
        ]
      };
    }

    // Contact & Socials
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('linkedin') || q.includes('github') || q.includes('location') || q.includes('bangalore') || q.includes('bengaluru')) {
      return {
        text: `You can reach Suhas through multiple channels:\n\n• Email: ${PERSONAL_INFO.email}\n• Phone: ${PERSONAL_INFO.phone}\n• Location: ${PERSONAL_INFO.location}\n• LinkedIn: linkedin.com/in/suhasg0305\n• GitHub: github.com/suhas935`,
        options: [
          { label: '✉️ Email Suhas Directly', action: () => { window.location.href = `mailto:${PERSONAL_INFO.email}`; } },
          { label: '🔗 Open LinkedIn Profile', action: () => { window.open(PERSONAL_INFO.linkedin, '_blank'); } }
        ]
      };
    }

    // Resume
    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return {
        text: `You can view, print, or download Suhas's complete ATS-friendly resume formatted with all coursework, project architectures, and certified credentials.`,
        options: [
          { label: '📄 Open Resume Modal', action: () => { onClose(); onOpenResume(); } }
        ]
      };
    }

    // Default Fallback
    return {
      text: `Suhas G is a Computer Science undergraduate (8.76 CGPA) at SJB Institute of Technology specializing in Django backend engineering, REST APIs, and full-stack AI web applications. What specific topic would you like to explore?`,
      options: [
        { label: '🎓 Academic Details', action: () => handlePreset('What is Suhas\'s CGPA & Academic background?') },
        { label: '🚀 CareerForge AI Project', action: () => handlePreset('Tell me about CareerForge AI') },
        { label: '💻 Technical Skills', action: () => handlePreset('What technical skills does Suhas have?') },
        { label: '📄 Printable Resume', action: () => { onClose(); onOpenResume(); } },
      ]
    };
  };

  const sendMessage = (query: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAnswer(query);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.text,
        options: response.options,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 450);
  };

  return (
    <AnimatePresence>
      <div
        id="ai-assistant-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          id="ai-assistant-dialog"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-[#0d1222] border border-indigo-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[580px]"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-[#080c18] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.4)]">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Ask Suhas's AI Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] font-mono-code text-slate-400">
                  Instant answers on skills, projects, and 8.76 CGPA background
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#090d1b]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Action Chips */}
                  {msg.options && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={opt.action}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-indigo-950/70 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-300 hover:text-white transition-colors cursor-pointer text-left shadow-xs"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center text-xs text-indigo-300 font-mono-code">
                <Bot className="w-4 h-4 text-indigo-400 animate-spin" />
                <span>AI assistant is analyzing information...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Input Form */}
          <form onSubmit={handleCustomSubmit} className="p-3 bg-[#080c18] border-t border-slate-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask anything about Suhas's skills, projects, academics, or contact..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 cursor-pointer transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
