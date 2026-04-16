import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { statsData, locationData } from '../../data/homeData';
import { CountUp } from '../CountUp';
import { useLanguage } from '../../LanguageContext';
import { MapPin, GraduationCap, ExternalLink, X, Cpu } from 'lucide-react';

interface StatsSectionProps {
  setActiveTab: (tab: string) => void;
}

export function StatsSection({ setActiveTab }: StatsSectionProps) {
  const [expandedStat, setExpandedStat] = useState<string | null>(null);
  const [showLocation, setShowLocation] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-4">
      {statsData.map((item, i) => (
        <div key={i} className="relative">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }} onClick={() => setExpandedStat(expandedStat === item.label ? null : item.label)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-2xl border-4 border-[var(--border-color)] brutal-shadow cursor-pointer transition-all ${expandedStat === item.label ? item.color : 'bg-[var(--card-bg)]'}`}>
            <div className="flex items-center gap-3">
              <CountUp number={parseInt(item.number)} color={expandedStat === item.label ? 'text-white' : item.color.replace('bg-', 'text-')} />
              <span className={`font-bold uppercase tracking-wide text-sm ${expandedStat === item.label ? 'text-[var(--bg-color)]' : 'text-[var(--text-color)]'}`}>{item.label}</span>
            </div>
          </motion.div>
          {expandedStat === item.label && item.details && (
            <motion.div initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} className="absolute top-full left-0 right-0 mt-2 p-4 bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-2xl brutal-shadow z-20">
              <p className="text-xs font-bold text-[var(--text-color)] mb-2">{item.details}</p>
              {item.links && item.links.map(link => (
                <a key={link.title} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-[var(--accent-cyan)] hover:underline">
                  <ExternalLink size={10} /> {link.title}
                </a>
              ))}
            </motion.div>
          )}
        </div>
      ))}
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.7 }} 
        onClick={() => setShowLocation(true)} 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }}
        className="p-4 w-full rounded-xl border-4 border-[var(--border-color)] bg-[var(--card-bg)] brutal-shadow cursor-pointer overflow-hidden"
      >
        {/* Breadcrumb path */}
        <div className="flex items-center justify-between mb-3">
          <div className="breadcrumb-path">
            <span className="breadcrumb-item bg-[var(--accent-pink)] text-white">Home</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-item bg-[var(--accent-cyan)] text-white">Details</span>
          </div>
          <span className="text-xs font-bold text-[var(--accent-pink)]">Click to view →</span>
        </div>
        
        {/* GIF instead of 3D */}
        <div className="relative">
          <img src="/gif2.gif" alt="Patras" className="w-full h-24 object-cover grayscale hover:grayscale-0 transition-all" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--border-color)]/80 to-transparent" />
          <div className="absolute bottom-2 left-2 flex items-center gap-2">
            <span className="flex items-center gap-1 px-2 py-1 text-xs font-bold bg-[var(--accent-cyan)] text-[#111]">
              <Cpu size={12} /> ECE
            </span>
            <span className="px-2 py-1 text-xs font-bold bg-[var(--accent-pink)] text-white">
              @UoP
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showLocation && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setShowLocation(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-xl brutal-shadow-lg max-w-lg w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
              {/* Breadcrumb Path */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-[var(--border-color)]">
                <button onClick={() => setShowLocation(false)} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:bg-[var(--accent-pink)] hover:text-white transition-colors">
                  <X size={12} /> Back
                </button>
              </div>
              
              {/* Large GIF */}
              <div className="mb-6">
                <img src="/gif2.gif" alt="Patras" className="w-full h-40 object-cover grayscale hover:grayscale-0 transition-all" />
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-display font-black text-[var(--text-color)] uppercase">{locationData.city}</h2>
                  <p className="text-sm font-mono text-[var(--text-color)] opacity-60">{locationData.location}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-[var(--accent-pink)] mt-1" />
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-color)] uppercase">{t.home.basedIn}</h3>
                    <p className="text-[var(--text-color)]">{locationData.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <GraduationCap size={20} className="text-[var(--accent-cyan)] mt-1" />
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-color)] uppercase">{locationData.university}</h3>
                    <p className="text-[var(--text-color)] opacity-80">{t.home.studentAt}</p>
                  </div>
                </div>
                
                <div className="border-t-2 border-[var(--border-color)] pt-4">
                  <h3 className="text-sm font-bold text-[var(--text-color)] uppercase mb-2">About</h3>
                  <p className="text-[var(--text-color)] opacity-80 leading-relaxed">{locationData.about}</p>
                </div>
                
                <div className="border-t-2 border-[var(--border-color)] pt-4">
                  <h3 className="text-sm font-bold text-[var(--text-color)] uppercase mb-2">Links</h3>
                  <div className="flex flex-wrap gap-2">
                    {locationData.links.map(link => (
                      <a key={link.title} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-[var(--text-color)] bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:bg-[var(--accent-cyan)] hover:text-white transition-colors">
                        <ExternalLink size={12} /> {link.title}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}