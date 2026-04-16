import { motion } from 'motion/react';
import { Mail } from 'lucide-react';

export function CTASection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent-yellow)] rounded-bl-full -mr-12 -mt-12 border-b-4 border-l-4 border-[var(--border-color)] opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--accent-pink)] rounded-tr-full -ml-12 -mb-12 border-t-4 border-r-4 border-[var(--border-color)] opacity-30 pointer-events-none" />
        <div className="relative z-10 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-[var(--text-color)]">Let's Build Something <span className="doodle-highlight">Amazing</span> Together</h2>
          <p className="text-[var(--text-color)] opacity-70 max-w-xl mx-auto">I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
          <motion.button onClick={() => setActiveTab('contact')} whileTap={{ scale: 0.95 }} className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-white bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-purple)] hover:from-[var(--accent-cyan)] hover:to-[var(--accent-green)] border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all shadow-[4px_4px_0_var(--border-color)]">
            <Mail size={22} /><span className="uppercase tracking-wider text-lg">Get In Touch</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.section>
  );
}