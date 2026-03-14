'use client';

import { useEffect, useState, useCallback } from 'react';
import { useFocus } from '@/contexts/FocusContext';
import { useTask } from '@/contexts/TaskContext';
import { useGamification } from '@/contexts/GamificationContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

const POMODORO_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

interface FocusTimerProps {
  sessionId: string;
  taskId: string;
  plannedDuration: number;
}

export function FocusTimer({ sessionId, taskId, plannedDuration }: FocusTimerProps) {
  const { sessions, completePomodoro, endSession } = useFocus();
  const { getTaskById } = useTask();
  const { addFocusMinutes } = useGamification();

  const [timeLeft, setTimeLeft] = useState(POMODORO_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  const task = getTaskById(taskId);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer finished
            setIsActive(false);
            if (!isBreak) {
              // Pomodoro completed
              setSessionsCompleted((prev) => prev + 1);
              completePomodoro(sessionId);
              setElapsedMinutes((prev) => prev + 25);
              // Switch to break
              setIsBreak(true);
              setTimeLeft(BREAK_DURATION);
            } else {
              // Break completed, ask if continue
              setIsBreak(false);
              setTimeLeft(POMODORO_DURATION);
            }
            // Play notification sound (visual + console)
            console.log('[v0] Timer completed');
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isBreak, sessionId, completePomodoro]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? BREAK_DURATION : POMODORO_DURATION);
  };

  const endFocusSession = () => {
    addFocusMinutes(elapsedMinutes);
    endSession(sessionId, elapsedMinutes);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const displayTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalDuration = plannedDuration;
  const progress = Math.min((elapsedMinutes / totalDuration) * 100, 100);

  return (
    <Card className="p-8 text-center space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{isBreak ? '☕ Tempo de Pausa' : '🎯 Sessão de Foco'}</h2>
        {task && <p className="text-muted-foreground">{task.title}</p>}
      </div>

      <div className="space-y-2">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
          <div className="text-6xl font-bold font-mono tracking-wide">{displayTime}</div>
        </div>
        <Badge variant={isBreak ? 'secondary' : 'default'} className="mx-auto">
          {isBreak ? 'Pausa Ativa' : `Pomodoro ${sessionsCompleted + 1}`}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progresso da Sessão</span>
          <span className="font-semibold">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground">
          {elapsedMinutes} min focados de {totalDuration} min planejados
        </p>
      </div>

      <div className="flex justify-center gap-2">
        <Button
          size="lg"
          variant={isActive ? 'secondary' : 'default'}
          onClick={toggleTimer}
          className="gap-2"
        >
          {isActive ? (
            <>
              <Pause className="h-4 w-4" />
              Pausar
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              {sessionsCompleted === 0 ? 'Iniciar' : 'Retomar'}
            </>
          )}
        </Button>
        <Button size="lg" variant="outline" onClick={resetTimer} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Resetar
        </Button>
      </div>

      <div className="flex justify-center gap-2 pt-4 border-t">
        <Button variant="outline" onClick={endFocusSession} className="gap-2">
          <Zap className="h-4 w-4" />
          Finalizar Sessão
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div className="bg-primary/5 rounded-lg p-3">
          <div className="text-xs text-muted-foreground">Pomodoros</div>
          <div className="text-2xl font-bold">{sessionsCompleted}</div>
        </div>
        <div className="bg-secondary/5 rounded-lg p-3">
          <div className="text-xs text-muted-foreground">Tempo Focado</div>
          <div className="text-2xl font-bold">{elapsedMinutes}m</div>
        </div>
        <div className="bg-accent/5 rounded-lg p-3">
          <div className="text-xs text-muted-foreground">Status</div>
          <div className="text-2xl font-bold">{isActive ? '🔴' : '⏸️'}</div>
        </div>
      </div>
    </Card>
  );
}
