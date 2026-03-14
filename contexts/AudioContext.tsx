'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Playlist, AudioTrack } from '@/lib/types';
import { playlistStorage } from '@/lib/storage';

interface AudioContextType {
  playlists: Playlist[];
  currentPlaylist: Playlist | null;
  isPlaying: boolean;
  currentTrack: AudioTrack | null;
  setCurrentPlaylist: (playlist: Playlist) => void;
  togglePlayback: () => void;
  playTrack: (track: AudioTrack) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  updatePlaylist: (playlist: Playlist) => void;
  addTrackToPlaylist: (playlistId: string, track: AudioTrack) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);

  // Initialize from storage on mount
  useEffect(() => {
    const stored = playlistStorage.getAll();
    setPlaylists(stored);
    const active = playlistStorage.getActive();
    setCurrentPlaylist(active);
  }, []);

  const handleSetCurrentPlaylist = useCallback((playlist: Playlist) => {
    setCurrentPlaylist(playlist);
    // Mark as active
    const updated = { ...playlist, isActive: true };
    setPlaylists((prev) =>
      prev.map((p) => ({
        ...p,
        isActive: p.id === updated.id,
      }))
    );
    playlistStorage.save(updated);
  }, []);

  const togglePlayback = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const playTrack = useCallback((track: AudioTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  }, []);

  const nextTrack = useCallback(() => {
    if (!currentPlaylist || currentPlaylist.tracks.length === 0) return;

    const currentIndex = currentPlaylist.tracks.findIndex((t) => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % currentPlaylist.tracks.length;
    setCurrentTrack(currentPlaylist.tracks[nextIndex]);
  }, [currentPlaylist, currentTrack]);

  const previousTrack = useCallback(() => {
    if (!currentPlaylist || currentPlaylist.tracks.length === 0) return;

    const currentIndex = currentPlaylist.tracks.findIndex((t) => t.id === currentTrack?.id);
    const prevIndex = currentIndex === 0 ? currentPlaylist.tracks.length - 1 : currentIndex - 1;
    setCurrentTrack(currentPlaylist.tracks[prevIndex]);
  }, [currentPlaylist, currentTrack]);

  const updatePlaylist = useCallback((playlist: Playlist) => {
    setPlaylists((prev) => prev.map((p) => (p.id === playlist.id ? playlist : p)));
    playlistStorage.save(playlist);
  }, []);

  const addTrackToPlaylist = useCallback(
    (playlistId: string, track: AudioTrack) => {
      const playlist = playlists.find((p) => p.id === playlistId);
      if (playlist) {
        const updated = {
          ...playlist,
          tracks: [...playlist.tracks, track],
        };
        updatePlaylist(updated);
      }
    },
    [playlists, updatePlaylist]
  );

  return (
    <AudioContext.Provider
      value={{
        playlists,
        currentPlaylist,
        isPlaying,
        currentTrack,
        setCurrentPlaylist: handleSetCurrentPlaylist,
        togglePlayback,
        playTrack,
        nextTrack,
        previousTrack,
        updatePlaylist,
        addTrackToPlaylist,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
