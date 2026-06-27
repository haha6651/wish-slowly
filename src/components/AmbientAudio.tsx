import { useEffect, useRef } from 'react';

interface AmbientAudioProps {
  enabled: boolean;
  theme: 'rain' | 'purr' | 'night' | 'silence';
}

export function AmbientAudio({ enabled, theme }: AmbientAudioProps) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!enabled || theme === 'silence') {
      if (gainNodeRef.current && audioCtxRef.current) {
        // Fade out smoothly
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.5);
      }
      return;
    }

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Stop previous
      if (sourceNodeRef.current) {
        try { (sourceNodeRef.current as AudioScheduledSourceNode).stop(); } catch (e) {}
      }

      // Create main gain
      if (!gainNodeRef.current) {
        gainNodeRef.current = ctx.createGain();
        gainNodeRef.current.connect(ctx.destination);
      }
      const gain = gainNodeRef.current;
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.5); // soft pleasant volume

      if (theme === 'rain') {
        // Generate soothing pink/brown noise rain
        const bufferSize = ctx.sampleRate * 3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
          b6 = white * 0.115926;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Lowpass filter for cozy muffled rain
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;

        noise.connect(filter);
        filter.connect(gain);
        noise.start();
        sourceNodeRef.current = noise;
      } else if (theme === 'purr') {
        // Synthesize cozy low frequency cat purr (amplitude modulated 25Hz + harmonic)
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 28; // deep cat rumble

        // LFO for breathing purr rhythm
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 1.2; // 1.2 purrs per sec

        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 15;
        lfo.connect(osc.frequency);

        // Warm filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 150;

        osc.connect(filter);
        filter.connect(gain);
        
        osc.start();
        lfo.start();
        sourceNodeRef.current = osc;
      } else if (theme === 'night') {
        // Soft evening wind & distant chime
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.05;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;
        whiteNoise.loop = true;

        const bandpass = ctx.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 450;
        bandpass.Q.value = 3.0;

        whiteNoise.connect(bandpass);
        bandpass.connect(gain);
        whiteNoise.start();
        sourceNodeRef.current = whiteNoise;
      }
    } catch (e) {
      console.error('Audio start error', e);
    }

    return () => {
      if (sourceNodeRef.current) {
        try { (sourceNodeRef.current as AudioScheduledSourceNode).stop(); } catch (e) {}
      }
    };
  }, [enabled, theme]);

  return null;
}
