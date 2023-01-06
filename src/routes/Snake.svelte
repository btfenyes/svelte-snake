<script lang="ts">
	import { getPositionStyle, type Snake } from '$lib/utils';

	export let snake: Snake;
</script>

{#each snake as snakePart}
	<div class="bg-green-500 w-4 h-4" style={getPositionStyle(snakePart)} />
{/each}
