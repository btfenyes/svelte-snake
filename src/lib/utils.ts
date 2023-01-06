import type { Direction, Snake, SnakePart, Position } from './types';

export const isHorizontal = (direction: Direction): direction is 'left' | 'right' =>
	['left', 'right'].includes(direction);

export const isVertical = (direction: Direction): direction is 'up' | 'down' =>
	['up', 'down'].includes(direction);

export const getPositionStyle = ({ row, col }: Position) => `
    grid-row: ${row}/${row};
    grid-column: ${col}/${col};
`;

export const getRandomInt = (min: number, max: number) =>
	min + Math.ceil(Math.random() * (max - min));

export const getSnakeHead = (snake: Snake): SnakePart => snake[snake.length - 1];
