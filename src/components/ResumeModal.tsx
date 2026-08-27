import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Copy, 
  Check, 
  FileText, 
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, PROJECTS, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
    confetti({ particleCount: 30, spread: 60 });
  };

  const handleCopyMarkdown = () => {
    const markdown = `# ${PERSONAL_INFO.name}
**${PERSONAL_INFO.tagline}**
Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone} | Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.github} | LinkedIn: ${PERSONAL_INFO.linkedin}

---

## EDUCATION
**Bachelor of Engineering in Computer Science & Engineering**
SJB Institute of Technology, Bengaluru | 2023 - Present
**CGPA: 8.76 / 10.0**

---

## TECHNICAL SKILLS
- **Languages:** Python, Java, C, SQL, JavaScript
- **Backend & Web:** Django, Django REST Framework, RESTful APIs, MVC/MVT, HTML5, CSS3, Tailwind CSS
- **AI & ML Integration:** AI & LLM APIs, YOLOv8, OpenCV, MediaPipe, DeepSORT
- **Databases:** PostgreSQL, MySQL, SQLite
- **Cloud & DevOps:** Railway, Cloudinary, AWS, GCP, Microsoft Azure, Oracle Cloud
- **Developer Tools:** Git, GitHub, VS Code, IntelliJ IDEA, Eclipse
- **Core CS:** Data Structures & Algorithms, DBMS, OOP, Operating Systems, Computer Networks

---

## FEATURED PROJECTS
1. **CareerForge AI** (Django, Python, AI APIs, PostgreSQL, Railway, Cloudinary, REST APIs)
   - Real-time resume analysis, personalized learning roadmaps, and conversational mock interview assistant.
   
2. **College Transportation Management System** (Django, Google Maps API, SQLite/MySQL, ReportLab)
   - Real-time route mapping, automated PDF receipts, and admin operations dashboard.

---

## CERTIFICATIONS
${CERTIFICATIONS.map(c => `- **${c.title}** – ${c.issuer} (${c.issueDate}) [${c.scoreOrHonor}]`).join('\n')}
`;

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <div
        id="resume-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          id="resume-modal-dialog"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#0b0f1e] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Controls Bar */}
          <div className="px-5 py-3.5 bg-[#080c18] border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-white">
              <FileText className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold">Curriculum Vitae / Resume Preview</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="resume-copy-md"
                onClick={handleCopyMarkdown}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono-code flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied MD' : 'Copy Text'}</span>
              </button>

              <button
                id="resume-print-btn"
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Resume Paper Body */}
          <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white text-slate-900 font-sans text-xs leading-relaxed selection:bg-blue-100 print:p-0">
            {/* Header / Name & Contact */}
            <div className="border-b-2 border-slate-800 pb-4 mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm font-bold text-blue-700 mt-0.5">
                  Aspiring Software Developer | Backend Engineer | AI Enthusiast
                </p>
                <p className="text-[11px] text-slate-600 mt-1">
                  Bengaluru, Karnataka, India • {PERSONAL_INFO.email} • {PERSONAL_INFO.phone}
                </p>
              </div>

              <div className="text-right text-[11px] text-slate-600 space-y-0.5">
                <div>github.com/suhas935</div>
                <div>linkedin.com/in/suhasg0305</div>
                <div className="font-semibold text-emerald-800">Open to Internship Roles</div>
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-5">
              <h2 className="text-xs font-extrabold text-slate-950 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                Education
              </h2>
              <div className="flex justify-between items-baseline mb-0.5">
                <span className="font-bold text-slate-900 text-sm">
                  SJB Institute of Technology, Bengaluru
                </span>
                <span className="text-slate-600 font-medium">2023 - Present</span>
              </div>
              <div className="flex justify-between text-slate-700 font-semibold mb-1">
                <span>Bachelor of Engineering in Computer Science & Engineering</span>
                <span className="text-blue-800 font-bold">CGPA: 8.76 / 10.0</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, Object Oriented Programming, System Design.
              </p>
            </div>

            {/* Technical Skills Section */}
            <div className="mb-5">
              <h2 className="text-xs font-extrabold text-slate-950 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                Technical Skills
              </h2>
              <div className="space-y-1 text-slate-800">
                <div>
                  <strong className="text-slate-950 font-bold">Languages:</strong> Python, Java, C, SQL, JavaScript
                </div>
                <div>
                  <strong className="text-slate-950 font-bold">Frameworks & Web:</strong> Django, Django REST Framework, RESTful APIs, HTML5, CSS3, Tailwind CSS
                </div>
                <div>
                  <strong className="text-slate-950 font-bold">AI & Computer Vision:</strong> AI & LLM APIs, YOLOv8, OpenCV, MediaPipe, DeepSORT
                </div>
                <div>
                  <strong className="text-slate-950 font-bold">Databases:</strong> PostgreSQL, MySQL, SQLite
                </div>
                <div>
                  <strong className="text-slate-950 font-bold">Cloud & DevOps:</strong> Railway, Cloudinary, AWS, GCP, Microsoft Azure, Oracle Cloud
                </div>
                <div>
                  <strong className="text-slate-950 font-bold">Developer Tools:</strong> Git, GitHub, VS Code, IntelliJ IDEA, Eclipse
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="mb-5">
              <h2 className="text-xs font-extrabold text-slate-950 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                Featured Engineering Projects
              </h2>

              <div className="space-y-3">
                {PROJECTS.map((proj, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-slate-900 text-xs">
                        {proj.title} <span className="font-normal text-slate-600">| {proj.technologies.join(', ')}</span>
                      </span>
                      <span className="text-[10px] text-blue-700 font-semibold">{proj.githubUrl.replace('https://github.com/', 'github/')}</span>
                    </div>
                    <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5 mt-0.5">
                      {proj.features.map((feat, fIdx) => (
                        <li key={fIdx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div>
              <h2 className="text-xs font-extrabold text-slate-950 uppercase tracking-widest border-b border-slate-300 pb-1 mb-2">
                Certifications & Achievements
              </h2>
              <div className="space-y-1.5 text-slate-800 text-[11px]">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="flex justify-between">
                    <div>
                      <strong className="text-slate-900 font-bold">{cert.title}</strong> – {cert.issuer} ({cert.issueDate})
                      <span className="text-slate-500 block text-[10px]">Credential ID: {cert.credentialId}</span>
                    </div>
                    <span className="font-semibold text-emerald-800">{cert.scoreOrHonor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
