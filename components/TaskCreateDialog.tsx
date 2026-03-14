'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { useTask } from '@/contexts/TaskContext';
import { Plus } from 'lucide-react';

export function TaskCreateDialog() {
  const { addTask } = useTask();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 30,
    complexity: 'medium' as 'easy' | 'medium' | 'hard',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    addTask({
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      complexity: formData.complexity,
      priority: formData.priority,
      status: 'todo',
    });

    setFormData({
      title: '',
      description: '',
      duration: 30,
      complexity: 'medium',
      priority: 'medium',
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" size="lg">
          <Plus className="h-4 w-4" />
          Nova Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Nova Tarefa</DialogTitle>
          <DialogDescription>
            Crie uma nova tarefa e defina sua complexidade e duração estimada
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Título da Tarefa *</FieldLabel>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="ex: Escrever relatório mensal"
                required
              />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="description">Descrição</FieldLabel>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detalhe a tarefa..."
                rows={3}
              />
            </Field>
          </FieldGroup>

          <div className="grid grid-cols-2 gap-3">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="duration">Duração (minutos)</FieldLabel>
                <Input
                  id="duration"
                  type="number"
                  min="10"
                  max="480"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="complexity">Complexidade</FieldLabel>
                <select
                  id="complexity"
                  value={formData.complexity}
                  onChange={(e) => setFormData({ ...formData, complexity: e.target.value as any })}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="easy">Fácil</option>
                  <option value="medium">Média</option>
                  <option value="hard">Difícil</option>
                </select>
              </Field>
            </FieldGroup>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="priority">Prioridade</FieldLabel>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </Field>
          </FieldGroup>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
