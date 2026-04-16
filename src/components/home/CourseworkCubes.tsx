import { useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'motion/react';
import { useMotionValue, useMotionTemplate } from 'motion/react';
import { courseworkData } from '../../data/homeData';

interface CourseworkCubeGridProps {
  setSelectedSkill?: (course: any) => void;
}

function CourseCube({ course, index }: { course: { name: string; relatedProjects?: string[] }; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const colors = [
    'bg-[var(--accent-pink)]',
    'bg-[var(--accent-cyan)]', 
    'bg-[var(--accent-purple)]',
    'bg-[var(--accent-yellow)]',
    'bg-[var(--accent-green)]',
  ];
  const color = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      style={{ perspective: 1000 }}
      className="relative w-24 h-24 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative w-full h-full transform-style- preserve-3d"
      >
        {/* Front face */}
        <div className={`absolute inset-0 ${color} border-4 border-[var(--border-color)] flex items-center justify-center backface-hidden`}>
          <span className="text-xs font-black text-[#111] text-center px-2 uppercase leading-tight">
            {course.name}
          </span>
        </div>
        
        {/* Right face */}
        <div className={`absolute inset-0 ${color} border-4 border-[var(--border-color)] flex items-center justify-center backface-hidden`}
          style={{ transform: 'rotateY(90deg) translateZ(48px)' }}
        >
          <span className="text-xs font-black text-[#111]">
            CUBE
          </span>
        </div>
        
        {/* Left face */}
        <div className={`absolute inset-0 ${color} border-4 border-[var(--border-color)] flex items-center justify-center backface-hidden`}
          style={{ transform: 'rotateY(-90deg) translateZ(48px)' }}
        >
          <span className="text-xs font-black text-[#111]">
            CUBE  
          </span>
        </div>
        
        {/* Top face */}
        <div className={`absolute inset-0 ${color} border-4 border-[var(--border-color)] flex items-center justify-center backface-hidden`}
          style={{ transform: 'rotateX(90deg) translateZ(48px)' }}
        >
          <span className="text-xs font-black text-[#111]">
            ←→
          </span>
        </div>
        
        {/* Bottom face */}
        <div className={`absolute inset-0 ${color} border-4 border-[var(--border-color)] flex items-center justify-center backface-hidden`}
          style={{ transform: 'rotateX(-90deg) translateZ(48px)' }}
        >
          <span className="text-xs font-black text-[#111]">
            ←→
          </span>
        </div>
        
        {/* Back face */}
        <div className={`absolute inset-0 ${color} border-4 border-[var(--border-color)] flex items-center justify-center backface-hidden`}
          style={{ transform: 'rotateY(180deg) translateZ(48px)' }}
        >
          {course.relatedProjects ? (
            <span className="text-xs font-black text-[#111] text-center px-2">
              {course.relatedProjects[0]}
            </span>
          ) : (
            <span className="text-xs font-black text-[#111]">No Project</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CourseworkCubeGrid({ setSelectedSkill }: CourseworkCubeGridProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-8">
      {courseworkData.map((course, index) => (
        <CourseCube key={course.name} course={course} index={index} />
      ))}
    </div>
  );
}