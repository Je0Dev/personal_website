import { motion } from 'motion/react';
import { useToast } from '../components/Toast';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { SkillsSection } from '../components/home/SkillsSection';
import { CourseworkSection } from '../components/home/CourseworkSection';
import { HobbiesSection } from '../components/home/HobbiesSection';
import { CTASection } from '../components/home/CTASection';
import { StatsSection } from '../components/home/StatsSection';
import { useState } from 'react';

export function Home({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { showToast } = useToast();
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: "easeOut" }} className="max-w-5xl space-y-24">
      <HeroSection setActiveTab={setActiveTab} showToast={showToast} />
      <StatsSection setActiveTab={setActiveTab} />
      <AboutSection setActiveTab={setActiveTab} />
      <SkillsSection setActiveTab={setActiveTab} onSkillSelect={setSelectedSkill} selectedSkill={selectedSkill} />
      <CourseworkSection setSelectedSkill={setSelectedSkill} />
      <HobbiesSection />
      <CTASection setActiveTab={setActiveTab} />
    </motion.div>
  );
}