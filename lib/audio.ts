/**
 * Audio Utilities - Web Audio API Synthesis for "A Space for the Unbound"
 * Fully isolated and SSR-safe (guards against window/AudioContext being undefined in Node/JSDOM/SSR).
 */

export interface CassetteAmbienceController {
  stop: () => void;
  isPlaying: () => boolean;
}

/**
 * Get or create an AudioContext instance safely.
 * Returns null if running in SSR, Node, or an unsupported browser.
 */
export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") {
    return null;
  }

  const AudioContextClass =
    window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) {
    return null;
  }

  try {
    return new AudioContextClass();
  } catch {
    return null;
  }
}

/**
 * Play synthesized 90s Indonesian village bamboo kentongan knock.
 * Frequency curve drops rapidly from 420Hz to 140Hz simulating resonant hollow bamboo.
 * Returns true if played successfully, false otherwise.
 */
export function playKentonganSound(ctx?: AudioContext | null): boolean {
  try {
    const audioCtx = ctx || getAudioContext();
    if (!audioCtx) {
      return false;
    }

    // Resume if suspended (browser autoplay policy)
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(420, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.7, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);

    return true;
  } catch {
    return false;
  }
}

/**
 * Create a continuous warm cassette tape hiss / gentle rain lo-fi ambience.
 * Uses pink/white noise buffer filtered with a 850Hz low-pass filter.
 * Returns a controller with stop() and isPlaying() methods.
 */
export function createCassetteTapeAmbience(ctx?: AudioContext | null): CassetteAmbienceController {
  let isRunning = false;
  let audioCtx: AudioContext | null = null;
  let noiseNode: AudioBufferSourceNode | null = null;

  try {
    audioCtx = ctx || getAudioContext();
    if (!audioCtx) {
      return {
        stop: () => {},
        isPlaying: () => false,
      };
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = buffer;
    noiseNode.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 850;

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseNode.start();
    isRunning = true;
  } catch {
    isRunning = false;
  }

  return {
    stop: () => {
      if (isRunning) {
        try {
          if (noiseNode) {
            noiseNode.stop();
            noiseNode.disconnect();
          }
          if (audioCtx && audioCtx.state !== "closed") {
            audioCtx.close().catch(() => {});
          }
        } catch {
          // Ignore close errors
        }
        isRunning = false;
      }
    },
    isPlaying: () => isRunning,
  };
}
