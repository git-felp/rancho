// Web Audio API sound generator for zero-latency, reliable audio playback without external mp3 dependencies

class SoundEffects {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted() {
    return this.isMuted;
  }

  public playTick(pitchMultiplier = 1) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 * pitchMultiplier, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120 * pitchMultiplier, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio context might be restricted before user interaction
    }
  }

  public playWheelSpinLoop(durationMs: number) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const startTime = Date.now();
      const tickInterval = 50; // starts fast
      let currentDelay = tickInterval;

      const scheduleTick = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= durationMs) return;

        // Slow down ticking as it approaches the end
        const progress = elapsed / durationMs;
        currentDelay = 40 + Math.pow(progress, 2.5) * 380;

        this.playTick(1 + (1 - progress) * 0.4);
        setTimeout(scheduleTick, currentDelay);
      };

      scheduleTick();
    } catch {
      // Ignore audio initialization errors
    }
  }

  public playWinFanfare() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [
        { freq: 523.25, time: 0, dur: 0.15 },    // C5
        { freq: 659.25, time: 0.15, dur: 0.15 }, // E5
        { freq: 783.99, time: 0.30, dur: 0.20 }, // G5
        { freq: 1046.50, time: 0.50, dur: 0.60 },// C6
        { freq: 1318.51, time: 0.70, dur: 0.80 },// E6
      ];

      notes.forEach(({ freq, time, dur }) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + time);

        gain.gain.setValueAtTime(0.3, this.ctx!.currentTime + time);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + time + dur);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + time);
        osc.stop(this.ctx!.currentTime + time + dur);
      });
    } catch {
      // Ignore
    }
  }

  public playTryAgain() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [
        { freq: 440, time: 0, dur: 0.2 },
        { freq: 392, time: 0.2, dur: 0.2 },
        { freq: 349, time: 0.4, dur: 0.4 },
      ];

      notes.forEach(({ freq, time, dur }) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + time);

        gain.gain.setValueAtTime(0.2, this.ctx!.currentTime + time);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + time + dur);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(this.ctx!.currentTime + time);
        osc.stop(this.ctx!.currentTime + time + dur);
      });
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundEffects();
