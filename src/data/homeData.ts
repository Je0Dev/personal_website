export interface Skill {
  name: string;
  color: string;
  textColor: string;
  relatedProjects: string[];
  relatedNotes: string[];
}

export const skillsData: Skill[] = [
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

export const statsData = [
  { number: '3+', label: 'Years Coding', color: 'bg-[var(--accent-pink)]', relatedProjects: ['CLI ATM System', 'CLI Task Manager', 'Student Database System'], relatedNotes: [] },
  { number: '15+', label: 'Projects', color: 'bg-[var(--accent-cyan)]', relatedProjects: ['Lang Website', 'Neon Vault Web Game', 'IMDb Clone App'], relatedNotes: [] },
  { number: '2', label: 'Languages', color: 'bg-[var(--accent-yellow)]', relatedProjects: [], relatedNotes: ['My Journey'], details: 'English (Native), German (B2)', links: [{ title: 'Duolingo Profile', url: 'https://www.duolingo.com/profile/Je0Dev' }] },
];

export const locationData = {
  location: 'Greece',
  flag: '🇬🇷',
  city: 'Patras',
  university: 'University of Patras',
  about: "I'm a passionate ECE student based in Patras, Greece. Currently pursuing my BSc in Electrical & Computer Engineering at the University of Patras. I love building projects that bridge hardware and software, and I'm always excited to learn new technologies.",
  links: [
    { title: 'University of Patras', url: 'https://www.upatras.gr/' },
    { title: 'ECE Department', url: 'https://www.ece.upatras.gr/' },
    { title: 'Patras Wiki', url: 'https://en.wikipedia.org/wiki/Patras' },
  ],
};

export const timelineData = [
  { 
    year: '2023', 
    title: 'Started ECE Journey', 
    desc: 'University of Patras - Electrical & Computer Engineering', 
    location: 'Patras, Greece', 
    color: 'bg-[var(--accent-cyan)]', 
    details: 'Began my journey in ECE, learning the fundamentals of electrical circuits, programming, and digital systems.',
    links: [{ title: 'University of Patras', url: 'https://www.upatras.gr/' }], 
    topics: ['Introduction to Programming', 'Circuit Analysis', 'Calculus']
  },
  { 
    year: '2024', 
    title: 'First Projects', 
    desc: 'CLI ATM System, Python Games', 
    location: 'Patras, Greece', 
    color: 'bg-[var(--accent-pink)]', 
    details: 'Built my first major projects - a CLI ATM system in C and a Python text adventure game.',
    links: [{ title: 'CLI ATM', url: 'https://github.com/Je0Dev/cli_atm_system' }], 
    topics: ['C Programming', 'Makefiles', 'Git']
  },
  { 
    year: '2025', 
    title: 'Web Development', 
    desc: 'Personal Website, React Learning', 
    location: 'Patras, Greece', 
    color: 'bg-[var(--accent-purple)]', 
    details: 'Started building this website and diving deep into React, TypeScript, and modern web development.',
    links: [], 
    topics: ['React', 'TypeScript', 'TailwindCSS']
  },
  { 
    year: '2026', 
    title: 'Hardware & Embedded', 
    desc: 'ESP32 Projects, PCB Design', 
    location: 'Patras, Greece', 
    color: 'bg-[var(--accent-yellow)]', 
    details: 'Exploring embedded systems, IoT devices, and hardware-software integration.',
    links: [{ title: 'ESP32 Timer', url: 'https://github.com/Je0Dev/esp32OffboardTimerSensor' }], 
    topics: ['ESP32', 'IoT', 'Verilog']
  },
  { 
    year: '2026+', 
    title: 'Looking Forward', 
    desc: 'Graduation & Beyond', 
    location: 'Patras, Greece', 
    color: 'bg-[var(--accent-green)]', 
    details: 'Excited for what is to come!',
    links: [], 
    topics: ['Machine Learning', 'Robotics', 'Open Source']
  },
];

export const courseworkData = [
  { name: 'Digital Systems' }, { name: 'Microprocessors', relatedProjects: ['CLI ATM System'] }, { name: 'Signals & Systems' }, { name: 'Circuit Analysis' }, { name: 'Data Structures', relatedProjects: ['CLI Task Manager'] }, { name: 'Algorithms' }, { name: 'Electromagnetism' }, { name: 'Probability & Statistics' },
];

export const hobbiesData = [
  { label: 'Language Learning', icon: '🌍', desc: 'Learning cultures', about: 'I love learning languages to connect with different cultures.', links: [{ title: 'Duolingo', url: 'https://www.duolingo.com/profile/Je0Dev' }] },
  { label: 'Movies & Series', icon: '🎬', desc: 'Watching films', about: 'A big movie and series buff! I enjoy sci-fi thrillers and heartfelt dramas.', links: [{ title: 'IMDb', url: 'https://www.imdb.com/user/ur202218046/' }] },
];