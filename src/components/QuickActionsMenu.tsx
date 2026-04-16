import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Home, FolderOpen, FileText, Mail, Moon, Sun, Github, Linkedin, ExternalLink, Command, X, BarChart3 } from 'lucide-react';

interface Action {
  id: string;
  label: string;
  icon: typeof Home;
  shortcut?: string;
  action: () => void;
  category: 'navigation' | 'actions' | 'social';
}

interface QuickActionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (path: string) => void;
  toggleTheme: () => void;
  openAnalytics?: () => void;
}

export function QuickActionsMenu({ isOpen, onClose, navigate, toggleTheme, openAnalytics }: QuickActionsMenuProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions: Action[] = [
    { id: 'home', label: 'Go to Home', icon: Home, shortcut: 'H', action: () => navigate('/'), category: 'navigation' },
    { id: 'projects', label: 'Go to Projects', icon: FolderOpen, shortcut: 'P', action: () => navigate('/projects'), category: 'navigation' },
    { id: 'notes', label: 'Go to Notes', icon: FileText, shortcut: 'N', action: () => navigate('/notes'), category: 'navigation' },
    { id: 'hardware', label: 'Go to Hardware', icon: FolderOpen, shortcut: 'W', action: () => navigate('/hardware'), category: 'navigation' },
    { id: 'contact', label: 'Go to Contact', icon: Mail, shortcut: 'C', action: () => navigate('/contact'), category: 'navigation' },
    { id: 'theme', label: 'Toggle Theme', icon: Moon, shortcut: 'T', action: toggleTheme, category: 'actions' },
    { id: 'analytics', label: 'View Analytics', icon: BarChart3, shortcut: 'A', action: openAnalytics || (() => {}), category: 'actions' },
    { id: 'github', label: 'GitHub Profile', icon: Github, shortcut: 'G', action: () => window.open('https://github.com/Je0Dev', '_blank'), category: 'social' },
    { id: 'linkedin', label: 'LinkedIn Profile', icon: Linkedin, shortcut: 'L', action: () => window.open('https://www.linkedin.com/in/geomas/', '_blank'), category: 'social' },
  ];

  const filteredActions = actions.filter(action => action.label.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (!isOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          const event = new CustomEvent('open-quick-actions');
          window.dispatchEvent(event);
        }
      }
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredActions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredActions[selectedIndex]) {
        e.preventDefault();
        filteredActions[selectedIndex].action();
        onClose();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  const groupedActions = {
    navigation: filteredActions.filter(a => a.category === 'navigation'),
    actions: filteredActions.filter(a => a.category === 'actions'),
    social: filteredActions.filter(a => a.category === 'social'),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4" onClick={onClose}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.95, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: -20 }} onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-lg rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b-2 border-[var(--border-color)]">
              <Search size={20} className="text-[var(--text-color)] opacity-50" />
              <input autoFocus type="text" value={search} onChange={(e) => { setSearch(e.target.value); setSelectedIndex(0); }} placeholder="Search actions..." 
                className="flex-1 bg-transparent text-[var(--text-color)] text-lg font-medium outline-none placeholder:text-[var(--text-color)]/50" />
              <div className="flex items-center gap-1 px-2 py-1 bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded text-xs font-mono text-[var(--text-color)] opacity-60">
                <Command size={12} />K
              </div>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {Object.entries(groupedActions).map(([category, categoryActions]) => (
                categoryActions.length > 0 && (
                  <div key={category} className="mb-2">
                    <p className="px-3 py-2 text-xs font-bold text-[var(--text-color)] opacity-50 uppercase tracking-wider">{category}</p>
                    {categoryActions.map((action) => {
                      const globalIndex = filteredActions.indexOf(action);
                      return (
                        <button key={action.id} onClick={() => { action.action(); onClose(); }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${globalIndex === selectedIndex ? 'bg-[var(--text-color)] text-[var(--bg-color)]' : 'hover:bg-[var(--bg-color)] text-[var(--text-color)]'}`}>
                          <action.icon size={18} className={globalIndex === selectedIndex ? 'text-[var(--accent-pink)]' : ''} />
                          <span className="flex-1 font-medium">{action.label}</span>
                          {action.shortcut && (
                            <span className={`text-xs font-mono px-2 py-0.5 rounded ${globalIndex === selectedIndex ? 'bg-[var(--accent-pink)] text-white' : 'bg-[var(--bg-color)] border border-[var(--border-color)]'}`}>
                              {action.shortcut}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )
              ))}
              {filteredActions.length === 0 && (
                <div className="text-center py-8 text-[var(--text-color)] opacity-50">No actions found</div>
              )}
            </div>

            <div className="flex items-center justify-between px-4 py-2 border-t-2 border-[var(--border-color)] bg-[var(--bg-color)]">
              <div className="flex items-center gap-2 text-xs text-[var(--text-color)] opacity-50">
                <span>↑↓ Navigate</span>
                <span>•</span>
                <span>↵ Select</span>
                <span>•</span>
                <span>ESC Close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}