/**
 * Plays a subtle "pop" sound using Web Audio API.
 * This avoids the need for external assets and ensures instant playback.
 */
export const playHoverSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    // Start at a low frequency and ramp up slightly for a "pop" feel
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.05);
    
    // Cleanup context after a short delay
    setTimeout(() => {
      audioContext.close();
    }, 100);
  } catch (error) {
    console.error("Failed to play sound:", error);
  }
};

/**
 * Speech synthesis utility
 */
export const speakText = (text: string, onBoundary?: (event: SpeechSynthesisUtteranceEvent) => void, onEnd?: () => void) => {
  if (!window.speechSynthesis) return null;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  if (onBoundary) {
    utterance.onboundary = onBoundary;
  }

  if (onEnd) {
    utterance.onend = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
};

export const stopSpeaking = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};
