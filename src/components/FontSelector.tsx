import { motion } from 'motion/react';
import { Type } from 'lucide-react';
import { useState, useEffect, createContext, useContext } from 'react';

type Font = 'sans' | 'display' | 'mono';

interface FontContextType {
  font: Font;
  setFont: (font: Font) => void;
}

const FontContext = createContext<FontContextType>({ font: 'sans', setFont: () => {} });

export function useFont() {
  return useContext(FontContext);
}

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFont] = useState<Font>(() => {
    const stored = localStorage.getItem('website-font');
    return (stored as Font) || 'sans';
  });

  useEffect(() => {
    localStorage.setItem('website-font', font);
    document.body.setAttribute('data-font', font);
  }, [font]);

  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
}

const fonts = [
  { code: 'sans', label: 'Default', class: 'font-sans' },
  { code: 'display', label: 'Display', class: 'font-display' },
  { code: 'mono', label: 'Mono', class: 'font-mono' },
] as const;

export function FontSelector() {
  const { font, setFont } = useFont();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs font-bold uppercase opacity-60">
        <Type size={12} />
        <span>Font</span>
      </div>
      <div className="flex gap-1">
        {fonts.map((f) => (
          <motion.button
            key={f.code}
            onClick={() => setFont(f.code as Font)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 px-2 py-1.5 text-xs font-bold transition-colors rounded ${
              font === f.code
                ? 'bg-[var(--accent-pink)] text-white'
                : 'bg-[var(--bg-color)] text-[var(--text-color)] border border-[var(--border-color)] hover:border-[var(--accent-cyan)]'
            }`}
          >
            {f.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}