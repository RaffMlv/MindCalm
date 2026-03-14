'use client';

import { Task } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface RoadmapVisualizerProps {
  task: Task;
  onSubtaskClick?: (subtaskId: string) => void;
}

export function RoadmapVisualizer({ task, onSubtaskClick }: RoadmapVisualizerProps) {
  const completedSubtasks = task.subtasks.filter((st) => st.status === 'completed').length;
  const totalSubtasks = task.subtasks.length;
  const overallProgress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-2">Roteiro Automático</h3>
        <p className="text-sm text-muted-foreground">
          Tarefa dividida em {totalSubtasks} etapas baseado em complexidade e duração
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Progresso Geral</span>
          <Badge variant="secondary">{Math.round(overallProgress)}%</Badge>
        </div>
        <Progress value={overallProgress} className="h-3" />
      </div>

      {/* Timeline View */}
      <div className="space-y-4">
        {task.subtasks.map((subtask, index) => (
          <div key={subtask.id} className="relative">
            {/* Timeline connector */}
            {index < task.subtasks.length - 1 && (
              <div className="absolute left-5 top-12 h-8 w-0.5 bg-gradient-to-b from-muted to-transparent" />
            )}

            {/* Subtask Item */}
            <div
              className={`flex gap-4 p-3 rounded-lg transition cursor-pointer ${
                subtask.status === 'completed'
                  ? 'bg-green-50/50 dark:bg-green-950/10'
                  : 'bg-muted/50 hover:bg-muted'
              }`}
              onClick={() => onSubtaskClick?.(subtask.id)}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                {subtask.status === 'completed' ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium ${
                    subtask.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'
                  }`}
                >
                  {subtask.title}
                </p>
              </div>

              {/* Duration */}
              <div className="flex-shrink-0 flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{subtask.duration}m</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Time Breakdown */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <h4 className="text-sm font-medium">Estimativa de Tempo</h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <div className="text-muted-foreground">Total</div>
            <div className="font-semibold">{task.duration} min</div>
          </div>
          <div>
            <div className="text-muted-foreground">Completo</div>
            <div className="font-semibold">
              {task.subtasks
                .filter((st) => st.status === 'completed')
                .reduce((sum, st) => sum + st.duration, 0)}
              m
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Restante</div>
            <div className="font-semibold">
              {task.subtasks
                .filter((st) => st.status !== 'completed')
                .reduce((sum, st) => sum + st.duration, 0)}
              m
            </div>
          </div>
        </div>
      </div>

      {/* Complexity Info */}
      <div className="bg-primary/5 rounded-lg p-4 text-sm space-y-2">
        <p className="font-medium">Informação sobre a Decomposição</p>
        <p className="text-muted-foreground text-xs">
          Nível de complexidade: <strong>{task.complexity === 'easy' ? 'Fácil' : task.complexity === 'medium' ? 'Média' : 'Difícil'}</strong>
        </p>
        <p className="text-muted-foreground text-xs">
          Este roteiro foi gerado automaticamente dividindo a tarefa com base em seu tempo estimado e nível de complexidade. Ajuste conforme necessário.
        </p>
      </div>
    </Card>
  );
}
