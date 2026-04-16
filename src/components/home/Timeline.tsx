import { motion } from 'motion/react';
import { MapPin, ExternalLink, BookOpen, Cpu, Code, Globe } from 'lucide-react';
import { timelineData } from '../../data/homeData';
import { PageDecoration } from '../PageDecoration';

interface TimelineItemProps {
  item: {
    year: string;
    title: string;
    desc: string;
    location: string;
    color: string;
    details?: string;
    links?: { title: string; url: string }[];
    topics?: string[];
  };
  index: number;
  isLast: boolean;
}

function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative flex gap-4"
    >
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-[19px] top-10 bottom-[-2rem] w-1 bg-[var(--border-color)] opacity-30" />
      )}
      
      {/* Year badge with pixel styling */}
      <div className={`relative z-10 w-10 h-10 shrink-0 rounded-sm ${item.color} flex items-center justify-center brutal-shadow-lg border-2 border-[var(--border-color)]`}>
        <span className="text-xs font-black text-[#111]">{item.year.slice(-2)}</span>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[var(--shadow-color)] border border-[var(--border-color)]" />
      </div>
      
      {/* Card */}
      <motion.div 
        whileHover={{ x: 8, scale: 1.01 }}
        className="flex-1 p-4 md:p-5 rounded-sm bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-lg tile-3d cursor-pointer group"
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs font-black text-[#111] ${item.color}`}>{item.year}</span>
            <PageDecoration variant="quill" size={20} className="opacity-60" />
          </div>
          <div className="flex items-center gap-1 text-xs font-mono text-[var(--text-color)] opacity-60">
            <MapPin size={12} />
            <span>{item.location}</span>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-lg md:text-xl font-display font-black text-[var(--text-color)] mb-1 group-hover:text-[var(--accent-pink)] transition-colors">
          {item.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm font-medium text-[var(--text-color)] opacity-80 mb-3">
          {item.desc}
        </p>
        
        {/* Details */}
        {item.details && (
          <p className="text-sm text-[var(--text-color)] opacity-70 mb-3 italic border-l-2 border-[var(--accent-cyan)] pl-3">
            {item.details}
          </p>
        )}
        
        {/* Topics */}
        {item.topics && item.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.topics.map((topic, i) => (
              <span key={i} className="px-2 py-0.5 text-xs font-mono font-bold bg-[var(--bg-color)] text-[var(--text-color)] border border-[var(--border-color)] rounded-sm">
                {topic}
              </span>
            ))}
          </div>
        )}
        
        {/* Links */}
        {item.links && item.links.length > 0 && (
          <div className="flex gap-2">
            {item.links.map((link, i) => (
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
    </motion.div>
  );
}

export function Timeline() {
  return (
    <div className="space-y-0 relative">
      {timelineData.map((item, index) => (
        <TimelineItem 
          key={item.year}
          item={item}
          index={index}
          isLast={index === timelineData.length - 1}
        />
      ))}
    </div>
  );
}

export function TimelineMinimal() {
  return (
    <div className="relative">
      {timelineData.map((item, index) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-3 py-2"
        >
          <div className={`w-8 h-8 shrink-0 rounded-sm ${item.color} flex items-center justify-center border-2 border-[var(--border-color)]`}>
            <span className="text-[10px] font-black text-[#111]">{item.year.slice(-2)}</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[var(--text-color)]">{item.title}</p>
            <p className="text-xs text-[var(--text-color)] opacity-60">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}