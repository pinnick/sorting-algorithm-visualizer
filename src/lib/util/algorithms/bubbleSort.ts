import { get } from 'svelte/store';
import { config, numbers, metrics } from '$lib/stores';
import { completeSort, delay, isSorted } from '..';
import { ToneGenerator } from '../toneGenerator';

export const bubbleSort = async () => {
	const toneGenerator = new ToneGenerator();
	const arr = get(numbers);

	for (let i = arr.length - 1; i > 0; i--) {
		let swapped = false;
		for (let j = 0; j < i; j++) {
			arr[j].color = 'red';
			arr[j + 1].color = 'red';

			toneGenerator.playTone(arr[j].value);
			toneGenerator.playTone(arr[j + 1].value);

			numbers.set([...arr]);
			await delay(get(config).delay);

			arr[j].color = 'white';
			arr[j + 1].color = 'white';

			if (arr[j].value > arr[j + 1].value) {
				swapped = true;

				// Swap elements
				const temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = temp;
			}
		}
		if (!swapped) break;
	}

	if (isSorted(arr)) {
		metrics.update((currMetrics) => ({ ...currMetrics, status: 'completed' }));
		completeSort();
	}
};
