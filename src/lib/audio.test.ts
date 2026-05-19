import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { playHoverSound, speakText, stopSpeaking } from './audio';

describe('Audio Utilities', () => {
  let mockOscillator: any;
  let mockGainNode: any;
  let mockAudioContext: any;
  let mockSpeak: any;
  let mockCancel: any;

  class MockSpeechSynthesisUtterance {
    text: string;
    rate = 1.0;
    pitch = 1.0;
    volume = 1.0;
    onboundary: any = null;
    onend: any = null;
    constructor(text: string) {
      this.text = text;
    }
  }

  beforeEach(() => {
    // Mock AudioContext
    mockOscillator = {
      type: 'sine',
      frequency: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };

    mockGainNode = {
      gain: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
    };

    mockAudioContext = {
      currentTime: 10,
      createOscillator: vi.fn(() => mockOscillator),
      createGain: vi.fn(() => mockGainNode),
      destination: {},
      close: vi.fn().mockResolvedValue(undefined),
    };

    window.AudioContext = vi.fn().mockImplementation(function() {
      return mockAudioContext;
    });

    // Mock SpeechSynthesis
    mockSpeak = vi.fn();
    mockCancel = vi.fn();

    window.speechSynthesis = {
      speak: mockSpeak,
      cancel: mockCancel,
    } as any;

    window.SpeechSynthesisUtterance = MockSpeechSynthesisUtterance as any;
  });

  afterEach(() => {
    delete (window as any).AudioContext;
    delete (window as any).speechSynthesis;
    delete (window as any).SpeechSynthesisUtterance;
    vi.useRealTimers();
  });

  describe('playHoverSound', () => {
    it('creates audio context nodes and triggers playback', () => {
      playHoverSound();

      expect(window.AudioContext).toHaveBeenCalled();
      expect(mockAudioContext.createOscillator).toHaveBeenCalled();
      expect(mockAudioContext.createGain).toHaveBeenCalled();
      expect(mockOscillator.connect).toHaveBeenCalledWith(mockGainNode);
      expect(mockGainNode.connect).toHaveBeenCalledWith(mockAudioContext.destination);
      expect(mockOscillator.start).toHaveBeenCalled();
      expect(mockOscillator.stop).toHaveBeenCalled();
    });

    it('cleans up AudioContext after a delay', () => {
      vi.useFakeTimers();
      playHoverSound();

      expect(mockAudioContext.close).not.toHaveBeenCalled();
      vi.advanceTimersByTime(100);
      expect(mockAudioContext.close).toHaveBeenCalled();
    });
  });

  describe('speakText', () => {
    it('cancels ongoing speech and triggers new synthesis', () => {
      const text = 'Hello world';
      const onEnd = vi.fn();
      const onBoundary = vi.fn();

      speakText(text, onBoundary, onEnd);

      expect(mockCancel).toHaveBeenCalled();
      expect(mockSpeak).toHaveBeenCalled();
    });
  });

  describe('stopSpeaking', () => {
    it('calls cancel on speechSynthesis', () => {
      stopSpeaking();
      expect(mockCancel).toHaveBeenCalled();
    });
  });
});
