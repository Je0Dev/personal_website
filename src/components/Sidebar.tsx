import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Code, Cpu, Home, Mail, Moon, Sun, Github, Linkedin, ExternalLink, Search, Menu, X } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useSearch } from '../SearchContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SoundToggle } from './SoundToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useSound } from '../SoundContext';
import { FontSelector } from './FontSelector';
import { useLanguage } from '../LanguageContext';
import { useToast } from '../components/Toast';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const { toggleSearch } = useSearch();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { play } = useSound();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const navItems = [
    { id: 'home', label: t.nav.home, color: 'bg-[var(--accent-pink)]', gif: '/gif1.gif' },
    { id: 'projects', label: t.nav.projects, color: 'bg-[var(--accent-cyan)]', gif: '/movies1.gif' },
    { id: 'hardware', label: t.nav.hardware, color: 'bg-[var(--accent-yellow)]', gif: '/learn1.gif' },
    { id: 'notes', label: t.nav.notes, color: 'bg-[var(--accent-green)]', gif: '/gif2.gif' },
    { id: 'hobbies', label: 'Hobbies', color: 'bg-[var(--accent-violet)]', gif: '/gif1.gif' },
    { id: 'contact', label: t.nav.contact, color: 'bg-[var(--accent-purple)]', gif: '/gif1.gif' },
  ];

  const navGifs: Record<string, string> = {
    home: '/gif1.gif',
    projects: '/movies1.gif',
    hardware: '/learn1.gif',
    notes: '/gif2.gif',
    hobbies: '/gif1.gif',
    contact: '/gif1.gif',
  };

  const socialItems = [
    { id: 'github', label: 'GitHub', href: 'https://github.com/Je0Dev', icon: Github, hoverColor: 'hover:bg-[var(--accent-pink)]' },
    { id: 'gitlab', label: 'GitLab', href: 'https://gitlab.com/mag30-admin', icon: ExternalLink, hoverColor: 'hover:bg-[var(--accent-yellow)]' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/geomas/', icon: Linkedin, hoverColor: 'hover:bg-[var(--accent-cyan)]' },
    { id: 'email', label: 'Email', href: 'mailto:giorgos_M000@hotmail.com', icon: Mail, hoverColor: 'hover:bg-[var(--accent-green)]' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Burger Button - rectangular, top right */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 right-4 z-[160] px-4 py-3 bg-[var(--card-bg)] border-4 border-[var(--border-color)] rounded-xl brutal-shadow flex items-center justify-center"
        aria-label="Open menu"
      >
        <Menu size={24} className="text-[var(--text-color)]" />
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-[170] bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[180] bg-[var(--card-bg)] border-r-4 border-[var(--border-color)] overflow-y-auto"
          >
            <div className="p-4">
              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  className="p-2 bg-[var(--bg-color)] border-2 border-[var(--border-color)] rounded-lg"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Mobile Content - Same as desktop sidebar but with close on nav */}
              <div className="flex flex-col gap-4">
                {/* Profile */}
                <div className="pb-4 border-b-4 border-[var(--border-color)]">
                  <div className="flex items-center gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} onClick={() => { navigate('/'); setMobileOpen(false); }}
                      className="w-16 h-16 shrink-0 brutal-shadow cursor-pointer">
                      <img src={isNameHovered ? "/gif2.gif" : "/gif1.gif"} alt="Profile" className="w-full h-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                    </motion.div>
                    <div>
                      <h1 onClick={() => { navigate('/'); setMobileOpen(false); }} className="text-lg font-display font-black uppercase cursor-pointer hover:text-[var(--accent-pink)]">George</h1>
                      <p className="text-xs font-mono opacity-60">{t.home.studentAt}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Theme Toggle */}
                <button onClick={() => { toggleTheme(); setMobileOpen(false); }} className="flex items-center justify-between p-3 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-color)]">
                  <span className="text-sm font-bold uppercase">{t.sidebar.theme}</span>
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>

                {/* Mobile Search */}
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                  <input type="text" placeholder={t.sidebar.search} onClick={() => { toggleSearch(); setMobileOpen(false); }} readOnly
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-sm cursor-pointer" />
                </div>

                {/* Mobile Sound & Language */}
                <div className="flex gap-2">
                  <SoundToggle />
                  <LanguageSwitcher />
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <motion.button key={item.id} onClick={() => { play('click'); handleNavClick(item.id); }} onMouseEnter={() => { play('hover'); setHoveredNav(item.id); }} onMouseLeave={() => setHoveredNav(null)} whileTap={{ scale: 0.95 }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold border-2 border-[var(--border-color)] relative overflow-hidden ${isActive ? `text-white ${item.color} brutal-shadow` : 'bg-[var(--bg-color)] hover:bg-[var(--border-color)] hover:text-[var(--bg-color)]'}`}>
                        {hoveredNav === item.id && !isActive && <img src={navGifs[item.id]} alt="" className="absolute inset-0 w-full h-full object-cover -z-10 opacity-50 grayscale" />}
                        <span className="uppercase">{item.label}</span>
                      </motion.button>
                    );
                  })}
                </nav>

                {/* Mobile Social */}
                <div className="pt-4 border-t-4 border-[var(--border-color)]">
                  <div className="flex flex-wrap gap-2">
                    {socialItems.map((item) => (
                      <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border-2 border-[var(--border-color)] bg-[var(--bg-color)] ${item.hoverColor} hover:text-white`}>
                        <item.icon size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

{/* Desktop Sidebar - Sticky */}
      <aside className="hidden md:block w-72 shrink-0">
        <div className="sticky top-4 p-4 flex flex-col gap-3 border-4 border-[var(--border-color)] bg-[var(--card-bg)] rounded-3xl brutal-shadow">
          {/* Profile - Rectangular Button with GIF */}
          <div className="pb-3 border-b-4 border-[var(--border-color)]">
            <motion.button whileHover={{ scale: 1.02 }} onMouseEnter={() => setIsNameHovered(true)} onMouseLeave={() => setIsNameHovered(false)} onClick={() => { showToast("ECE Student @ University of Patras | Building software and hardware"); navigate('/'); }}
              className="w-full flex items-center gap-3 p-3 rounded-lg border-2 border-[var(--border-color)] bg-[var(--bg-color)] hover:border-[var(--accent-cyan)] transition-colors cursor-pointer">
              <img src={isNameHovered ? "/gif2.gif" : "/gif1.gif"} alt="Profile" className="w-12 h-12 rounded-lg object-cover shrink-0" referrerPolicy="no-referrer" />
              <div className="text-left">
                <h1 className="text-base font-display font-black uppercase truncate">George</h1>
                <p className="text-xs font-mono opacity-60">{t.home.studentAt}</p>
              </div>
            </motion.button>
          </div>

          {/* Theme Toggle - Rectangular */}
          <div className="flex items-center justify-between p-3 rounded-lg border-2 border-[var(--border-color)] bg-[var(--bg-color)]">
            <span className="text-sm font-bold uppercase">{t.sidebar.theme}</span>
            <button onClick={toggleTheme} className="p-2 rounded hover:bg-[var(--border-color)] hover:text-[var(--bg-color)] transition-colors">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>

          {/* Sound & Language - First */}
          <div className="flex gap-2">
            <SoundToggle />
            <LanguageSwitcher />
          </div>

          {/* Search - After languages */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input type="text" placeholder={t.sidebar.search} onClick={toggleSearch} readOnly className="w-full pl-10 pr-4 py-2.5 rounded-lg border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-sm cursor-pointer hover:border-[var(--accent-cyan)]" />
          </div>

          {/* Navigation with line before Home */}
          <nav className="flex flex-col gap-2">
            {/* Differentiating line before Home */}
            <div className="h-1 bg-gradient-to-r from-[var(--accent-pink)] via-[var(--accent-cyan)] to-[var(--accent-purple)] rounded-full mb-1" />
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <motion.button key={item.id} onClick={() => { play('click'); setActiveTab(item.id); }} onMouseEnter={() => { play('hover'); setHoveredNav(item.id); }} onMouseLeave={() => setHoveredNav(null)} whileTap={{ scale: 0.95 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold border-2 border-[var(--border-color)] relative overflow-hidden ${isActive ? `text-white ${item.color} brutal-shadow translate-x-[-2px] translate-y-[-2px]` : 'bg-[var(--bg-color)] hover:bg-[var(--border-color)] hover:text-[var(--bg-color)]'}`}>
                  {hoveredNav === item.id && !isActive && <img src={navGifs[item.id]} alt="" className="absolute inset-0 w-full h-full object-cover -z-10 opacity-50 grayscale" />}
                  <span className="uppercase">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Social */}
          <div className="pt-3 border-t-4 border-[var(--border-color)]">
            <div className="flex flex-wrap gap-2">
              {socialItems.map((item) => (
                <motion.a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-bold border-2 border-[var(--border-color)] bg-[var(--bg-color)] ${item.hoverColor} hover:text-white`}>
                  <item.icon size={14} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Font Selector */}
          <div className="pt-3">
            <FontSelector />
          </div>
        </div>
      </aside>
    </>
  );
}