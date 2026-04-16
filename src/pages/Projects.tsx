import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Search, Filter, X, Code2, Star, Calendar, Copy } from 'lucide-react';
import { useToast } from '../components/Toast';
import { useLanguage } from '../LanguageContext';

interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  links: { github: string; demo: string };
  color: string;
  image: string;
  featured: boolean;
  stats: { stars: number; forks: number };
}

export function Projects({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const { t } = useLanguage();

  const toggleTag = (tag: string) => {
    if (tag === 'All') {
      setSelectedTags([]);
    } else {
      setSelectedTags(prev => 
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
      );
    }
  };

  const projects: Project[] = [
    {
      title: 'IMDb Clone Desktop App',
      year: '2025',
      description: 'A fully functional desktop application replicating IMDb functionality with local database storage, user authentication, and movie rating features.',
      tags: ['Java', 'JavaFX', 'Maven', 'SQLite', 'Git'],
      links: { github: 'https://github.com/Je0Dev/ImdbCloneApp', demo: '' },
      color: 'bg-[var(--accent-pink)]',
      image: '/movies1.gif',
      featured: true,
      stats: { stars: 1, forks: 0 }
    },
    {
      title: 'CLI ATM System',
      year: '2025-2026',
      description: 'Command-line banking simulation with account management, transaction history, and PIN authentication system.',
      tags: ['C', 'Makefile', 'Git', 'Linux'],
      links: { github: 'https://github.com/Je0Dev/cli_atm_system', demo: '' },
      color: 'bg-[var(--accent-cyan)]',
      image: '/atm1.gif',
      featured: true,
      stats: { stars: 1, forks: 0 }
    },
    {
      title: 'Lang Website',
      year: '2026',
      description: 'A language learning platform built with modern web technologies. Interactive lessons and progress tracking.',
      tags: ['TypeScript', 'React', 'Web Dev', 'Git'],
      links: { github: 'https://github.com/Je0Dev/lang_website', demo: '' },
      color: 'bg-[var(--accent-purple)]',
      image: '/lang1.gif',
      featured: true,
      stats: { stars: 1, forks: 0 }
    },
    {
      title: 'Personal Website',
      year: '2026',
      description: 'This portfolio website! Built with React, TypeScript, and modern web technologies with 3D elements and i18n.',
      tags: ['TypeScript', 'React', 'Three.js', 'Web Dev'],
      links: { github: 'https://github.com/Je0Dev/personal_website', demo: '' },
      color: 'bg-[var(--accent-pink)]',
      image: '/gif1.gif',
      featured: true,
      stats: { stars: 1, forks: 0 }
    },
    {
      title: 'Neon Vault Web Game',
      year: '2026',
      description: 'A cyberpunk-themed web-based puzzle game with neon aesthetics. Navigate through vault challenges.',
      tags: ['JavaScript', 'HTML/CSS', 'Game Dev', 'Git'],
      links: { github: 'https://github.com/Je0Dev/neon_vault_web_game_javascript', demo: '' },
      color: 'bg-[var(--accent-green)]',
      image: '/neon1.gif',
      featured: false,
      stats: { stars: 0, forks: 0 }
    },
    {
      title: 'Echoes: Fallen Kingdom',
      year: '2026',
      description: 'A text-based adventure RPG set in a fallen kingdom. Explore, battle, and uncover ancient secrets.',
      tags: ['Python', 'Game Dev', 'CLI', 'Git'],
      links: { github: 'https://github.com/Je0Dev/echoes_fallen_kingdom_game_python', demo: '' },
      color: 'bg-[var(--accent-yellow)]',
      image: '/echoes1.gif',
      featured: false,
      stats: { stars: 0, forks: 0 }
    },
    {
      title: 'ESP32 Timer Sensor',
      year: '2025',
      description: 'Off-board timer sensor system using ESP32. Temperature monitoring with wireless data transmission.',
      tags: ['C++', 'ESP32', 'IoT', 'Sensors', 'Git'],
      links: { github: 'https://github.com/Je0Dev/esp32OffboardTimerSensor', demo: '' },
      color: 'bg-[var(--accent-cyan)]',
      image: '/esp1.gif',
      featured: false,
      stats: { stars: 1, forks: 0 }
    },
    {
      title: 'CLI Task Manager',
      year: '2026',
      description: 'Terminal-based task management system with priority levels, categories, and persistent storage.',
      tags: ['C', 'Makefile', 'Git', 'Data Structures'],
      links: { github: 'https://github.com/Je0Dev/cli_task_manager_system', demo: '' },
      color: 'bg-[var(--accent-yellow)]',
      image: '/todo1.gif',
      featured: false,
      stats: { stars: 1, forks: 0 }
    },
    {
      title: 'Student Database System',
      year: '2023',
      description: 'Engineering department management system with CRUD operations, search functionality, and report generation.',
      tags: ['C', 'Makefile', 'Git', 'File I/O'],
      links: { github: 'https://github.com/Je0Dev/cli_student_database_management_system', demo: '' },
      color: 'bg-[var(--accent-green)]',
      image: '/db1.gif',
      featured: false,
      stats: { stars: 1, forks: 0 }
    },
    {
      title: 'Mini Docker Git',
      year: '2025',
      description: 'Lightweight Docker container management tool for Git repositories. Simplified containerization workflow.',
      tags: ['C', 'Docker', 'Git', 'DevOps'],
      links: { github: 'https://github.com/Je0Dev/mini_docker_git', demo: '' },
      color: 'bg-[var(--accent-cyan)]',
      image: '/gif2.gif',
      featured: false,
      stats: { stars: 0, forks: 0 }
    },
    {
      title: 'Translation Game',
      year: '2025',
      description: 'Interactive language learning game with translations. Learn vocabulary through fun challenges.',
      tags: ['TypeScript', 'React', 'Game Dev', 'i18n'],
      links: { github: 'https://github.com/Je0Dev/translation_game', demo: '' },
      color: 'bg-[var(--accent-purple)]',
      image: '/learn1.gif',
      featured: false,
      stats: { stars: 0, forks: 0 }
    },
    {
      title: 'ECE Blog',
      year: '2025',
      description: 'Blog platform for ECE students. Share notes, projects, and experiences.',
      tags: ['TypeScript', 'React', 'Web Dev', 'Blog'],
      links: { github: 'https://github.com/Je0Dev/ece_blog', demo: '' },
      color: 'bg-[var(--accent-green)]',
      image: '/gif1.gif',
      featured: false,
      stats: { stars: 0, forks: 0 }
    },
    {
      title: 'GIF Memer Bot',
      year: '2024',
      description: 'Discord bot for creating and sharing GIF memes. Automated meme generation.',
      tags: ['Python', 'Discord', 'Bot', 'API'],
      links: { github: 'https://github.com/Je0Dev/gif_memer_bot_discord', demo: '' },
      color: 'bg-[var(--accent-yellow)]',
      image: '/movies1.gif',
      featured: false,
      stats: { stars: 0, forks: 0 }
    },
    {
      title: 'German Vocab Extractor',
      year: '2024',
      description: 'Tools for extracting and organizing German vocabulary. Language learning assistant.',
      tags: ['Python', 'NLP', 'Language'],
      links: { github: 'https://github.com/Je0Dev/german_vocab_extractor', demo: '' },
      color: 'bg-[var(--accent-pink)]',
      image: '/learn1.gif',
      featured: false,
      stats: { stars: 0, forks: 0 }
    },
    {
      title: 'German Bible Grammatik',
      year: '2024',
      description: 'LaTeX-based German grammar textbook. Educational resource for learners.',
      tags: ['TeX', 'LaTeX', 'Education'],
      links: { github: 'https://github.com/Je0Dev/german_bible_grammatik', demo: '' },
      color: 'bg-[var(--accent-cyan)]',
      image: '/learn1.gif',
      featured: false,
      stats: { stars: 0, forks: 0 }
    },
  ];

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags).sort()];
  }, [projects]);

  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedTags.length === 0 || selectedTags.some(tag => project.tags.includes(tag));
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const loadMore = () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 4, filteredProjects.length));
      setIsLoading(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-6xl space-y-12"
    >
      <header className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-[var(--text-color)] tracking-tight uppercase">
            {t.projects.title}
          </h1>
          <span className="text-[var(--text-color)] opacity-60 font-mono text-sm">
            {projects.length} {t.stats.projectsLabel.toLowerCase()}
          </span>
        </div>
        <p className="text-xl text-[var(--text-color)] opacity-70 font-medium max-w-2xl leading-relaxed">
          {t.projects.subtitle}
        </p>
      </header>

      <div className="flex flex-col gap-6 bg-[var(--card-bg)] p-6 rounded-3xl border-4 border-[var(--border-color)] brutal-shadow transition-colors">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 text-[var(--text-color)] font-bold uppercase tracking-widest">
            <div className="p-2 bg-[var(--accent-cyan)] rounded-lg">
              <Filter size={20} className="text-white" />
            </div>
            <span>{t.projects.filter}</span>
          </div>
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-color)] opacity-50 group-focus-within:opacity-100 transition-opacity" size={20} />
            <input 
              type="text"
              placeholder={t.projects.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] font-medium focus:outline-none focus:ring-4 focus:ring-[var(--accent-pink)]/30 placeholder-[var(--text-color)] placeholder-opacity-50 transition-all"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag, i) => {
            const colors = ['bg-[var(--accent-pink)]', 'bg-[var(--accent-cyan)]', 'bg-[var(--accent-yellow)]', 'bg-[var(--accent-purple)]', 'bg-[var(--accent-green)]', 'bg-[var(--accent-orange)]', 'bg-[var(--accent-red)]', 'bg-[var(--accent-violet)]'];
            const isSelected = (tag === 'All' && selectedTags.length === 0) || selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold border-2 border-[var(--border-color)] transition-all ${
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {displayedProjects.map((project, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col justify-between rounded-3xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-hover transition-all duration-300 relative overflow-hidden cursor-pointer"
            >
              {project.featured && (
                <div className="absolute top-4 left-4 z-20">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--accent-yellow)] text-[#111] text-xs font-bold uppercase tracking-wider rounded-full border-2 border-[var(--border-color)]">
                    <Star size={12} fill="currentColor" />
                    {t.projects.featured}
                  </span>
                </div>
              )}
              
              <div className="relative h-48 sm:h-56 w-full overflow-hidden border-b-4 border-[var(--border-color)]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-[var(--border-color)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`absolute top-0 right-0 w-20 h-20 ${project.color} rounded-bl-full border-b-4 border-l-4 border-[var(--border-color)] z-10 group-hover:scale-125 transition-transform duration-500`} />
              </div>
              
              <div className="p-6 space-y-4 relative z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-2">
                    <Code2 size={18} className="text-[var(--accent-cyan)]" />
                    <span className="text-xs font-bold font-mono text-[var(--text-color)] opacity-60 uppercase tracking-wider">
                      {project.tags[0]}
                    </span>
                  </div>
                  <span className="text-xs font-bold font-mono text-[var(--bg-color)] bg-[var(--text-color)] px-3 py-1.5 rounded-lg border-2 border-[var(--border-color)]">
                    {project.year}
                  </span>
                </div>
                <h3 className="text-2xl font-display font-black text-[var(--text-color)] group-hover:underline decoration-4 underline-offset-4 leading-tight">
                  {project.title}
                </h3>
                <p className="text-[var(--text-color)] opacity-70 font-medium leading-relaxed flex-1 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.slice(0, 4).map((tag, idx) => {
                    const isSelected = selectedTags.includes(tag);
                    const colors = ['bg-[var(--accent-pink)]', 'bg-[var(--accent-cyan)]', 'bg-[var(--accent-yellow)]', 'bg-[var(--accent-purple)]', 'bg-[var(--accent-green)]', 'bg-[var(--accent-orange)]', 'bg-[var(--accent-red)]', 'bg-[var(--accent-violet)]'];
                    const colorIndex = allTags.indexOf(tag) % colors.length;
                    return (
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        key={tag} 
                        onClick={(e) => { e.stopPropagation(); toggleTag(tag); }}
                        className={`px-3 py-1.5 text-xs font-bold font-mono border-2 border-[var(--border-color)] rounded-md uppercase transition-colors cursor-pointer ${
                          isSelected 
                            ? `${colors[colorIndex]} text-white` 
                            : 'text-[var(--text-color)] bg-[var(--bg-color)] hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]'
                        }`}
                      >
                        {tag}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between px-6 pb-6 pt-4 border-t-2 border-[var(--border-color)] relative z-10 bg-[var(--card-bg)]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs font-mono text-[var(--text-color)]">
                    <Star size={14} className="text-[var(--accent-yellow)]" />
                    <span>{project.stats.stars} {t.projects.stars}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-[var(--text-color)]">
                    <ExternalLink size={14} className="text-[var(--accent-cyan)]" />
                    <span>{project.stats.forks} {t.projects.forks}</span>
                  </div>
                </div>
                <a
                  href={project.links.github}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--text-color)] text-[var(--bg-color)] text-xs font-bold uppercase tracking-wider rounded-lg border-2 border-[var(--border-color)] hover:bg-[var(--accent-pink)] transition-colors"
                >
                  <Github size={14} />
                  <span className="hidden sm:inline">{t.projects.viewCode}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
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
              `Load More (${filteredProjects.length - visibleCount})`
            )}
          </motion.button>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-3xl border-dashed"
        >
          <p className="text-3xl font-display font-black text-[var(--text-color)] mb-4">{t.projects.noResults}</p>
          <button 
            onClick={() => { setSelectedTags([]); setSearchQuery(''); }}
            className="px-8 py-4 bg-[var(--accent-yellow)] text-[var(--text-color)] font-black uppercase tracking-widest border-4 border-[var(--border-color)] rounded-xl brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
          >
            {t.projects.reset}
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-3xl brutal-shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-3 bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-full text-[var(--text-color)] hover:bg-[var(--accent-pink)] hover:text-white transition-colors z-20 brutal-shadow"
              >
                <X size={24} />
              </button>
              
              <div className="h-72 sm:h-96 w-full border-b-4 border-[var(--border-color)] relative shrink-0">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-0 left-0 w-28 h-28 ${selectedProject.color} rounded-br-full border-b-4 border-r-4 border-[var(--border-color)] z-10`} />
              </div>
              
              <div className="p-8 sm:p-12 space-y-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--text-color)] uppercase leading-tight mb-2">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-color)] opacity-60">
                      <Calendar size={14} />
                      {selectedProject.year}
                    </div>
                  </div>
                  <span className="text-sm font-bold font-mono text-[var(--bg-color)] bg-[var(--text-color)] px-4 py-2 rounded-lg border-2 border-[var(--border-color)] shrink-0">
                    {selectedProject.year}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 text-sm font-bold font-mono text-[var(--text-color)] bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-lg uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="h-1 w-full bg-[var(--border-color)]" />
                
                <div className="text-[var(--text-color)] opacity-90 font-medium text-lg leading-relaxed space-y-6">
                  <p>{selectedProject.description}</p>
                  <p>
                    This project involved extensive research and development, focusing on optimizing performance and ensuring a seamless user experience. The architecture was designed to be scalable and maintainable, utilizing modern best practices and design patterns. Key challenges included implementing efficient data structures and creating an intuitive user interface.
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 pt-6 border-t-4 border-[var(--border-color)]">
                  {selectedProject.links.github && (
                    <div className="flex gap-2">
                      <a href={selectedProject.links.github} className="flex items-center gap-3 px-8 py-4 bg-[var(--text-color)] text-[var(--bg-color)] font-bold uppercase tracking-widest border-4 border-[var(--border-color)] rounded-xl brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">
                        <Github size={22} />
                        <span>View Code</span>
                      </a>
                      <button 
                        onClick={() => { navigator.clipboard.writeText(selectedProject.links.github); showToast('Link copied to clipboard!'); }}
                        className="p-4 bg-[var(--accent-yellow)] text-[#111] font-bold border-4 border-[var(--border-color)] rounded-xl brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
                      >
                        <Copy size={22} />
                      </button>
                    </div>
                  )}
                  {selectedProject.links.demo && (
                    <a href={selectedProject.links.demo} className="flex items-center gap-3 px-8 py-4 bg-[var(--accent-cyan)] text-[var(--text-color)] font-bold uppercase tracking-widest border-4 border-[var(--border-color)] rounded-xl brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">
                      <ExternalLink size={22} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}