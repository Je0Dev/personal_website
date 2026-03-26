import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Search, Filter, X } from 'lucide-react';
import { desc } from 'motion/react-client';

export function Projects() {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const projects = [
    {
      title: 'GUI Imdb Clone',
      year: '2025',
      description: 'A local app clone of the famous IMDb website, built with Java as the backend and FXML as the frontend.',
      tags: ['Java','FXML', 'Maven','Git'],
      links: { github: 'https://github.com/Je0Dev/ImdbCloneApp', demo: 'not available' },
      color: 'bg-[var(--accent-pink)]',
      image: '/personal_website/movies1.gif'
    },
    {
      title: 'CLI Atm SystemTool',
      year: '2025-2026',
      description: 'A local app for simulating a basic ATM system, built with plain C as the backend and frontend',
      tags: ['C', 'Makefile', 'Git'],
      links: { github: 'https://github.com/Je0Dev/cli_atm_system' ,demo: 'not available'},
      color: 'bg-[var(--accent-cyan)]',
      image: '/personal_website/atm1.gif'
    },
    {
      title: 'CLI Task Manager SystemTool',
      year: '2026',
      description: 'Another local app for simulating a basic Task Manager system, built with plain C.',
      tags: ['C', 'Makefile', 'Git'],
      links: { github: 'https://github.com/Je0Dev/cli_task_manager_system', demo: 'not available' },
      color: 'bg-[var(--accent-yellow)]',
      image: '/personal_website/todo1.gif'
    },
    {
      title: 'CLI Student Database SystemTool',
      year: '2023',
      description: 'One more local app for simulating a basic Engineering Department system, built with plain C.',
      tags: ['C', 'Makefile', 'Git'],
      links: { github: 'https://github.com/Je0Dev/cli_student_database_management_system',demo: 'not available' },
      color: 'bg-[var(--accent-green)]',
      image: '/personal_website/db1.gif'
    },
  ];

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags).sort()];
  }, [projects]);

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'All' || project.tags.includes(filter);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-5xl space-y-12"
    >
      <header className="space-y-4">
        <h1 className="text-5xl sm:text-7xl font-display font-black text-[var(--text-color)] tracking-tighter uppercase">
          Personal <span className="doodle-highlight">Projects</span>
        </h1>
        <p className="text-xl text-[var(--text-color)] opacity-80 font-medium max-w-2xl">
          A collection of my software engineering work, ranging from <span className="doodle-highlight">low-level systems programming to full-stack applications</span>. Check my  <span className="doodle-circle">Github</span> for more
        </p>
      </header>

      <div className="flex flex-col gap-6 bg-[var(--card-bg)] p-6 rounded-2xl border-4 border-[var(--border-color)] brutal-shadow transition-colors">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 text-[var(--text-color)] font-bold uppercase tracking-widest w-full md:w-auto">
            <Filter size={20} />
            <span className="doodle-circle">Filtering</span>
          </div>
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-color)] opacity-50 group-focus-within:opacity-100 transition-opacity" size={20} />
            <input 
              type="text"
              placeholder="Search projects, descriptions ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] font-bold focus:outline-none focus:ring-4 focus:ring-[var(--accent-pink)] placeholder-[var(--text-color)] placeholder-opacity-50 transition-all"
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 w-full">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-bold border-2 border-[var(--border-color)] transition-all ${
                filter === tag 
                  ? 'bg-[var(--text-color)] text-[var(--bg-color)] brutal-shadow translate-x-[-2px] translate-y-[-2px]' 
                  : 'bg-[var(--bg-color)] text-[var(--text-color)] hover:bg-[var(--border-color)] hover:text-[var(--bg-color)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col justify-between rounded-2xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-hover transition-all duration-300 relative overflow-hidden cursor-pointer"
            >
              <div className="h-48 w-full border-b-4 border-[var(--border-color)] overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-0 right-0 w-16 h-16 ${project.color} rounded-bl-full border-b-4 border-l-4 border-[var(--border-color)] z-10 group-hover:scale-125 transition-transform duration-500`} />
              </div>
              
              <div className="p-6 space-y-4 relative z-10 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-display font-black text-[var(--text-color)] group-hover:underline decoration-4 underline-offset-4">{project.title}</h3>
                  <span className="text-xs font-bold font-mono text-[var(--bg-color)] bg-[var(--text-color)] px-2 py-1 rounded border-2 border-[var(--border-color)]">
                    {project.year}
                  </span>
                </div>
                <p className="text-[var(--text-color)] opacity-80 font-medium leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map(tag => (
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      key={tag} 
                      onClick={(e) => { e.stopPropagation(); setFilter(tag); }}
                      className="px-3 py-1 text-xs font-bold font-mono text-[var(--text-color)] bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-md uppercase hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-colors cursor-pointer"
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 px-6 pb-6 pt-4 border-t-2 border-[var(--border-color)] relative z-10 bg-[var(--card-bg)]">
                {project.links.github && (
                  <a href={project.links.github} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-[var(--text-color)] hover:text-[var(--accent-pink)] font-bold transition-colors">
                    <Github size={20} />
                    <span>Source</span>
                  </a>
                )}
                {project.links.demo && (
                  <a href={project.links.demo} onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-[var(--text-color)] hover:text-[var(--accent-cyan)] font-bold transition-colors">
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {filteredProjects.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-2xl border-dashed"
        >
          <p className="text-3xl font-display font-black text-[var(--text-color)] mb-4">No projects found.</p>
          <p className="text-[var(--text-color)] opacity-80 font-medium text-lg">Try adjusting your filters or search query.</p>
          <button 
            onClick={() => { setFilter('All'); setSearchQuery(''); }}
            className="mt-6 px-8 py-3 bg-[var(--accent-yellow)] text-[var(--text-color)] font-black uppercase tracking-widest border-4 border-[var(--border-color)] rounded-xl brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all"
          >
            Reset Filters
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-2xl brutal-shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-full text-[var(--text-color)] hover:bg-[var(--accent-pink)] hover:text-white transition-colors z-20 brutal-shadow"
              >
                <X size={24} />
              </button>
              
              <div className="h-64 sm:h-80 w-full border-b-4 border-[var(--border-color)] relative shrink-0">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-0 left-0 w-24 h-24 ${selectedProject.color} rounded-br-full border-b-4 border-r-4 border-[var(--border-color)] z-10`} />
              </div>
              
              <div className="p-6 sm:p-10 space-y-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <h2 className="text-4xl sm:text-5xl font-display font-black text-[var(--text-color)] uppercase leading-tight">{selectedProject.title}</h2>
                  <span className="text-sm font-bold font-mono text-[var(--bg-color)] bg-[var(--text-color)] px-3 py-1 rounded border-2 border-[var(--border-color)] shrink-0">
                    {selectedProject.year}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-xs font-bold font-mono text-[var(--text-color)] bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-md uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-[var(--text-color)] opacity-90 font-medium text-lg leading-relaxed space-y-4">
                  <p>{selectedProject.description}</p>
                  <p>This project involved extensive research and development, focusing on optimizing performance and ensuring a seamless user experience. The architecture was designed to be scalable and maintainable, utilizing modern best practices and design patterns.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 pt-6 border-t-4 border-[var(--border-color)]">
                  {selectedProject.links.github && (
                    <a href={selectedProject.links.github} className="flex items-center gap-2 px-6 py-3 bg-[var(--text-color)] text-[var(--bg-color)] font-bold uppercase tracking-widest border-4 border-[var(--border-color)] rounded-xl brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">
                      <Github size={20} />
                      <span>View Source</span>
                    </a>
                  )}
                  {selectedProject.links.demo && (
                    <a href={selectedProject.links.demo} className="flex items-center gap-2 px-6 py-3 bg-[var(--accent-cyan)] text-[var(--text-color)] font-bold uppercase tracking-widest border-4 border-[var(--border-color)] rounded-xl brutal-shadow hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">
                      <ExternalLink size={20} />
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
