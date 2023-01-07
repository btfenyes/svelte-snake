<script lang="ts">
	import type { Snake } from '$lib/types';
	import { getPositionStyle } from '$lib/utils';

	export let snake: Snake;
</script>

{#each snake as snakePart, index}
	{@const isHead = index === snake.length - 1}
	<div
		class="bg-green-500 w-4 h-4 flex justify-center items-center text-sm"
		style={getPositionStyle(snakePart)}
	>
		{#if isHead}
			&#183;
		{/if}
	</div>
{/each}
