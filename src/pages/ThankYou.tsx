import { motion } from 'motion/react';
import { CheckCircle, ArrowLeft, Home as HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ThankYou() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-[80vh] flex items-center justify-center"
    >
      <div className="text-center space-y-8 max-w-lg">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--accent-green)] border-4 border-[var(--border-color)] brutal-shadow"
        >
          <CheckCircle size={48} className="text-[#111]" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl font-display font-black text-[var(--text-color)] uppercase"
        >
          Thanks for your <span className="doodle-highlight">time!</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-[var(--text-color)] opacity-70 leading-relaxed"
        >
          I appreciate you checking out my work. Feel free to reach out if you'd like to collaborate or just say hi!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold bg-[var(--card-bg)] text-[var(--text-color)] border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all"
          >
            <HomeIcon size={20} />
            <span>Back to Home</span>
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-white bg-[var(--accent-pink)] border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all"
          >
            <span>Get In Touch</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}