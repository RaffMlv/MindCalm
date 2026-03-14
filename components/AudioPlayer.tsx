'use client';

import { useEffect, useState } from 'react';
import { useAudio } from '@/contexts/AudioContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const DEFAULT_PLAYLISTS = [
  {
    name: 'Foco Ambiente',
    color: 'from-teal-500 to-cyan-500',
    tracks: [
      { name: 'Céu Estrelado', duration: '3:45' },
      { name: 'Floresta Tranquila', duration: '4:12' },
      { name: 'Chuva Noturna', duration: '5:00' },
    ],
  },
  {
    name: 'Sons de Chuva',
    color: 'from-blue-500 to-indigo-500',
    tracks: [
      { name: 'Chuva Suave', duration: '4:30' },
      { name: 'Trovão Distante', duration: '5:15' },
      { name: 'Pátio na Chuva', duration: '4:00' },
    ],
  },
  {
    name: 'Natureza',
    color: 'from-green-500 to-emerald-500',
    tracks: [
      { name: 'Pássaros Cantando', duration: '3:20' },
      { name: 'Riacho Fluindo', duration: '4:45' },
      { name: 'Vento nas Árvores', duration: '3:50' },
    ],
  },
];

export function AudioPlayer() {
  const { isPlaying, togglePlayback } = useAudio();
  const [currentPlaylist, setCurrentPlaylist] = useState(DEFAULT_PLAYLISTS[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(70);

  const currentTrack = currentPlaylist.tracks[currentTrackIndex];

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % currentPlaylist.tracks.length);
  };

  const handlePreviousTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + currentPlaylist.tracks.length) % currentPlaylist.tracks.length);
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground">Música Ambiente</h3>
        <div className={`bg-gradient-to-br ${currentPlaylist.color} rounded-lg p-4 text-white`}>
          <h2 className="text-xl font-bold">{currentPlaylist.name}</h2>
          <p className="text-sm opacity-90">{currentTrack.name}</p>
        </div>
      </div>

      {/* Playlist Selector */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Selecione uma Playlist</label>
        <div className="grid grid-cols-3 gap-2">
          {DEFAULT_PLAYLISTS.map((playlist, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPlaylist(playlist);
                setCurrentTrackIndex(0);
              }}
              className={`p-2 rounded-lg text-xs font-medium transition ${
                currentPlaylist.name === playlist.name
                  ? 'ring-2 ring-primary bg-primary/20'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {playlist.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Track List */}
      <div className="space-y-1">
        {currentPlaylist.tracks.map((track, index) => (
          <div
            key={index}
            className={`p-2 rounded text-xs cursor-pointer transition ${
              index === currentTrackIndex ? 'bg-primary/20 text-primary font-semibold' : 'hover:bg-muted'
            }`}
            onClick={() => setCurrentTrackIndex(index)}
          >
            <div className="flex items-center justify-between">
              <span>{index === currentTrackIndex && '▶ '}{track.name}</span>
              <span className="text-muted-foreground">{track.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="space-y-3 pt-2 border-t">
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-8">{volume}%</span>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handlePreviousTrack} className="flex-1 gap-1">
            <SkipBack className="h-4 w-4" />
            Anterior
          </Button>
          <Button
            size="sm"
            onClick={togglePlayback}
            className={`flex-1 gap-1 ${isPlaying ? 'bg-secondary' : 'bg-primary'}`}
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pausar
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Reproduzir
              </>
            )}
          </Button>
          <Button size="sm" variant="outline" onClick={handleNextTrack} className="flex-1 gap-1">
            <SkipForward className="h-4 w-4" />
            Próxima
          </Button>
        </div>
      </div>

      <Badge variant="secondary" className="w-full justify-center py-1">
        {isPlaying ? '🎵 Reproduzindo' : '⏸️ Pausado'}
      </Badge>
    </Card>
  );
}
