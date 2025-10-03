import { insertionSort } from './insertionSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { bubbleSort } from './bubbleSort';

export const algorithms: Record<App.AlgorithmId, App.SortingAlgorithm> = {
	quickSort: {
		name: 'Quick Sort',
		caption: "Hoare's partition scheme",
		description:
			'Quicksort, developed by Tony Hoare in 1959 and published in 1961, is an efficient and widely used divide-and-conquer sorting algorithm. It works by selecting a pivot element and partitioning the array into two sub-arrays of elements less than and greater than the pivot, sorting these sub-arrays recursively. Known as a comparison sort, it operates with an average time complexity of O(n log n) and a worst-case time complexity of O(n²). While quicksort is generally faster than merge sort and heapsort for randomized data, it is usually not stable, meaning the relative order of equal elements may not be preserved.',
		sort: quickSort
	},
	insertionSort: {
		name: 'Insertion Sort',
		caption: null,
		description:
			'Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time through comparisons. Though less efficient on large datasets compared to algorithms like quicksort, heapsort, or merge sort, it is advantageous for small or nearly sorted datasets, with a time complexity of O(kn) when elements are at most k positions from their sorted place. It is stable, in-place, requires O(1) additional memory, and can sort lists as they are received (online). Its straightforward implementation makes it more efficient than other quadratic algorithms like selection sort or bubble sort in practice.',
		sort: insertionSort
	},
	mergeSort: {
		name: 'Merge Sort',
		caption: null,
		description:
			"Merge sort, invented by John von Neumann in 1945, is a stable, comparison-based sorting algorithm that follows the divide-and-conquer paradigm. It works by recursively dividing the array into halves until single-element subarrays are reached, then merging these subarrays back together in sorted order. Merge sort guarantees a worst-case and average time complexity of O(n log n), but requires O(n) additional space for the merging process. It excels when the array's two halves are already sorted, achieving O(n) time in this best-case scenario.",
		sort: mergeSort
	},
	bubbleSort: {
		name: 'Bubble Sort',
		caption: null,
		description:
			'Bubble sort, also known as sinking sort, is a simple comparison-based sorting algorithm that repeatedly steps through a list, comparing and swapping adjacent elements if they are out of order, with larger elements "bubbling" to the top. It continues until no swaps are needed, indicating the list is sorted. Though easy to understand and primarily used for teaching purposes, bubble sort performs poorly in practical scenarios and is rarely used compared to more efficient algorithms like quicksort, timsort, or merge sort, which are commonly implemented in programming language libraries.',
		sort: bubbleSort
	}
};
