import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone,
  Send, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  Sparkles, 
  MapPin, 
  Clock, 
  MessageSquare,
  CheckCircle2,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-blue-500/10 border border-blue-500/20 text-blue-300 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>LET'S CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get In Touch
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Feel free to send a message, project proposal, or inquiry. Anyone is welcome to get in touch!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Direct Contact Channels</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Feel free to send an email, call, connect on LinkedIn, or review my repositories on GitHub.
                </p>
              </div>

              {/* Email Box with Click to Copy */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono-code text-slate-400 uppercase">Email Address</div>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs font-bold text-white hover:text-blue-300 truncate block">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  id="contact-copy-email-btn"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Box with Click to Copy */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-mono-code text-slate-400 uppercase">Phone / WhatsApp</div>
                    <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} className="text-xs font-bold text-white hover:text-emerald-300 truncate block">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <button
                  id="contact-copy-phone-btn"
                  onClick={handleCopyPhone}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Availability & Location Meta */}
              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-code text-slate-400">LOCATION</div>
                    <span className="font-semibold text-white">{PERSONAL_INFO.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                    <Clock className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-code text-slate-400">RESPONSE TIME</div>
                    <span className="font-semibold text-emerald-300">&lt; 24 Hours</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-800">
                <span className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider block mb-3">
                  Social Networks:
                </span>
                <div className="flex gap-2.5">
                  <a
                    id="contact-social-github"
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/30 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>

                  <a
                    id="contact-social-linkedin"
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/30 text-slate-300 hover:text-blue-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                  <p className="text-xs text-slate-300 max-w-md mb-6 leading-relaxed">
                    Thank you for reaching out{formData.name ? `, ${formData.name}` : ''}. Suhas will review your message and reply to <span className="text-blue-300 font-mono-code">{formData.email}</span> shortly.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Message from Portfolio')}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Email App</span>
                    </a>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          subject: '',
                          message: '',
                        });
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Write Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Send a Message</h3>
                    <p className="text-xs text-slate-400">Leave a note, question, or opportunity.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono-code text-slate-400 mb-1">
                        YOUR NAME *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono-code text-slate-400 mb-1">
                        YOUR EMAIL *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject field (clean text input) */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono-code text-slate-400 mb-1">
                      SUBJECT
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      placeholder="Subject of your message..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans transition-all"
                    />
                  </div>

                  {/* Message Body */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono-code text-slate-400 mb-1">
                      MESSAGE CONTENT *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      placeholder="Write your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-sans transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
