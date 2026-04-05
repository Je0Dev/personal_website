import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import { ToastProvider } from './components/Toast';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Hardware } from './pages/Hardware';
import { Notes } from './pages/Notes';
import { Contact } from './pages/Contact';
import { ThankYou } from './pages/ThankYou';
import { ThemeProvider, useTheme } from './ThemeContext';
import { SearchProvider, useSearch } from './SearchContext';
import { ChevronUp } from 'lucide-react';

function BackgroundDoodles({ activeTab }: { activeTab: string }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {activeTab === 'home' && (
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--accent-pink)] rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      )}
      {activeTab === 'projects' && (
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[var(--accent-cyan)] rounded-full mix-blend-multiply filter blur-3xl opacity-25"
        />
      )}
    </div>
  );
}

function MainAppContent() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleSearch } = useSearch();

  const tabs = ['home', 'projects', 'hardware', 'notes', 'contact', 'thank-you'];
  const currentIndex = tabs.indexOf(location.pathname.replace('/', '') || 'home');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollTop / docHeight) * 100);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        toggleSearch();
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart) return;
      const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
      const diffX = touchStart.x - touchEnd.x;
      const diffY = touchStart.y - touchEnd.y;
      
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 2) {
        if (diffX > 0 && currentIndex < tabs.length - 1) {
          navigate(`/${tabs[currentIndex + 1]}`);
        } else if (diffX < 0 && currentIndex > 0) {
          navigate(`/${tabs[currentIndex - 1]}`);
        }
      }
      setTouchStart(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [toggleSearch, navigate, currentIndex, tabs, touchStart]);

  const activeTab = location.pathname.replace('/', '') || 'home';
  const setActiveTab = (tab: string) => navigate(`/${tab}`);

  return (
    <div className={`min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-[var(--accent-pink)] selection:text-white relative overflow-hidden transition-colors duration-300 ${theme}`}>
      <BackgroundDoodles activeTab={activeTab} />
      <SearchModal />
      
      <motion.div 
        className="fixed top-20 left-20 w-64 h-64 bg-[var(--accent-pink)] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 pointer-events-none z-0"
        animate={{ x: mousePos.x * 0.05, y: mousePos.y * 0.05 }}
      />
      <motion.div 
        className="fixed bottom-20 right-20 w-80 h-80 bg-[var(--accent-purple)] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 pointer-events-none z-0"
        animate={{ x: mousePos.x * -0.05, y: mousePos.y * -0.05 }}
      />
      <motion.div 
        className="fixed top-1/2 left-1/2 w-72 h-72 bg-[var(--accent-cyan)] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 dark:opacity-8 pointer-events-none z-0"
        animate={{ x: mousePos.x * 0.02, y: mousePos.y * -0.02 }}
      />
      
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.05] dark:opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(to right, var(--border-color) 1px, transparent 1px), linear-gradient(to bottom, var(--border-color) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <motion.div 
        className="fixed top-0 left-0 h-1.5 z-[200]"
        style={{ 
          width: `${scrollProgress}%`,
          background: scrollProgress < 25 
            ? 'var(--accent-pink)' 
            : scrollProgress < 50 
              ? 'var(--accent-purple)' 
              : scrollProgress < 75 
                ? 'var(--accent-cyan)' 
                : 'var(--accent-yellow)'
        }}
      />
      
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8 p-4 md:p-8 relative z-10">
        <div className="md:w-72 shrink-0">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        
        <main className="flex-1 min-h-screen pb-20">
          <Routes>
            <Route path="/" element={<Home setActiveTab={setActiveTab} />} />
            <Route path="projects" element={<Projects setActiveTab={setActiveTab} />} />
            <Route path="hardware" element={<Hardware setActiveTab={setActiveTab} />} />
            <Route path="notes" element={<Notes setActiveTab={setActiveTab} />} />
            <Route path="contact" element={<Contact />} />
            <Route path="thank-you" element={<ThankYou />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <div className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-4 p-4 border-4 border-[var(--border-color)] bg-[var(--card-bg)] rounded-3xl brutal-shadow space-y-4">
            <h3 className="text-sm font-display font-black text-[var(--text-color)] uppercase tracking-wide">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {[
                { label: 'My GitHub', href: 'https://github.com/Je0Dev', color: 'var(--accent-pink)' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/geomas/', color: 'var(--accent-cyan)' },
                { label: 'University', href: 'https://www.upatras.gr/', color: 'var(--accent-purple)' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-[var(--text-color)] hover:text-white bg-[var(--bg-color)] border-2 border-[var(--border-color)] px-3 py-2 rounded-lg hover:bg-[var(--border-color)] transition-colors"
                  style={{ borderLeftColor: link.color, borderLeftWidth: '4px' }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-4 border-t-2 border-[var(--border-color)]">
              <p className="text-xs text-[var(--text-color)] opacity-60 mb-2">Current Page</p>
              <p className="text-sm font-bold text-[var(--accent-cyan)] uppercase">{activeTab}</p>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: scrollProgress > 10 ? 1 : 0, y: scrollProgress > 10 ? 0 : 20 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-[150] p-4 bg-[var(--accent-cyan)] text-[#111] rounded-full border-4 border-[var(--border-color)] brutal-shadow hover:translate-y-[-2px] hover:shadow-none transition-all"
      >
        <ChevronUp size={24} className="font-bold" />
      </motion.button>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SearchProvider>
        <ToastProvider>
          <MainAppContent />
        </ToastProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}