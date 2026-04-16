import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, FileText } from 'lucide-react';
import { skillsData, Skill } from '../../data/homeData';
import { useLanguage } from '../../LanguageContext';

interface SkillsSectionProps {
  setActiveTab: (tab: string) => void;
  onSkillSelect?: (skill: Skill | null) => void;
  selectedSkill?: Skill | null;
}

export function SkillsSection({ setActiveTab, onSkillSelect, selectedSkill: externalSelected }: SkillsSectionProps) {
  const internalSelected = useState<Skill | null>(null);
  const selectedSkill = externalSelected ?? internalSelected[0];
  const setSelectedSkill = onSkillSelect ?? internalSelected[1];
  const { t } = useLanguage();

  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, type: "spring", bounce: 0.4 }} className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">{t.home.techStack.split(' ')[0]} <span className="doodle-circle">{t.home.techStack.split(' ')[1]}</span></h2>
        <div className="h-1 flex-1 bg-[var(--border-color)]"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {skillsData.map((skill, i) => (
          <motion.div key={skill.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedSkill(skill)}
            className="flex items-center gap-3 p-4 rounded-xl bg-[var(--card-bg)] border-2 border-[var(--border-color)] brutal-shadow cursor-pointer transition-all hover:border-[var(--accent-pink)]">
            <div className={`w-8 h-8 rounded-lg ${skill.color} flex items-center justify-center text-[#111] font-black text-xs`}>{skill.name.split(' ')[0].slice(0, 2)}</div>
            <span className="font-bold font-display text-[var(--text-color)] text-sm uppercase tracking-wide">{skill.name}</span>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedSkill && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setSelectedSkill(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-3xl brutal-shadow-lg max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${selectedSkill.color} flex items-center justify-center text-[#111] font-black text-lg`}>{selectedSkill.name.split(' ')[0].slice(0, 2)}</div>
                  <h3 className="text-2xl font-display font-black text-[var(--text-color)] uppercase">{selectedSkill.name}</h3>
                </div>
                <button onClick={() => setSelectedSkill(null)} className="p-2 bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-lg text-[var(--text-color)] hover:bg-[var(--accent-pink)] hover:text-white transition-colors"><X size={20} /></button>
              </div>
              {selectedSkill.relatedProjects && selectedSkill.relatedProjects.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-[var(--text-color)] opacity-60 uppercase tracking-wider mb-3">Related Projects</h4>
                  <div className="space-y-2">
                    {selectedSkill.relatedProjects.map((proj) => (
                      <button key={proj} onClick={() => { setActiveTab('projects'); setSelectedSkill(null); }} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:border-[var(--accent-cyan)] transition-colors text-left">
                        <ExternalLink size={16} className="text-[var(--accent-cyan)]" /><span className="font-bold text-[var(--text-color)] text-sm">{proj}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {selectedSkill.relatedNotes && selectedSkill.relatedNotes.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-color)] opacity-60 uppercase tracking-wider mb-3">Related Notes</h4>
                  <div className="space-y-2">
                    {selectedSkill.relatedNotes.map((note) => (
                      <button key={note} onClick={() => { setActiveTab('notes'); setSelectedSkill(null); }} className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:border-[var(--accent-purple)] transition-colors text-left">
                        <FileText size={16} className="text-[var(--accent-purple)]" /><span className="font-bold text-[var(--text-color)] text-sm">{note}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {(!selectedSkill.relatedProjects || selectedSkill.relatedProjects.length === 0) && (!selectedSkill.relatedNotes || selectedSkill.relatedNotes.length === 0) && <p className="text-[var(--text-color)] opacity-60 text-center py-4">No related projects or notes yet</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}