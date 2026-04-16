import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { useSound } from '../SoundContext';

export function SoundToggle() {
  const { enabled, toggle, play } = useSound();

  return (
    <motion.button
      onClick={() => { toggle(); play('click'); }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border-2 border-[var(--border-color)] bg-[var(--bg-color)] text-[var(--text-color)] hover:border-[var(--accent-pink)] transition-colors"
      aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {enabled ? <Volume2 size={16} className="text-[var(--accent-pink)]" /> : <VolumeX size={16} />}
    </motion.button>
  );
}