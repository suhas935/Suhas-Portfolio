import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  FileCheck, 
  X,
  Calendar,
  Building,
  KeyRound
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CERTIFICATIONS } from '../data/portfolioData';
import { Certification } from '../types';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const openCertModal = (cert: Certification) => {
    setSelectedCert(cert);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <section id="certifications" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>CREDENTIALS & HONORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Certifications
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Formal technical certifications issued by global evaluation platforms and top national engineering institutes.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {CERTIFICATIONS.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_12px_30px_-10px_rgba(99,102,241,0.2)]"
            >
              <div>
                {/* Header with Issuer & Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono-code text-indigo-400 font-semibold uppercase tracking-wider">
                        {cert.issuer}
                      </span>
                      <h3 className="text-lg font-bold text-white leading-snug mt-0.5">
                        {cert.title}
                      </h3>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                    {cert.scoreOrHonor || 'Verified'}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {cert.description}
                </p>

                {/* Skills Validated */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono-code text-slate-400 font-medium uppercase tracking-wider block mb-1.5">
                    Skills Validated:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metadata */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] font-mono-code text-slate-400 gap-2 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Issued: {cert.issueDate}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <KeyRound className="w-3 h-3 text-slate-500" />
                    ID: {cert.credentialId}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  id={`cert-preview-${cert.id}`}
                  onClick={() => openCertModal(cert)}
                  className="flex-1 py-2 px-3 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Inspect Certificate</span>
                </button>

                <a
                  id={`cert-verify-${cert.id}`}
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Inspection Modal */}
        <AnimatePresence>
          {selectedCert && (
            <div
              id="cert-modal-overlay"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedCert(null);
              }}
            >
              <motion.div
                id="cert-modal-dialog"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                className="relative w-full max-w-lg bg-[#0c101d] border border-indigo-500/40 rounded-2xl shadow-2xl p-6 overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Certificate Frame Preview */}
                <div className="p-6 rounded-xl border-2 border-indigo-500/30 bg-gradient-to-b from-[#080c16] to-[#0d1424] text-center relative overflow-hidden mb-5">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                    <ShieldCheck className="w-7 h-7" />
                  </div>

                  <span className="text-[10px] font-mono-code text-indigo-300 uppercase tracking-widest block">
                    Certificate of Competence
                  </span>

                  <h3 className="text-xl font-bold text-white mt-1 mb-2">
                    {selectedCert.title}
                  </h3>

                  <p className="text-xs text-slate-300 mb-4">
                    This certifies that <strong className="text-white">Suhas G</strong> has demonstrated verified proficiency in {selectedCert.title} as administered by{' '}
                    <strong className="text-indigo-300">{selectedCert.issuer}</strong>.
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono-code font-bold">
                    ✓ Verified Credential ID: {selectedCert.credentialId}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Issuer Verification Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
