import { motion } from 'motion/react';
import { BookOpen, Code, Cpu, Home, Mail, Moon, Sun, Github, Linkedin, ExternalLink, Search } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useSearch } from '../SearchContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const { toggleSearch } = useSearch();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', color: 'bg-[var(--accent-pink)]', gif: '/personal_website/gif1.gif' },
    { id: 'projects', label: 'Projects', color: 'bg-[var(--accent-cyan)]', gif: '/personal_website/movies1.gif' },
    { id: 'hardware', label: 'Hardware', color: 'bg-[var(--accent-yellow)]', gif: '/personal_website/learn1.gif' },
    { id: 'notes', label: 'Notes', color: 'bg-[var(--accent-green)]', gif: '/personal_website/gif2.gif' },
    { id: 'contact', label: 'Contact', color: 'bg-[var(--accent-purple)]', gif: '/personal_website/gif1.gif' },
  ];

  const navGifs: Record<string, string> = {
    home: '/personal_website/gif1.gif',
    projects: '/personal_website/movies1.gif',
    hardware: '/personal_website/learn1.gif',
    notes: '/personal_website/gif2.gif',
    contact: '/personal_website/gif1.gif',
  };

  const socialItems = [
    { id: 'github', label: 'GitHub', href: 'https://github.com/Je0Dev', icon: Github, hoverColor: 'hover:bg-[var(--accent-pink)]' },
    { id: 'gitlab', label: 'GitLab', href: 'https://gitlab.com/mag30-admin', icon: ExternalLink, hoverColor: 'hover:bg-[var(--accent-yellow)]' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/geomas/', icon: Linkedin, hoverColor: 'hover:bg-[var(--accent-cyan)]' },
    { id: 'email', label: 'Email', href: 'mailto:giorgos_M000@hotmail.com', icon: Mail, hoverColor: 'hover:bg-[var(--accent-green)]' },
  ];

  return (
    <aside className="w-full md:w-72 shrink-0">
      <div className="sticky top-4 p-4 md:p-6 flex flex-col gap-4 border-4 border-[var(--border-color)] bg-[var(--card-bg)] md:rounded-3xl brutal-shadow transition-colors duration-300">
        
        {/* Profile Section */}
        <div className="pb-4 border-b-4 border-[var(--border-color)]">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setIsNameHovered(true)}
              onMouseLeave={() => setIsNameHovered(false)}
              onClick={() => navigate('/')}
              className="w-16 h-16 rounded-2xl border-3 border-[var(--border-color)] overflow-hidden shrink-0 brutal-shadow cursor-pointer"
            >
              <img 
                src={isNameHovered ? "/personal_website/gif2.gif" : "/personal_website/gif1.gif"} 
                alt="Profile" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="flex-1 min-w-0">
              <h1 
                onClick={() => navigate('/')}
                className="text-lg font-display font-black leading-tight uppercase tracking-tight truncate cursor-pointer hover:text-[var(--accent-pink)] transition-colors"
              >
                George Mastrogiannis
              </h1>
              <p className="text-xs font-mono text-[var(--text-color)] opacity-60">ECE Student @UoP</p>
            </div>
          </div>
        </div>

        {/* Mobile Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="md:hidden flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] font-bold hover:bg-[var(--border-color)] hover:text-[var(--bg-color)] transition-colors"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
        </button>

        {/* Desktop Theme Toggle - Before Search */}
        <div className="hidden md:flex items-center justify-between p-3 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-color)]">
          <span className="text-sm font-bold text-[var(--text-color)] uppercase tracking-wide">Theme</span>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[var(--border-color)] hover:text-[var(--bg-color)] transition-colors text-[var(--text-color)]"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* Search Bar - Always Visible */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-color)] opacity-50" />
          <input 
            type="text"
            placeholder="Search..."
            onClick={() => toggleSearch()}
            readOnly
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] font-medium text-sm cursor-pointer hover:border-[var(--accent-cyan)] transition-colors"
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 border-[var(--border-color)] relative overflow-hidden group ${
                  isActive 
                    ? `text-white brutal-shadow translate-x-[-2px] translate-y-[-2px] ${item.color}` 
                    : 'bg-[var(--bg-color)] text-[var(--text-color)] hover:bg-[var(--border-color)] hover:text-[var(--bg-color)]'
                }`}
              >
                {hoveredNav === item.id && !isActive && (
                  <>
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      src={navGifs[item.id]}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover -z-10 grayscale brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-pink)]/40 to-transparent -z-10" />
                  </>
                )}
                {hoveredNav === item.id && isActive && (
                  <>
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      src={navGifs[item.id]}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover -z-10 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent -z-10" />
                  </>
                )}
                <span className={`relative z-10 font-display tracking-wide uppercase ${isActive ? 'text-white' : ''}`}>{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Social Links */}
        <div className="space-y-2 pt-2 border-t-4 border-[var(--border-color)]">
          <h2 className="text-xs font-bold text-[var(--text-color)] uppercase tracking-widest px-1 hidden md:block">Connect</h2>
          <div className="flex flex-wrap gap-2">
            {socialItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-[var(--text-color)] border-2 border-[var(--border-color)] bg-[var(--bg-color)] ${item.hoverColor} hover:text-white transition-colors`}
              >
                <item.icon size={14} />
                <span className="hidden sm:inline">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
