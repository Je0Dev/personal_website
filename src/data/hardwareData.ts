import { Cpu, Zap, Wifi, CircuitBoard, Battery } from 'lucide-react';

export interface HardwareSkill {
  name: string;
  icon: typeof Cpu;
  relatedProjects: { title: string; tags: string[]; link: string }[];
  relatedNotes: { title: string; tags: string[] }[];
}

export const hardwareSkillsData: HardwareSkill[] = [
  { name: 'PCB Design', icon: CircuitBoard, relatedProjects: [{ title: 'Learning Hardware Design', tags: ['PCB', 'Learning', 'FPGA', 'Verilog'], link: '#' }], relatedNotes: [] },
  { name: 'Verilog / VHDL', icon: Cpu, relatedProjects: [{ title: 'Learning Hardware Design', tags: ['Verilog', 'FPGA', 'Learning'], link: '#' }], relatedNotes: [] },
  { name: 'Arduino', icon: Cpu, relatedProjects: [], relatedNotes: [] },
  { name: 'ESP32/ESP8266', icon: Wifi, relatedProjects: [{ title: 'ESP32 Timer Sensor', tags: ['C++', 'ESP32', 'IoT', 'Sensors'], link: 'https://github.com/Je0Dev/esp32OffboardTimerSensor' }, { title: 'IoT Temperature Monitor', tags: ['ESP8266', 'IoT', 'Sensors'], link: '#' }], relatedNotes: [] },
  { name: 'Analog Circuits', icon: Zap, relatedProjects: [], relatedNotes: [] },
  { name: 'Power Electronics', icon: Battery, relatedProjects: [], relatedNotes: [] },
];

export const hardwareSkillColors: Record<string, string> = {
  'PCB Design': 'bg-[var(--accent-cyan)]',
  'Verilog / VHDL': 'bg-[var(--accent-violet)]',
  'Arduino': 'bg-[var(--accent-yellow)]',
  'ESP32/ESP8266': 'bg-[var(--accent-green)]',
  'Analog Circuits': 'bg-[var(--accent-pink)]',
  'Power Electronics': 'bg-[var(--accent-purple)]',
};

export interface HardwareProject {
  title: string; year: string; description: string; details: string; tags: string[]; relatedNotes?: { title: string }[]; image: string; link: string; color: string; status: 'completed' | 'learning' | 'planned';
}

export const hardwareProjectsData: HardwareProject[] = [
  { title: 'Learning Hardware Design', year: '2024-2026', description: 'Currently expanding my knowledge in digital systems, FPGA programming, and PCB design.', details: 'Focusing on learning industry-standard tools and practices.', tags: ['Learning', 'FPGA', 'PCB', 'Verilog'], image: '/personal_website/learn1.gif', link: '#', color: 'bg-[var(--accent-yellow)]', status: 'learning' },
  { title: 'IoT Temperature Monitor', year: '2024', description: 'A simple temperature and humidity monitoring system using ESP8266 and DHT11 sensor.', details: 'First hands-on hardware project.', tags: ['ESP8266', 'IoT', 'Sensors'], image: '/personal_website/learn1.gif', link: '#', color: 'bg-[var(--accent-cyan)]', status: 'completed' },
];

export const hardwareRoadmapData = [
  { phase: 'Phase 1', title: 'Basics', desc: 'Ohm\'s law, basic components', completed: true },
  { phase: 'Phase 2', title: 'Microcontrollers', desc: 'Arduino, ESP32 programming', completed: true },
  { phase: 'Phase 3', title: 'Digital Logic', desc: 'Boolean algebra, flip-flops', completed: true },
  { phase: 'Phase 4', title: 'FPGA & Verilog', desc: 'HDL programming, synthesis', inProgress: true },
  { phase: 'Phase 5', title: 'PCB Design', desc: 'Schematics, layout, fabrication', pending: true },
  { phase: 'Phase 6', title: 'Advanced Systems', desc: 'Signal processing, power', pending: true },
];