'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Music, Trophy } from 'lucide-react';

interface OnboardingTipsProps {
  onDismiss?: () => void;
}

export function OnboardingTips({ onDismiss }: OnboardingTipsProps) {
  return (
    <Card className="p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-2 border-primary/20">
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-primary" />
            Bem-vindo ao Cognitive Focus!
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3 p-3 bg-background/50 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Crie suas primeiras tarefas</p>
              <p className="text-xs text-muted-foreground">Use o botão "Nova Tarefa" para começar. Elas serão automaticamente divididas em subtarefas.</p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-background/50 rounded-lg">
            <Music className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Ative a música ambiente</p>
              <p className="text-xs text-muted-foreground">Vá para a aba "Áudio" e escolha uma playlist para aumentar sua concentração durante as tarefas.</p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-background/50 rounded-lg">
            <Trophy className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Ganhe XP e Badges</p>
              <p className="text-xs text-muted-foreground">Complete tarefas para ganhar experiência, subir níveis e desbloquear insígnias de realizações.</p>
            </div>
          </div>
        </div>

        {onDismiss && (
          <Button onClick={onDismiss} variant="outline" className="w-full">
            Entendi, começar
          </Button>
        )}
      </div>
    </Card>
  );
}
