<script lang="ts">
	import {
		getPositionStyle,
		isHorizontal,
		isVertical,
		type Direction,
		type SnakePart,
		type Turn,
		type Snake,
		getRandomInt,
		type Position
	} from '$lib/utils';
	import Map from './Map.svelte';
	import SnakeComponent from './Snake.svelte';

	import { onMount } from 'svelte';

	let turns: Turn[] = [];

	const MAP_ROWS = 20;
	const MAP_COLS = 20;

	const startRow = Math.floor(MAP_ROWS / 2);
	const startCol = Math.floor(MAP_COLS / 2);

	const startLength = 5;
	const startDirection: Direction = 'right';

	let snake: Snake = [];

	const initSnake = () => {
		snake = [...Array(startLength).keys()].map((number) => ({
			row: startRow,
			col: startCol + number,
			direction: startDirection
		}));
	};

	const move = () =>
		(snake = snake.map((snakePart) => {
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
					col: snakePart.col === MAP_COLS ? 1 : snakePart.col + 1
				}),
				...(newDirection === 'left' && {
					col: snakePart.col === 1 ? MAP_COLS : snakePart.col - 1
				}),
				...(newDirection === 'up' && { row: snakePart.row === 1 ? MAP_ROWS : snakePart.row - 1 }),
				...(newDirection === 'down' && { row: snakePart.row === MAP_ROWS ? 1 : snakePart.row + 1 })
			};
		}));

	const turn = (direction: Direction) => {
		snake = snake.map((part, i) => (i === snake.length - 1 ? { ...part, direction } : part));
	};

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
		const head = snake.at(-1) as SnakePart;

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

	interface Food {
		col: number;
		row: number;
	}

	let food: Food | null = null;

	const spawnFood = () => {
		let col: number;
		let row: number;

		do {
			col = getRandomInt(1, MAP_COLS);
			row = getRandomInt(1, MAP_ROWS);
		} while (snake.some((part) => part.col === col && part.row === row));

		food = {
			col,
			row
		};
	};

	let gameOver = true;
	const gameLoop = () => {
		if (!food) {
			spawnFood();
		}

		move();

		const head = snake.at(-1) as SnakePart;
		if (
			snake
				.filter((_, index) => index !== snake.length - 1)
				.some((part) => part.row === head.row && part.col === head.col)
		) {
			gameOver = true;
		}

		cleanUpTurns();

		if (food && head.col === food.col && head.row === food.row) {
			growSnake();
			food = null;
		}
	};

	let clear: NodeJS.Timer;
	$: {
		clearInterval(clear);
		if (!gameOver) {
			clear = setInterval(gameLoop, 80);
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
</script>

<svelte:window on:keydown={onKeyDown} />

<div>
	<Map rows={MAP_ROWS} cols={MAP_COLS}>
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
