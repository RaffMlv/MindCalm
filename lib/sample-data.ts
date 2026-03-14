/**
 * Sample data for testing
 * Descomente esta função em /lib/storage.ts initializeDefaultData() para carregar dados de exemplo
 */

import { Task, UserStats, Playlist } from './types';
import { generateId } from './business-logic';

export const SAMPLE_TASKS: Task[] = [
  {
    id: generateId(),
    title: 'Escrever Relatório Mensal',
    description: 'Compilar dados de produtividade e criar relatório em PDF',
    duration: 90,
    complexity: 'medium',
    priority: 'high',
    status: 'in-progress',
    createdAt: Date.now() - 86400000,
    subtasks: [
      {
        id: generateId(),
        title: 'Passo 1: Planejamento',
        duration: 20,
        status: 'completed',
      },
      {
        id: generateId(),
        title: 'Passo 2: Execução',
        duration: 50,
        status: 'in-progress',
      },
      {
        id: generateId(),
        title: 'Passo 3: Refinamento',
        duration: 20,
        status: 'todo',
      },
    ],
  },
  {
    id: generateId(),
    title: 'Estudar React 19',
    description: 'Aprender novas features do React 19 e use-cache',
    duration: 120,
    complexity: 'hard',
    priority: 'medium',
    status: 'todo',
    createdAt: Date.now() - 172800000,
    subtasks: [
      {
        id: generateId(),
        title: 'Setup e Planejamento',
        duration: 25,
        status: 'todo',
      },
      {
        id: generateId(),
        title: 'Etapa 1 de Execução',
        duration: 30,
        status: 'todo',
      },
      {
        id: generateId(),
        title: 'Etapa 2 de Execução',
        duration: 35,
        status: 'todo',
      },
      {
        id: generateId(),
        title: 'Finalização e Revisão',
        duration: 30,
        status: 'todo',
      },
    ],
  },
  {
    id: generateId(),
    title: 'Revisar código do projeto',
    description: 'Code review rápido dos componentes',
    duration: 30,
    complexity: 'easy',
    priority: 'low',
    status: 'completed',
    completedAt: Date.now() - 345600000,
    createdAt: Date.now() - 604800000,
    subtasks: [
      {
        id: generateId(),
        title: 'Preparação',
        duration: 10,
        status: 'completed',
      },
      {
        id: generateId(),
        title: 'Conclusão',
        duration: 20,
        status: 'completed',
      },
    ],
  },
];

export const SAMPLE_USER_STATS: UserStats = {
  userId: 'sample-user',
  totalXP: 1250,
  level: 5,
  streak: 3,
  lastActiveDate: Date.now(),
  badges: [
    {
      id: 'first-task',
      name: 'Primeiro Passo',
      description: 'Complete sua primeira tarefa',
      icon: '🚀',
      rarity: 'common',
      unlockedAt: Date.now() - 1209600000,
    },
    {
      id: 'task-master-5',
      name: 'Aprendiz',
      description: 'Complete 5 tarefas',
      icon: '⭐',
      rarity: 'common',
      unlockedAt: Date.now() - 864000000,
    },
    {
      id: 'focused-hour',
      name: 'Hora Focada',
      description: 'Acumule 1 hora em sessões de foco',
      icon: '🎯',
      rarity: 'common',
      unlockedAt: Date.now() - 432000000,
    },
  ],
  totalTasksCompleted: 8,
  totalFocusMinutes: 125,
};

export const SAMPLE_PLAYLISTS: Playlist[] = [
  {
    id: 'ambient-focus',
    name: 'Foco Ambiente',
    description: 'Sons ambientes calmos para concentração profunda',
    isActive: true,
    tracks: [
      {
        id: generateId(),
        title: 'Céu Estrelado',
        artist: 'Ambient Collection',
        duration: 225,
        url: 'https://example.com/track1.mp3',
        category: 'ambient',
      },
      {
        id: generateId(),
        title: 'Floresta Tranquila',
        artist: 'Nature Sounds',
        duration: 252,
        url: 'https://example.com/track2.mp3',
        category: 'nature',
      },
      {
        id: generateId(),
        title: 'Chuva Noturna',
        artist: 'Rain Sounds',
        duration: 300,
        url: 'https://example.com/track3.mp3',
        category: 'rain',
      },
    ],
  },
  {
    id: 'rain-sounds',
    name: 'Sons de Chuva',
    description: 'Ruído branco natural de chuva',
    isActive: false,
    tracks: [
      {
        id: generateId(),
        title: 'Chuva Suave',
        artist: 'Rain Collection',
        duration: 270,
        url: 'https://example.com/track4.mp3',
        category: 'rain',
      },
      {
        id: generateId(),
        title: 'Trovão Distante',
        artist: 'Storm Sounds',
        duration: 315,
        url: 'https://example.com/track5.mp3',
        category: 'rain',
      },
      {
        id: generateId(),
        title: 'Pátio na Chuva',
        artist: 'Outdoor Sounds',
        duration: 240,
        url: 'https://example.com/track6.mp3',
        category: 'rain',
      },
    ],
  },
  {
    id: 'nature-vibes',
    name: 'Natureza',
    description: 'Sons naturais da floresta e pássaros',
    isActive: false,
    tracks: [
      {
        id: generateId(),
        title: 'Pássaros Cantando',
        artist: 'Nature Sounds',
        duration: 200,
        url: 'https://example.com/track7.mp3',
        category: 'nature',
      },
      {
        id: generateId(),
        title: 'Riacho Fluindo',
        artist: 'Water Sounds',
        duration: 285,
        url: 'https://example.com/track8.mp3',
        category: 'nature',
      },
      {
        id: generateId(),
        title: 'Vento nas Árvores',
        artist: 'Forest Sounds',
        duration: 230,
        url: 'https://example.com/track9.mp3',
        category: 'nature',
      },
    ],
  },
];
