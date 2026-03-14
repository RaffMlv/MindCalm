/**
 * Storage utilities for localStorage persistence
 * Uses JSON serialization with error handling
 */

import { AppState, Task, FocusSession, UserStats, Playlist } from './types';

const STORAGE_PREFIX = 'cognitiveapp_';

/**
 * Generic storage wrapper
 */
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | undefined => {
    try {
      const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`[Storage] Error reading ${key}:`, error);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[Storage] Error writing ${key}:`, error);
      return false;
    }
  },

  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
      return true;
    } catch (error) {
      console.error(`[Storage] Error removing ${key}:`, error);
      return false;
    }
  },

  clear: (): boolean => {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('[Storage] Error clearing all:', error);
      return false;
    }
  },
};

/**
 * Domain-specific storage helpers
 */
export const taskStorage = {
  getAll: (): Task[] => storage.get('tasks', []),
  getById: (id: string): Task | undefined => {
    const tasks = storage.get('tasks', []);
    return tasks.find((t: Task) => t.id === id);
  },
  save: (task: Task): boolean => {
    const tasks = storage.get('tasks', []);
    const index = tasks.findIndex((t: Task) => t.id === task.id);
    if (index >= 0) {
      tasks[index] = task;
    } else {
      tasks.push(task);
    }
    return storage.set('tasks', tasks);
  },
  delete: (id: string): boolean => {
    const tasks = storage.get('tasks', []);
    const filtered = tasks.filter((t: Task) => t.id !== id);
    return storage.set('tasks', filtered);
  },
};

export const sessionStorage = {
  getAll: (): FocusSession[] => storage.get('focusSessions', []),
  save: (session: FocusSession): boolean => {
    const sessions = storage.get('focusSessions', []);
    const index = sessions.findIndex((s: FocusSession) => s.id === session.id);
    if (index >= 0) {
      sessions[index] = session;
    } else {
      sessions.push(session);
    }
    return storage.set('focusSessions', sessions);
  },
};

export const userStatsStorage = {
  get: (): UserStats => {
    const defaultStats: UserStats = {
      userId: 'default',
      totalXP: 0,
      level: 1,
      streak: 0,
      lastActiveDate: Date.now(),
      badges: [],
      totalTasksCompleted: 0,
      totalFocusMinutes: 0,
    };
    return storage.get('userStats', defaultStats);
  },
  save: (stats: UserStats): boolean => storage.set('userStats', stats),
};

export const playlistStorage = {
  getAll: (): Playlist[] => storage.get('playlists', []),
  getActive: (): Playlist | null => {
    const playlists = storage.get('playlists', []);
    return playlists.find((p: Playlist) => p.isActive) || null;
  },
  save: (playlist: Playlist): boolean => {
    const playlists = storage.get('playlists', []);
    const index = playlists.findIndex((p: Playlist) => p.id === playlist.id);
    if (index >= 0) {
      playlists[index] = playlist;
    } else {
      playlists.push(playlist);
    }
    return storage.set('playlists', playlists);
  },
};

/**
 * Initialize default data if not exists
 */
export const initializeDefaultData = (): void => {
  // Initialize user stats if not exists
  if (!storage.get('userStats')) {
    userStatsStorage.save({
      userId: 'default',
      totalXP: 0,
      level: 1,
      streak: 0,
      lastActiveDate: Date.now(),
      badges: [],
      totalTasksCompleted: 0,
      totalFocusMinutes: 0,
    });
  }

  // Initialize default playlists if not exists
  if (!storage.get('playlists') || storage.get('playlists', []).length === 0) {
    const defaultPlaylists: Playlist[] = [
      {
        id: 'ambient-focus',
        name: 'Foco Ambiente',
        description: 'Sons ambientes calmos para concentração profunda',
        isActive: true,
        tracks: [],
      },
      {
        id: 'rain-sounds',
        name: 'Sons de Chuva',
        description: 'Ruído branco natural de chuva',
        isActive: false,
        tracks: [],
      },
      {
        id: 'nature-vibes',
        name: 'Natureza',
        description: 'Sons naturais da floresta e pássaros',
        isActive: false,
        tracks: [],
      },
    ];
    storage.set('playlists', defaultPlaylists);
  }
};
