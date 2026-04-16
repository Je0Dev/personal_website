import { motion } from 'motion/react';
import { Mail, MapPin } from 'lucide-react';
import { timelineData } from '../../data/homeData';
import { PageDecoration } from '../PageDecoration';

export function AboutSection({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, type: "spring", bounce: 0.4 }} className="space-y-8">
      <div className="flex items-center gap-4">
        <PageDecoration variant="books" size={48} />
        <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">About <span className="doodle-highlight">Me</span></h2>
        <div className="h-1 flex-1 bg-[var(--border-color)]"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="relative border-l-4 border-[var(--border-color)] ml-4 space-y-8 pb-4">
          {timelineData.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} whileHover={{ x: 10 }} className="relative pl-8 group">
              <div className={`absolute -left-[14px] top-1 w-6 h-6 rounded-full border-4 border-[var(--border-color)] ${item.color} z-10 group-hover:scale-125 transition-transform`} />
              <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] p-5 rounded-xl brutal-shadow max-w-lg">
                <span className="inline-block px-2 py-1 bg-[var(--text-color)] text-[var(--bg-color)] text-xs font-bold font-mono mb-2 rounded">{item.year}</span>
                <h3 className="text-lg font-display font-bold text-[var(--text-color)] mb-1">{item.title}</h3>
                <p className="text-[var(--text-color)] opacity-80 font-medium text-sm mb-2">{item.desc}</p>
                <div className="flex items-center gap-1 text-xs font-mono text-[var(--text-color)] opacity-60 mb-3"><MapPin size={12} />{item.location}</div>
                {item.details && <p className="text-[var(--text-color)] opacity-70 text-sm mb-3 italic">{item.details}</p>}
                {item.topics && <div className="flex flex-wrap gap-1 mb-3">{item.topics.map((topic, idx) => (<span key={idx} className="text-xs font-mono text-[var(--text-color)] bg-[var(--bg-color)] border border-[var(--border-color)] px-2 py-1 rounded">{topic}</span>))}</div>}
                {item.links && <div className="flex flex-wrap gap-2">{item.links.map((link, idx) => (<a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[var(--accent-cyan)] hover:underline">{link.title} ↗</a>))}</div>}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div whileHover={{ y: -5 }} className="rounded-3xl border-4 border-[var(--border-color)] bg-[var(--card-bg)] p-6 brutal-shadow space-y-6">
          <div className="aspect-video rounded-xl border-2 border-[var(--border-color)] overflow-hidden relative group">
            <img src="/gif2.gif" alt="About me" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--border-color)] to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 text-white font-bold font-display text-xl tracking-wide"><span className="doodle-circle">My Journey</span></div>
          </div>
          <div className="space-y-4 text-[var(--text-color)] opacity-80 font-medium leading-relaxed">
            <p>I'm an ECE student at University of Patras, constantly pushing myself to learn and build meaningful projects.</p>
            <p>Beyond tech, I love exploring languages and cultures, playing chess, and diving into sci-fi movies.</p>
          </div>
          <button onClick={() => setActiveTab('notes')} className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-pink)] text-white font-bold rounded-xl border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all">
            <span>Wanna see more?</span><span className="underline">Click here to visit my blog</span>
          </button>
          <div className="flex items-center gap-4 pt-4 border-t-2 border-[var(--border-color)]">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--accent-pink)]"><Mail size={16} />giorgos_M000@hotmail.com</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}