import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Achievement = 
  | 'visited_home'
  | 'visited_projects'
  | 'visited_hardware'
  | 'visited_notes'
  | 'visited_contact'
  | 'downloaded_cv'
  | 'sent_message'
  | 'all_sections';

interface AchievementsContextType {
  achievements: Achievement[];
  unlockedAchievements: Achievement[];
  unlockAchievement: (achievement: Achievement) => void;
  resetAchievements: () => void;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export function AchievementsProvider({ children }: { children: ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('achievements');
    if (saved) {
      try {
        setUnlockedAchievements(JSON.parse(saved) as Achievement[]);
      } catch {
        setUnlockedAchievements([]);
      }
    }
  }, []);

  const unlockAchievement = (achievement: Achievement) => {
    if (!achievements.includes(achievement)) {
      const newAchievements = [...achievements, achievement];
      setAchievements(newAchievements);
      setUnlockedAchievements(prev => {
        const updated = [...prev, achievement];
        localStorage.setItem('achievements', JSON.stringify(updated));
        return updated;
      });

      if (achievement === 'visited_contact') {
        checkAllSections();
      }
    }
  };

  const checkAllSections = () => {
    const required: Achievement[] = ['visited_home', 'visited_projects', 'visited_hardware', 'visited_notes', 'visited_contact'];
    const hasAll = required.every(a => achievements.includes(a));
    if (hasAll) {
      setTimeout(() => {
        unlockAchievement('all_sections');
      }, 500);
    }
  };

  const resetAchievements = () => {
    setAchievements([]);
    setUnlockedAchievements([]);
    localStorage.removeItem('achievements');
  };

  return (
    <AchievementsContext.Provider value={{ achievements, unlockedAchievements, unlockAchievement, resetAchievements }}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementsContext);
  if (!context) {
    throw new Error('useAchievements must be used within AchievementsProvider');
  }
  return context;
}

export const achievementLabels: Record<Achievement, { title: string; description: string; icon: string }> = {
  visited_home: { title: 'First Steps', description: 'Visited the home page', icon: '🏠' },
  visited_projects: { title: 'Project Explorer', description: 'Viewed the projects page', icon: '💻' },
  visited_hardware: { title: 'Hardware Hero', description: 'Explored hardware projects', icon: '🔌' },
  visited_notes: { title: 'Writer', description: 'Read some notes', icon: '📝' },
  visited_contact: { title: 'Social Butterfly', description: 'Visited contact page', icon: '📬' },
  downloaded_cv: { title: 'Career Ready', description: 'Downloaded the CV', icon: '📄' },
  sent_message: { title: 'First Contact', description: 'Sent a message', icon: '✉️' },
  all_sections: { title: 'Explorer', description: 'Visited all sections!', icon: '🏆' },
};
