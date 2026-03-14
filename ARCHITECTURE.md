# Arquitetura do Cognitive Focus

## Visão Geral

O Cognitive Focus é uma aplicação web de gestão de tarefas com foco em produtividade através de técnicas de psicologia cognitiva. A arquitetura é baseada em React Context para estado global, localStorage para persistência local, e shadcn/ui para componentes de interface.

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 16 com App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui (com Radix UI)
- **State Management**: React Context + useCallback/useState
- **Tipagem**: TypeScript 5+
- **Persistência**: localStorage nativo

### Sem Dependências de Backend (MVP)
- Nenhuma chamada de API
- Sem servidor necessário
- Dados sincronizados apenas localmente
- Possibilidade futura de integração com backend

## Arquitetura de Pastas

```
cognitive-focus/
├── app/
│   ├── layout.tsx              # Root layout com providers
│   ├── page.tsx                # Homepage com navegação
│   ├── globals.css             # Estilos globais e temas
│   └── [next.config files]
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── field.tsx
│   │   └── ...more
│   ├── Dashboard.tsx           # Dashboard principal
│   ├── TaskCard.tsx            # Card individual de tarefa
│   ├── TaskDetail.tsx          # Detalhe expandido da tarefa
│   ├── TaskCreateDialog.tsx    # Dialog para criar tarefa
│   ├── FocusTimer.tsx          # Timer Pomodoro
│   ├── AudioPlayer.tsx         # Reprodutor de áudio
│   ├── GamificationWidget.tsx  # Widget de XP/badges
│   ├── RoadmapVisualizer.tsx   # Visualizador de roadmap
│   ├── OnboardingTips.tsx      # Dicas de boas-vindas
│   ├── index.ts                # Barrel export
│   └── theme-provider.tsx
├── contexts/
│   ├── TaskContext.tsx         # Contexto de tarefas
│   ├── FocusContext.tsx        # Contexto de sessões
│   ├── AudioContext.tsx        # Contexto de áudio
│   └── GamificationContext.tsx # Contexto de gamificação
├── lib/
│   ├── types.ts                # Definições TypeScript
│   ├── storage.ts              # Utilitários de localStorage
│   ├── business-logic.ts       # Lógica de negócio
│   └── sample-data.ts          # Dados de exemplo
├── hooks/
│   └── [shadcn hooks]          # use-mobile, use-toast, etc
└── README.md
```

## Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                   React Components (UI)                      │
│  Dashboard → TaskCard → TaskDetail → FocusTimer → AudioPlayer│
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   React Contexts (State)                     │
│  TaskContext │ FocusContext │ AudioContext │ GamificationCtx│
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│         Business Logic (Calculations & Logic)                │
│  - generateSubtasks()     - calculateXP()                   │
│  - calculateLevel()       - checkBadgeUnlock()              │
│  - updateStreak()         - generateId()                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│            Storage Layer (localStorage)                      │
│  cognitiveapp_tasks  │ cognitiveapp_focusSessions           │
│  cognitiveapp_userStats  │ cognitiveapp_playlists           │
└─────────────────────────────────────────────────────────────┘
```

## Context API - Estrutura de Cada Contexto

### TaskContext
**Responsabilidades**:
- CRUD de tarefas
- Gerenciamento de subtarefas
- Sincronização com localStorage

**Métodos principais**:
```typescript
addTask(task: Task) -> void
updateTask(task: Task) -> void
deleteTask(id: string) -> void
completeTask(id: string) -> void
addSubtask(taskId: string, title: string, duration: number) -> void
completeSubtask(taskId: string, subtaskId: string) -> void
getTaskById(id: string) -> Task | undefined
```

### FocusContext
**Responsabilidades**:
- Gerenciamento de sessões de foco
- Rastreamento de Pomodoros
- Cálculo de tempo total focado

**Métodos principais**:
```typescript
startSession(taskId: string, duration: number) -> void
endSession(sessionId: string, actualDuration: number) -> void
completePomodoro(sessionId: string) -> void
pauseSession(sessionId: string) -> void
resumeSession(sessionId: string) -> void
getTotalFocusMinutes() -> number
```

### AudioContext
**Responsabilidades**:
- Gerenciamento de playlists
- Controle de reprodução
- Sincronização de faixas

**Métodos principais**:
```typescript
setCurrentPlaylist(playlist: Playlist) -> void
togglePlayback() -> void
playTrack(track: AudioTrack) -> void
nextTrack() -> void
previousTrack() -> void
updatePlaylist(playlist: Playlist) -> void
```

### GamificationContext
**Responsabilidades**:
- Rastreamento de XP e níveis
- Gerenciamento de badges
- Cálculo de progressão

**Métodos principais**:
```typescript
addXP(xp: number) -> void
addTaskCompletion(complexity, duration) -> void
addFocusMinutes(minutes: number) -> void
checkAndUnlockBadges() -> Badge[]
getNextLevelInfo() -> { current, next }
```

## Algoritmos Principais

### 1. Geração Automática de Subtarefas
```
entradas: task.complexity, task.duration

1. Calcular número base de subtarefas:
   - easy:   2 subtarefas
   - medium: 3 subtarefas
   - hard:   5 subtarefas

