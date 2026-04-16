import { motion } from 'motion/react';
import { Home, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbProps {
  items: { label: string; path?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center gap-1 text-sm font-mono text-[var(--text-color)] opacity-60 mb-4">
      <button onClick={() => navigate('/')} className="hover:text-[var(--accent-pink)] transition-colors">
        <Home size={14} />
      </button>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronRight size={12} />
          {item.path ? (
            <button onClick={() => navigate(item.path!)} className="hover:text-[var(--accent-cyan)] transition-colors uppercase font-bold">
              {item.label}
            </button>
          ) : (
            <span className="text-[var(--accent-pink)] font-bold uppercase">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}