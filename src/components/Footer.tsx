import { motion } from 'motion/react';
import { Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/Je0Dev', icon: Github, color: 'hover:text-[var(--accent-pink)]' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/geomas/', icon: Linkedin, color: 'hover:text-[var(--accent-cyan)]' },
  { id: 'email', label: 'Email', href: 'mailto:giorgos_M000@hotmail.com', icon: Mail, color: 'hover:text-[var(--accent-purple)]' },
];

export function Footer() {
  return (
    <footer className="w-full py-8 mt-16 border-t-4 border-[var(--border-color)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        {/* Center - Copyright with link */}
        <div className="text-center order-2 md:order-1">
          <p className="text-sm font-bold text-[var(--text-color)]">
            <a 
              href="https://github.com/Je0Dev/personal_website" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline decoration-2 decoration-[var(--accent-pink)] underline-offset-4 text-[var(--accent-pink)] hover:decoration-[var(--accent-cyan)] transition-colors"
            >
              © {new Date().getFullYear()} George Mastrogiannis
            </a>
          </p>
        </div>

        {/* Right - Social links */}
        <div className="flex items-center gap-4 order-1 md:order-2">
          {socialLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1 text-xs font-bold text-[var(--text-color)] ${link.color} transition-colors`}
              aria-label={link.label}
            >
              <link.icon size={16} />
              <span className="underline underline-offset-2">{link.label}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}