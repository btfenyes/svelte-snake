export type Direction = 'left' | 'right' | 'up' | 'down';
export const isHorizontal = (direction: Direction): direction is 'left' | 'right' =>
	['left', 'right'].includes(direction);

export const isVertical = (direction: Direction): direction is 'up' | 'down' =>
	['up', 'down'].includes(direction);

export interface Position {
	row: number;
	col: number;
}

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

export const getPositionStyle = ({ row, col }: Position) => `
    grid-row: ${row}/${row};
    grid-column: ${col}/${col};
`;

export const getRandomInt = (min: number, max: number) =>
	min + Math.ceil(Math.random() * (max - min));
