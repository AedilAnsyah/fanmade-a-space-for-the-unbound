import {
  getAudioContext,
  playKentonganSound,
  createCassetteTapeAmbience,
} from "./audio";

describe("Audio Utilities (Web Audio API)", () => {
  describe("SSR and Unsupported Environments", () => {
    const originalWindow = global.window;

    afterEach(() => {
      global.window = originalWindow;
    });

    it("safely handles getAudioContext when AudioContext is unavailable", () => {
      const originalAudioContext = (window as any).AudioContext;
      const originalWebkit = (window as any).webkitAudioContext;

      delete (window as any).AudioContext;
      delete (window as any).webkitAudioContext;

      expect(getAudioContext()).toBeNull();

      (window as any).AudioContext = originalAudioContext;
      (window as any).webkitAudioContext = originalWebkit;
    });

    it("returns false from playKentonganSound when audio context is unavailable", () => {
      expect(playKentonganSound(null)).toBe(false);
    });

    it("returns inactive controller from createCassetteTapeAmbience when audio context is unavailable", () => {
      const ambience = createCassetteTapeAmbience(null);
      expect(ambience.isPlaying()).toBe(false);
      expect(() => ambience.stop()).not.toThrow();
    });
  });

  describe("Mocked Web Audio API Environment", () => {
    let mockOsc: any;
    let mockGain: any;
    let mockBufferSource: any;
    let mockBiquadFilter: any;
    let mockAudioCtx: any;

    beforeEach(() => {
      mockOsc = {
        type: "sine",
        frequency: {
          setValueAtTime: jest.fn(),
          exponentialRampToValueAtTime: jest.fn(),
        },
        connect: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
      };

      mockGain = {
        gain: {
          setValueAtTime: jest.fn(),
          exponentialRampToValueAtTime: jest.fn(),
        },
        connect: jest.fn(),
      };

      mockBufferSource = {
        buffer: null,
        loop: false,
        connect: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
        disconnect: jest.fn(),
      };

      mockBiquadFilter = {
        type: "lowpass",
        frequency: { value: 0 },
        connect: jest.fn(),
      };

      mockAudioCtx = {
        state: "running",
        currentTime: 0,
        sampleRate: 44100,
        destination: {},
        resume: jest.fn().mockResolvedValue(undefined),
        close: jest.fn().mockResolvedValue(undefined),
        createOscillator: jest.fn(() => mockOsc),
        createGain: jest.fn(() => mockGain),
        createBuffer: jest.fn(() => ({
          getChannelData: jest.fn(() => new Float32Array(88200)),
        })),
        createBufferSource: jest.fn(() => mockBufferSource),
        createBiquadFilter: jest.fn(() => mockBiquadFilter),
      };
    });

    it("synthesizes kentongan bamboo knock sound successfully", () => {
      const result = playKentonganSound(mockAudioCtx);

      expect(result).toBe(true);
      expect(mockAudioCtx.createOscillator).toHaveBeenCalled();
      expect(mockAudioCtx.createGain).toHaveBeenCalled();
      expect(mockOsc.type).toBe("triangle");
      expect(mockOsc.frequency.setValueAtTime).toHaveBeenCalledWith(420, 0);
      expect(mockOsc.frequency.exponentialRampToValueAtTime).toHaveBeenCalledWith(140, 0.15);
      expect(mockOsc.start).toHaveBeenCalled();
      expect(mockOsc.stop).toHaveBeenCalledWith(0.2);
    });

    it("resumes suspended audio context before playing sound", () => {
      mockAudioCtx.state = "suspended";
      playKentonganSound(mockAudioCtx);
      expect(mockAudioCtx.resume).toHaveBeenCalled();
    });

    it("creates, plays, and stops cassette tape hiss ambience", () => {
      const controller = createCassetteTapeAmbience(mockAudioCtx);

      expect(controller.isPlaying()).toBe(true);
      expect(mockAudioCtx.createBuffer).toHaveBeenCalled();
      expect(mockAudioCtx.createBufferSource).toHaveBeenCalled();
      expect(mockAudioCtx.createBiquadFilter).toHaveBeenCalled();
      expect(mockBufferSource.start).toHaveBeenCalled();

      // Stop controller
      controller.stop();
      expect(controller.isPlaying()).toBe(false);
      expect(mockBufferSource.stop).toHaveBeenCalled();
      expect(mockBufferSource.disconnect).toHaveBeenCalled();
    });
  });
});
