import { useState, useEffect, lazy, Suspense, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { SearchModal } from './components/SearchModal';
import { ToastProvider } from './components/Toast';
import { ThemeProvider, useTheme } from './ThemeContext';
import { SearchProvider, useSearch } from './SearchContext';
import { SoundProvider, useSound } from './SoundContext';
import { LanguageProvider } from './LanguageContext';
import { ChevronUp } from 'lucide-react';
import { PageLoader } from './components/Spinner';
import { QuickActionsMenu } from './components/QuickActionsMenu';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Footer } from './components/Footer';
import { useAnalytics } from './lib/analytics';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Projects = lazy(() => import('./pages/Projects').then(m => ({ default: m.Projects })));
const Hardware = lazy(() => import('./pages/Hardware').then(m => ({ default: m.Hardware })));
const Notes = lazy(() => import('./pages/Notes').then(m => ({ default: m.Notes })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const ThankYou = lazy(() => import('./pages/ThankYou').then(m => ({ default: m.ThankYou })));
const Hobbies = lazy(() => import('./pages/Hobbies').then(m => ({ default: m.HobbiesPage })));

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
  const [quickActionsOpen, setQuickActionsOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleSearch } = useSearch();
  const { playScroll } = useSound();
  const lastScrollTime = useRef(0);
  useAnalytics();

  const tabs = ['home', 'projects', 'hardware', 'notes', 'contact', 'thank-you'];
  const currentIndex = tabs.indexOf(location.pathname.replace('/', '') || 'home');

  useEffect(() => {
    const handleOpenQuickActions = () => setQuickActionsOpen(true);
    window.addEventListener('open-quick-actions', handleOpenQuickActions);
    return () => window.removeEventListener('open-quick-actions', handleOpenQuickActions);
  }, []);

  // Scroll position storage
  const scrollPositions = useRef<Record<string, number>>({});
  
  const handleNavigate = useCallback((to: string) => {
    // Check for view transition API support
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        scrollPositions.current[location.pathname] = window.scrollY;
        navigate(to);
        const targetScroll = scrollPositions.current[to] || 0;
        setTimeout(() => window.scrollTo(0, targetScroll), 10);
      });
    } else {
      scrollPositions.current[location.pathname] = window.scrollY;
      navigate(to);
      const targetScroll = scrollPositions.current[to] || 0;
      setTimeout(() => window.scrollTo(0, targetScroll), 10);
    }
  }, [navigate, location.pathname]);

  // Restore scroll on location change
  useEffect(() => {
    const savedPosition = scrollPositions.current[location.pathname];
    if (savedPosition) {
      setTimeout(() => window.scrollTo(0, savedPosition), 10);
    }
  }, [location.pathname]);

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
      const now = Date.now();
      if (now - lastScrollTime.current > 200) {
        playScroll();
        lastScrollTime.current = now;
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcuts when typing in inputs
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName);
      
      // Toggle search: /
      if (e.key === '/' && !isTyping) {
        e.preventDefault();
        toggleSearch();
      }
      
      // Quick actions: Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setQuickActionsOpen(prev => !prev);
      }
      
      // Open analytics: Alt + A
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setAnalyticsOpen(prev => !prev);
      }
      
      // Open GitHub: G
      if (e.key === 'g' && !isTyping && !e.metaKey && !e.ctrlKey) {
        window.open('https://github.com/Je0Dev', '_blank');
      }
      
      // Open LinkedIn: L
      if (e.key === 'l' && !isTyping && !e.metaKey && !e.ctrlKey) {
        window.open('https://www.linkedin.com/in/geomas/', '_blank');
      }
      
      // Toggle theme: Alt + T
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
      }
      
      // Go home: Alt + H
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        navigate('/');
      }
      
      // Scroll to top: Home
      if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Scroll to bottom: End
      if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
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
  }, [toggleSearch, navigate, currentIndex, tabs, touchStart, playScroll]);

  const activeTab = location.pathname.replace('/', '') || 'home';
  const setActiveTab = (tab: string) => handleNavigate(tab);

  return (
    <div className={`min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] selection:bg-[var(--accent-pink)] selection:text-white relative overflow-hidden transition-colors duration-300 ${theme}`}>
      <BackgroundDoodles activeTab={activeTab} />
      <SearchModal />
      <QuickActionsMenu isOpen={quickActionsOpen} onClose={() => setQuickActionsOpen(false)} navigate={(path) => { navigate(path); setQuickActionsOpen(false); }} toggleTheme={toggleTheme} openAnalytics={() => setAnalyticsOpen(true)} />
      <AnalyticsDashboard isOpen={analyticsOpen} onClose={() => setAnalyticsOpen(false)} />
      
      <motion.div 
        className="fixed top-20 left-20 w-64 h-64 bg-[var(--accent-pink)] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 pointer-events-none z-0"
        animate={{ x: mousePos.x * 0.05, y: mousePos.y * 0.05, scale: [1, 1.1, 1] }}
        transition={{ scale: { duration: 4, repeat: Infinity } }}
      />
      <motion.div 
        className="fixed bottom-20 right-20 w-80 h-80 bg-[var(--accent-purple)] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 pointer-events-none z-0"
        animate={{ x: mousePos.x * -0.05, y: mousePos.y * -0.05, scale: [1, 1.15, 1] }}
        transition={{ scale: { duration: 5, repeat: Infinity } }}
      />
      <motion.div 
        className="fixed top-1/2 left-1/2 w-72 h-72 bg-[var(--accent-cyan)] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 dark:opacity-8 pointer-events-none z-0"
        animate={{ x: mousePos.x * 0.02, y: mousePos.y * -0.02, scale: [1, 1.1, 1] }}
        transition={{ scale: { duration: 6, repeat: Infinity } }}
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
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home setActiveTab={setActiveTab} />} />
                <Route path="projects" element={<Projects setActiveTab={setActiveTab} />} />
                <Route path="hardware" element={<Hardware setActiveTab={setActiveTab} />} />
                <Route path="notes" element={<Notes setActiveTab={setActiveTab} />} />
                <Route path="contact" element={<Contact />} />
                <Route path="hobbies" element={<Hobbies />} />
                <Route path="thank-you" element={<ThankYou />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
          <Footer />
        </main>
        
        
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: scrollProgress > 10 ? 1 : 0, y: scrollProgress > 10 ? 0 : 20 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-[150] p-4 bg-[var(--accent-cyan)] text-[#111] rounded border-4 border-[var(--border-color)] brutal-shadow hover:translate-y-[-2px] hover:shadow-none transition-all"
      >
        <ChevronUp size={24} className="font-bold" />
      </motion.button>
    </div>
  );
}

import { FontProvider } from './components/FontSelector';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SearchProvider>
          <ToastProvider>
            <SoundProvider>
              <FontProvider>
                <MainAppContent />
              </FontProvider>
            </SoundProvider>
          </ToastProvider>
        </SearchProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}