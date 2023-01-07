<script lang="ts">
	import { pages } from '$lib/pages';
</script>

<nav class="w-100 bg-amber-200 border-b-4 border-black">
	<ul class="flex gap-4 justify-center w-100">
		{#each Object.values(pages) as { href, title }}
			<li>
				<a class="block p-4 text-2xl" {href}>{title}</a>
			</li>
		{/each}
	</ul>
</nav>
