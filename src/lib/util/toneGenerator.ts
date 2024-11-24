// toneGenerator.ts

import { getFrequency } from '.';

export class ToneGenerator {
	private audioContext: AudioContext;

	constructor() {
		// Create an AudioContext
		this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
	}

	playTone(value: number, type: OscillatorType = 'triangle') {
		const frequency = getFrequency(value);
		const duration = 0.08;
		const maxGain = 0.05;
		const fadeTime = Math.min(0.05, duration / 2); // Fade-in/out time

		const oscillator = this.audioContext.createOscillator();
		oscillator.type = type;
		oscillator.frequency.value = frequency;

		const gainNode = this.audioContext.createGain();
		const now = this.audioContext.currentTime;

		gainNode.gain.setValueAtTime(0, now);
		gainNode.gain.linearRampToValueAtTime(maxGain, now + fadeTime);
		gainNode.gain.setValueAtTime(maxGain, now + duration - fadeTime);
		gainNode.gain.linearRampToValueAtTime(0, now + duration);

		oscillator.connect(gainNode);
		gainNode.connect(this.audioContext.destination);

		oscillator.start(now);
		oscillator.stop(now + duration + fadeTime);
	}
}
