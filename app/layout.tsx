import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { TaskProvider } from '@/contexts/TaskContext'
import { FocusProvider } from '@/contexts/FocusContext'
import { AudioProvider } from '@/contexts/AudioContext'
import { GamificationProvider } from '@/contexts/GamificationContext'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'MindCalm - Gestão Inteligente de Tarefas',
  description: 'Plataforma de gestão de tarefas com foco cognitivo, sessões de concentração e gamificação',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <TaskProvider>
          <FocusProvider>
            <AudioProvider>
              <GamificationProvider>
                {children}
              </GamificationProvider>
            </AudioProvider>
          </FocusProvider>
        </TaskProvider>
        <Analytics />
      </body>
    </html>
  )
}
