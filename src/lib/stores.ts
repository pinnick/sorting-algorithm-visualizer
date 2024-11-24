import { writable } from 'svelte/store';
import { getSortedNumbers, defaultConfig, defaultMetrics } from '$lib/util/constants';

export const config = writable<App.Config>(defaultConfig);

export const numbers = writable<App.Number[]>(getSortedNumbers(100));

export const metrics = writable<App.Metrics>(defaultMetrics);
