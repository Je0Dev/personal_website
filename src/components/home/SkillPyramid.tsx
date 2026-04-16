import { useState } from 'react';
import { motion } from 'motion/react';
import { skillsData } from '../../data/homeData';

interface SkillPyramidProps {
  onSkillSelect?: (skill: any) => void;
}

export function SkillPyramid({ onSkillSelect }: SkillPyramidProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleSelect = (skillName: string) => {
    setSelectedSkill(selectedSkill === skillName ? null : skillName);
  };

  // Organize skills into pyramid levels
  const levels = [
    skillsData.slice(0, 3),    // Top - most proficient
    skillsData.slice(3, 7),    // Second
    skillsData.slice(7, 11),   // Third
    skillsData.slice(11),       // Base
  ];

  return (
    <div className="relative w-full max-w-md mx-auto py-12">
      {/* 3D Pyramid */}
      <div className="flex flex-col items-center">
        {levels.map((levelSkills, levelIndex) => {
          const pyramidScale = 1 - levelIndex * 0.15;
          const pyramidOpacity = 1 - levelIndex * 0.15;
          
          return (
            <motion.div
              key={levelIndex}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: levelIndex * 0.15 }}
              className="flex justify-center gap-2"
              style={{
                transform: `perspective(500px) rotateX(${10 * levelIndex}deg)`,
                marginBottom: levelIndex === 0 ? 0 : -20,
              }}
            >
              {levelSkills.map((skill, skillIndex) => (
                <motion.button
                  key={skill.name}
                  initial={{ rotateY: 0 }}
                  whileHover={{ 
                    rotateY: 15, 
                    scale: 1.1,
                    z: 50,
                  }}
                  onClick={() => handleSelect(skill.name)}
                  className={`
                    relative px-3 py-2 text-xs font-black uppercase border-4 transition-all
                    ${skill.color} text-[#111]
                    hover:z-50
                    ${levelIndex === 0 ? 'brutal-shadow-xl' : 'brutal-shadow-lg'}
                  `}
                  style={{
                    transform: `translateZ(${levelIndex * 20}px)`,
                  }}
                >
                  {skill.name}
                  {/* 3D edge effect */}
                  <div 
                    className="absolute -bottom-2 -right-2 w-full h-full border-4 border-[var(--border-color)] -z-10"
                    style={{ transform: 'translate(-4px, 4px)' }}
                  />
                  <div 
                    className="absolute -bottom-4 -right-4 w-full h-full border-4 border-[var(--accent-pink)] -z-20 opacity-50"
                    style={{ transform: 'translate(-8px, 8px)' }}
                  />
                </motion.button>
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* Base glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-gradient-to-t from-[var(--accent-pink)] to-transparent opacity-30 blur-xl" />
    </div>
  );
}