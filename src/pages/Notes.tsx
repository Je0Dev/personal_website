import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, ChevronRight, Search, Send, MessageSquare, Tag, X, FileText, Lightbulb, Folder, ExternalLink } from 'lucide-react';

interface Note {
  title: string;
  date: string;
  readTime: string;
  type: 'Article' | 'Thought';
  tags: string[];
  excerpt: string;
  content: string;
  slug: string;
  color: string;
  relatedProjects?: { title: string; link: string }[];
}

export function Notes({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Article' | 'Thought'>('All');
  const [readingProgress, setReadingProgress] = useState(0);

  const notes: Note[] = [
     {
      title: 'Demystifying C-Pointers',
      date: 'March 26, 2026',
       readTime: '1 min read',
      type: 'Article' as const,
      tags: ['C', 'Programming', 'Memory'],
     excerpt: 'Finally understanding pointers in C.',
     content: 'Pointers are often cited as the most confusing part of the language. At their core, they are just variables that store memory addresses.\n\n Just Imagine memory as a massive array of mailboxes, each with a unique number. A pointer simply holds the number of a specific mailbox (`pointing` to the corresponding unique number).\n\nWhen you use the symbol `*` (dereferencing operator), you are opening the mailbox and looking at its contents (so you basically now have full access to the contents-data). Similary, using the symbol `&` , you are finding the address of the variable (that you want to get access to). So, always remember that a pointer likes knowing `where` something lives, and through him you can change the `contents` of that place',
     slug: '#',
     color: 'bg-[var(--accent-green)]',
     relatedProjects: [{ title: 'CLI ATM System', link: 'https://github.com/Je0Dev/cli_atm_system' }, { title: 'CLI Task Manager', link: 'https://github.com/Je0Dev/cli_task_manager_system' }, { title: 'Student Database System', link: 'https://github.com/Je0Dev/cli_student_database_management_system' }]
   },
    {
      title: 'My Journey',
      date: 'March 26, 2026',
      readTime: '1 min read',
      type: 'Thought' as const,
      tags: ['Life', 'Learning'],
      excerpt: 'A personal note to myself and everyone reading this.',
      content: 'Since I first started delving into the vast world of engineering after being accepted to the university where I am currently pursuing my bachelor\'s degree, I have been constantly learning new tools to bring my ideas to life and help others accomplish their goals.\n\n I enjoy improving in as many areas as I can, creating habits that help me better myself every day. The world is changing extremely fast and we can\'t revert time, so my advice is to cherish every moment. No matter what you are going through, stay on the path and keep pushing. Stay on the grind, but keep your side activities and hobbies alive while you\'re at it. I hope this note helps even one of you!',
      slug: '#',
      color: 'bg-[var(--accent-purple)]',
      relatedProjects: []
    },
  ];

  const [selectedNote, setSelectedNote] = useState<typeof notes[0] | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    notes.forEach(n => n.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags).sort()];
  }, [notes]);

  const filteredNotes = notes.filter(note => {
    if (searchQuery === '') return activeCategory === 'All' || note.type === activeCategory;
    
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    
    const matchesSearch = regex.test(note.title.toLowerCase()) || 
                          regex.test(note.excerpt.toLowerCase()) ||
                          note.tags.some(t => regex.test(t.toLowerCase()));
    const matchesTag = selectedTags.length === 0 || selectedTags.some(tag => note.tags.includes(tag));
    const matchesCategory = activeCategory === 'All' || note.type === activeCategory;
    return matchesSearch && matchesTag && matchesCategory;
  }).sort((a, b) => {
    if (activeCategory === 'All') return 0;
    const aMatch = a.type === activeCategory ? 0 : 1;
    const bMatch = b.type === activeCategory ? 0 : 1;
    return aMatch - bMatch;
  });

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) => 
      regex.test(part) ? <mark key={i} className="bg-[var(--accent-yellow)] text-[var(--text-color)] px-1 rounded">{part}</mark> : part
    );
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl space-y-20"
    >
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 z-[200]"
        style={{ 
          width: `${readingProgress}%`,
          background: readingProgress < 33 
            ? 'var(--accent-pink)' 
            : readingProgress < 66 
              ? 'var(--accent-cyan)' 
              : 'var(--accent-yellow)'
        }}
      />
      <section className="space-y-12">
        <header className="space-y-4">
          <h1 className="text-5xl sm:text-7xl font-display font-black text-[var(--text-color)] tracking-tighter uppercase">
            <span className="doodle-underline">Notes </span>& <span className="doodle-highlight">Thoughts</span>
          </h1>
          <p className="text-xl text-[var(--text-color)] opacity-80 font-medium max-w-2xl">
            A digital garden, where i like sharing some of my <span className="doodle-underline">discoveries</span>
          </p>
        </header>

        <div className="flex flex-col gap-6 bg-[var(--card-bg)] p-6 rounded-2xl border-4 border-[var(--border-color)] brutal-shadow transition-colors">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 w-full md:w-auto bg-[var(--bg-color)] p-1 rounded-xl border-2 border-[var(--border-color)]">
              {(['All', 'Article', 'Thought'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all ${
                    activeCategory === cat 
                      ? 'bg-[var(--text-color)] text-[var(--bg-color)] brutal-shadow' 
                      : 'text-[var(--text-color)] hover:bg-[var(--border-color)] hover:text-[var(--bg-color)]'
                  }`}
                >
                  {cat === 'Article' && <FileText size={16} />}
                  {cat === 'Thought' && <Lightbulb size={16} />}
                  <span>{cat}</span>
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-color)] opacity-50 group-focus-within:opacity-100 transition-opacity" size={20} />
              <input 
                type="text"
                placeholder="Search notes, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] font-bold focus:outline-none focus:ring-4 focus:ring-[var(--accent-yellow)] placeholder-[var(--text-color)] placeholder-opacity-50 transition-all"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full">
            <div className="flex items-center gap-2 text-[var(--text-color)] font-bold uppercase tracking-widest mr-2">
              <Tag size={16} />
              <span className="text-xs">Tags:</span>
            </div>
            {allTags.map((tag, i) => {
              const colors = ['bg-[var(--accent-pink)]', 'bg-[var(--accent-cyan)]', 'bg-[var(--accent-yellow)]', 'bg-[var(--accent-purple)]', 'bg-[var(--accent-green)]', 'bg-[var(--accent-orange)]'];
              const isSelected = tag === 'All' ? selectedTags.length === 0 : selectedTags.includes(tag);
              const noteWithTag = notes.find(n => n.tags.includes(tag) && (n.relatedProjects && n.relatedProjects.length > 0));
              const hasRelated = noteWithTag?.relatedProjects && noteWithTag.relatedProjects.length > 0;
              
              return (
                <button
                  key={tag}
                  onClick={() => {
                    if (tag === 'All') {
                      setSelectedTags([]);
                    } else {
                      setSelectedTags(prev => 
                        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                      );
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold border-2 border-[var(--border-color)] transition-all ${
                    isSelected
                      ? `${colors[i % colors.length]} text-white brutal-shadow translate-x-[-2px] translate-y-[-2px]` 
                      : 'bg-[var(--bg-color)] text-[var(--text-color)] hover:bg-[var(--border-color)] hover:text-[var(--bg-color)]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredNotes.map((note, index) => (
              <motion.article
                layout
                key={note.title}
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedNote(note)}
                className="group block p-6 md:p-8 rounded-2xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-hover transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                <div className={`absolute top-0 left-0 w-4 h-full ${note.color} border-r-4 border-[var(--border-color)] group-hover:w-6 transition-all duration-300`} />
                <div className="block pl-6">
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--text-color)] font-bold font-mono mb-4 uppercase">
                    <div className="flex items-center gap-2 bg-[var(--bg-color)] px-3 py-1 rounded border-2 border-[var(--border-color)]">
                      {note.type === 'Article' ? <FileText size={16} /> : <Lightbulb size={16} />}
                      <span>{note.type}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[var(--bg-color)] px-3 py-1 rounded border-2 border-[var(--border-color)]">
                      <Calendar size={16} />
                      <span>{note.date}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[var(--bg-color)] px-3 py-1 rounded border-2 border-[var(--border-color)]">
                      <Clock size={16} />
                      <span>{note.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-display font-black text-[var(--text-color)] group-hover:underline decoration-4 underline-offset-4 mb-4 leading-tight">
                    {highlightText(note.title, searchQuery)}
                  </h2>
                  <p className="text-[var(--text-color)] opacity-80 font-medium text-lg leading-relaxed mb-6 max-w-2xl">
                    {highlightText(note.excerpt, searchQuery)}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {note.tags.map(tag => (
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        key={tag} 
                        onClick={(e) => { e.stopPropagation(); setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]); }}
                        className="px-3 py-1 text-xs font-bold font-mono text-[var(--text-color)] bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-md uppercase hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-colors cursor-pointer"
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-lg font-black text-[var(--text-color)] uppercase tracking-wide group-hover:translate-x-4 transition-transform duration-300">
                    <span className="border-b-4 border-[var(--text-color)]">Read {note.type}</span>
                    <ChevronRight size={24} strokeWidth={3} className="group-hover:text-[var(--accent-pink)] transition-colors" />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
          
          {filteredNotes.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-2xl border-dashed"
            >
              <p className="text-3xl font-display font-black text-[var(--text-color)] mb-4">Nothing was found for this category 😔.</p>
              <p className="text-[var(--text-color)] opacity-80 font-medium text-lg">Try adjusting your search query.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedTags([]); setActiveCategory('All'); }}
                className="mt-6 px-8 py-3 bg-[var(--accent-pink)] text-white font-black uppercase tracking-widest border-4 border-[var(--border-color)] rounded-xl brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
