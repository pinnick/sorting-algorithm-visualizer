import { get } from 'svelte/store';
import { config, numbers, metrics } from '$lib/stores';
import { completeSort, delay, isSorted } from '..';
import { ToneGenerator } from '../toneGenerator';

export const insertionSort = async () => {
	const toneGenerator = new ToneGenerator();
	const arr = get(numbers);

	for (let i = 1; i < arr.length; i++) {
		const key = arr[i]; // Store the current element
		let j = i - 1;

		toneGenerator.playTone(arr[i].value);

		// Shift elements of the sorted part of the array to make space for the key
		while (j >= 0 && arr[j].value > key.value) {
			toneGenerator.playTone(arr[j].value);

			arr[j + 1].color = 'red';
			numbers.set([...arr]);
			await delay(get(config).delay);
			arr[j + 1].color = 'white';

			arr[j + 1] = arr[j]; // Shift element to the right

			j--;
		}

		key.color = 'white';
		arr[j + 1] = key; // Insert the key into its correct position
		numbers.set([...arr]);
	}

	if (isSorted(arr)) {
		metrics.update((currMetrics) => ({ ...currMetrics, status: 'completed' }));
		completeSort();
	}
};
