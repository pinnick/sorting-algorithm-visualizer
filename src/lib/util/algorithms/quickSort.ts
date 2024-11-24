import { completeSort, delay, isSorted, getMiddleIndex } from '$lib/util';
import { config, numbers, metrics } from '$lib/stores';
import { get } from 'svelte/store';
import { ToneGenerator } from '../toneGenerator';

const qsPartition = async (arr: App.Number[], low: number, high: number) => {
	const toneGenerator = new ToneGenerator();

	const pivotIndex = getMiddleIndex(low, high);
	const pivot = arr[pivotIndex];

	toneGenerator.playTone(arr[pivotIndex].value);
	pivot.color = 'green';

	let i = low - 1;
	let j = high + 1;

	while (true) {
		do {
			i += 1;
		} while (arr[i].value < pivot.value);

		do {
			j -= 1;
		} while (arr[j].value > pivot.value);

		if (i >= j) {
			pivot.color = 'white';
			return j;
		}

		// Swap
		const b = arr[i];
		arr[i] = arr[j];
		arr[j] = b;

		toneGenerator.playTone(arr[i].value);
		toneGenerator.playTone(arr[j].value);

		arr[i].color = 'red';
		arr[j].color = 'red';
		numbers.set([...arr]);

		await delay(get(config).delay);

		// Revert color of reds
		arr[i].color = 'white';
		arr[j].color = 'white';

		numbers.set([...arr]);
	}
};

export const quickSort = async (
	inputNumbers?: App.Number[],
	low: number = 0,
	inputHigh?: number
): Promise<void> => {
	const arr = inputNumbers ?? get(numbers);

	const high = inputHigh ?? arr.length - 1;

	if (low >= 0 && high >= 0 && low < high) {
		const p = await qsPartition(arr, low, high);

		await quickSort(arr, low, p);
		await quickSort(arr, p + 1, high);
	}
	// If the array is sorted && completeSort() isn't already running
	if (isSorted(arr) && get(metrics).status == 'running') {
		metrics.update((currMetrics) => ({ ...currMetrics, status: 'completed' }));
		completeSort();
	}
};
