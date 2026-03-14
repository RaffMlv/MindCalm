'use client';

import { Task } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, X } from 'lucide-react';
import { useTask } from '@/contexts/TaskContext';
import { RoadmapVisualizer } from './RoadmapVisualizer';

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  const { completeSubtask, updateTask, deleteTask, completeTask } = useTask();

  const completedSubtasks = task.subtasks.filter((st) => st.status === 'completed').length;
  const totalDuration = task.subtasks.reduce((total, st) => total + st.duration, 0);

  const handleCompleteSubtask = (subtaskId: string) => {
    completeSubtask(task.id, subtaskId);
  };

  const handleCompleteTask = () => {
    completeTask(task.id);
    onClose();
  };

  const handleDeleteTask = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <Card className="p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b">
        <div>
          <h2 className="text-2xl font-bold">{task.title}</h2>
          {task.description && (
            <p className="text-muted-foreground mt-2">{task.description}</p>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="bg-secondary/10 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Duração Total</div>
            <div className="text-lg font-bold">{totalDuration} min</div>
          </div>
          <div className="bg-primary/10 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Complexidade</div>
            <div className="text-lg font-bold capitalize">
              {task.complexity === 'easy' ? 'Fácil' : task.complexity === 'medium' ? 'Média' : 'Difícil'}
            </div>
          </div>
          <div className="bg-accent/10 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Prioridade</div>
            <div className="text-lg font-bold capitalize">
              {task.priority === 'low' ? 'Baixa' : task.priority === 'medium' ? 'Média' : 'Alta'}
            </div>
          </div>
          <div className="bg-blue-100/10 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Status</div>
            <div className="text-lg font-bold capitalize">
              {task.status === 'todo' ? 'A Fazer' : task.status === 'in-progress' ? 'Em Progresso' : 'Completo'}
            </div>
          </div>
        </div>

        {/* Roadmap Visualizer */}
        <RoadmapVisualizer task={task} onSubtaskClick={(subtaskId) => handleCompleteSubtask(subtaskId)} />

        {task.subtasks.length > 0 && (
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Checklist de Tarefas ({completedSubtasks}/{task.subtasks.length})</h3>
              <Badge variant="secondary">{Math.round((completedSubtasks / task.subtasks.length) * 100)}%</Badge>
            </div>
            <Progress value={(completedSubtasks / task.subtasks.length) * 100} className="mb-4" />
            
            <div className="space-y-2">
              {task.subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-start gap-3 p-2 bg-background rounded hover:bg-muted/50 transition">
                  <button
                    onClick={() => handleCompleteSubtask(subtask.id)}
                    className="mt-1 flex-shrink-0"
                  >
                    {subtask.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm ${
                        subtask.status === 'completed'
                          ? 'line-through text-muted-foreground'
                          : 'text-foreground'
                      }`}
                    >
                      {subtask.title}
                    </p>
                  </div>
                  <Badge variant="outline" className="flex-shrink-0">
                    {subtask.duration} min
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4 border-t">
        {task.status !== 'completed' && (
          <Button onClick={handleCompleteTask} className="flex-1 bg-primary">
            Marcar como Completo
          </Button>
        )}
        <Button onClick={handleDeleteTask} variant="destructive" className="flex-1">
          Deletar Tarefa
        </Button>
      </div>
    </Card>
  );
}
