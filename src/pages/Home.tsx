import { motion, AnimatePresence } from 'motion/react';
import { Code, Terminal, ArrowRight, Sparkles, Image as ImageIcon, GraduationCap, MapPin, Calendar, Mail, Globe, Languages, Film, X, ExternalLink, FileText } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '../components/Toast';

function CountUp({ number, color }: { number: number; color: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = number;
    const duration = 1500;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [number]);
  
  return <span className={`text-4xl font-display font-black ${color}`}>{count}{number > 10 ? '+' : ''}</span>;
}

export function Home({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { showToast } = useToast();
  const [typedText, setTypedText] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<typeof skillData[0] | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedHobby, setSelectedHobby] = useState<typeof hobbies[0] | null>(null);
  const phrases = ['I build things', 'I code', 'I learn', 'I create'];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playSound = (type: 'hover' | 'click') => {
    if (!soundEnabled || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.volume = type === 'click' ? 0.3 : 0.1;
    audioRef.current.play().catch(() => {});
  };
  
  const skillData = [
    { name: 'C / C++', color: 'bg-[var(--accent-cyan)]', textColor: 'text-[var(--accent-cyan)]', relatedProjects: ['CLI ATM System', 'CLI Task Manager', 'Student Database System'], relatedNotes: ['Demystifying C-Pointers'] },
    { name: 'Python', color: 'bg-[var(--accent-green)]', textColor: 'text-[var(--accent-green)]', relatedProjects: ['Echoes: Fallen Kingdom'], relatedNotes: [] },
    { name: 'Java', color: 'bg-[var(--accent-yellow)]', textColor: 'text-[var(--accent-yellow)]', relatedProjects: ['IMDb Clone App'], relatedNotes: [] },
    { name: 'JavaScript', color: 'bg-[var(--accent-pink)]', textColor: 'text-[var(--accent-pink)]', relatedProjects: ['Neon Vault Web Game'], relatedNotes: [] },
    { name: 'TypeScript', color: 'bg-[var(--accent-purple)]', textColor: 'text-[var(--accent-purple)]', relatedProjects: ['Lang Website', 'Personal Website'], relatedNotes: [] },
    { name: 'React', color: 'bg-[var(--accent-cyan)]', textColor: 'text-[var(--accent-cyan)]', relatedProjects: ['Lang Website', 'Personal Website'], relatedNotes: [] },
    { name: 'SQL', color: 'bg-[var(--accent-spice)]', textColor: 'text-[var(--accent-spice)]', relatedProjects: ['IMDb Clone App'], relatedNotes: [] },
    { name: 'Embedded', color: 'bg-[var(--accent-green)]', textColor: 'text-[var(--accent-green)]', relatedProjects: ['ESP32 Timer Sensor', 'IoT Temperature Monitor'], relatedNotes: [] },
    { name: 'Verilog', color: 'bg-[var(--accent-violet)]', textColor: 'text-[var(--accent-violet)]', relatedProjects: [], relatedNotes: [] },
    { name: 'Linux', color: 'bg-[var(--accent-yellow)]', textColor: 'text-[var(--accent-yellow)]', relatedProjects: ['CLI ATM System', 'CLI Task Manager'], relatedNotes: [] },
    { name: 'Git', color: 'bg-[var(--accent-red)]', textColor: 'text-[var(--accent-red)]', relatedProjects: [], relatedNotes: [] },
  ];
  
  useEffect(() => {
    let charIndex = 0;
    let deleting = false;
    const currentPhrase = phrases[phraseIndex];
    
    const typeInterval = setInterval(() => {
      if (!deleting) {
        setTypedText(currentPhrase.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentPhrase.length) {
          setTimeout(() => { deleting = true; }, 1500);
        }
      } else {
        setTypedText(currentPhrase.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, deleting ? 50 : 100);
    
    return () => clearInterval(typeInterval);
  }, [phraseIndex]);

  const timeline = [
    { year: '2026', title: 'BSc Electrical & Computer Engineering', desc: 'University of Patras', location: 'Patras, Greece', color: 'bg-[var(--accent-purple)]', 
      details: 'Focusing on embedded systems, digital design, and signal processing. Passionate about bridging software and hardware.',
      links: [
        { title: 'University of Patras', url: 'https://www.upatras.gr/' },
        { title: 'ECE Department', url: 'https://www.ece.upatras.gr/' },
      ],
      topics: ['Digital Systems', 'Microprocessors', 'Signal Processing', 'Circuit Analysis']
    },
  ];

  const highlights = [
    { number: '3+', label: 'Years Coding', color: 'bg-[var(--accent-pink)]', relatedProjects: ['CLI ATM System', 'CLI Task Manager', 'Student Database System'], relatedNotes: [] },
    { number: '15+', label: 'Projects', color: 'bg-[var(--accent-cyan)]', relatedProjects: ['Lang Website', 'Neon Vault Web Game', 'IMDb Clone App'], relatedNotes: [] },
    { number: '2', label: 'Languages', color: 'bg-[var(--accent-yellow)]', relatedProjects: [], relatedNotes: ['My Journey'] },
  ];

  const [expandedStat, setExpandedStat] = useState<string | null>(null);

  const coursework = [
    { name: 'Digital Systems', relatedProjects: [], relatedNotes: [] },
    { name: 'Microprocessors', relatedProjects: ['CLI ATM System', 'ESP32 Timer Sensor'], relatedNotes: [] },
    { name: 'Signals & Systems', relatedProjects: [], relatedNotes: [] },
    { name: 'Circuit Analysis', relatedProjects: [], relatedNotes: [] },
    { name: 'Data Structures', relatedProjects: ['CLI Task Manager', 'Student Database System'], relatedNotes: [] },
    { name: 'Algorithms', relatedProjects: [], relatedNotes: [] },
    { name: 'Electromagnetism', relatedProjects: [], relatedNotes: [] },
    { name: 'Probability & Statistics', relatedProjects: [], relatedNotes: [] },
  ];

  const hobbies = [
    { 
      label: 'Language Learning', 
      icon: '🌍', 
      desc: 'Learning cultures', 
      about: 'I love learning languages - it\'s my way of connecting with different cultures and people around the world. Currently focused on improving my English while exploring other languages.',
      links: [
        { title: 'Duolingo Profile', url: 'https://www.duolingo.com/profile/Je0Dev' },
        { title: 'Language Learning Tips', url: '#' },
      ]
    },
    { 
      label: 'Movies & Series', 
      icon: '🎬', 
      desc: 'Watching films', 
      about: 'A big movie and series buff! I enjoy exploring different genres, from sci-fi thrillers to heartfelt dramas. Cinema is my way to unwind and get inspired.',
      links: [
        { title: 'IMDb Profile', url: 'https://www.imdb.com/user/ur202218046/' },
        { title: 'Top 10 Movies List', url: '#' },
      ]
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-5xl space-y-24"
    >
      {/* Hero Section */}
      <header className="space-y-8 relative">
        {/* ASCII Art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="absolute -top-10 -left-10 text-[var(--accent-yellow)] opacity-50 dark:opacity-20"
        >
          <Sparkles size={64} />
        </motion.div>

        {/* ASCII Header - hidden on small screens */}
        <pre className="hidden lg:block text-[var(--accent-cyan)] opacity-60 font-mono text-xs leading-tight overflow-hidden">
{`
   ____  ____  ____  ____  ____  __  __
  (  _ \\(  _ \\(  __)(  _ \\(  _ \\(  )(  )
   ) __/ )   / ) _)  )   / ) (_) ) )(__ (
  (__)  (__\\_)(____)(__\\_)(____/ (______)
  ____  ____  ____  __  __  ____  __  __
 (  _ \\(  _ \\(  _ \\(  )(  )(  _ \\(  )(  )
 ( (__/ )(_/( (___  ) )(_)( )(_) ) )(__ (
  (____/_____/(____) (______)(____/ (______)
`}
        </pre>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-[var(--text-color)] tracking-tight leading-[1.1] relative z-10">
              Hi, I'm George
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl">Software & Hardware</span>
              <br />
              <span className="text-[var(--accent-cyan)] min-h-[1.2em]">
                {typedText}<span className="animate-pulse">|</span>
              </span>
            </h1>
            
            <p className="text-xl text-[var(--text-color)] opacity-70 leading-relaxed max-w-2xl">
              Electrical & Computer Engineering student passionate about building 
              <span className="doodle-highlight"> elegant solutions</span> that bridge the gap between 
              <span className="pill-outline bg-[var(--accent-pink)] text-white border-[var(--border-color)] rotate-2 inline-block mx-1">software</span> 
              and
              <span className="pill-outline bg-[var(--accent-cyan)] text-white border-[var(--border-color)] -rotate-2 inline-block mx-1">hardware</span>.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  const pdfUrl = '/my_cv_v1.5.pdf';
                  const link = document.createElement('a');
                  link.href = pdfUrl;
                  link.download = 'George_Mastrogiannis_Resume.pdf';
                  link.target = '_blank';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  
                  setTimeout(() => {
                    showToast('CV downloaded successfully!');
                    setActiveTab('thank-you');
                  }, 800);
                }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-[#111] bg-gradient-to-r from-[var(--accent-yellow)] to-[var(--accent-orange)] hover:from-[var(--accent-cyan)] hover:to-[var(--accent-green)] border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all"
              >
                <span className="font-black uppercase tracking-wider">Download CV</span>
                <ArrowRight size={20} />
              </button>
              
              <button 
                onClick={() => setActiveTab('projects')}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold bg-[var(--card-bg)] text-[var(--text-color)] border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all"
              >
                <span className="uppercase tracking-wider">View Work</span>
              </button>
            </div>
          </div>

          {/* Profile Card */}
          <motion.div 
            whileHover={{ rotate: 2, scale: 1.02 }}
            className="w-full lg:w-80 shrink-0 rounded-3xl border-4 border-[var(--border-color)] brutal-shadow overflow-hidden relative group"
          >
            <img 
              src="/personal_website/gif1.gif" 
              alt="My Mind" 
              className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--border-color)] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-[var(--card-bg)]/90 backdrop-blur border-2 border-[var(--border-color)] px-4 py-3 rounded-xl">
                <p className="font-bold text-[var(--text-color)] text-sm uppercase tracking-wide">Based in</p>
                <p className="font-mono text-[var(--text-color)] opacity-80">Greece 🇬🇷</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar - Individual Boxes */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          {highlights.map((item, i) => (
            <div key={i} className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                onClick={() => setExpandedStat(expandedStat === item.label ? null : item.label)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-2xl border-4 border-[var(--border-color)] brutal-shadow cursor-pointer transition-all ${
                  expandedStat === item.label ? item.color : 'bg-[var(--card-bg)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CountUp number={parseInt(item.number)} color={expandedStat === item.label ? 'text-white' : item.color.replace('bg-', 'text-')} />
                  <span className={`font-bold uppercase tracking-wide text-sm ${expandedStat === item.label ? 'text-[var(--bg-color)]' : 'text-[var(--text-color)]'}`}>{item.label}</span>
                </div>
              </motion.div>
              
              <AnimatePresence>
                {expandedStat === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 p-4 bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-2xl brutal-shadow z-20"
                  >
                    {item.relatedProjects.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-bold text-[var(--accent-cyan)] uppercase tracking-wider mb-2">Related Projects</p>
                        <div className="space-y-1">
                          {item.relatedProjects.map(proj => (
                            <button
                              key={proj}
                              onClick={(e) => { e.stopPropagation(); setActiveTab('projects'); setExpandedStat(null); }}
                              className="w-full text-left px-2 py-1 text-xs font-bold text-[var(--text-color)] hover:text-[var(--accent-pink)] transition-colors"
                            >
                              • {proj}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.relatedNotes.length > 0 && (
                      <div>
                        <p className="text-xs font-bold text-[var(--accent-purple)] uppercase tracking-wider mb-2">Related Notes</p>
                        <div className="space-y-1">
                          {item.relatedNotes.map(note => (
                            <button
                              key={note}
                              onClick={(e) => { e.stopPropagation(); setActiveTab('notes'); setExpandedStat(null); }}
                              className="w-full text-left px-2 py-1 text-xs font-bold text-[var(--text-color)] hover:text-[var(--accent-purple)] transition-colors"
                            >
                              • {note}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.relatedProjects.length === 0 && item.relatedNotes.length === 0 && (
                      <p className="text-xs text-[var(--text-color)] opacity-60">Coming soon...</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </header>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">
            About <span className="doodle-highlight">Me</span> 
          </h2>
          <div className="h-1 flex-1 bg-[var(--border-color)]"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Timeline */}
          <div className="relative border-l-4 border-[var(--border-color)] ml-4 space-y-8 pb-4">
            {timeline.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ x: 10 }}
                className="relative pl-8 group"
              >
                <div className={`absolute -left-[14px] top-1 w-6 h-6 rounded-full border-4 border-[var(--border-color)] ${item.color} z-10 group-hover:scale-125 transition-transform`} />
                <div className="bg-[var(--card-bg)] border-2 border-[var(--border-color)] p-5 rounded-xl brutal-shadow max-w-lg transition-colors">
                  <span className="inline-block px-2 py-1 bg-[var(--text-color)] text-[var(--bg-color)] text-xs font-bold font-mono mb-2 rounded">{item.year}</span>
                  <h3 className="text-lg font-display font-bold text-[var(--text-color)] mb-1">{item.title}</h3>
                  <p className="text-[var(--text-color)] opacity-80 font-medium text-sm mb-2">{item.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-mono text-[var(--text-color)] opacity-60 mb-3">
                    <MapPin size={12} />
                    {item.location}
                  </div>
                  {item.details && (
                    <p className="text-[var(--text-color)] opacity-70 text-sm mb-3 italic">{item.details}</p>
                  )}
                  {item.topics && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.topics.map((topic, idx) => (
                        <span key={idx} className="text-xs font-mono text-[var(--text-color)] bg-[var(--bg-color)] border border-[var(--border-color)] px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                  {item.links && (
                    <div className="flex flex-wrap gap-2">
                      {item.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-[var(--accent-cyan)] hover:underline"
                        >
                          {link.title} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* About Content */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-3xl border-4 border-[var(--border-color)] bg-[var(--card-bg)] p-6 brutal-shadow space-y-6"
          >
            <div className="aspect-video rounded-xl border-2 border-[var(--border-color)] overflow-hidden relative group">
              <img 
                src="/personal_website/gif2.gif" 
                alt="About me" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--border-color)] to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 text-white font-bold font-display text-xl tracking-wide">
                <span className="doodle-circle">My Journey</span>
              </div>
            </div>
            <div className="space-y-4 text-[var(--text-color)] opacity-80 font-medium leading-relaxed">
              <p>
                I'm an ECE student at University of Patras, constantly pushing myself to learn and build meaningful projects. My passion lies in creating real-world applications that can make a difference.
              </p>
              <p>
                Beyond tech, I love exploring languages and cultures, playing chess, and diving into sci-fi movies. I believe in staying consistent, setting ambitious goals, and enjoying the journey.
              </p>
            </div>
            <button 
              onClick={() => setActiveTab('notes')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-pink)] text-white font-bold rounded-xl border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all"
            >
              <span>Wanna see more?</span>
              <span className="underline">Click here to visit my blog</span>
            </button>
            <div className="flex items-center gap-4 pt-4 border-t-2 border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--accent-pink)]">
                <Mail size={16} />
                giorgos_M000@hotmail.com
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">
            Tech <span className="doodle-circle">Stack</span>
          </h2>
          <div className="h-1 flex-1 bg-[var(--border-color)]"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {skillData.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSkill(skill)}
              className="flex items-center gap-3 p-4 rounded-xl bg-[var(--card-bg)] border-2 border-[var(--border-color)] brutal-shadow cursor-pointer transition-all hover:border-[var(--accent-pink)]"
            >
              <div className={`w-8 h-8 rounded-lg ${skill.color} flex items-center justify-center text-[#111] font-black text-xs`}>
                {skill.name.split(' ')[0].slice(0, 2)}
              </div>
              <span className="font-bold font-display text-[var(--text-color)] text-sm uppercase tracking-wide">{skill.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Skill Popup Modal */}
        <AnimatePresence>
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
              onClick={() => setSelectedSkill(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-3xl brutal-shadow-lg max-w-md w-full p-6"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${selectedSkill.color} flex items-center justify-center text-[#111] font-black text-lg`}>
                      {selectedSkill.name.split(' ')[0].slice(0, 2)}
                    </div>
                    <h3 className="text-2xl font-display font-black text-[var(--text-color)] uppercase">{selectedSkill.name}</h3>
                  </div>
                  <button onClick={() => setSelectedSkill(null)} className="p-2 bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-lg text-[var(--text-color)] hover:bg-[var(--accent-pink)] hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {selectedSkill.relatedProjects.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-[var(--text-color)] opacity-60 uppercase tracking-wider mb-3">Related Projects</h4>
                    <div className="space-y-2">
                      {selectedSkill.relatedProjects.map((proj) => (
                        <button
                          key={proj}
                          onClick={() => { setActiveTab('projects'); setSelectedSkill(null); }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:border-[var(--accent-cyan)] transition-colors text-left"
                        >
                          <ExternalLink size={16} className="text-[var(--accent-cyan)]" />
                          <span className="font-bold text-[var(--text-color)] text-sm">{proj}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSkill.relatedNotes.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-color)] opacity-60 uppercase tracking-wider mb-3">Related Notes</h4>
                    <div className="space-y-2">
                      {selectedSkill.relatedNotes.map((note) => (
                        <button
                          key={note}
                          onClick={() => { setActiveTab('notes'); setSelectedSkill(null); }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:border-[var(--accent-purple)] transition-colors text-left"
                        >
                          <FileText size={16} className="text-[var(--accent-purple)]" />
                          <span className="font-bold text-[var(--text-color)] text-sm">{note}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSkill.relatedProjects.length === 0 && selectedSkill.relatedNotes.length === 0 && (
                  <p className="text-[var(--text-color)] opacity-60 text-center py-4">No related projects or notes yet</p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* Coursework Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">
            Relevant <span className="doodle-highlight">Coursework</span>
          </h2>
          <div className="h-1 flex-1 bg-[var(--border-color)]"></div>
        </div>
        <div className="flex flex-wrap gap-3">
          {coursework.map((course, i) => (
            <motion.button
              key={course.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedSkill({...course, color: 'bg-[var(--accent-cyan)]', textColor: 'text-[var(--accent-cyan)]'} as any)}
              className="px-5 py-3 rounded-xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow text-[var(--text-color)] font-bold uppercase tracking-wide text-sm cursor-pointer hover:border-[var(--accent-cyan)]"
            >
              {course.name}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Hobbies & Interests */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">
            Hobbies & <span className="doodle-circle">Interests</span>
          </h2>
          <div className="h-1 flex-1 bg-[var(--border-color)]"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {hobbies.map((hobby, i) => {
            const colors = ['bg-[var(--accent-pink)]', 'bg-[var(--accent-cyan)]'];
            return (
              <motion.button
                key={hobby.label}
                onClick={() => setSelectedHobby(hobby)}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 rounded-2xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow text-center cursor-pointer hover:border-[var(--accent-pink)] group"
              >
                <div className={`p-3 rounded-xl ${colors[i % colors.length]} inline-block mb-3 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{hobby.icon}</span>
                </div>
                <h3 className="font-bold text-[var(--text-color)] uppercase tracking-wide text-sm">{hobby.label}</h3>
                <p className="text-xs text-[var(--text-color)] opacity-60 mt-1">{hobby.desc}</p>
                <ExternalLink size={14} className="text-[var(--text-color)] opacity-50 mt-2 mx-auto" />
              </motion.button>
            );
          })}
        </div>

        {/* Hobby Modal */}
        <AnimatePresence>
          {selectedHobby && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
              onClick={() => setSelectedHobby(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-3xl brutal-shadow-lg max-w-md w-full p-6"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{selectedHobby.icon}</div>
                    <h3 className="text-2xl font-display font-black text-[var(--text-color)] uppercase">{selectedHobby.label}</h3>
                  </div>
                  <button onClick={() => setSelectedHobby(null)} className="p-2 bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-lg text-[var(--text-color)] hover:bg-[var(--accent-pink)] hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <p className="text-[var(--text-color)] opacity-80 font-medium leading-relaxed mb-6">
                  {selectedHobby.about}
                </p>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-[var(--text-color)] opacity-60 uppercase tracking-wider">Check it out</h4>
                  {selectedHobby.links.map((link) => (
                    <a
                      key={link.title}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:border-[var(--accent-cyan)] transition-colors group"
                    >
                      <span className="font-bold text-[var(--text-color)] text-sm">{link.title}</span>
                      <ExternalLink size={16} className="text-[var(--text-color)] opacity-50 group-hover:text-[var(--accent-cyan)]" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        {/* Let's Build Something Amazing Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--accent-yellow)] rounded-bl-full -mr-12 -mt-12 border-b-4 border-l-4 border-[var(--border-color)] opacity-30 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--accent-pink)] rounded-tr-full -ml-12 -mb-12 border-t-4 border-r-4 border-[var(--border-color)] opacity-30 pointer-events-none" />
          <div className="relative z-10 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-display font-black text-[var(--text-color)]">
              Let's Build Something <span className="doodle-highlight">Amazing</span> Together
            </h2>
            <p className="text-[var(--text-color)] opacity-70 max-w-xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <button 
              onClick={() => setActiveTab('contact')}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-white bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-purple)] hover:from-[var(--accent-cyan)] hover:to-[var(--accent-green)] border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all shadow-[4px_4px_0_var(--border-color)]"
            >
              <Mail size={22} />
              <span className="uppercase tracking-wider text-lg">Get In Touch</span>
            </button>
          </div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}