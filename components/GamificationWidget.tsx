'use client';

import { useGamification } from '@/contexts/GamificationContext';
import { useFocus } from '@/contexts/FocusContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Trophy, Star, Flame } from 'lucide-react';

export function GamificationWidget() {
  const { userStats, getNextLevelInfo } = useGamification();
  const { getTotalFocusMinutes } = useFocus();

  const { current, next } = getNextLevelInfo();
  const progress = (current / next) * 100;
  const focusMinutes = getTotalFocusMinutes();

  // Get recent badges (max 5)
  const recentBadges = userStats.badges.sort((a, b) => b.unlockedAt - a.unlockedAt).slice(0, 5);

  return (
    <Card className="p-6 space-y-6">
      {/* Level Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center gap-2">
            <Trophy className="h-4 w-4 text-accent" />
            Nível {userStats.level}
          </h3>
          <Badge variant="secondary">{userStats.totalXP} XP</Badge>
        </div>
        <Progress value={progress} className="h-3" />
        <p className="text-xs text-muted-foreground">
          {current.toLocaleString()} / {next.toLocaleString()} XP para próximo nível
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-primary/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold mb-1">{userStats.totalTasksCompleted}</div>
          <div className="text-xs text-muted-foreground">Tarefas</div>
        </div>
        <div className="bg-secondary/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold mb-1 flex items-center justify-center gap-1">
            <Flame className="h-4 w-4 text-orange-500" />
            {userStats.streak}
          </div>
          <div className="text-xs text-muted-foreground">Sequência</div>
        </div>
        <div className="bg-accent/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold mb-1">{focusMinutes}m</div>
          <div className="text-xs text-muted-foreground">Focado</div>
        </div>
      </div>

      {/* Badges Section */}
      {userStats.badges.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Star className="h-4 w-4 text-accent" />
            Badges Recentes
          </h4>
          <div className="space-y-2">
            {recentBadges.map((badge) => (
              <div key={badge.id} className="flex items-start gap-2 p-2 bg-muted/50 rounded-lg">
                <div className="text-2xl">{badge.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{badge.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{badge.description}</p>
                </div>
                <Badge variant="outline" className="flex-shrink-0 text-xs">
                  {badge.rarity === 'common' ? '⭐' : badge.rarity === 'uncommon' ? '⭐⭐' : badge.rarity === 'rare' ? '⭐⭐⭐' : '⭐⭐⭐⭐'}
                </Badge>
              </div>
            ))}
          </div>
          {userStats.badges.length > 5 && (
            <p className="text-xs text-muted-foreground text-center">
              +{userStats.badges.length - 5} badges desbloqueados
            </p>
          )}
        </div>
      )}

      {/* Empty State */}
      {userStats.badges.length === 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">Complete tarefas para desbloquear badges!</p>
          <div className="text-4xl mt-2">🎯</div>
        </div>
      )}

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 text-center">
        <p className="text-xs text-muted-foreground">
          {userStats.level < 5
            ? 'Continue completando tarefas para subir de nível!'
            : userStats.level < 10
              ? 'Você está no caminho certo!'
              : 'Parabéns! Você é um mestre da produtividade! 🏆'}
        </p>
      </div>
    </Card>
  );
}
