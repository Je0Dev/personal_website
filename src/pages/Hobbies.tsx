import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Film, Languages, ArrowRight, ExternalLink } from 'lucide-react';
import { hobbiesData } from '../data/homeData';
import { useLanguage } from '../LanguageContext';

export function HobbiesPage() {
  const { t } = useLanguage();
  const [expandedHobby, setExpandedHobby] = useState<string | null>(null);

  const getIcon = (label: string) => {
    const iconMap: Record<string, typeof Globe> = {
      'Language Learning': Languages,
      'Movies & Series': Film,
    };
    return iconMap[label] || Globe;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl space-y-12"
    >
      <header className="space-y-4">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-[var(--text-color)] tracking-tight uppercase">
          <span className="doodle-underline">{t.hobbies.title}</span>
        </h1>
        <p className="text-xl text-[var(--text-color)] opacity-80 font-medium">
          What I do when I'm not coding - click for details
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {hobbiesData.map((hobby, index) => {
          const Icon = getIcon(hobby.label);
          const isExpanded = expandedHobby === hobby.label;
          
          return (
            <motion.article
              key={hobby.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-xl group"
            >
              {/* Clickable header */}
              <button
                onClick={() => setExpandedHobby(isExpanded ? null : hobby.label)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--accent-pink)] border-4 border-[var(--border-color)] flex items-center justify-center">
                    <span className="text-2xl">{hobby.icon}</span>
                  </div>
                  <h2 className="text-xl font-display font-black text-[var(--text-color)] group-hover:text-[var(--accent-pink)] transition-colors text-left">
                    {hobby.label}
                  </h2>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </button>
              
              {/* Expandable details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t-2 border-[var(--border-color)]"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-bold text-[var(--accent-cyan)] uppercase mb-2">About</h3>
                        <p className="text-[var(--text-color)] opacity-80 font-medium">
                          {hobby.about}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-bold text-[var(--accent-pink)] uppercase mb-2">Details</h3>
                        <p className="text-[var(--text-color)] opacity-70 font-medium">
                          {hobby.desc}
                        </p>
                      </div>
                      
                      {hobby.links && hobby.links.length > 0 && (
                        <div className="md:col-span-2">
                          <h3 className="text-sm font-bold text-[var(--accent-purple)] uppercase mb-2">Links</h3>
                          <div className="flex flex-wrap gap-3">
                            {hobby.links.map((link, i) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs font-bold text-[var(--accent-cyan)] hover:underline"
                              >
                                <ExternalLink size={12} />
                                {link.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </motion.div>
  );
}