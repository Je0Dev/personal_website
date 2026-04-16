import { motion } from 'motion/react';

interface PixelAvatarProps {
  size?: number;
  className?: string;
}

const pixelColors = {
  skin: '#FFD5B5',
  skinDark: '#E5B896',
  hair: '#4A3728',
  hairDark: '#3A2718',
  shirt: '#FF6B9D',
  shirtDark: '#E55A8A',
  shirtLight: '#FF8DB3',
  outline: '#1a1a1a',
  eye: '#1a1a1a',
  white: '#FFFFFF',
};

export function PixelAvatar({ size = 80, className = '' }: PixelAvatarProps) {
  const pixelSize = size / 10;
  
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Hair (top) */}
        <rect x="2" y="0" width="6" height="2" fill={pixelColors.hair}/>
        <rect x="1" y="1" width="1" height="1" fill={pixelColors.hair}/>
        <rect x="8" y="1" width="1" height="1" fill={pixelColors.hair}/>
        <rect x="0" y="2" width="1" height="1" fill={pixelColors.hairDark}/>
        <rect x="9" y="2" width="1" height="1" fill={pixelColors.hairDark}/>
        
        {/* Face */}
        <rect x="2" y="2" width="6" height="4" fill={pixelColors.skin}/>
        <rect x="3" y="3" width="1" height="1" fill={pixelColors.skinDark}/>
        <rect x="6" y="3" width="1" height="1" fill={pixelColors.skinDark}/>
        
        {/* Eyes */}
        <rect x="3" y="3" width="1" height="1" fill={pixelColors.white}/>
        <rect x="6" y="3" width="1" height="1" fill={pixelColors.white}/>
        <rect x="3" y="3.5" width="0.5" height="0.5" fill={pixelColors.eye}/>
        <rect x="6" y="3.5" width="0.5" height="0.5" fill={pixelColors.eye}/>
        
        {/* Nose */}
        <rect x="4.5" y="4" width="1" height="0.5" fill={pixelColors.skinDark}/>
        
        {/* Mouth */}
        <rect x="4" y="5" width="2" height="0.5" fill={pixelColors.shirtLight}/>
        
        {/* Body/Shirt */}
        <rect x="2" y="6" width="6" height="2" fill={pixelColors.shirt}/>
        <rect x="3" y="6" width="1" height="1" fill={pixelColors.shirtDark}/>
        <rect x="6" y="6" width="1" height="1" fill={pixelColors.shirtLight}/>
        <rect x="2" y="8" width="1" height="2" fill={pixelColors.shirtDark}/>
        <rect x="7" y="8" width="1" height="2" fill={pixelColors.shirtLight}/>
        
        {/* Arms (simple) */}
        <rect x="1" y="7" width="1" height="2" fill={pixelColors.skin}/>
        <rect x="8" y="7" width="1" height="2" fill={pixelColors.skin}/>
        <rect x="0" y="8" width="1" height="1" fill={pixelColors.skinDark}/>
        <rect x="9" y="8" width="1" height="1" fill={pixelColors.skinDark}/>
        
        {/* Pixel grid outline effect */}
        <rect x="0" y="0" width="10" height="10" stroke={pixelColors.outline} strokeWidth="0.5" fill="none"/>
      </svg>
    </motion.div>
  );
}

export function PixelAvatarLarge({ size = 200, className = '' }: PixelAvatarProps) {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 rounded-lg animate-pulse-subtle"
        style={{
          background: 'radial-gradient(circle, var(--accent-pink) 0%, transparent 70%)',
          opacity: 0.3,
          transform: 'scale(1.1)'
        }}
      />
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10">
        {/* Hair back */}
        <rect x="2" y="0" width="12" height="3" fill={pixelColors.hair}/>
        <rect x="0" y="2" width="2" height="3" fill={pixelColors.hairDark}/>
        <rect x="14" y="2" width="2" height="3" fill={pixelColors.hairDark}/>
        
        {/* Hair front */}
        <rect x="3" y="1" width="10" height="2" fill={pixelColors.hair}/>
        <rect x="1" y="2" width="1" height="2" fill={pixelColors.hair}/>
        <rect x="14" y="2" width="1" height="2" fill={pixelColors.hair}/>
        
        {/* Face */}
        <rect x="3" y="3" width="10" height="6" fill={pixelColors.skin}/>
        <rect x="4" y="4" width="2" height="1" fill={pixelColors.skinDark} opacity="0.3"/>
        <rect x="10" y="4" width="2" height="1" fill={pixelColors.skinDark} opacity="0.3"/>
        
        {/* Eyes */}
        <rect x="4" y="4" width="2" height="2" fill={pixelColors.white}/>
        <rect x="10" y="4" width="2" height="2" fill={pixelColors.white}/>
        <rect x="4.5" y="5" width="1" height="1" fill={pixelColors.eye}/>
        <rect x="10.5" y="5" width="1" height="1" fill={pixelColors.eye}/>
        
        {/* Eye shine */}
        <rect x="4.2" y="4.2" width="0.5" height="0.5" fill={pixelColors.white}/>
        <rect x="10.2" y="4.2" width="0.5" height="0.5" fill={pixelColors.white}/>
        
        {/* Nose */}
        <rect x="7" y="6" width="2" height="1" fill={pixelColors.skinDark}/>
        
        {/* Mouth */}
        <rect x="6" y="8" width="4" height="1" fill="#FF6B9D"/>
        
        {/* Neck */}
        <rect x="6" y="9" width="4" height="1" fill={pixelColors.skinDark}/>
        
        {/* Body */}
        <rect x="3" y="10" width="10" height="4" fill={pixelColors.shirt}/>
        <rect x="4" y="10" width="2" height="2" fill={pixelColors.shirtDark}/>
        <rect x="10" y="10" width="2" height="2" fill={pixelColors.shirtLight}/>
        
        {/* Arms */}
        <rect x="1" y="10" width="2" height="3" fill={pixelColors.skin}/>
        <rect x="13" y="10" width="2" height="3" fill={pixelColors.skin}/>
        
        {/* Shoulders */}
        <rect x="0" y="11" width="1" height="2" fill={pixelColors.skinDark}/>
        <rect x="15" y="11" width="1" height="2" fill={pixelColors.skinDark}/>
        
        {/* Outline */}
        <rect x="0" y="0" width="16" height="16" stroke={pixelColors.outline} strokeWidth="0.5" fill="none"/>
      </svg>
    </motion.div>
  );
}