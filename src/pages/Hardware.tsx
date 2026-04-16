import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Zap, ArrowUpRight, Wrench, CircuitBoard, Battery, Wifi, ExternalLink, X, FileText, Folder, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Skill {
  name: string;
  icon: typeof Cpu;
  relatedProjects: { title: string; tags: string[]; link: string }[];
  relatedNotes: { title: string; tags: string[] }[];
}

interface HardwareProject {
  title: string;
  year: string;
  description: string;
  details: string;
  tags: string[];
  relatedNotes?: { title: string }[];
  image: string;
  link: string;
  color: string;
  status: 'completed' | 'learning' | 'planned';
}

export function Hardware({ setActiveTab }: { setActiveTab?: (tab: string) => void }) {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [selectedProject, setSelectedProject] = useState<HardwareProject | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const hardwareSkills: Skill[] = [
    { name: 'PCB Design', icon: CircuitBoard, relatedProjects: [{ title: 'Learning Hardware Design', tags: ['PCB', 'Learning', 'FPGA', 'Verilog'], link: '#' }], relatedNotes: [] },
    { name: 'Verilog / VHDL', icon: Cpu, relatedProjects: [{ title: 'Learning Hardware Design', tags: ['Verilog', 'FPGA', 'Learning'], link: '#' }], relatedNotes: [] },
    { name: 'Arduino', icon: Cpu, relatedProjects: [], relatedNotes: [] },
    { name: 'ESP32/ESP8266', icon: Wifi, relatedProjects: [{ title: 'ESP32 Timer Sensor', tags: ['C++', 'ESP32', 'IoT', 'Sensors'], link: 'https://github.com/Je0Dev/esp32OffboardTimerSensor' }, { title: 'IoT Temperature Monitor', tags: ['ESP8266', 'IoT', 'Sensors'], link: '#' }], relatedNotes: [] },
    { name: 'Analog Circuits', icon: Zap, relatedProjects: [], relatedNotes: [] },
    { name: 'Power Electronics', icon: Battery, relatedProjects: [], relatedNotes: [] },
  ];

  const skillColors: Record<string, string> = {
    'PCB Design': 'bg-[var(--accent-cyan)]',
    'Verilog / VHDL': 'bg-[var(--accent-violet)]',
    'Arduino': 'bg-[var(--accent-yellow)]',
    'ESP32/ESP8266': 'bg-[var(--accent-green)]',
    'Analog Circuits': 'bg-[var(--accent-pink)]',
    'Power Electronics': 'bg-[var(--accent-purple)]',
  };

  const hardwareProjects: HardwareProject[] = [
    {
      title: 'Learning Hardware Design',
      year: '2024-2026',
      description: 'Currently expanding my knowledge in digital systems, FPGA programming, and PCB design. Building a strong foundation for hardware engineering.',
      details: 'Focusing on learning industry-standard tools and practices. Experimenting with various development boards and components to understand circuit behavior.',
      tags: ['Learning', 'FPGA', 'PCB', 'Verilog'],
      relatedNotes: [],
      image: '/learn1.gif',
      link: '#',
      color: 'bg-[var(--accent-yellow)]',
      status: 'learning'
    },
    {
      title: 'IoT Temperature Monitor',
      year: '2024',
      description: 'A simple temperature and humidity monitoring system using ESP8266 and DHT11 sensor. Data sent to cloud dashboard.',
      details: 'First hands-on hardware project. Learned about sensors, microcontrollers, and WiFi communication protocols.',
      tags: ['ESP8266', 'IoT', 'Sensors'],
      relatedNotes: [],
      image: '/learn1.gif',
      link: '#',
      color: 'bg-[var(--accent-cyan)]',
      status: 'completed'
    },
  ];

  const roadmap = [
    { phase: 'Phase 1', title: 'Basics', desc: 'Ohm\'s law, basic components', completed: true },
    { phase: 'Phase 2', title: 'Microcontrollers', desc: 'Arduino, ESP32 programming', completed: true },
    { phase: 'Phase 3', title: 'Digital Logic', desc: 'Boolean algebra, flip-flops', completed: true },
    { phase: 'Phase 4', title: 'FPGA & Verilog', desc: 'HDL programming, synthesis', inProgress: true },
    { phase: 'Phase 5', title: 'PCB Design', desc: 'Schematics, layout, fabrication', pending: true },
    { phase: 'Phase 6', title: 'Advanced Systems', desc: 'Signal processing, power', pending: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-5xl space-y-16"
    >
      <header className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-[var(--text-color)] tracking-tight uppercase">
            Hardware <span className="doodle-underline">Engineering</span>
          </h1>
        </div>
        <p className="text-xl text-[var(--text-color)] opacity-70 font-medium max-w-2xl leading-relaxed">
          Where <span className="doodle-highlight">code meets the physical world</span>. Exploring embedded systems, 
          digital design, and the art of building electronic circuits.
        </p>
      </header>

      {/* Skills Progress */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">
            Skill <span className="doodle-circle">Progress</span>
          </h2>
          <div className="h-1 flex-1 bg-[var(--border-color)]"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hardwareSkills.map((skill, i) => {
            const Icon = skill.icon;
            const colors = ['bg-[var(--accent-cyan)]', 'bg-[var(--accent-yellow)]', 'bg-[var(--accent-pink)]', 'bg-[var(--accent-purple)]', 'bg-[var(--accent-green)]', 'bg-[var(--accent-violet)]'];
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSkill(skill)}
                className="p-6 rounded-2xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow cursor-pointer transition-all hover:border-[var(--accent-cyan)]"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${colors[i % colors.length]}`}>
                    <Icon size={24} className="text-[#111]" />
                  </div>
                  <span className="font-bold font-display text-[var(--text-color)] uppercase tracking-wide text-sm">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Skill Modal */}
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
                    <div className="p-3 rounded-xl bg-[var(--accent-cyan)] flex items-center justify-center text-[#111] font-black text-lg">
                      <selectedSkill.icon size={24} />
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
                        <a
                          key={proj.title}
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:border-[var(--accent-cyan)] transition-colors text-left"
                        >
                          <Folder size={16} className="text-[var(--accent-cyan)]" />
                          <span className="font-bold text-[var(--text-color)] text-sm">{proj.title}</span>
                          <ExternalLink size={14} className="ml-auto text-[var(--text-color)] opacity-50" />
                        </a>
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
                          key={note.title}
                          onClick={() => { setActiveTab?.('notes'); setSelectedSkill(null); }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:border-[var(--accent-purple)] transition-colors text-left"
                        >
                          <FileText size={16} className="text-[var(--accent-purple)]" />
                          <span className="font-bold text-[var(--text-color)] text-sm">{note.title}</span>
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

      {/* Projects */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-[var(--text-color)] uppercase tracking-tight">
            Hardware <span className="doodle-circle">Projects</span>
          </h2>
          <div className="h-1 flex-1 bg-[var(--border-color)]"></div>
        </div>
        
        <div className="space-y-8">
          {hardwareProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring", bounce: 0.3 }}
              onClick={() => setSelectedProject(project)}
              className="group relative overflow-hidden rounded-3xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-hover transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-56 md:h-72 w-full overflow-hidden border-b-4 border-[var(--border-color)]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute inset-0 mix-blend-multiply dark:mix-blend-overlay opacity-40 dark:opacity-60 ${project.color} transition-opacity group-hover:opacity-20`} />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[var(--border-color)] to-transparent">
                  <div className="flex justify-between items-end">
                    <h3 className="text-2xl md:text-3xl font-display font-black text-[var(--bg-color)] drop-shadow-md group-hover:text-[var(--accent-yellow)] transition-colors">
                      {project.title}
                    </h3>
                    <span className={`text-sm font-bold font-mono px-3 py-1.5 rounded-lg ${
                      project.status === 'completed' 
                        ? 'bg-[var(--accent-green)] text-white' 
                        : project.status === 'learning'
                        ? 'bg-[var(--accent-yellow)] text-[#111]'
                        : 'bg-[var(--card-bg)] text-[var(--text-color)]'
                    } border-2 border-[var(--border-color)]`}>
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8 relative">
                <div className={`absolute top-0 right-8 w-16 h-16 ${project.color} rounded-b-full border-b-4 border-l-4 border-r-4 border-[var(--border-color)] -mt-1 z-10 flex items-center justify-center group-hover:h-20 transition-all duration-300`}>
                  <Wrench size={24} className="text-[#111] mt-2 group-hover:rotate-45 transition-transform duration-300" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2 space-y-3">
                    <h4 className="text-lg font-bold font-display text-[var(--text-color)] uppercase tracking-wide border-b-2 border-[var(--border-color)] pb-2 inline-block">Overview</h4>
                    <p className="text-[var(--text-color)] opacity-80 font-medium text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold font-display text-[var(--text-color)] uppercase tracking-wide border-b-2 border-[var(--border-color)] pb-2 inline-block">Details</h4>
                    <p className="text-[var(--text-color)] opacity-70 font-medium text-sm leading-relaxed italic">
                      {project.details}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => {
                    const matchingSkill = hardwareSkills.find(skill => skill.name.toLowerCase().includes(tag.toLowerCase()) || skill.relatedProjects.some(p => p.tags.includes(tag)));
                    const skillColor = matchingSkill ? skillColors[matchingSkill.name] || 'bg-[var(--accent-cyan)]' : 'bg-[var(--accent-cyan)]';
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={(e) => { e.stopPropagation(); setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]); }}
                        className={`text-sm font-bold font-mono border-2 border-[var(--border-color)] px-4 py-2 rounded-lg uppercase transition-colors cursor-pointer ${
                          isSelected 
                            ? `${skillColor} text-[#111]`
                            : 'text-[var(--text-color)] bg-[var(--bg-color)] hover:bg-[var(--text-color)] hover:text-[var(--bg-color)]'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--text-color)] text-[var(--bg-color)] font-bold rounded-xl hover:bg-[var(--card-bg)] hover:text-[var(--text-color)] border-2 border-[var(--border-color)] transition-colors uppercase tracking-wide group/btn"
                >
                  <span>Coming Soon</span>
                  <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Hardware Project Modal */}
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
              
              <div className="h-72 w-full border-b-4 border-[var(--border-color)] relative shrink-0">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover grayscale"
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
                  <span className={`text-sm font-bold font-mono px-4 py-2 rounded-lg border-2 border-[var(--border-color)] ${
                    selectedProject.status === 'completed' 
                      ? 'bg-[var(--accent-green)] text-white' 
                      : selectedProject.status === 'learning'
                      ? 'bg-[var(--accent-yellow)] text-[#111]'
                      : 'bg-[var(--card-bg)] text-[var(--text-color)]'
                  }`}>
                    {selectedProject.status}
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
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold font-display text-[var(--text-color)] uppercase tracking-wide border-b-2 border-[var(--border-color)] pb-2 inline-block mb-3">Overview</h4>
                    <p className="text-[var(--text-color)] opacity-80 font-medium text-lg leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-display text-[var(--text-color)] uppercase tracking-wide border-b-2 border-[var(--border-color)] pb-2 inline-block mb-3">Details</h4>
                    <p className="text-[var(--text-color)] opacity-70 font-medium text-lg leading-relaxed italic">
                      {selectedProject.details}
                    </p>
                  </div>
                </div>

                {(selectedProject.relatedNotes && selectedProject.relatedNotes.length > 0) && (
                  <div className="pt-4 border-t-2 border-[var(--border-color)]">
                    <h4 className="text-sm font-bold text-[var(--text-color)] opacity-60 uppercase tracking-wider mb-3">Related Notes</h4>
                    <div className="space-y-2">
                      {selectedProject.relatedNotes.map((note) => (
                        <button
                          key={note.title}
                          onClick={() => { setActiveTab?.('notes'); setSelectedProject(null); }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-color)] border-2 border-[var(--border-color)] hover:border-[var(--accent-purple)] transition-colors text-left"
                        >
                          <FileText size={16} className="text-[var(--accent-purple)]" />
                          <span className="font-bold text-[var(--text-color)] text-sm">{note.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}