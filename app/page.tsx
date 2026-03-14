'use client';

import { useState } from 'react';
import { Dashboard } from '@/components/Dashboard';
import { FocusTimer } from '@/components/FocusTimer';
import { AudioPlayer } from '@/components/AudioPlayer';
import { GamificationWidget } from '@/components/GamificationWidget';
import { useFocus } from '@/contexts/FocusContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { LayoutGrid, Zap, Music, Trophy } from 'lucide-react';

export default function Home() {
  const { activeSession } = useFocus();
  const [currentTab, setCurrentTab] = useState(activeSession ? 'focus' : 'dashboard');

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">MindCalm</h1>
          <p className="text-lg text-muted-foreground">
            Gestão inteligente de tarefas com foco cognitivo, sessões de concentração e gamificação
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="focus" className="gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Foco</span>
              {activeSession && <span className="ml-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>}
            </TabsTrigger>
            <TabsTrigger value="audio" className="gap-2">
              <Music className="h-4 w-4" />
              <span className="hidden sm:inline">Áudio</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Realizações</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard />
          </TabsContent>

          {/* Focus Tab */}
          <TabsContent value="focus" className="space-y-6">
            {activeSession ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <FocusTimer
                    sessionId={activeSession.id}
                    taskId={activeSession.taskId}
                    plannedDuration={activeSession.duration}
                  />
                </div>
                <div>
                  <AudioPlayer />
                </div>
              </div>
            ) : (
              <Card className="p-12 text-center space-y-4">
                <Zap className="h-12 w-12 mx-auto text-muted-foreground" />
                <h2 className="text-2xl font-bold">Nenhuma Sessão Ativa</h2>
                <p className="text-muted-foreground">
                  Complete uma tarefa no Dashboard para iniciar uma sessão de foco
                </p>
              </Card>
            )}
          </TabsContent>

          {/* Audio Tab */}
          <TabsContent value="audio" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AudioPlayer />
            </div>
            <div>
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 h-full">
                <h3 className="font-semibold mb-4">Dicas de Áudio</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>🎵 Use sons ambiente para aumentar concentração</p>
                  <p>🌙 Diferentes playlists para diferentes tarefas</p>
                  <p>⏱️ Combine com sessões de Foco para melhor resultado</p>
                  <p>🎧 Ajuste o volume conforme sua preferência</p>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GamificationWidget />
            </div>
            <div>
              <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 h-full">
                <h3 className="font-semibold mb-4">Como Ganhar Pontos</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>🎯 Complete tarefas difíceis para mais XP</p>
                  <p>⏱️ Maior duração = mais XP ganho</p>
                  <p>🔥 Manter sequência de dias ativos</p>
                  <p>⭐ Desbloqueie badges especiais</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
