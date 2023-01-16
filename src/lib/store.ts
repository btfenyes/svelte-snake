import { writable } from 'svelte/store';

export interface DifficultySetting {
	speed: number;
	title: string;
}

export const DIFFICULTIES = {
	EASY: {
		speed: 250,
		title: 'Easy',
	},
	MEDIUM: {
		speed: 125,
		title: 'Medium',
	},
	HARD: {
		speed: 80,
		title: 'Hard',
	},
	EXTREME: {
		speed: 35,
		title: 'Extreme',
	},
} as const;

export type Difficulty = keyof typeof DIFFICULTIES;
export const difficultyStore = writable<Difficulty>('HARD');
export interface MapSize {
	rows: number;
	cols: number;
}

export const mapSizeStore = writable<MapSize>({ rows: 20, cols: 20 });

interface Score {
	playerName: string;
	score: number;
}

export const scoresStore = writable<Score[]>([]);

export const currentScoreStore = writable<number>(0);
