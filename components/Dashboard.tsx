'use client';

import { useState } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { useFocus } from '@/contexts/FocusContext';
import { useGamification } from '@/contexts/GamificationContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TaskCard } from './TaskCard';
import { TaskDetail } from './TaskDetail';
import { TaskCreateDialog } from './TaskCreateDialog';
import { Task } from '@/lib/types';
import { Filter, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export function Dashboard() {
  const { tasks, completeTask } = useTask();
  const { startSession } = useFocus();
  const { addTaskCompletion } = useGamification();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    todo: tasks.filter((t) => t.status === 'todo').length,
  };

  const handleStartSession = (task: Task) => {
    completeTask(task.id);
    addTaskCompletion(task.complexity, task.duration);
    startSession(task.id, task.duration);
    // Navigation will be handled by main layout
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10">
          <div className="text-xs text-muted-foreground mb-1">Total de Tarefas</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10">
          <div className="text-xs text-muted-foreground mb-1">Completadas</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100/50 dark:from-yellow-950/20 dark:to-yellow-900/10">
          <div className="text-xs text-muted-foreground mb-1">Em Andamento</div>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.inProgress}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10">
          <div className="text-xs text-muted-foreground mb-1">A Fazer</div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.todo}</div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Minhas Tarefas</h2>
            <TaskCreateDialog />
          </div>

          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="gap-1">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Todas</span>
              </TabsTrigger>
              <TabsTrigger value="todo" className="gap-1">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">A Fazer</span>
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="gap-1">
                <AlertCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Andamento</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="gap-1">
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Completas</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="space-y-2 mt-4">
              {filteredTasks.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">Nenhuma tarefa neste filtro</p>
                </Card>
              ) : (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onSelect={setSelectedTask}
                    onComplete={() => handleStartSession(task)}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Task Detail or Info */}
        <div className="lg:col-span-1">
          {selectedTask ? (
            <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />
          ) : (
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="font-semibold mb-4">Dicas de Foco</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>📌 Divida grandes projetos em tarefas menores para melhor gestão</p>
                <p>🎯 Use sessões de foco para manter a concentração</p>
                <p>🎵 Ative áudio ambiente para aumentar produtividade</p>
                <p>⭐ Complete tarefas para ganhar XP e desbloquear badges</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
