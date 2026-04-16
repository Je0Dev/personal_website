import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'es', label: 'ES' },
  { code: 'zh', label: 'ZH' },
] as const;

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center">
      <Globe size={16} className="text-[var(--text-color)] opacity-50 mr-2" />
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code as any)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-2.5 py-2 text-xs font-bold transition-colors ${
            language === lang.code
              ? 'bg-[var(--accent-pink)] text-white'
              : 'bg-[var(--bg-color)] text-[var(--text-color)] border border-[var(--border-color)] hover:border-[var(--accent-cyan)]'
          }`}
        >
          {lang.label}
        </motion.button>
      ))}
    </div>
  );
}