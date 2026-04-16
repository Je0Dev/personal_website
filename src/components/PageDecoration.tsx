import { motion } from 'motion/react';

interface PageDecorationProps {
  variant?: 'books' | 'quill' | 'feather' | 'scroll' | 'skull';
  className?: string;
  size?: number;
}

const variants = {
  books: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="8" y="15" width="14" height="30" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
      <rect x="23" y="10" width="14" height="35" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <rect x="38" y="12" width="14" height="33" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <line x1="10" y1="22" x2="20" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <line x1="10" y1="28" x2="20" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <line x1="25" y1="18" x2="35" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <line x1="25" y1="24" x2="35" y2="24" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    </svg>
  ),
  quill: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M15 50 L30 10 L45 50" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
      <path d="M20 45 Q30 20 40 45" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="30" cy="12" r="2" fill="currentColor" opacity="0.6"/>
      <path d="M32 12 Q38 25 42 35" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    </svg>
  ),
  feather: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M30 55 Q20 40 15 25 Q10 10 20 5 Q30 15 35 20 Q45 35 50 15 Q55 30 45 45 Q35 55 30 55" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      <path d="M30 50 Q25 40 22 32" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  scroll: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M10 12 Q30 8 50 12 L50 48 Q30 52 10 48 Z" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <ellipse cx="10" cy="30" rx="4" ry="18" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <ellipse cx="50" cy="30" rx="4" ry="18" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
    </svg>
  ),
  skull: (
    <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="30" cy="32" rx="14" ry="18" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <circle cx="23" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="37" cy="28" r="4" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
      <ellipse cx="30" cy="38" rx="4" ry="2" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    </svg>
  ),
};

export function PageDecoration({ variant = 'books', className = '', size = 40 }: PageDecorationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`text-[var(--text-color)] ${className}`}
      style={{ width: size, height: size }}
    >
      {variants[variant]}
    </motion.div>
  );
}

interface OldBookImageProps {
  src?: string;
  alt: string;
  className?: string;
}

export function OldBookImage({ src, alt, className = '' }: OldBookImageProps) {
  if (!src) return null;
  
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`rounded-lg border-2 border-[var(--border-color)] ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}