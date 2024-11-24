declare global {
	namespace App {
		interface Numbers {
			value: number;
			highlighted: boolean;
		}

		type AlgorithmId = 'quickSort' | 'insertionSort' | 'mergeSort' | 'bubbleSort';

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
			status: 'idle' | 'running' | 'completed';
		}
	}
}

export {};
