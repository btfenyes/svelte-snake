export interface Position {
	row: number;
	col: number;
}

export type Direction = 'left' | 'right' | 'up' | 'down';

export interface Vector {
	row: number;
	col: number;
	direction: Direction;
}

export type Food = Position;

export type SnakePart = Vector;

export type Snake = SnakePart[];

export interface Turn extends Vector {
	passed: number;
}
