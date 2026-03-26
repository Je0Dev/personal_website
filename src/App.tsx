
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Hardware } from './pages/Hardware';
import { Notes } from './pages/Notes';
import { Contact } from './pages/Contact';
import { ThemeProvider, useTheme } from './ThemeContext';

function BackgroundDoodles({ activeTab }: { activeTab: string }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -100]);
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 180]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -120]);
  
  // Opacity transforms so doodles appear after scrolling
  const opacity1 = useTransform(scrollY, [50, 200], [0, 0.4]);
  const opacity2 = useTransform(scrollY, [150, 300], [0, 0.4]);
  const opacity3 = useTransform(scrollY, [250, 400], [0, 0.4]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div key="home-doodles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            {/* Star Doodle */}
            <motion.svg style={{ y: y1, rotate: rotate1, opacity: opacity1 }} className="absolute top-[20%] left-[5%] w-16 h-16 text-[var(--accent-pink)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" />
            </motion.svg>
            {/* Squiggle Doodle */}
            <motion.svg style={{ y: y2, rotate: rotate2, opacity: opacity2 }} className="absolute top-[50%] right-[5%] w-24 h-24 text-[var(--accent-cyan)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 50 Q 25 10, 50 50 T 90 50" />
            </motion.svg>
            {/* Circle Doodle */}
            <motion.svg style={{ y: y3, rotate: rotate1, opacity: opacity3 }} className="absolute bottom-[20%] left-[10%] w-20 h-20 text-[var(--accent-yellow)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="50" cy="50" r="40" strokeDasharray="10 10" />
              <circle cx="50" cy="50" r="20" />
            </motion.svg>
          </motion.div>
        )}

        
        {activeTab === 'projects' && (
          <motion.div key="projects-doodles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            {/* Code Brackets */}
            <motion.svg style={{ y: y1, rotate: rotate1, opacity: opacity1 }} className="absolute top-[30%] left-[8%] w-20 h-20 text-[var(--accent-cyan)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M30 20 L10 50 L30 80 M70 20 L90 50 L70 80" />
            </motion.svg>
            {/* Git Branch */}
            <motion.svg style={{ y: y2, rotate: rotate2, opacity: opacity2 }} className="absolute top-[60%] right-[10%] w-24 h-24 text-[var(--accent-pink)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="20" cy="80" r="10" />
              <circle cx="20" cy="20" r="10" />
              <circle cx="80" cy="50" r="10" />
              <path d="M20 70 L20 30 M20 70 Q 20 50, 50 50 T 70 50" />
            </motion.svg>
          </motion.div>
        )}

        {activeTab === 'hardware' && (
          <motion.div key="hardware-doodles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            {/* Resistor */}
            <motion.svg style={{ y: y1, rotate: rotate1, opacity: opacity1 }} className="absolute top-[25%] left-[5%] w-24 h-24 text-[var(--accent-yellow)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 50 L30 50 L35 30 L45 70 L55 30 L65 70 L70 50 L90 50" />
            </motion.svg>
            {/* Lightning */}
            <motion.svg style={{ y: y2, rotate: rotate2, opacity: opacity2 }} className="absolute top-[55%] right-[8%] w-16 h-16 text-[var(--accent-cyan)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M50 10 L20 50 L50 50 L40 90 L80 40 L50 40 Z" />
            </motion.svg>
          </motion.div>
        )}

        {activeTab === 'notes' && (
          <motion.div key="notes-doodles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            {/* Pencil */}
            <motion.svg style={{ y: y1, rotate: rotate1, opacity: opacity1 }} className="absolute top-[20%] left-[10%] w-20 h-20 text-[var(--accent-green)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 80 L20 60 L70 10 L90 30 L40 80 Z M20 80 L40 80 M70 10 L80 20" />
            </motion.svg>
            {/* Speech Bubble */}
            <motion.svg style={{ y: y2, rotate: rotate2, opacity: opacity2 }} className="absolute top-[60%] right-[10%] w-20 h-20 text-[var(--accent-yellow)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 20 L90 20 L90 70 L60 70 L30 90 L30 70 L10 70 Z" />
              <circle cx="30" cy="45" r="4" fill="currentColor" />
              <circle cx="50" cy="45" r="4" fill="currentColor" />
              <circle cx="70" cy="45" r="4" fill="currentColor" />
            </motion.svg>
          </motion.div>
        )}

        {activeTab === 'contact' && (
          <motion.div key="contact-doodles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            {/* Envelope */}
            <motion.svg style={{ y: y1, rotate: rotate1, opacity: opacity1 }} className="absolute top-[25%] left-[8%] w-24 h-24 text-[var(--accent-purple)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 30 L90 30 L90 70 L10 70 Z M10 30 L50 60 L90 30" />
            </motion.svg>
            {/* Paper Plane */}
            <motion.svg style={{ y: y2, rotate: rotate2, opacity: opacity2 }} className="absolute top-[50%] right-[10%] w-20 h-20 text-[var(--accent-pink)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 50 L90 10 L50 90 L40 60 Z M90 10 L40 60" />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'projects':
        return <Projects />;
      case 'hardware':
        return <Hardware />;
      case 'notes':
        return <Notes />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-[var(--accent-pink)] selection:text-white relative overflow-hidden transition-colors duration-300 ${theme}`}>
      <BackgroundDoodles activeTab={activeTab} />
      
      {/* Dynamic Background Elements */}
      <motion.div 
        className="fixed top-20 left-20 w-64 h-64 bg-[var(--accent-yellow)] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-40 dark:opacity-20 pointer-events-none z-0"
        animate={{ x: mousePos.x * 0.05, y: mousePos.y * 0.05 }}
      />
      <motion.div 
        className="fixed bottom-20 right-20 w-80 h-80 bg-[var(--accent-pink)] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-15 pointer-events-none z-0"
        animate={{ x: mousePos.x * -0.05, y: mousePos.y * -0.05 }}
      />
      <motion.div 
        className="fixed top-1/2 left-1/2 w-72 h-72 bg-[var(--accent-cyan)] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-15 pointer-events-none z-0"
        animate={{ x: mousePos.x * 0.02, y: mousePos.y * -0.02 }}
      />
      
      {/* Subtle grid background */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] dark:opacity-[0.1]" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, var(--border-color) 1px, transparent 1px), linear-gradient(to bottom, var(--border-color) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} 
      />
      
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8 p-4 md:p-8 relative z-10">
        <div className="md:w-72 shrink-0">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        <main className="flex-1 min-h-screen pb-20">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
