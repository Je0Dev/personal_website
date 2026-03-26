import { motion } from 'motion/react';
import { Cpu, Zap, Code, Terminal, ArrowRight, Sparkles, Image as ImageIcon } from 'lucide-react';

export function Home({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const skills = [
    { name: 'C', icon: Code, color: 'bg-[var(--accent-cyan)]' },
    { name: 'Python', icon: Code, color: 'bg-[var(--accent-green)]' },
    { name: 'Java', icon: Code, color: 'bg-[var(--accent-yellow)]' },
    { name: 'HTML/CSS', icon: Code, color: 'bg-[var(--accent-red)]' },
    { name: 'SQL (MySQL)', icon: Code, color: 'bg-[var(--accent-spice)]' },
    { name: 'Bash', icon: Terminal, color: 'bg-[var(--accent-violet)]' },
    { name: 'Embedded', icon: Cpu, color: 'bg-[var(--accent-red)]' },
    
  ];

  const timeline = [
    { year: '2026', title: 'Bachelor of Electrical and Computer Engineering', desc: 'Focusing on finishing my degree and working on projects.', color: 'bg-[var(--accent-purple)]' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl space-y-20"
    >
      <header className="space-y-8 relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="absolute -top-10 -left-10 text-[var(--accent-yellow)] opacity-50 dark:opacity-20"
        >
          <Sparkles size={64} />
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl sm:text-7xl font-display font-black text-[var(--text-color)] tracking-tighter leading-[1.1] relative z-10">
               <motion.span 
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1.5 }}
            className="inline-block origin-bottom-right text-5xl md:text-7xl group-hover:scale-125 transition-transform duration-300"
          >
            Hey, I'm George 👋! <br/>
          </motion.span>
              <span className="doodle-underline">I like building projects</span> <br/>
              with <motion.span whileHover={{ scale: 1.1, rotate: 5 }} className="pill-outline bg-[var(--accent-pink)] text-white border-[var(--border-color)] rotate-2 inline-block cursor-pointer transition-transform">Code</motion.span> & <motion.span whileHover={{ scale: 1.1, rotate: -5 }} className="pill-outline bg-[var(--accent-cyan)] text-white border-[var(--border-color)] -rotate-2 inline-block cursor-pointer transition-transform">Wires</motion.span>
            </h1>
            <p className="text-xl text-[var(--text-color)] opacity-80 leading-relaxed max-w-2xl font-medium relative z-10">
              I'm an <span className="doodle-highlight">Electrical and Computer Engineering</span> student passionate about  
            <motion.span whileHover={{ scale: 1.05, rotate: 0.5, backgroundColor: 'var(--accent-cyan)' }} className="pill-outline bg-[var(--accent-cyan)] text-white border-[var(--border-color)] rotate-2 inline-block cursor-pointer transition-transform">Hardware & Software</motion.span>
              
            </p>
          </div>

          {/* Download CV Button */}
      <div className="mt-10 mb-1 relative z-10">
        <a 
          href="/extras/my_cv_v1.5.pdf" 
          download="Personal Resume.pdf"
          aria-label="Download my Resume"
          className="inline-flex items-center gap-3 px-10 py-6 rounded-xl font-bold text-white bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-orange-500 hover:to-blue-500 border-b-[4px] border-green-800 active:border-b-0 active:translate-y-1 hover:-translate-y-1 transition-all duration-150 shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        >
          <span className="doodle-circle"><strong className="font-bold text-[var(--text-color)]">Check my Resume</strong></span>
        </a>
      </div>

  
          <motion.div 
            whileHover={{ rotate: 2, scale: 1.02 }}
            className="w-full md:w-64 h-64 shrink-0 rounded-2xl border-4 border-[var(--border-color)] brutal-shadow overflow-hidden relative group"
          >
            <img 
              src="/personal_website/gif1.gif" 
              alt="My Mind" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-[var(--accent-purple)] mix-blend-multiply opacity-20 group-hover:opacity-0 transition-opacity duration-500" />
            <div className="absolute bottom-2 right-2 bg-[var(--card-bg)] border-2 border-[var(--border-color)] px-2 py-1 text-xs font-bold font-mono uppercase rounded">
              <span className="doodle-highlight">Mindset</span>
            </div>
          </motion.div>
        </div>
      </header>

      

      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">
            <span className="doodle-highlight">My Story</span> 
          </h2>
          <div className="h-1 flex-1 bg-[var(--border-color)]"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
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
                  <h3 className="text-xl font-display font-bold text-[var(--text-color)] mb-1">{item.title}</h3>
                  <p className="text-[var(--text-color)] opacity-80 font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            whileHover={{ y: -5 }}
            className="rounded-2xl border-4 border-[var(--border-color)] bg-[var(--card-bg)] p-6 brutal-shadow space-y-4"
          >
            <div className="aspect-video rounded-xl border-2 border-[var(--border-color)] overflow-hidden relative group">
              <img 
                src="/personal_website/gif2.gif" 
                alt="Hardware project" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--border-color)] to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 text-white font-bold font-display text-xl tracking-wide">
                <span className="doodle-circle">About Me</span>
              </div>
            </div>
            <p className="text-[var(--text-color)] opacity-80 font-medium leading-relaxed">
            I'm always trying to expand my knowledge and skills in this constantly changing field of ECE engineering. Really passionate about building real world applications, that can make even a slight impact on someone's life.
            Other than tech, I absolutely adore exploring and learning new human languages, that can boost my carrier and help me grow as an invidual. 
            Keen on staying consistent and dedicated in my craft, setting up goals that are worth chasing upon.
            Enduring life just as you all. Thanks for your time checking my website!🫶
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">
            My <span className="doodle-circle">Toolkit</span>
          </h2>
          <div className="h-1 flex-1 bg-[var(--border-color)]"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                className={`flex items-center gap-3 p-4 rounded-xl bg-[var(--card-bg)] border-2 border-[var(--border-color)] brutal-shadow cursor-default transition-colors`}
              >
                <div className={`p-2 rounded-lg border-2 border-[var(--border-color)] ${skill.color} text-[#111]`}>
                  <Icon size={24} strokeWidth={2.5} />
                </div>
                <span className="font-bold font-display text-[var(--text-color)] uppercase tracking-wide">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="space-y-8"
      >
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="p-8 rounded-2xl bg-[var(--accent-yellow)] border-4 border-[var(--border-color)] brutal-shadow-lg relative overflow-hidden group"
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--card-bg)] border-2 border-[var(--border-color)] rounded-full font-bold text-xs uppercase tracking-widest mb-4 text-[var(--text-color)]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Current Focus
            </div>
            <h3 className="text-3xl font-display font-black text-[#111] mb-3 uppercase leading-tight">Expanding <br/>My Knowledge</h3>
            <p className="text-[#111] font-medium text-lg max-w-xl mb-6">
             Building my skillset even more by learning how to design and implement larger scale projects
            </p>
         <a 
  href="https://github.com/Je0Dev" 
  target="_blank" 
  rel="noopener noreferrer"
  className="inline-block"
>
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--text-color)] text-[var(--bg-color)] font-semibold rounded-xl hover:bg-[var(--card-bg)] hover:text-[var(--text-color)] border-2 border-[var(--border-color)] transition-colors group"
  >
    Check my Progress 
    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
  </motion.button>
</a>
          </div>
          {/* Decorative elements */}
          <Cpu size={120} className="absolute -bottom-10 -right-10 text-[#111] opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-700" />
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
