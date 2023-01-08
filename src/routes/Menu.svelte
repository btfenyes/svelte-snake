<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	const menuItems = [
		{
			title: 'Start Game',
			href: '/game'
		},
		{
			title: 'Settings',
			href: '/settings'
		}
	];
</script>

<ul class="flex flex-col gap-4 w-fit text-center m-auto mt-10">
	{#each menuItems as { href, title }}
		<li>
			<Button {href}>{title.toUpperCase()}</Button>
		</li>
	{/each}
</ul>
