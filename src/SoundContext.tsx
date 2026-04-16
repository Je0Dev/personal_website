import { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';

interface SoundContextType {
  enabled: boolean;
  toggle: () => void;
  play: (type: SoundType) => void;
  playScroll: () => void;
}

type SoundType = 'hover' | 'click' | 'success' | 'error' | 'open' | 'close' | 'toggle';

const SoundContext = createContext<SoundContextType>({ enabled: false, toggle: () => {}, play: () => {}, playScroll: () => {} });

export function useSound() {
  return useContext(SoundContext);
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    const stored = localStorage.getItem('sound-enabled');
    return stored ? JSON.parse(stored) : false;
  });
  const lastScrollPlay = useRef(0);

  useEffect(() => {
    localStorage.setItem('sound-enabled', JSON.stringify(enabled));
  }, [enabled]);

  const playNote = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!enabled) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
  }, [enabled]);

  const play = (type: SoundType) => {
    const sounds: Record<SoundType, [number, number, OscillatorType]> = {
      hover: [900, 0.03, 'sine'],
      click: [600, 0.08, 'sine'],
      success: [523, 0.15, 'sine'],
      error: [440, 0.2, 'sawtooth'],
      open: [800, 0.1, 'sine'],
      close: [500, 0.1, 'sine'],
      toggle: [700, 0.05, 'square'],
    };
    const [freq, dur, oscType] = sounds[type];
    playNote(freq, dur, oscType);
  };

  const playScroll = useCallback(() => {
    if (!enabled) return;
    const now = Date.now();
    if (now - lastScrollPlay.current > 150) {
      playNote(300, 0.02, 'sine');
      lastScrollPlay.current = now;
    }
  }, [enabled, playNote]);

  const toggle = () => setEnabled(prev => !prev);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play, playScroll }}>
      {children}
    </SoundContext.Provider>
  );
}