import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, X } from 'lucide-react';
import { hobbiesData } from '../../data/homeData';

export function HobbiesSection() {
  const [selectedHobby, setSelectedHobby] = useState<typeof hobbiesData[0] | null>(null);
  const colors = ['bg-[var(--accent-pink)]', 'bg-[var(--accent-cyan)]'];

  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, type: "spring", bounce: 0.4 }} className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">Hobbies & <span className="doodle-circle">Interests</span></h2>
        <div className="h-1 flex-1 bg-[var(--border-color)]"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {hobbiesData.map((hobby, i) => (
          <motion.button key={hobby.label} onClick={() => setSelectedHobby(hobby)} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}
            className="p-6 rounded-2xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow text-center cursor-pointer hover:border-[var(--accent-pink)] group">
            <div className={`p-3 rounded-xl ${colors[i % colors.length]} inline-block mb-3 group-hover:scale-110 transition-transform`}><span className="text-2xl">{hobby.icon}</span></div>
            <h3 className="font-bold text-[var(--text-color)] uppercase tracking-wide text-sm">{hobby.label}</h3>
            <p className="text-xs text-[var(--text-color)] opacity-60 mt-1">{hobby.desc}</p>
            <ExternalLink size={14} className="text-[var(--text-color)] opacity-50 mt-2 mx-auto" />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {selectedHobby && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setSelectedHobby(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-3xl brutal-shadow-lg max-w-md w-full p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{selectedHobby.icon}</div>
                  <h3 className="text-2xl font-display font-black text-[var(--text-color)] uppercase">{selectedHobby.label}</h3>
                </div>
                <button onClick={() => setSelectedHobby(null)} className="p-2 bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-lg text-[var(--text-color)] hover:bg-[var(--accent-pink)] hover:text-white transition-colors"><X size={20} /></button>
              </div>
              <p className="text-[var(--text-color)] opacity-80 font-medium leading-relaxed mb-6">{selectedHobby.about}</p>
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-[var(--text-color)] opacity-60 uppercase tracking-wider">Check it out</h4>
                {selectedHobby.links.map((link) => (
                  <a key={link.title} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:border-[var(--accent-cyan)] transition-colors group">
                    <span className="font-bold text-[var(--text-color)] text-sm">{link.title}</span>
                    <ExternalLink size={16} className="text-[var(--text-color)] opacity-50 group-hover:text-[var(--accent-cyan)]" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}