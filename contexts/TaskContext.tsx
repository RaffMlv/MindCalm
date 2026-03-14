'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Task } from '@/lib/types';
import { taskStorage, initializeDefaultData } from '@/lib/storage';
import { generateId, generateSubtasks } from '@/lib/business-logic';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'subtasks'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  addSubtask: (taskId: string, title: string, duration: number) => void;
  completeSubtask: (taskId: string, subtaskId: string) => void;
  getTaskById: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Initialize from storage on mount
  useEffect(() => {
    initializeDefaultData();
    const stored = taskStorage.getAll();
    setTasks(stored);
  }, []);

  const addTask = useCallback(
    (taskData: Omit<Task, 'id' | 'createdAt' | 'subtasks'>) => {
      const newTask: Task = {
        ...taskData,
        id: generateId(),
        createdAt: Date.now(),
        subtasks: generateSubtasks({
          id: generateId(),
          createdAt: Date.now(),
          ...taskData,
        } as Task),
      };

      const updated = [...tasks, newTask];
      setTasks(updated);
      taskStorage.save(newTask);
    },
    [tasks]
  );

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    taskStorage.save(updatedTask);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    taskStorage.delete(id);
  }, []);

  const completeTask = useCallback(
    (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        const completed = { ...task, status: 'completed' as const, completedAt: Date.now() };
        updateTask(completed);
      }
    },
    [tasks, updateTask]
  );

  const addSubtask = useCallback(
    (taskId: string, title: string, duration: number) => {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        const updated = {
          ...task,
          subtasks: [
            ...task.subtasks,
            {
              id: generateId(),
              title,
              duration,
              status: 'todo' as const,
            },
          ],
        };
        updateTask(updated);
      }
    },
    [tasks, updateTask]
  );

  const completeSubtask = useCallback(
    (taskId: string, subtaskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        const updated = {
          ...task,
          subtasks: task.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, status: 'completed' as const } : st
          ),
        };
        updateTask(updated);
      }
    },
    [tasks, updateTask]
  );

  const getTaskById = useCallback((id: string) => tasks.find((t) => t.id === id), [tasks]);

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, completeTask, addSubtask, completeSubtask, getTaskById }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
}
