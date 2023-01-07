<script lang="ts">
	import { goto } from '$app/navigation';
	import { isGameRunningStore } from '$lib/store';
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
			<a class="block px-8 py-4 border-2 border-black shadow-button bg-amber-200" {href}>
				{title.toUpperCase()}</a
			>
		</li>
	{/each}
</ul>
