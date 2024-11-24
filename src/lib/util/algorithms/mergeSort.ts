import { get } from 'svelte/store';
import { config, numbers, metrics } from '$lib/stores';
import { completeSort, delay, isSorted } from '..';
import { ToneGenerator } from '../toneGenerator';

export const mergeSort = async () => {
	const arr = get(numbers);
	await mergeSortRecursive(arr, 0, arr.length - 1);
	numbers.set(arr);

	if (isSorted(arr)) {
		metrics.update((currMetrics) => ({ ...currMetrics, status: 'completed' }));
		completeSort();
	}
};

const mergeSortRecursive = async (arr: App.Number[], left: number, right: number) => {
	if (left < right) {
		const mid = Math.floor((left + right) / 2);

		// Recursively sort the first half
		await mergeSortRecursive(arr, left, mid);

		// Recursively sort the second half
		await mergeSortRecursive(arr, mid + 1, right);

		// Merge the two halves
		await merge(arr, left, mid, right);
	}
};

const merge = async (arr: App.Number[], left: number, mid: number, right: number) => {
	const toneGenerator = new ToneGenerator();

	const n1 = mid - left + 1;
	const n2 = right - mid;

	// Create temporary arrays
	const leftArray = [];
	const rightArray = [];

	// Copy data to temporary arrays
	for (let i = 0; i < n1; i++) {
		toneGenerator.playTone(arr[i].value);
		leftArray[i] = { ...arr[left + i] }; // Make a shallow copy
	}
	for (let j = 0; j < n2; j++) {
		toneGenerator.playTone(arr[j].value);
		rightArray[j] = { ...arr[mid + 1 + j] };
	}

	let i = 0; // Initial index of leftArray
	let j = 0; // Initial index of rightArray
	let k = left; // Initial index of merged subarray

	// Merge the temporary arrays back into arr[left..right]
	while (i < n1 && j < n2) {
		// Compare and insert the smaller element
		if (leftArray[i].value <= rightArray[j].value) {
			arr[k] = { ...leftArray[i] };
			i++;
		} else {
			arr[k] = { ...rightArray[j] };
			j++;
		}

		arr[k].color = 'red';

		numbers.set([...arr]);
		await delay(get(config).delay);
		toneGenerator.playTone(arr[k].value);

		// Reset color after insertion
		arr[k].color = 'white';
		k++;
	}

	// Copy any remaining elements of leftArray, if any
	while (i < n1) {
		arr[k] = { ...leftArray[i] };
		arr[k].color = 'white';
		i++;
		k++;
	}

	// Copy any remaining elements of rightArray, if any
	while (j < n2) {
		arr[k] = { ...rightArray[j] };
		arr[k].color = 'white';
		j++;
		k++;
	}
};
