import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Globe } from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { useSound } from '../../SoundContext';

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

function PixelText({ text, className = '' }: { text: string; className?: string }) {
  const chars = text.split('');
  return (
    <span className={`inline-block ${className}`}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.05, type: 'spring', bounce: 0.6 }}
          className="inline-block"
          style={{
            textShadow: '3px 3px 0 var(--accent-pink), -1px -1px 0 var(--accent-cyan)',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

const socialLinks = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/Je0Dev', icon: Github, color: 'bg-[var(--accent-purple)]' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/geomas/', icon: Linkedin, color: 'bg-[var(--accent-cyan)]' },
  { id: 'website', label: 'Website', href: 'https://je0dev.github.io/', icon: Globe, color: 'bg-[var(--accent-pink)]' },
];

export function HeroSection({ setActiveTab, showToast }: HeroSectionProps) {
  const { t } = useLanguage();
  const { play } = useSound();

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/my_cv.pdf';
    link.download = 'George_Mastrogiannis_CV.pdf';
    link.click();
    play('click');
    showToast('Thanks for downloading my CV!', 'success');
    setActiveTab('thank-you');
  };

  const handleSocialClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      <div className="flex-1 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <p className="text-sm font-bold text-[var(--accent-pink)] uppercase tracking-widest mb-2">
            {t.home.greeting}
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-[var(--text-color)] leading-tight">
            <PixelText text="George" className="text-[var(--accent-cyan)]" />
          </h1>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-[var(--text-color)]">
            <span className="relative">
              <span className="relative z-10">{t.home.tagline}</span>
              <span className="absolute left-0 bottom-1 w-full h-3 bg-[var(--accent-pink)] opacity-30 -z-10" />
            </span>
          </p>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-[var(--text-color)] opacity-80 max-w-lg leading-relaxed"
        >
          {t.home.tagline}
        </motion.p>

        {/* Social Links instead of tech badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2, duration: 0.5 }} 
          className="flex flex-wrap gap-3"
        >
          {socialLinks.map((link) => (
            <motion.button
              key={link.id}
              whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialClick(link.href)}
              className={`flex items-center gap-2 px-4 py-2 ${link.color} text-white border-4 border-[var(--border-color)] brutal-shadow-lg hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all font-bold uppercase text-xs`}
            >
              <link.icon size={14} />
              {link.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 0.5 }} 
          className="flex flex-wrap gap-4 pt-2"
        >
          <motion.button 
            onClick={() => { play('click'); setActiveTab('notes'); }} 
            whileTap={{ scale: 0.95 }} 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-sm font-bold bg-[var(--accent-pink)] text-white border-4 border-[var(--border-color)] brutal-shadow-lg hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all"
          >
            <span className="uppercase tracking-wider">{t.home.readMore}</span>
            <ArrowRight size={20} />
          </motion.button>
          <motion.button 
            onClick={() => { play('click'); setActiveTab('projects'); }} 
            whileTap={{ scale: 0.95 }} 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-sm font-bold bg-[var(--card-bg)] text-[var(--text-color)] border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all"
          >
            <span className="uppercase tracking-wider">{t.home.viewWork}</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Desktop: GIF Display with clickable Based in */}
      <div className="hidden lg:block w-full lg:w-80 shrink-0">
        <motion.div 
          whileHover={{ scale: 1.02 }} 
          className="w-full rounded-sm border-4 border-[var(--border-color)] brutal-shadow-xl overflow-hidden relative group"
        >
          <img 
            src="/gif1.gif" 
            alt="George" 
            className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-[var(--card-bg)]/95 backdrop-blur border-t-4 border-[var(--border-color)]">
            <button 
              onClick={handleDownloadCV}
              className="space-y-2 w-full text-left hover:text-[var(--accent-pink)] transition-colors"
            >
              <p className="font-bold text-xs uppercase tracking-wide">Based in</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-sm">Patras, Greece</p>
                <span className="text-xs bg-[var(--accent-cyan)] text-[#111] px-1">↓ CV</span>
              </div>
              <div className="flex gap-2 pt-1">
                <span className="px-2 py-1 text-xs font-bold bg-[var(--accent-cyan)] text-[#111]">ECE</span>
                <span className="px-2 py-1 text-xs font-bold bg-[var(--accent-pink)] text-white">UoP</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile: GIF */}
      <div className="lg:hidden w-full rounded-sm border-4 border-[var(--border-color)] brutal-shadow-xl overflow-hidden relative group">
        <img 
          src="/gif1.gif" 
          alt="George" 
          className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[var(--card-bg)]/95 backdrop-blur border-t-4 border-[var(--border-color)]">
          <button 
            onClick={handleDownloadCV}
            className="space-y-2 w-full text-left hover:text-[var(--accent-pink)] transition-colors"
          >
            <p className="font-bold text-xs uppercase tracking-wide">Based in</p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-sm">Patras, Greece</p>
              <span className="text-xs bg-[var(--accent-cyan)] text-[#111] px-1">↓ CV</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}