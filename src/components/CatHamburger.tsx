export function CatHamburger({ className = '', size = 200 }: { className?: string; size?: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bottom bun */}
      <path d="M20 150 Q100 190 180 150 L180 160 Q100 200 20 160 Z" fill="#D4A574"/>
      <path d="M20 150 Q100 190 180 150" stroke="#B8956A" strokeWidth="3" fill="none"/>
      
      {/* Lettuce */}
      <path d="M15 140 Q30 130 45 140 Q60 130 75 140 Q90 130 105 140 Q120 130 135 140 Q150 130 165 140 Q180 130 185 145 L180 155 Q100 165 20 155 Z" fill="#4CAF50"/>
      <path d="M25 145 Q50 135 75 145 Q100 135 125 145 Q150 135 175 145" stroke="#388E3C" strokeWidth="2" fill="none"/>
      
      {/* Tomato */}
      <rect x="30" y="120" width="140" height="20" rx="5" fill="#F44336"/>
      <ellipse cx="50" cy="130" rx="8" ry="4" fill="#E53935"/>
      <ellipse cx="100" cy="128" rx="10" ry="5" fill="#E53935"/>
      <ellipse cx="150" cy="130" rx="8" ry="4" fill="#E53935"/>
      
      {/* Cheese */}
      <path d="M25 115 L175 115 L165 100 L35 100 Z" fill="#FFC107"/>
      <path d="M35 100 L25 115 L40 115 L45 105 Z" fill="#FFB300"/>
      <path d="M165 100 L175 115 L160 115 L155 105 Z" fill="#FFB300"/>
      
      {/* Cat face (inside burger) */}
      <ellipse cx="100" cy="70" rx="45" ry="35" fill="#FFB6C1"/>
      
      {/* Cat ears */}
      <path d="M55 45 L70 20 L85 50 Z" fill="#FFB6C1"/>
      <path d="M55 45 L70 20 L85 50 Z" stroke="#FF69B4" strokeWidth="2" fill="none"/>
      <path d="M115 50 L130 20 L145 45 Z" fill="#FFB6C1"/>
      <path d="M115 50 L130 20 L145 45 Z" stroke="#FF69B4" strokeWidth="2" fill="none"/>
      
      {/* Inner ears */}
      <path d="M62 42 L70 28 L78 47 Z" fill="#FF69B4"/>
      <path d="M122 47 L130 28 L138 42 Z" fill="#FF69B4"/>
      
      {/* Eyes */}
      <ellipse cx="75" cy="65" rx="10" ry="12" fill="#333"/>
      <ellipse cx="125" cy="65" rx="10" ry="12" fill="#333"/>
      <circle cx="78" cy="62" r="4" fill="white"/>
      <circle cx="128" cy="62" r="4" fill="white"/>
      
      {/* Nose */}
      <path d="M95 78 L100 85 L105 78 Z" fill="#FF69B4"/>
      
      {/* Mouth */}
      <path d="M100 85 Q90 95 80 90" stroke="#333" strokeWidth="2" fill="none"/>
      <path d="M100 85 Q110 95 120 90" stroke="#333" strokeWidth="2" fill="none"/>
      
      {/* Whiskers */}
      <path d="M50 75 L30 70" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 80 L30 82" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M50 85 L30 92" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M150 75 L170 70" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M150 80 L170 82" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M150 85 L170 92" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
      
      {/* Top bun */}
      <ellipse cx="100" cy="55" rx="80" ry="45" fill="#D4A574"/>
      <ellipse cx="100" cy="45" rx="70" ry="35" fill="#E8C49A"/>
      
      {/* Bun highlights */}
      <ellipse cx="70" cy="35" rx="20" ry="10" fill="#F5DEB3" opacity="0.5"/>
      
      {/* Sesame seeds */}
      <ellipse cx="60" cy="40" rx="4" ry="2" fill="#FFF8DC"/>
      <ellipse cx="90" cy="30" rx="4" ry="2" fill="#FFF8DC"/>
      <ellipse cx="120" cy="35" rx="4" ry="2" fill="#FFF8DC"/>
      <ellipse cx="140" cy="45" rx="4" ry="2" fill="#FFF8DC"/>
      <ellipse cx="75" cy="50" rx="3" ry="2" fill="#FFF8DC"/>
      <ellipse cx="110" cy="50" rx="3" ry="2" fill="#FFF8DC"/>
    </svg>
  );
}
