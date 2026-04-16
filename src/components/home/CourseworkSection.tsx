import { motion } from 'motion/react';
import { courseworkData } from '../../data/homeData';

interface CourseworkSectionProps {
  setSelectedSkill: (skill: any) => void;
}

export function CourseworkSection({ setSelectedSkill }: CourseworkSectionProps) {
  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, type: "spring", bounce: 0.4 }} className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">Relevant <span className="doodle-highlight">Coursework</span></h2>
        <div className="h-1 flex-1 bg-[var(--border-color)]"></div>
      </div>
      <div className="flex flex-wrap gap-3">
        {courseworkData.map((course, i) => (
          <motion.button key={course.name} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSkill({...course, color: 'bg-[var(--accent-cyan)]', textColor: 'text-[var(--accent-cyan)]'})}
            className="px-5 py-3 rounded-xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow text-[var(--text-color)] font-bold uppercase tracking-wide text-sm cursor-pointer hover:border-[var(--accent-cyan)]">
            {course.name}
          </motion.button>
        ))}
      </div>
    </motion.section>
  );
}