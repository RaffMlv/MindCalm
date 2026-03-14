/**
 * Task Management Types
 */
export interface Task {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  complexity: 'easy' | 'medium' | 'hard'; // affects roadmap generation
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  subtasks: Subtask[];
  createdAt: number;
  completedAt?: number;
  dueDate?: number;
}

export interface Subtask {
  id: string;
  title: string;
  duration: number; // in minutes
  status: 'todo' | 'completed';
}

/**
 * Focus Session Types
 */
export interface FocusSession {
  id: string;
  taskId: string;
  startTime: number;
  endTime?: number;
  duration: number; // planned duration in minutes
  actualDuration?: number; // actual focused time in minutes
  pomodoros: number; // number of pomodoro cycles completed
  interrupted: boolean;
}

/**
 * Audio Types
 */
export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  url: string;
  category: 'ambient' | 'focus' | 'rain' | 'nature' | 'binaural';
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  tracks: AudioTrack[];
  isActive: boolean;
}

/**
 * Gamification Types
 */
export interface UserStats {
  userId: string;
  totalXP: number;
  level: number;
  streak: number; // consecutive days with completed tasks
  lastActiveDate: number;
  badges: Badge[];
  totalTasksCompleted: number;
  totalFocusMinutes: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic';
}

export interface LevelThreshold {
  level: number;
  requiredXP: number;
  reward: string;
}

/**
 * App State Types
 */
export interface AppState {
  tasks: Task[];
  focusSessions: FocusSession[];
  userStats: UserStats;
  currentPlaylist: Playlist | null;
  isAudioPlaying: boolean;
}
