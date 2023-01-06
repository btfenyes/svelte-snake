import { writable } from 'svelte/store';

interface DifficultyParams {
	speed: number;
	title: string;
}

export const DIFFICULTIES: Record<string, DifficultyParams> = {
	EASY: {
		speed: 250,
		title: 'Easy'
	},
	MEDIUM: {
		speed: 125,
		title: 'Medium'
	},
	HARD: {
		speed: 50,
		title: 'Hard'
	},
	EXTREME: {
		speed: 35,
		title: 'Extreme'
	}
} as const;

export const difficulty = writable<DifficultyParams>(DIFFICULTIES.EXTREME);

interface MapSize {
	rows: number;
	cols: number;
}

export const mapSize = writable<MapSize>({ rows: 20, cols: 20 });
