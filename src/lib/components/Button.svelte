<script lang="ts">
	export let type: 'submit' | 'button' = 'button';
	export let href: string | null = null;

	let className =
		'active:translate-x-2px active:translate-y-2px active:shadow-none px-8 py-4 border-2 border-black shadow-button bg-amber-200';
</script>

{#if href}
	<a {href} class={`block ${className}`}><slot /></a>
{:else}
	<button on:click {type} class={className}>
		<slot />
	</button>
{/if}
