import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Code, Cpu, Home, Mail, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, color: 'bg-[var(--accent-pink)]' },
    { id: 'projects', label: 'Software', icon: Code, color: 'bg-[var(--accent-cyan)]' },
    { id: 'hardware', label: 'Hardware', icon: Cpu, color: 'bg-[var(--accent-yellow)]' },
    { id: 'notes', label: 'Notes', icon: BookOpen, color: 'bg-[var(--accent-green)]' },
    { id: 'contact', label: 'Contact', icon: Mail, color: 'bg-[var(--accent-purple)]' },
  ];

  const socialItems = [
    { id: 'github', label: 'GitHub', href: 'giorgos_M000@hotmail.com' },
    { id: 'gitlab', label: 'GitLab', href: 'https://gitlab.com/mag30-admin' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/geomas/' },
    { id: 'email', label: 'Email', href: 'mailto:giorgos_M000@hotmail.com' },
  ];

  return (
    <aside className="w-full md:w-72 md:sticky md:top-8 p-4 md:p-8 flex flex-col border-b-4 md:border-4 border-[var(--border-color)] bg-[var(--card-bg)] md:rounded-3xl z-50 sticky top-0 md:h-[calc(100vh-4rem)] brutal-shadow transition-colors duration-300">
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-[var(--border-color)] bg-[var(--accent-yellow)] flex items-center justify-center text-[#111] font-display font-black text-xl shrink-0 brutal-shadow">
            ECE
          </div>
          <div>
            <h1 className="text-[var(--text-color)] font-display font-bold text-xl leading-tight uppercase tracking-tight">George Mastrogiannis</h1>
            <p className="text-[var(--text-color)] text-sm font-mono font-bold hidden md:block"> Ideas to Reality</p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className="md:hidden p-2 rounded-full border-2 border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      <nav className="flex-1 flex flex-row md:flex-col gap-2 md:gap-3 mb-0 md:mb-8 overflow-x-auto pb-4 md:pb-0 no-scrollbar items-center md:items-stretch">
        <div className="flex items-center justify-between mb-2 px-1 hidden md:flex border-b-2 border-[var(--border-color)] pb-1">
          <h2 className="text-xs font-bold text-[var(--text-color)] uppercase tracking-widest">Menu</h2>
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full hover:bg-[var(--border-color)] hover:text-[var(--bg-color)] transition-colors text-[var(--text-color)]"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border-2 border-[var(--border-color)] relative overflow-hidden group ${
                isActive ? `text-[#111] brutal-shadow translate-x-[-2px] translate-y-[-2px]` : 'bg-[var(--card-bg)] text-[var(--text-color)] hover:bg-[var(--border-color)] hover:text-[var(--bg-color)]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBg"
                  className={`absolute inset-0 ${item.color} z-0`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={18} className="relative z-10" />
              <span className="text-sm md:text-base whitespace-nowrap relative z-10 font-display tracking-wide uppercase">{item.label}</span>
              {!isActive && (
                <div className={`absolute inset-0 ${item.color} translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0`} />
              )}
            </button>
          );
        })}
      </nav>

      <div className="space-y-2 hidden md:block">
        <h2 className="text-xs font-bold text-[var(--text-color)] uppercase tracking-widest mb-3 px-1 border-b-2 border-[var(--border-color)] pb-1">Connect</h2>
        <div className="flex flex-wrap gap-2">
          {socialItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="px-3 py-1.5 rounded-full text-xs font-bold text-[var(--text-color)] border-2 border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--border-color)] hover:text-[var(--bg-color)] transition-colors uppercase"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
