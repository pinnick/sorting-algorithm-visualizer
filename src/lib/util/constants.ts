/**
 * A constant of a sorted array with integeres ranging from 1 to 200.
 */
export const getSortedNumbers = (count: number): App.Number[] =>
	[...Array(count).keys()].map((e) => ({
		value: (e + 1) / count,
		color: 'white'
	}));

/**
 * A collection of all colors for the algorithm to display while sorting
 */

export const colors: Record<App.ColorName, string> = {
	red: '#ff0000',
	white: '#ffffff',
	green: '#00bb00'
};

/**
 * Default config for app
 */
export const defaultConfig: App.Config = {
	delay: 50,
	selectedAlgorithm: 'quickSort'
};

/**
 * Default metrics for when algorithms run
 */
export const defaultMetrics: App.Metrics = {
	status: 'idle'
};
