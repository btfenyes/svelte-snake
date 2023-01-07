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
		speed: 80,
		title: 'Hard'
	},
	EXTREME: {
		speed: 35,
		title: 'Extreme'
	}
} as const;

export const difficulty = writable<DifficultyParams>(DIFFICULTIES.HARD);

interface MapSize {
	rows: number;
	cols: number;
}

export const mapSize = writable<MapSize>({ rows: 20, cols: 20 });

export const isGameRunning = writable(false);
