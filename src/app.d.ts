declare global {
	namespace App {
		interface Numbers {
			value: number;
			highlighted: boolean;
		}

		type AlgorithmId =
			| 'quickSort' // done
			| 'insertionSort' // done
			| 'mergeSort' // watch a video
			// | 'heapSort'
			// | 'radixSortLSD'
			// | 'radixSortMSD'
			| 'bubbleSort'; // working
		// | 'bogoSort';

		interface SortingAlgorithm {
			name: string;
			caption: string?;
			description: string;
			sort: Algorithm;
		}

		type Algorithm = () => void;

		interface AlgorithmStatistics {
			comparisons: number;
			arrayAccesses: number;
		}

		type ColorName = 'red' | 'green' | 'white';

		interface Number {
			value: number;
			color: ColorName;
		}

		interface Config {
			delay: number;
			selectedAlgorithm: AlgorithmId;
		}

		interface Metrics {
			startTime: number | null;

			comparisons: number;
			arrayAccesses: number;

			bestTime: number | null; // in MS
			averageTime: number | null; // in MS

			status: 'idle' | 'running' | 'paused' | 'completed' | 'error';
		}
	}
}

export {};
