import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, ChevronRight, Search, Send, MessageSquare, Tag, X, FileText, Lightbulb } from 'lucide-react';

export function Notes() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState('All');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Article' | 'Thought'>('All');

  const notes = [
     {
      title: 'Demystifying C-Pointers',
      date: 'March 26, 2026',
       readTime: '1 min read',
      type: 'Article' as const,
      tags: ['C', 'Programming', 'Memory'],
     excerpt: 'Finally understanding pointers in C.',
      content: 'Pointers are often cited as the most confusing part of the language. At their core, they are just variables that store memory addresses.\n\n Just Imagine memory as a massive array of mailboxes, each with a unique number. A pointer simply holds the number of a specific mailbox (`pointing` to the corresponding unique number).\n\nWhen you use the symbol `*` (dereferencing operator), you are opening the mailbox and looking at its contents (so you basically now have full access to the contents-data). Similary, using the symbol `&` , you are finding the address of the variable (that you want to get access to). So, always remember that a pointer likes knowing `where` something lives, and through him you can change the `contents` of that place',
       slug: '#',
       color: 'bg-[var(--accent-green)]'
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
      color: 'bg-[var(--accent-purple)]'
    },
  ];

  const [selectedNote, setSelectedNote] = useState<typeof notes[0] | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    notes.forEach(n => n.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags).sort()];
  }, [notes]);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = filterTag === 'All' || note.tags.includes(filterTag);
    const matchesCategory = activeCategory === 'All' || note.type === activeCategory;
    return matchesSearch && matchesTag && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl space-y-20"
    >
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
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-bold border-2 border-[var(--border-color)] transition-all ${
                  filterTag === tag 
                    ? 'bg-[var(--text-color)] text-[var(--bg-color)] brutal-shadow translate-x-[-2px] translate-y-[-2px]' 
                    : 'bg-[var(--bg-color)] text-[var(--text-color)] hover:bg-[var(--border-color)] hover:text-[var(--bg-color)]'
                }`}
              >
                {tag}
              </button>
            ))}
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
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-[var(--text-color)] font-bold font-mono mb-4 uppercase">
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
                    {note.title}
                  </h2>
                  <p className="text-[var(--text-color)] opacity-80 font-medium text-lg leading-relaxed mb-6 max-w-2xl">
                    {note.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {note.tags.map(tag => (
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        key={tag} 
                        onClick={(e) => { e.stopPropagation(); setFilterTag(tag); }}
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
                onClick={() => { setSearchQuery(''); setFilterTag('All'); setActiveCategory('All'); }}
                className="mt-6 px-8 py-3 bg-[var(--accent-pink)] text-white font-black uppercase tracking-widest border-4 border-[var(--border-color)] rounded-xl brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedNote(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-2xl brutal-shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col"
            >
              <div className={`h-4 w-full ${selectedNote.color} border-b-4 border-[var(--border-color)] shrink-0`} />
              
              <button 
                onClick={() => setSelectedNote(null)}
                className="absolute top-8 right-8 p-2 bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-full text-[var(--text-color)] hover:bg-[var(--accent-pink)] hover:text-white transition-colors z-20 brutal-shadow"
              >
                <X size={24} />
              </button>
              
              <div className="p-8 sm:p-12 space-y-8">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-color)] font-bold font-mono uppercase">
                    <div className="flex items-center gap-2 bg-[var(--bg-color)] px-3 py-1 rounded border-2 border-[var(--border-color)]">
                      {selectedNote.type === 'Article' ? <FileText size={16} /> : <Lightbulb size={16} />}
                      <span>{selectedNote.type}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[var(--bg-color)] px-3 py-1 rounded border-2 border-[var(--border-color)]">
                      <Calendar size={16} />
                      <span>{selectedNote.date}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-[var(--bg-color)] px-3 py-1 rounded border-2 border-[var(--border-color)]">
                      <Clock size={16} />
                      <span>{selectedNote.readTime}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-4xl sm:text-6xl font-display font-black text-[var(--text-color)] uppercase leading-tight">
                    {selectedNote.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedNote.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-bold font-mono text-[var(--text-color)] bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-md uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="h-1 w-full bg-[var(--border-color)]" />
                
                <div className="prose prose-lg dark:prose-invert max-w-none text-[var(--text-color)] font-medium leading-relaxed space-y-6">
                  {selectedNote.content.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
