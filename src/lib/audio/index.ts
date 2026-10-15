export class AudioManager {
  private ctx: AudioContext | null = null;

  init() {
    if (!this.ctx) {
      const AudioContextConstructor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextConstructor();
    }
    return this.ctx;
  }

  get context(): AudioContext | null {
    return this.ctx;
  }

  playBeep(frequency: number, duration: number, type: OscillatorType = "sine") {
    const context = this.init();
    if (!context) return;

    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, context.currentTime);

    gain.gain.setValueAtTime(0.3, context.currentTime);

    osc.connect(gain);
    gain.connect(context.destination);

    osc.start();
    osc.stop(context.currentTime + duration);

    return osc;
  }

  playHeartbeat(interval: number, intensity: number) {
    const context = this.init();
    if (!context) return;

    const frequency = 80 + intensity * 10;
    this.playBeep(frequency, 0.1, "sine");

    const gain = context.createGain();
    gain.gain.setValueAtTime(0.3, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);

    return gain;
  }

  playTick() {
    this.playBeep(1200, 0.02, "square");
  }

  playEdgeWarning() {
    this.playBeep(880, 0.5, "sine");
    setTimeout(() => this.playBeep(1760, 0.5, "sine"), 600);
  }

  close() {
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

export const audioManager = new AudioManager();