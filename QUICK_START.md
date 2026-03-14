# Quick Start Guide - Cognitive Focus

## 🚀 Iniciar o Projeto

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Abrir no navegador
# http://localhost:3000
```

## 📝 Guia Rápido de Uso

### Criar Sua Primeira Tarefa

1. **Clique em "Nova Tarefa"** no canto superior direito
2. **Preencha os detalhes**:
   - Título: ex. "Escrever Relatório"
   - Descrição (opcional): detalhes da tarefa
   - Duração: 30-120 minutos (estimativa)
   - Complexidade: Fácil, Média ou Difícil
   - Prioridade: Baixa, Média ou Alta
3. **Clique em "Criar Tarefa"**
4. ✨ A tarefa será **automaticamente dividida em subtarefas**!

### Iniciar uma Sessão de Foco

1. **No Dashboard**, clique em uma tarefa
2. **Clique no botão "Completo"** para iniciar sessão
3. Você será levado para a **aba Foco**
4. **Clique "Iniciar"** para começar o timer Pomodoro
5. **25 minutos** para se concentrar na tarefa!
6. Após o timer, você terá **5 minutos de pausa**

### Ativar Música Ambiente

1. **Vá para a aba "Áudio"**
2. **Selecione uma playlist**:
   - 🌳 Foco Ambiente (recomendado)
   - 🌧️ Sons de Chuva
   - 🌲 Natureza
3. **Escolha uma faixa** e clique em "Reproduzir"
4. **Ajuste o volume** conforme preferência

### Visualizar Progresso e Badges

1. **Vá para a aba "Realizações"**
2. **Veja seu nível e XP**
3. **Observe os badges desbloqueados**
4. Quanto mais tarefas completas = mais XP = novos badges!

## 💡 Dicas para Máxima Produtividade

### ✅ Boas Práticas

1. **Comece com tarefas pequenas** (30-60 minutos)
   - Suas subtarefas serão mais gerenciáveis
   - Você ganhará XP mais rapidamente

2. **Use a música ambiente**
   - Melhora 20-30% a concentração
   - Ajude a manter o foco durante Pomodoros

3. **Mantenha uma sequência**
   - Complete pelo menos 1 tarefa por dia
   - Desbloqueie badges de sequência

4. **Variação de complexidade**
   - Misture tarefas fáceis e difíceis
   - Tarefas difíceis dão mais XP

### 🎯 Estratégia de Foco

- **Tarefa Fácil (30 min)**: 1 Pomodoro
- **Tarefa Média (60 min)**: 2-3 Pomodoros
- **Tarefa Difícil (120 min)**: 4-5 Pomodoros

### 🏆 Como Ganhar Badges Rápido

```
🚀 Primeiro Passo        - Complete 1 tarefa
⭐ Aprendiz               - Complete 5 tarefas
🎯 Hora Focada          - Foque 60 minutos
🏆 Mestre de Tarefas    - Complete 10 tarefas
⚡ Foco Absoluto         - Foque 1000 minutos!
```

## 🎨 Personalizações

### Alterar Tema
- O projeto usa **Tailwind CSS** com temas em oklch
- Cores podem ser alteradas em `/app/globals.css`
- Temas automáticos para light/dark mode

### Adicionar Mais Playlists
- Edite `/components/AudioPlayer.tsx`
- Adicione mais em `DEFAULT_PLAYLISTS`
- Cada playlist pode ter múltiplas faixas

## 🐛 Troubleshooting

### Dados Desapareceram
- localStorage pode ter sido limpo
- Verifique: DevTools → Application → localStorage
- Procure por `cognitiveapp_*`

### Timer não funciona
- Verifique o console (F12)
- Tente resetar a sessão
- Recarregue a página

### Música não toca
- Atualmente é um placeholder (sem áudio real)
- MVP apenas simula controles
- Adicione URLs de áudio reais em `/lib/sample-data.ts`

## 📊 Entendendo as Estatísticas

### XP (Experiência)
```
XP por tarefa = (Duração / 10) × Multiplicador × Bônus Sequência

Multiplicadores:
- Fácil:   1.0x
- Média:   1.5x
- Difícil: 2.0x
```

### Níveis
```
Cada nível requer mais XP que o anterior (progressão exponencial)

Nível 1→2:   100 XP
Nível 2→3:   400 XP
Nível 3→4:   900 XP
Nível 4→5: 1.600 XP
```

### Sequência (Streak)
```
- Ganhe bônus de +10% XP por dia consecutivo
- A sequência reseta se pular um dia
- Desbloqueie badges de sequência
```

## 🔧 Configuração Avançada

### Editar Duração do Pomodoro
- Arquivo: `/components/FocusTimer.tsx`
- Procure: `const POMODORO_DURATION = 25 * 60`
- Mude para: `const POMODORO_DURATION = XX * 60` (em segundos)

### Carregar Dados de Exemplo
- Descomente em `/lib/storage.ts`
- Função: `initializeDefaultData()`
- Importar: `SAMPLE_TASKS` de `/lib/sample-data.ts`

## 📚 Estrutura de Arquivos (Para Desenvolvimento)

```
app/              - Páginas e layout
├── page.tsx      - Página principal com navegação
└── layout.tsx    - Layout raiz com providers

components/       - Componentes React
├── Dashboard.tsx - Painel principal
├── FocusTimer.tsx - Timer Pomodoro
├── AudioPlayer.tsx - Reprodutor
└── ...

contexts/         - Estado global
├── TaskContext.tsx
├── FocusContext.tsx
├── AudioContext.tsx
└── GamificationContext.tsx

lib/             - Utilidades
├── types.ts      - Tipos TypeScript
├── storage.ts    - localStorage
├── business-logic.ts - Lógica
└── sample-data.ts - Dados exemplo
```

## 🚀 Próximos Passos (Desenvolvimento)

1. **Adicione IA**:
   - Integre Groq ou OpenAI
   - Use para melhorar sugestões de subtarefas

2. **Adicione Backend**:
   - Use Supabase para autenticação
   - Sincronize dados entre dispositivos

3. **Melhore Áudio**:
   - Adicione URLs reais de áudio
   - Integre com Spotify API

4. **Modo Offline**:
   - Implemente Service Workers
   - Sincronize quando voltar online

## 💬 Feedback

- Este é um MVP (Produto Mínimo Viável)
- Feedback é bem-vindo!
- Reporte bugs em Issues
- Sugira features em Discussions

---

**Pronto para aumentar sua produtividade?** 🚀

Comece agora: `npm run dev` e acesse http://localhost:3000
