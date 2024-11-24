import { numbers, metrics } from '$lib/stores';

import { get } from 'svelte/store';
import { ToneGenerator } from './toneGenerator';

export const shuffle = async () => {
	metrics.update((currMetrics) => ({ ...currMetrics, status: 'running' }));

	const toneGenerator = new ToneGenerator();

	const shuffled: App.Number[] = [];
	const unshuffled = get(numbers);
	const range = unshuffled.length;
	let n = unshuffled.length;

	while (n > 0) {
		const i = Math.floor(Math.random() * n--);
		toneGenerator.playTone(unshuffled[i].value);

		unshuffled[i].color = 'red';

		numbers.set([...shuffled, ...unshuffled]);

		await delay((1 / range) * 700);

		unshuffled[i].color = 'white';

		const value = unshuffled.splice(i, 1)[0];

		shuffled.push(value);

		numbers.set([...shuffled, ...unshuffled]);
	}

	metrics.update((currMetrics) => ({ ...currMetrics, status: 'idle' }));
};

export const completeSort = async () => {
	const toneGenerator = new ToneGenerator();

	const arr = get(numbers);
	const range = arr.length;
	arr[0].color = 'red';
	for (let i = 1; i < range; i++) {
		await delay((1 / range) * 700);
		arr[i - 1].color = 'green';
		arr[i].color = 'red';
		numbers.set(arr);

		toneGenerator.playTone(arr[i].value);
	}

	await delay(30);

	arr.map((el) => (el.color = 'white'));

	numbers.set(arr);
	metrics.update((currMetrics) => ({ ...currMetrics, status: 'idle' }));

	// const sound = new Howl({
	// 	src: ['complete.m4a']
	// });

	// sound.play();
};

export const isSorted = (arr: App.Number[]): boolean => {
	for (let i = 1; i < arr.length; i++) {
		if (arr[i].value < arr[i - 1].value) return false;
	}
	return true;
};

export const delay = async (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const randomInInclusiveRange = (low: number, high: number): number =>
	Math.floor((high - low + 1) * Math.random()) + low;

export const getRandomIndex = (low: number, high: number): number =>
	Math.floor(Math.random() * (high - low + 1)) + low;

export const getMiddleIndex = (low: number, high: number): number =>
	Math.floor((high - low) / 2) + low;

export const getFrequency = (value: number): number => value * 1500;
