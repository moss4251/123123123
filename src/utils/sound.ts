import turnSoundUrl from '../../assets/turn.mp3';

let turnAudio: HTMLAudioElement | null = null;
let audioCtx: AudioContext | null = null;

export function playPageTurn(): void {
  try {
    if (!turnAudio) {
      turnAudio = new Audio(turnSoundUrl);
      turnAudio.volume = 0.7;
    }
    turnAudio.currentTime = 0;
    const p = turnAudio.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        // Ignore autoplay restriction errors
      });
    }
  } catch {
    // Ignore audio errors
  }
}

export function playSoftPop(pitchMultiplier = 1): void {
  try {
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;
    if (!audioCtx) {
      audioCtx = new AudioContextCtor();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(390 * pitchMultiplier, now);
    osc.frequency.exponentialRampToValueAtTime(580 * pitchMultiplier, now + 0.08);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.11);
  } catch {
    // Ignore Web Audio errors
  }
}

export function playChime(): void {
  try {
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;
    if (!audioCtx) {
      audioCtx = new AudioContextCtor();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      if (!audioCtx) return;
      const now = audioCtx.currentTime + idx * 0.07;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    });
  } catch {
    // Ignore Web Audio errors
  }
}
