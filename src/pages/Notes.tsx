import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, ChevronRight, Search, Tag, X, FileText, Lightbulb, ExternalLink } from 'lucide-react';
import { notesData, Note } from '../data/notesData';
import { Breadcrumb } from '../components/Breadcrumb';
import { CodeBlock } from '../components/CodeBlock';
import { useLanguage } from '../LanguageContext';
import { OldBookIllustration, DecorativeDivider } from '../components/OldBookIllustration';

export function Notes({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Article' | 'Thought'>('All');
  const [readingProgress, setReadingProgress] = useState(0);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const loadMore = () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 3, notesData.length));
      setIsLoading(false);
    }, 500);
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    notesData.forEach(n => n.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags).sort()];
  }, []);

  const filteredNotes = notesData.filter(note => {
    if (searchQuery === '') return activeCategory === 'All' || note.type === activeCategory;
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const matchesSearch = regex.test(note.title.toLowerCase()) || regex.test(note.excerpt.toLowerCase()) || note.tags.some(t => regex.test(t.toLowerCase()));
    const matchesTag = selectedTags.length === 0 || selectedTags.some(tag => note.tags.includes(tag));
    const matchesCategory = activeCategory === 'All' || note.type === activeCategory;
    return matchesSearch && matchesTag && matchesCategory;
  });

  const displayedNotes = filteredNotes.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNotes.length;

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => regex.test(part) ? <mark key={i} className="bg-[var(--accent-yellow)] text-[var(--text-color)] px-1 rounded">{part}</mark> : part);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="max-w-4xl space-y-20">
      <motion.div className="fixed top-0 left-0 h-1 z-[200]" style={{ width: `${readingProgress}%`, background: readingProgress < 33 ? 'var(--accent-pink)' : readingProgress < 66 ? 'var(--accent-cyan)' : 'var(--accent-yellow)' }} />
      <section className="space-y-12">
        <header className="space-y-4">
          <Breadcrumb items={[{ label: t.notes.title }]} />
          <div className="flex items-center gap-6">
            <OldBookIllustration variant="books" size={80} className="hidden sm:block" />
            <div>
              <h1 className="text-5xl sm:text-7xl font-display font-black text-[var(--text-color)] tracking-tighter uppercase"><span className="doodle-underline">{t.notes.title.split(' ')[0]}</span> & <span className="doodle-highlight">{t.notes.title.split(' ')[1]}</span></h1>
              <p className="text-xl text-[var(--text-color)] opacity-80 font-medium max-w-2xl">{t.notes.subtitle}</p>
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-6 bg-[var(--card-bg)] p-6 rounded-2xl border-4 border-[var(--border-color)] brutal-shadow">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 w-full md:w-auto bg-[var(--bg-color)] p-1 rounded-xl border-2 border-[var(--border-color)]">
              {(['All', 'Article', 'Thought'] as const).map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all ${activeCategory === cat ? 'bg-[var(--text-color)] text-[var(--bg-color)] brutal-shadow' : 'text-[var(--text-color)] hover:bg-[var(--border-color)] hover:text-[var(--bg-color)]'}`}>
                  {cat === 'Article' && <FileText size={16} />}{cat === 'Thought' && <Lightbulb size={16} />}{cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-color)] opacity-50" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.notes.search} className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] text-sm" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.filter(t => t !== 'All').map(tag => (
              <motion.button key={tag} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                className={`px-3 py-1 text-xs font-bold font-mono text-[var(--text-color)] bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-md uppercase cursor-pointer transition-colors ${selectedTags.includes(tag) ? 'bg-[var(--text-color)] text-[var(--bg-color)]' : 'hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]'}`}>
                {tag}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {displayedNotes.map((note, index) => (
              <motion.article layout key={note.title} initial={{ opacity: 0, x: -20, y: 20 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: "-50px" }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedNote(note)}
                className="group block p-6 md:p-8 rounded-2xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-hover transition-all duration-300 relative overflow-hidden cursor-pointer">
                <div className={`absolute top-0 left-0 w-4 h-full ${note.color} border-r-4 border-[var(--border-color)] group-hover:w-6 transition-all duration-300`} />
                <div className="block pl-6">
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--text-color)] font-bold font-mono mb-4 uppercase">
                    <div className="flex items-center gap-2 bg-[var(--bg-color)] px-3 py-1 rounded border-2 border-[var(--border-color)]">{note.type === 'Article' ? <FileText size={16} /> : <Lightbulb size={16} />}<span>{note.type}</span></div>
                    <div className="flex items-center gap-2 bg-[var(--bg-color)] px-3 py-1 rounded border-2 border-[var(--border-color)]"><Calendar size={16} /><span>{note.date}</span></div>
                    <div className="flex items-center gap-2 bg-[var(--bg-color)] px-3 py-1 rounded border-2 border-[var(--border-color)]"><Clock size={16} /><span>{note.readTime}</span></div>
                  </div>
                  <h2 className="text-3xl font-display font-black text-[var(--text-color)] group-hover:underline decoration-4 underline-offset-4 mb-4 leading-tight">{highlightText(note.title, searchQuery)}</h2>
                  <p className="text-[var(--text-color)] opacity-80 font-medium text-lg leading-relaxed mb-6 max-w-2xl">{highlightText(note.excerpt, searchQuery)}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {note.tags.map(tag => (
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} key={tag} onClick={(e) => { e.stopPropagation(); setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]); }}
                        className="px-3 py-1 text-xs font-bold font-mono text-[var(--text-color)] bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-md uppercase hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-colors cursor-pointer">
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-lg font-black text-[var(--text-color)] uppercase tracking-wide group-hover:translate-x-4 transition-transform duration-300">
                    <span className="border-b-4 border-[var(--text-color)]">{t.notes.readMore} {note.type}</span>
                    <ChevronRight size={24} strokeWidth={3} className="group-hover:text-[var(--accent-pink)] transition-colors" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
          
          {hasMore && (
            <div className="flex justify-center">
              <motion.button
                onClick={loadMore}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-[var(--text-color)] text-[var(--bg-color)] font-black uppercase tracking-widest border-4 border-[var(--border-color)] rounded-xl brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-[var(--bg-color)] border-t-transparent rounded-full" />
                    Loading...
                  </span>
                ) : (
                  `Load More (${filteredNotes.length - visibleCount})`
                )}
              </motion.button>
            </div>
          )}

          {filteredNotes.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-2xl border-dashed">
              <p className="text-3xl font-display font-black text-[var(--text-color)] mb-4">Nothing found 😔</p>
              <p className="text-[var(--text-color)] opacity-80 font-medium text-lg">Try adjusting your search query.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedTags([]); setActiveCategory('All'); }} className="mt-6 px-8 py-3 bg-[var(--accent-pink)] text-white font-black uppercase tracking-widest border-4 border-[var(--border-color)] rounded-xl brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">Reset Filters</button>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedNote && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto" onClick={() => setSelectedNote(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} onClick={(e) => e.stopPropagation()} 
              className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-3xl brutal-shadow-lg max-w-3xl w-full p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-12 rounded ${selectedNote.color}`} />
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-black text-[var(--text-color)]">{selectedNote.title}</h2>
                    <div className="flex items-center gap-4 text-sm font-mono text-[var(--text-color)] opacity-60 mt-2">
                      <span>{selectedNote.date}</span>
                      <span>•</span>
                      <span>{selectedNote.readTime}</span>
                      <span>•</span>
                      <span>{selectedNote.type}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedNote(null)} className="p-2 bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-lg text-[var(--text-color)] hover:bg-[var(--accent-pink)] hover:text-white transition-colors shrink-0"><X size={20} /></button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedNote.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-bold font-mono text-[var(--text-color)] bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-md uppercase">{tag}</span>
                ))}
              </div>

              <div className="prose prose-lg max-w-none text-[var(--text-color)] opacity-80 mb-8 whitespace-pre-wrap">{selectedNote.content}</div>

              {selectedNote.codeSnippets && selectedNote.codeSnippets.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-display font-black text-[var(--text-color)] uppercase mb-4">Code Examples</h3>
                  {selectedNote.codeSnippets.map((snippet, idx) => (
                    <CodeBlock key={idx} code={snippet.code} language={snippet.language} />
                  ))}
                </div>
              )}

              {selectedNote.relatedProjects && selectedNote.relatedProjects.length > 0 && (
                <div className="pt-6 border-t-2 border-[var(--border-color)]">
                  <h3 className="text-sm font-bold text-[var(--text-color)] opacity-60 uppercase tracking-wider mb-4">Related Projects</h3>
                  <div className="space-y-2">
                    {selectedNote.relatedProjects.map((proj, idx) => (
                      <a key={idx} href={proj.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:border-[var(--accent-cyan)] transition-colors group">
                        <span className="font-bold text-[var(--text-color)] text-sm">{proj.title}</span>
                        <ExternalLink size={16} className="text-[var(--text-color)] opacity-50 group-hover:text-[var(--accent-cyan)]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}