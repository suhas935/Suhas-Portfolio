import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code, 
  Server, 
  Layout, 
  Database, 
  Cloud, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  Search,
  Layers,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Icon mapping
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Server':
        return Server;
      case 'Code':
        return Code;
      case 'Layout':
        return Layout;
      case 'Database':
        return Database;
      case 'Cloud':
        return Cloud;
      case 'Sparkles':
        return Sparkles;
      case 'Layers':
        return Layers;
      default:
        return Terminal;
    }
  };

  // Filter skills
  const filteredCategories = SKILL_CATEGORIES.filter((category) => {
    if (selectedCategory !== 'all' && category.id !== selectedCategory) {
      return false;
    }
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const hasMatchingSkill = category.skills.some((skill) =>
      skill.name.toLowerCase().includes(query) || skill.experience.toLowerCase().includes(query)
    );
    const hasMatchingCategory = category.name.toLowerCase().includes(query);
    return hasMatchingSkill || hasMatchingCategory;
  });

  return (
    <section id="skills" className="relative py-24 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-blue-500/10 border border-blue-500/20 text-blue-300 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>TECHNICAL EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Skills
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-full mt-3 mb-4" />
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base">
            Categorized skills across backend engineering, machine learning & LLM APIs, databases, cloud DevOps, and foundational computer science.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              id="skill-filter-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                  : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Skills ({SKILL_CATEGORIES.reduce((acc, c) => acc + c.skills.length, 0)})
            </button>

            {SKILL_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`skill-filter-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="skills-search-input"
              type="text"
              placeholder="Search skill (e.g. Django, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-900/90 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/60 font-mono-code transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Skill Groups Grid (Categorized Badges & Pills) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredCategories.map((category, catIdx) => {
              const CategoryIcon = getCategoryIcon(category.iconName);

              return (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: catIdx * 0.04 }}
                  className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800/80">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white leading-tight">
                          {category.name}
                        </h3>
                        <p className="text-[10px] font-mono-code text-slate-400 mt-0.5">
                          {category.skills.length} skills
                        </p>
                      </div>
                    </div>

                    {/* Skill Badges / Pills list */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {category.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-mono-code flex items-center gap-1.5 transition-all group ${
                            skill.highlight
                              ? 'bg-blue-950/60 border border-blue-500/40 text-blue-200 shadow-sm'
                              : 'bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                          title={skill.experience}
                        >
                          {skill.highlight && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                          )}
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subtext description */}
                  <div className="mt-5 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400 line-clamp-2">
                    {category.description}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
