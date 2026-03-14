'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { UserStats, Badge } from '@/lib/types';
import { userStatsStorage } from '@/lib/storage';
import { calculateXP, calculateLevel, checkBadgeUnlock, BADGE_DEFINITIONS, updateStreak } from '@/lib/business-logic';

interface GamificationContextType {
  userStats: UserStats;
  addXP: (xp: number) => void;
  addTaskCompletion: (complexity: 'easy' | 'medium' | 'hard', duration: number) => void;
  addFocusMinutes: (minutes: number) => void;
  checkAndUnlockBadges: () => Badge[];
  getNextLevelInfo: () => { current: number; next: number };
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [userStats, setUserStats] = useState<UserStats>({
    userId: 'default',
    totalXP: 0,
    level: 1,
    streak: 0,
    lastActiveDate: Date.now(),
    badges: [],
    totalTasksCompleted: 0,
    totalFocusMinutes: 0,
  });

  // Initialize from storage on mount
  useEffect(() => {
    const stored = userStatsStorage.get();
    setUserStats(stored);
  }, []);

  const addXP = useCallback((xp: number) => {
    setUserStats((prev) => {
      const updated = {
        ...prev,
        totalXP: prev.totalXP + xp,
        level: calculateLevel(prev.totalXP + xp),
        lastActiveDate: Date.now(),
      };
      userStatsStorage.save(updated);
      return updated;
    });
  }, []);

  const addTaskCompletion = useCallback(
    (complexity: 'easy' | 'medium' | 'hard', duration: number) => {
      setUserStats((prev) => {
        const xpGain = calculateXP(complexity, duration, prev.streak);
        const newLevel = calculateLevel(prev.totalXP + xpGain);

        // Update streak
        const { newStreak } = updateStreak(prev.lastActiveDate);

        const updated: UserStats = {
          ...prev,
          totalXP: prev.totalXP + xpGain,
          totalTasksCompleted: prev.totalTasksCompleted + 1,
          level: newLevel,
          streak: prev.streak + newStreak,
          lastActiveDate: Date.now(),
        };

        userStatsStorage.save(updated);
        return updated;
      });
    },
    []
  );

  const addFocusMinutes = useCallback((minutes: number) => {
    setUserStats((prev) => {
      const updated = {
        ...prev,
        totalFocusMinutes: prev.totalFocusMinutes + minutes,
        lastActiveDate: Date.now(),
      };
      userStatsStorage.save(updated);
      return updated;
    });
  }, []);

  const checkAndUnlockBadges = useCallback((): Badge[] => {
    const badgeIds = checkBadgeUnlock(
      userStats.totalTasksCompleted,
      userStats.totalFocusMinutes,
      userStats.level
    );

    const newBadges: Badge[] = [];

    badgeIds.forEach((badgeId) => {
      // Check if badge is already unlocked
      if (!userStats.badges.find((b) => b.id === badgeId)) {
        const def = BADGE_DEFINITIONS[badgeId as keyof typeof BADGE_DEFINITIONS];
        if (def) {
          const badge: Badge = {
            id: badgeId,
            name: def.name,
            description: def.description,
            icon: def.icon,
            rarity: def.rarity,
            unlockedAt: Date.now(),
          };
          newBadges.push(badge);
        }
      }
    });

    if (newBadges.length > 0) {
      setUserStats((prev) => {
        const updated = {
          ...prev,
          badges: [...prev.badges, ...newBadges],
        };
        userStatsStorage.save(updated);
        return updated;
      });
    }

    return newBadges;
  }, [userStats]);

  const getNextLevelInfo = useCallback(() => {
    let level = 1;
    let xpSpent = 0;
    let currentXP = userStats.totalXP;
    let requiredXP = 100;

    while (currentXP >= requiredXP) {
      xpSpent += requiredXP;
      currentXP -= requiredXP;
      level += 1;
      requiredXP = level * level * 100;
    }

    return {
      current: currentXP,
      next: requiredXP,
    };
  }, [userStats.totalXP]);

  return (
    <GamificationContext.Provider
      value={{
        userStats,
        addXP,
        addTaskCompletion,
        addFocusMinutes,
        checkAndUnlockBadges,
        getNextLevelInfo,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider');
  }
  return context;
}
