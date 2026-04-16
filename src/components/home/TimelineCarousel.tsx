import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ChevronDown, MapPin, ExternalLink } from 'lucide-react';
import { timelineData } from '../../data/homeData';
import { PageDecoration } from '../PageDecoration';

export function TimelineCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % timelineData.length);
    setExpandedIndex(null);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + timelineData.length) % timelineData.length);
    setExpandedIndex(null);
  };

  const current = timelineData[activeIndex];

  return (
    <div className="w-full">
      {/* Carousel container */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.year}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Active card - compact by default, expandable */}
            <div 
              onClick={() => setExpandedIndex(expandedIndex === activeIndex ? null : activeIndex)}
              className="p-4 bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-xl cursor-pointer group tile-3d"
            >
              {/* Year badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 text-sm font-black text-[#111] ${current.color}`}>
                    {current.year}
                  </span>
                  <PageDecoration variant="quill" size={20} className="opacity-60" />
                </div>
                <ChevronDown 
                  size={20} 
                  className={`transition-transform ${expandedIndex === activeIndex ? 'rotate-180' : ''}`}
                />
              </div>

              {/* Compact view */}
              <h3 className="text-xl font-display font-black text-[var(--text-color)] mb-1 group-hover:text-[var(--accent-pink)] transition-colors">
                {current.title}
              </h3>
              <p className="text-sm font-medium text-[var(--text-color)] opacity-80">
                {current.desc}
              </p>
              <div className="flex items-center gap-1 text-xs font-mono text-[var(--text-color)] opacity-60 mt-2">
                <MapPin size={12} />
                <span>{current.location}</span>
              </div>

              {/* Expanded view */}
              <AnimatePresence>
                {expandedIndex === activeIndex && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t-2 border-[var(--border-color)]"
                  >
                    {current.details && (
                      <p className="text-sm text-[var(--text-color)] opacity-70 mb-3 italic">
                        {current.details}
                      </p>
                    )}
                    {current.topics && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {current.topics.map((topic, i) => (
                          <span key={i} className="px-2 py-0.5 text-xs font-mono font-bold bg-[var(--bg-color)] text-[var(--text-color)] border border-[var(--border-color)]">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                    {current.links && current.links.length > 0 && (
                      <div className="flex gap-2">
                        {current.links.map((link, i) => (
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
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={prev}
          className="p-3 bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        
        {/* Dots indicator */}
        <div className="flex gap-2">
          {timelineData.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); setExpandedIndex(null); }}
              className={`w-3 h-3 border-2 border-[var(--border-color)] transition-all ${
                i === activeIndex ? 'bg-[var(--accent-pink)]' : 'bg-[var(--card-bg)] hover:bg-[var(--border-color)]'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={next}
          className="p-3 bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}