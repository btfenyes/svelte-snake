<script lang="ts">
	export let rows: number;
	export let cols: number;
</script>

<main class="m-auto w-fit grid gap-1 bg-amber-100" style:--rows={rows} style:--cols={cols}>
	<slot />
</main>

<style>
	main {
		grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
		grid-template-rows: repeat(var(--rows), minmax(0, 1fr));
	}
</style>
