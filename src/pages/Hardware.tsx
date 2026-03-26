import { motion } from 'motion/react';
import { Cpu, Zap, Link, ArrowUpRight, Wrench } from 'lucide-react';

export function Hardware() {
  const hardwareProjects = [
    {
      title: 'Working on learning more about hardware design and implementation',
      year: 'hopefully soon',
      description: 'PCBs,FPGAs,Verilog/Vhdl are on my schedule. Stay Tuned!',
      details: 'Nothing to show here for now',
      tags: ['Simulate', 'Design'],
      image: '/personal_website/learn1.gif',
      link: 'nothing for now',
      color: 'bg-[var(--accent-yellow)]'
    },
    // { some data to have as future reference
    //   title: 'Miniature Weather Station',
    //   year: '2024',
    //   description: 'A solar-powered, battery-backed weather station. Uses an ESP8266 to read temperature, humidity, and barometric pressure sensors, transmitting data over WiFi.',
    //   details: 'Power optimization was key here. I utilized deep sleep modes on the ESP8266 and a low-quiescent current LDO to ensure it could run indefinitely on a small LiPo battery and solar panel.',
    //   tags: ['ESP8266', 'I2C', 'Solar Power', 'Sensors'],
    //   image: 'https://picsum.photos/seed/pcb/800/400?blur=2',
    //   link: '#',
    //   color: 'bg-[var(--accent-cyan)]'
    // },
    // {
    //   title: 'Audio Amplifier Class-D',
    //   year: '2023',
    //   description: 'Built a 50W Class-D audio amplifier from discrete components as a final project for an analog electronics course. Achieved 85% efficiency.',
    //   details: 'Simulating the feedback loop in LTspice was crucial before breadboarding. The final PCB layout required careful attention to ground planes to minimize noise.',
    //   tags: ['Analog Design', 'Spice', 'Soldering', 'Audio'],
    //   image: 'https://picsum.photos/seed/amp/800/400?blur=2',
    //   link: '#',
    //   color: 'bg-[var(--accent-pink)]'
    // },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl space-y-12"
    >
      <header className="space-y-4">
        <h1 className="text-5xl sm:text-7xl font-display font-black text-[var(--text-color)] tracking-tighter uppercase">
          Hardware <span className="doodle-underline">Engineering</span>
        </h1>
        <p className="text-xl text-[var(--text-color)] opacity-80 font-medium max-w-2xl">
          Where code meets the physical world. A showcase of my PCB designs, embedded systems, and electronics projects.
        </p>
      </header>

      <div className="space-y-16">
        {hardwareProjects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", bounce: 0.3 }}
            className="group relative overflow-hidden rounded-3xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-hover transition-all duration-300"
          >
            <div className="relative h-64 md:h-80 w-full overflow-hidden border-b-4 border-[var(--border-color)]">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 mix-blend-multiply dark:mix-blend-overlay opacity-40 dark:opacity-60 ${project.color} transition-opacity group-hover:opacity-20`} />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-[var(--border-color)] to-transparent">
                <div className="flex justify-between items-end">
                  <h3 className="text-3xl md:text-4xl font-display font-black text-[var(--bg-color)] drop-shadow-md group-hover:text-[var(--accent-yellow)] transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm font-bold font-mono text-[var(--text-color)] bg-[var(--bg-color)] px-3 py-1 rounded border-2 border-[var(--border-color)]">
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8 relative">
              <div className={`absolute top-0 right-8 w-16 h-16 ${project.color} rounded-b-full border-b-4 border-l-4 border-r-4 border-[var(--border-color)] -mt-1 z-10 flex items-center justify-center group-hover:h-20 transition-all duration-300`}>
                <Wrench size={24} className="text-[#111] mt-2 group-hover:rotate-45 transition-transform duration-300" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-xl font-bold font-display text-[var(--text-color)] uppercase tracking-wide border-b-2 border-[var(--border-color)] pb-2 inline-block">Overview</h4>
                  <p className="text-[var(--text-color)] opacity-80 font-medium text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold font-display text-[var(--text-color)] uppercase tracking-wide border-b-2 border-[var(--border-color)] pb-2 inline-block">Deep Dive</h4>
                  <p className="text-[var(--text-color)] opacity-70 font-medium text-sm leading-relaxed italic">
                    {project.details}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-bold font-mono text-[var(--text-color)] bg-[var(--bg-color)] border-2 border-[var(--border-color)] px-3 py-1.5 rounded-md uppercase hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-colors cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
              
              <a
                href={project.link}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text-color)] text-[var(--bg-color)] font-bold rounded-xl hover:bg-[var(--card-bg)] hover:text-[var(--text-color)] border-2 border-[var(--border-color)] transition-colors uppercase tracking-wide group/btn"
              >
                <span>View Schematics & Code</span>
                <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
