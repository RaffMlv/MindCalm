'use client';

import { Task } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, AlertCircle, Zap, ChevronRight } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onSelect: (task: Task) => void;
  onComplete?: (task: Task) => void;
}

export function TaskCard({ task, onSelect, onComplete }: TaskCardProps) {
  const completedSubtasks = task.subtasks.filter((st) => st.status === 'completed').length;
  const totalSubtasks = task.subtasks.length;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const complexityIcons = {
    easy: <Zap className="h-4 w-4" />,
    medium: <AlertCircle className="h-4 w-4" />,
    hard: <AlertCircle className="h-4 w-4" />,
  };

  const statusIcon = {
    todo: <Clock className="h-4 w-4" />,
    'in-progress': <Zap className="h-4 w-4 animate-pulse" />,
    completed: <CheckCircle2 className="h-4 w-4" />,
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(task)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-start gap-2">
            {statusIcon[task.status]}
            <div className="flex-1">
              <h3 className="font-semibold text-sm leading-tight">{task.title}</h3>
              {task.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{task.description}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority === 'low' ? 'Baixa' : task.priority === 'medium' ? 'Média' : 'Alta'}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              {complexityIcons[task.complexity]}
              {task.complexity === 'easy' ? 'Fácil' : task.complexity === 'medium' ? 'Média' : 'Difícil'}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              {task.duration}min
            </Badge>
          </div>

          {totalSubtasks > 0 && (
            <div className="space-y-1 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-semibold">
                  {completedSubtasks}/{totalSubtasks}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {task.status !== 'completed' && (
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onComplete?.(task);
              }}
              className="text-xs"
            >
              Completo
            </Button>
          )}
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
}
