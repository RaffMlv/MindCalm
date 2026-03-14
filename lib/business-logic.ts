/**
 * Business logic utilities
 */

import { Task, Subtask } from './types';

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculate XP based on task completion
 * Factors: complexity, duration, streak bonus
 */
export const calculateXP = (
  complexity: 'easy' | 'medium' | 'hard',
  duration: number,
  streakBonus: number = 0
): number => {
  const complexityMultiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2,
  };

  const baseXP = Math.round((duration / 10) * complexityMultiplier[complexity]);
  const streakBonus_ = Math.round(baseXP * (streakBonus * 0.1)); // 10% per streak day

  return baseXP + streakBonus_;
};

/**
 * Calculate level from total XP
 * Uses exponential progression: level_n requires n^2 * 100 XP
 */
export const calculateLevel = (totalXP: number): number => {
  let level = 1;
  let requiredXP = 100;

  while (totalXP >= requiredXP) {
    totalXP -= requiredXP;
    level += 1;
    requiredXP = level * level * 100;
  }

  return level;
};

/**
 * Calculate XP needed for next level
 */
export const getXPForNextLevel = (totalXP: number): { current: number; next: number } => {
  let level = 1;
  let xpSpent = 0;
  let requiredXP = 100;

  while (totalXP >= requiredXP) {
    xpSpent += requiredXP;
    totalXP -= requiredXP;
    level += 1;
    requiredXP = level * level * 100;
  }

  return {
    current: totalXP,
    next: requiredXP,
  };
};

/**
 * Auto-generate subtasks from main task
 * Deterministic algorithm based on complexity and duration
 */
export const generateSubtasks = (task: Task): Subtask[] => {
  const subtasks: Subtask[] = [];

  // Base number of subtasks by complexity
  const baseCount = {
    easy: 2,
    medium: 3,
    hard: 5,
  };

  let count = baseCount[task.complexity];

  // Adjust based on duration
  if (task.duration > 60) {
    count += Math.floor(task.duration / 60);
  }

  // Generate subtasks with proportional durations
  const totalDuration = task.duration * 0.9; // Reserve 10% for breaks/transitions
  const subtaskDuration = Math.round(totalDuration / count);

  for (let i = 0; i < count; i++) {
    subtasks.push({
      id: generateId(),
      title: `Passo ${i + 1}: ${generateSubtaskTitle(task.title, i, count)}`,
      duration: i === count - 1 ? totalDuration - subtaskDuration * (count - 1) : subtaskDuration,
      status: 'todo',
    });
  }

  return subtasks;
};

/**
 * Generate descriptive subtask titles
 */
const generateSubtaskTitle = (mainTitle: string, index: number, total: number): string => {
  const phases = ['Planejamento', 'Execução', 'Refinamento', 'Teste', 'Entrega'];

  if (total <= 2) {
    return index === 0 ? 'Preparação' : 'Conclusão';
  }

  if (total <= 3) {
    return phases[index] || `Etapa ${index + 1}`;
  }

  if (index === 0) return 'Setup e Planejamento';
  if (index === total - 1) return 'Finalização e Revisão';

  return `Etapa ${index} de Execução`;
};

/**
 * Check if user qualifies for streak bonus
 */
export const updateStreak = (lastActiveDate: number): { newStreak: number; isNewDay: boolean } => {
  const now = Date.now();
  const lastDate = new Date(lastActiveDate);
  const today = new Date();

  const isNewDay =
    lastDate.getFullYear() !== today.getFullYear() ||
    lastDate.getMonth() !== today.getMonth() ||
    lastDate.getDate() !== today.getDate();

  return {
    newStreak: isNewDay ? 1 : 0,
    isNewDay,
  };
};

/**
 * Check if badge should be unlocked
 */
export const checkBadgeUnlock = (
  totalTasksCompleted: number,
  totalFocusMinutes: number,
  level: number
): string[] => {
  const unlockedBadges: string[] = [];

  // Task completion badges
  if (totalTasksCompleted === 1) unlockedBadges.push('first-task');
  if (totalTasksCompleted === 5) unlockedBadges.push('task-master-5');
  if (totalTasksCompleted === 10) unlockedBadges.push('task-master-10');
  if (totalTasksCompleted === 50) unlockedBadges.push('task-master-50');

  // Focus session badges
  if (totalFocusMinutes === 60) unlockedBadges.push('focused-hour');
  if (totalFocusMinutes === 300) unlockedBadges.push('focused-5hours');
  if (totalFocusMinutes === 1000) unlockedBadges.push('focused-master');

  // Level badges
  if (level === 5) unlockedBadges.push('level-5');
  if (level === 10) unlockedBadges.push('level-10');
  if (level === 20) unlockedBadges.push('level-20');

  return unlockedBadges;
};

/**
 * Badge definitions
 */
export const BADGE_DEFINITIONS = {
  'first-task': {
    name: 'Primeiro Passo',
    description: 'Complete sua primeira tarefa',
    icon: '🚀',
    rarity: 'common' as const,
  },
  'task-master-5': {
    name: 'Aprendiz',
    description: 'Complete 5 tarefas',
    icon: '⭐',
    rarity: 'common' as const,
  },
  'task-master-10': {
    name: 'Mestre de Tarefas',
    description: 'Complete 10 tarefas',
    icon: '🏆',
    rarity: 'uncommon' as const,
  },
  'task-master-50': {
    name: 'Produtividade Lendária',
    description: 'Complete 50 tarefas',
    icon: '👑',
    rarity: 'epic' as const,
  },
  'focused-hour': {
    name: 'Hora Focada',
    description: 'Acumule 1 hora em sessões de foco',
    icon: '🎯',
    rarity: 'common' as const,
  },
  'focused-5hours': {
    name: 'Mestre da Concentração',
    description: 'Acumule 5 horas em sessões de foco',
    icon: '🧠',
    rarity: 'uncommon' as const,
  },
  'focused-master': {
    name: 'Foco Absoluto',
    description: 'Acumule 1000 minutos em sessões de foco',
    icon: '⚡',
    rarity: 'epic' as const,
  },
  'level-5': {
    name: 'Nível 5',
    description: 'Atinja nível 5',
    icon: '📈',
    rarity: 'common' as const,
  },
  'level-10': {
    name: 'Nível 10',
    description: 'Atinja nível 10',
    icon: '📊',
    rarity: 'uncommon' as const,
  },
  'level-20': {
    name: 'Nível 20',
    description: 'Atinja nível 20',
    icon: '🌟',
    rarity: 'epic' as const,
  },
};
