import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ExternalLink, FileText, Code, BookOpen, Home, ChevronRight, Clock, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../SearchContext';
import { useState, useEffect, useRef } from 'react';

export function SearchModal() {
  const { isOpen, closeSearch, query, setQuery, results, searchHistory, addToHistory, clearHistory } = useSearch();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const resultRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  useEffect(() => {
    if (resultRefs.current[selectedIndex]) {
      resultRefs.current[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const handleSelect = (url: string) => {
    addToHistory(query);
    navigate(url);
    closeSearch();
  };

  const handleHistoryClick = (term: string) => {
    setQuery(term);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0 && searchHistory.length === 0) return;
    
    const totalItems = query ? results.length : searchHistory.length;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % totalItems);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(results[selectedIndex].url);
    }
  };

  const getBreadcrumb = (url: string, title: string) => {
    if (url === '/') return 'Home';
    if (url === '/projects') return 'Projects';
    if (url === '/hardware') return 'Hardware';
    if (url === '/notes') return 'Notes';
    if (url === '/contact') return 'Contact';
    return 'Projects';
  };

  const highlightMatch = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;
    try {
      const regex = new RegExp(`(${searchQuery})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, i) => 
        regex.test(part) ? <mark key={i} className="bg-[var(--accent-yellow)] text-[#111] px-0.5 rounded">{part}</mark> : part
      );
    } catch {
      return text;
    }
  };

  const typeIcons = {
    project: Code,
    note: FileText,
    skill: BookOpen,
    page: Home,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-start justify-center pt-[10vh] px-4"
          onClick={closeSearch}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-lg rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b-4 border-[var(--border-color)]">
              <Search size={24} className="text-[var(--accent-cyan)] shrink-0" />
              <input
                type="text"
                placeholder="Search projects, notes, skills..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-1 bg-transparent text-[var(--text-color)] text-lg font-bold placeholder-[var(--text-color)]/50 outline-none"
              />
              <button
                onClick={closeSearch}
                className="p-2 rounded-lg bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:bg-[var(--accent-pink)] hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {results.length === 0 && query && (
                <div className="p-8 text-center">
                  <p className="text-[var(--text-color)] opacity-60">No results found for "{query}"</p>
                  <p className="text-sm text-[var(--text-color)] opacity-40 mt-2">Try different keywords or regex patterns</p>
                </div>
              )}
              
              {results.length > 0 && (
                <div className="p-2">
                  {results.map((result, index) => {
                    const Icon = typeIcons[result.type];
                    const breadcrumb = getBreadcrumb(result.url, result.title);
                    const isSelected = index === selectedIndex;
                    return (
                      <motion.button
                        key={result.id}
                        ref={(el) => { resultRefs.current[index] = el; }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(result.url)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left group ${
                          isSelected 
                            ? 'bg-[var(--accent-cyan)]/20 border-[var(--accent-cyan)]' 
                            : 'hover:bg-[var(--bg-color)] border-transparent hover:border-[var(--border-color)]'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          result.type === 'project' ? 'bg-[var(--accent-cyan)]' :
                          result.type === 'note' ? 'bg-[var(--accent-purple)]' :
                          result.type === 'skill' ? 'bg-[var(--accent-green)]' :
                          'bg-[var(--accent-pink)]'
                        } text-[#111] shrink-0`}>
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 text-xs text-[var(--text-color)] opacity-50 mb-1">
                            <span>{breadcrumb}</span>
                            <ChevronRight size={12} />
                            <span>{result.title}</span>
                          </div>
                          <h4 className={`font-bold truncate transition-colors ${isSelected ? 'text-[var(--accent-cyan)]' : 'text-[var(--text-color)] group-hover:text-[var(--accent-cyan)]'}`}>
                            {highlightMatch(result.title, query)}
                          </h4>
                          <p className="text-sm text-[var(--text-color)] opacity-60 truncate">
                            {highlightMatch(result.description, query)}
                          </p>
                        </div>
                        <ExternalLink size={16} className={`transition-opacity shrink-0 ${isSelected ? 'text-[var(--accent-cyan)] opacity-100' : 'text-[var(--text-color)] opacity-30 group-hover:opacity-100'}`} />
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {!query && searchHistory.length > 0 && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-bold text-[var(--text-color)] opacity-60 uppercase tracking-wider flex items-center gap-2">
                      <Clock size={14} />
                      Recent Searches
                    </p>
                    <button onClick={clearHistory} className="text-xs text-[var(--accent-pink)] hover:underline flex items-center gap-1">
                      <Trash2 size={12} />
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {searchHistory.map((term, index) => (
                      <button
                        key={term}
                        onClick={() => handleHistoryClick(term)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          index === selectedIndex
                            ? 'bg-[var(--accent-cyan)]/20 border-2 border-[var(--accent-cyan)]'
                            : 'hover:bg-[var(--bg-color)] border-2 border-transparent hover:border-[var(--border-color)]'
                        }`}
                      >
                        <Clock size={16} className="text-[var(--text-color)] opacity-50" />
                        <span className="text-[var(--text-color)] font-medium">{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!query && searchHistory.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-[var(--text-color)] opacity-60">Start typing to search...</p>
                  <p className="text-sm text-[var(--text-color)] opacity-40 mt-2">
                    Try "python", "notes", "hardware" or regex like "py.*"
                  </p>
                </div>
              )}
            </div>

            <div className="p-3 border-t-4 border-[var(--border-color)] bg-[var(--bg-color)] flex items-center justify-between text-xs font-mono text-[var(--text-color)] opacity-60">
              <span>Press <kbd className="px-2 py-1 rounded bg-[var(--card-bg)] border border-[var(--border-color)]">Esc</kbd> to close</span>
              <span>Regex supported</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
