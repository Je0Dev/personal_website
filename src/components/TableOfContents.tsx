import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ChevronRight } from 'lucide-react';

interface TocItem {
  id: string;
  label: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '');
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const item of items) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  if (items.length < 2) return null;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-4 z-40 p-3 bg-[var(--accent-cyan)] text-[#111] rounded-lg border-2 border-[var(--border-color)] brutal-shadow md:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Panel */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 z-50 bg-black/70 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <motion.div 
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 bottom-0 w-64 bg-[var(--card-bg)] border-r-4 border-[var(--border-color)] p-4 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[var(--border-color)]">
              <span className="font-bold text-sm uppercase">On This Page</span>
              <button onClick={() => setIsOpen(false)} className="p-1">
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left text-sm py-2 px-2 rounded transition-colors ${
                    activeId === item.id 
                      ? 'bg-[var(--accent-pink)] text-white font-bold' 
                      : 'text-[var(--text-color)] hover:bg-[var(--border-color)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        </motion.div>
      )}

      {/* Desktop - Sticky */}
      <div className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full p-3 rounded-lg border-2 border-[var(--border-color)] bg-[var(--card-bg)] mb-2"
          >
            <span className="text-xs font-bold uppercase">On This Page</span>
            <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
              <ChevronRight size={14} />
            </motion.div>
          </button>
          
          {isExpanded && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-col gap-1 p-2 rounded-lg border-2 border-[var(--border-color)] bg-[var(--bg-color)]"
            >
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left text-xs py-2 px-3 rounded transition-colors flex items-center gap-2 ${
                    activeId === item.id 
                      ? 'bg-[var(--accent-pink)] text-white font-bold' 
                      : 'text-[var(--text-color)] hover:bg-[var(--border-color)] hover:translate-x-1'
                  }`}
                >
                  {activeId === item.id && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  {item.label}
                </button>
              ))}
            </motion.nav>
          )}
        </div>
      </div>
    </>
  );
}