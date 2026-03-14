'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { FocusSession } from '@/lib/types';
import { sessionStorage } from '@/lib/storage';
import { generateId } from '@/lib/business-logic';

interface FocusContextType {
  sessions: FocusSession[];
  activeSession: FocusSession | null;
  startSession: (taskId: string, duration: number) => void;
  endSession: (sessionId: string, actualDuration: number) => void;
  pauseSession: (sessionId: string) => void;
  resumeSession: (sessionId: string) => void;
  completePomodoro: (sessionId: string) => void;
  getTotalFocusMinutes: () => number;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const [activeSession, setActiveSession] = useState<FocusSession | null>(null);

  // Initialize from storage on mount
  useEffect(() => {
    const stored = sessionStorage.getAll();
    setSessions(stored);
  }, []);

  const startSession = useCallback((taskId: string, duration: number) => {
    const newSession: FocusSession = {
      id: generateId(),
      taskId,
      startTime: Date.now(),
      duration,
      pomodoros: 0,
      interrupted: false,
    };

    setSessions((prev) => [...prev, newSession]);
    setActiveSession(newSession);
    sessionStorage.save(newSession);
  }, []);

  const endSession = useCallback(
    (sessionId: string, actualDuration: number) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (session) {
        const updated: FocusSession = {
          ...session,
          endTime: Date.now(),
          actualDuration,
        };
        setSessions((prev) => prev.map((s) => (s.id === sessionId ? updated : s)));
        sessionStorage.save(updated);
        if (activeSession?.id === sessionId) {
          setActiveSession(null);
        }
      }
    },
    [sessions, activeSession]
  );

  const pauseSession = useCallback(
    (sessionId: string) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (session) {
        const updated: FocusSession = {
          ...session,
          interrupted: true,
        };
        setSessions((prev) => prev.map((s) => (s.id === sessionId ? updated : s)));
        sessionStorage.save(updated);
      }
    },
    [sessions]
  );

  const resumeSession = useCallback(
    (sessionId: string) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (session) {
        const updated: FocusSession = {
          ...session,
          interrupted: false,
        };
        setSessions((prev) => prev.map((s) => (s.id === sessionId ? updated : s)));
        sessionStorage.save(updated);
        setActiveSession(updated);
      }
    },
    [sessions]
  );

  const completePomodoro = useCallback(
    (sessionId: string) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (session) {
        const updated: FocusSession = {
          ...session,
          pomodoros: session.pomodoros + 1,
        };
        setSessions((prev) => prev.map((s) => (s.id === sessionId ? updated : s)));
        sessionStorage.save(updated);
        setActiveSession(updated);
      }
    },
    [sessions]
  );

  const getTotalFocusMinutes = useCallback((): number => {
    return sessions.reduce((total, session) => {
      return total + (session.actualDuration || session.duration);
    }, 0);
  }, [sessions]);

  return (
    <FocusContext.Provider
      value={{
        sessions,
        activeSession,
        startSession,
        endSession,
        pauseSession,
        resumeSession,
        completePomodoro,
        getTotalFocusMinutes,
      }}
    >
      {children}
    </FocusContext.Provider>
  );
}

export function useFocus() {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error('useFocus must be used within FocusProvider');
  }
  return context;
}