2. Ajustar por duração:
   - +1 subtarefa por cada 60 minutos

3. Distribuir tempo uniformemente:
   - totalDuration = task.duration * 0.9 (reserva 10% para transições)
   - duração por subtarefa = totalDuration / count

4. Gerar títulos descritivos baseados em fases
```

### 2. Cálculo de XP
```
fórmula: baseXP * complexityMultiplier + streakBonus

complexityMultiplier:
  - easy:   1.0x
  - medium: 1.5x
  - hard:   2.0x

baseXP = (duration / 10) * complexityMultiplier
streakBonus = baseXP * (streak * 0.1)  // 10% por dia de sequência
```

### 3. Progressão de Níveis
```
fórmula exponencial: level_n requer n² * 100 XP

exemplos:
  Nível 1 → Nível 2:  100 XP
  Nível 2 → Nível 3:  400 XP
  Nível 3 → Nível 4:  900 XP
  Nível 4 → Nível 5: 1600 XP
  Nível 5 → Nível 6: 2500 XP

total acumulado até nível 5: ~4000 XP
```

### 4. Desbloqueio de Badges
Badges são desbloqueadas ao atingir milestones:
```
Task Completion:
  - 1ª tarefa:  'first-task'
  - 5 tarefas:  'task-master-5'
  - 10 tarefas: 'task-master-10'
  - 50 tarefas: 'task-master-50'

Focus Sessions:
  - 60 minutos:  'focused-hour'
  - 300 minutos: 'focused-5hours'
  - 1000 minutos: 'focused-master'

Levels:
  - Nível 5:  'level-5'
  - Nível 10: 'level-10'
  - Nível 20: 'level-20'
```

## Persistência de Dados

### localStorage Keys
```javascript
cognitiveapp_tasks              // Task[]
cognitiveapp_focusSessions      // FocusSession[]
cognitiveapp_userStats          // UserStats
cognitiveapp_playlists          // Playlist[]
```

### Estratégia de Sincronização
1. **On Change**: Toda mudança de estado atualiza localStorage instantaneamente
2. **On Load**: Ao montar componentes, dados são carregados do localStorage
3. **Atomic Writes**: Cada chave é escrita atomicamente (sem transações)

### Tratamento de Erros
- Falhas de escrita são logadas no console
- Leitura de dados inválidos retorna valor padrão
- localStorage limitado a ~5-10MB (suficiente para MVP)

## Temas e Cores

### Paleta de Cores (Design Token Based)
```
Primary (Foco):    oklch(0.35 0.15 240)   - Deep Teal
Secondary (Calma): oklch(0.55 0.12 160)   - Soft Green
Accent (Êxito):    oklch(0.68 0.18 70)    - Warm Gold
```

### Modo Dark
Cores são inversas mantendo contraste adequado:
```
Background Dark:   oklch(0.15 0.01 250)
Primary Dark:      oklch(0.65 0.18 240)
Accent Dark:       oklch(0.75 0.2 70)
```

## Componentes Principais

### Dashboard
- Exibe estatísticas resumidas
- Lista de tarefas com filtros
- Dialog para criar nova tarefa
- Detalhes de tarefa em sidebar

### FocusTimer
- Timer Pomodoro com countdown
- Controles play/pause/reset
- Rastreamento de Pomodoros completados
- Progresso da sessão

### AudioPlayer
- Seletor de playlists
- Lista de faixas
- Controles de reprodução
- Ajuste de volume

### GamificationWidget
- Barra de progresso de XP
- Estatísticas do usuário
- Exibição de badges recentes
- Mensagens motivacionais

### RoadmapVisualizer
- Timeline visual das subtarefas
- Indicadores de conclusão
- Estimativa de tempo
- Informações sobre decomposição

## Performance

### Otimizações Implementadas
1. **Memoização**: useCallback para evitar re-renders desnecessários
2. **Lazy State**: Dados carregados sob demanda do localStorage
3. **No Re-renders Excessivos**: Contexts divididos por preocupação
4. **Progressive Enhancement**: Funciona sem JavaScript com fallbacks HTML

### Limites Conhecidos
- localStorage limitado (~5-10MB)
- Sem sincronização entre abas do navegador
- Sem offline-first (dados perdidos sem localStorage)
- Sem versionamento de dados

## Roadmap de Melhorias

### Curto Prazo (Próximas versões)
- [ ] Integração com IA para sugestões
- [ ] Sincronização entre dispositivos
- [ ] Modo offline com Service Workers
- [ ] Notificações desktop

### Médio Prazo
- [ ] Backend com Node.js/Supabase
- [ ] Autenticação de usuários
- [ ] Sincronização em real-time
- [ ] Análise de produtividade

### Longo Prazo
- [ ] Integração com calendário
- [ ] Collaborative features
- [ ] Mobile apps (React Native)
- [ ] Sistema de subscrição (freemium)

## Variáveis de Ambiente (Futuro)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_ANALYTICS_ID=...
GROQ_API_KEY=... (para IA)
```

---

**Nota**: Esta é a arquitetura do MVP. Para produção com muitos usuários, considere migrar para Supabase, Firebase ou backend customizado.
