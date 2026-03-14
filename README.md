# Cognitive Focus - Plataforma de Gestão de Tarefas com Foco Cognitivo

Uma aplicação web moderna para gestão inteligente de tarefas com sessões de foco Pomodoro, sistema de áudio ambiente, gamificação e roadmaps automáticos.

## Recursos Principais

### 📊 Dashboard de Tarefas
- Criar, editar e gerenciar tarefas
- Filtrar por status (A Fazer, Em Andamento, Completas)
- Visualização em cards com progresso
- Suporte a diferentes níveis de prioridade e complexidade

### 🎯 Sessões de Foco com Pomodoro
- Timer Pomodoro integrado (25 minutos de foco + 5 de pausa)
- Rastreamento de tempo focado
- Sessões de foco por tarefa
- Histórico de sessões

### 🎵 Sistema de Áudio Ambiente
- 3 playlists pré-configuradas (Foco Ambiente, Sons de Chuva, Natureza)
- Controle de volume
- Seleção de faixas
- Integração com sessões de foco

### 🏆 Gamificação e Realizações
- Sistema de XP (experiência) progressivo
- Níveis com progressão exponencial
- Desbloquio de Badges/Medalhas
- Rastreamento de sequências diárias
- Estatísticas de produtividade

### 📋 Roteiro Automático (Roadmap)
- Divisão automática de tarefas em subtarefas
- Algoritmo determinístico baseado em complexidade e duração
- Visualização de progresso em timeline
- Checkboxes para marcar etapas concluídas

## Arquitetura Técnica

### Stack
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + Tailwind CSS 4
- **Componentes**: shadcn/ui
- **Estado**: React Context + Custom Hooks
- **Persistência**: localStorage
- **Tipagem**: TypeScript

### Estrutura de Pastas
```
/app                  # Páginas e layout
/components          # Componentes React
  /ui               # Componentes shadcn/ui
/contexts            # React Contexts
/lib                 # Utilidades e tipos
  - types.ts        # Definições TypeScript
  - storage.ts      # Utilitários de localStorage
  - business-logic.ts # Lógica de negócio
```

### Contextos React
1. **TaskContext** - Gerenciamento de tarefas
2. **FocusContext** - Gerenciamento de sessões de foco
3. **AudioContext** - Gerenciamento de playlists de áudio
4. **GamificationContext** - Gerenciamento de XP, níveis e badges

## Como Usar

### Criando uma Tarefa
1. Acesse o Dashboard
2. Clique em "Nova Tarefa"
3. Preencha título, descrição, duração estimada
4. Selecione complexidade (Fácil, Média, Difícil)
5. Clique em "Criar Tarefa"
6. A tarefa será automaticamente dividida em subtarefas

### Iniciando uma Sessão de Foco
1. Selecione uma tarefa no Dashboard
2. Clique em "Completo" para iniciar a sessão
3. Será redirecionado para a aba de Foco
4. Clique em "Iniciar" para começar o timer Pomodoro
5. Use a música ambiente se necessário

### Ganhando XP e Desbloqueando Badges
- Complete tarefas para ganhar XP
- Tarefas de complexidade maior dão mais XP
- Maior duração = mais XP
- Manter sequência diária aumenta bônus
- Desbloqueie badges ao atingir milestones

## Configuração e Desenvolvimento

### Requisitos
- Node.js 18+
- npm ou pnpm

### Instalação
```bash
# Clone ou faça download do projeto
cd cognitive-focus

# Instale as dependências
npm install

# ou com pnpm
pnpm install
```

### Desenvolvimento
```bash
npm run dev
# A aplicação estará disponível em http://localhost:3000
```

### Build para Produção
```bash
npm run build
npm run start
```

## Dados e Persistência

Todos os dados são armazenados localmente usando localStorage:
- `cognitiveapp_tasks` - Lista de tarefas
- `cognitiveapp_focusSessions` - Histórico de sessões
- `cognitiveapp_userStats` - Estatísticas do usuário
- `cognitiveapp_playlists` - Playlists de áudio

## Roadmap Futuro

### MVP + Features
- [ ] Integração com IA (OpenAI/Groq) para sugestões de subtarefas
- [ ] Sincronização com backend
- [ ] Autenticação de usuários
- [ ] Exportar dados de produtividade
- [ ] Modo escuro/claro selecionável
- [ ] Integração com calendário
- [ ] Notificações desktop
- [ ] Análise de produtividade com gráficos

### Sistema de Subscrição (Freemium)
- [ ] Plano Free com limitações
- [ ] Plano Premium com recursos avançados
- [ ] Sincronização entre dispositivos
- [ ] Backup automático

### Melhorias de UX
- [ ] Drag-and-drop para reordenar tarefas
- [ ] Temas customizáveis
- [ ] Atalhos de teclado
- [ ] PWA (instalável no celular)
- [ ] Offline-first

## Contribuindo

Este é um projeto open source. Sinta-se livre para:
- Reportar bugs
- Sugerir features
- Fazer pull requests

## Licença

MIT

## Autor

Criado com ❤️ usando v0 by Vercel

---

**Dica**: Comece criando algumas tarefas, teste a divisão automática em subtarefas e experimente as sessões de foco com a música ambiente para ver toda a magia funcionando!
