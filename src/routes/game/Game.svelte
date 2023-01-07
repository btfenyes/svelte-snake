<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import Map from '../Map.svelte';
	import SnakeComponent from '../Snake.svelte';

	import {
		getPositionStyle,
		isHorizontal,
		isVertical,
		getRandomInt,
		getSnakeHead
	} from '$lib/utils';
	import type { Direction, Food, Position, Snake, SnakePart, Turn } from '$lib/types';
	import { DIFFICULTIES, difficultyStore, mapSizeStore } from '$lib/store';

	const startRow: number = Math.ceil($mapSizeStore.rows / 2);
	const startCol: number = Math.ceil($mapSizeStore.cols / 2);

	const startLength = 5;
	const startDirection: Direction = 'right';

	let turns: Turn[] = [];
	let snake: Snake = [];

	const initSnake = () => {
		snake = [...Array(startLength).keys()].map((number) => ({
			row: startRow,
			col: startCol + number,
			direction: startDirection
		}));
	};

	const move = () =>
		(snake = snake.map((snakePart, i) => {
			const isCurrentTurn = (turn: Turn, snakePart: SnakePart) =>
				turn.col === snakePart.col && turn.row === snakePart.row;

			const currentTurn = turns.find((currentTurn) => isCurrentTurn(currentTurn, snakePart));
			const newDirection = currentTurn?.direction ?? snakePart.direction;

			turns = turns.map((turn) =>
				isCurrentTurn(turn, snakePart) ? { ...turn, passed: turn.passed + 1 } : turn
			);

			return {
				...snakePart,
				...(currentTurn && { direction: currentTurn.direction }),
				...(newDirection === 'right' && {
					col: snakePart.col === $mapSizeStore.cols ? 1 : snakePart.col + 1
				}),
				...(newDirection === 'left' && {
					col: snakePart.col === 1 ? $mapSizeStore.cols : snakePart.col - 1
				}),
				...(newDirection === 'up' && {
					row: snakePart.row === 1 ? $mapSizeStore.rows : snakePart.row - 1
				}),
				...(newDirection === 'down' && {
					row: snakePart.row === $mapSizeStore.rows ? 1 : snakePart.row + 1
				})
			};
		}));

	const growSnake = () => {
		const tail = snake[0];

		const newTailPosition: Record<Direction, Position> = {
			left: {
				row: tail.row,
				col: tail.col + 1
			},
			right: { row: tail.row, col: tail.col - 1 },
			up: { row: tail.row + 1, col: tail.col },
			down: { row: tail.row - 1, col: tail.col }
		};
		snake = [{ ...newTailPosition[tail.direction], direction: tail.direction }, ...snake];
	};

	const turn = (direction: Direction) => {
		snake = snake.map((part, i) => (i === snake.length - 1 ? { ...part, direction } : part));
	};

	const onKeyDown = (e: KeyboardEvent) => {
		const directionMap: Record<string, Direction> = {
			ArrowLeft: 'left',
			ArrowRight: 'right',
			ArrowUp: 'up',
			ArrowDown: 'down'
		};

		if (!directionMap[e.key]) {
			return;
		}

		const turnDirection: Direction = directionMap[e.key];
		const head = getSnakeHead(snake);

		if (
			(isVertical(turnDirection) && isVertical(head.direction)) ||
			(isHorizontal(turnDirection) && isHorizontal(head.direction))
		) {
			return;
		}

		turn(turnDirection);
		turns = [
			...turns,
			{
				direction: turnDirection,
				col: head.col,
				row: head.row,
				passed: 0
			}
		];
	};

	const cleanUpTurns = () => {
		turns = turns.filter((turn) => turn.passed !== snake.length);
	};

	const spawnFood = () => {
		let col: number;
		let row: number;

		do {
			col = getRandomInt(1, $mapSizeStore.cols);
			row = getRandomInt(1, $mapSizeStore.rows);
		} while (snake.some((part) => part.col === col && part.row === row));

		return {
			col,
			row
		};
	};

	let food: Food | null = spawnFood();

	let gameOver = true;
	const gameLoop = () => {
		const isMaxSize = snake.length === $mapSizeStore.cols * $mapSizeStore.rows;

		const head = getSnakeHead(snake);
		const isTailBite = snake
			.filter((_, index) => index !== snake.length - 1)
			.some((part) => part.row === head.row && part.col === head.col);

		if (isTailBite || isMaxSize) {
			gameOver = true;
			return;
		}

		move();

		cleanUpTurns();

		if (food && head.col === food.col && head.row === food.row) {
			growSnake();
			food = spawnFood();
		}
	};

	// TODO: Clear this up
	let clear: NodeJS.Timer;
	$: {
		clearInterval(clear);
		if (!gameOver) {
			clear = setInterval(gameLoop, DIFFICULTIES[$difficultyStore].speed);
		}
	}

	$: {
		if (gameOver) {
			clearInterval(clear);
		}
	}

	const startGame = () => {
		initSnake();
		turns = [];
		gameOver = false;
	};

	onMount(() => {
		startGame();
	});
	onDestroy(() => {
		clearInterval(clear);
	});
</script>

<svelte:window on:keydown={onKeyDown} />

<div>
	<Map rows={$mapSizeStore.rows} cols={$mapSizeStore.cols}>
		{#if food}
			<div class="bg-yellow-900 w-4 h-4" style={getPositionStyle(food)} />
		{/if}
		<SnakeComponent {snake} />
	</Map>
	{#if gameOver}
		<h1>Game Over</h1>
	{/if}
	{#if gameOver}
		<button type="button" on:click={startGame}>Start</button>
	{/if}
</div>
