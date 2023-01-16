<script lang="ts">
	import { goto } from '$app/navigation';
	import { DIFFICULTIES, difficultyStore, mapSizeStore, type Difficulty } from '$lib/store';
	import { createForm } from 'felte';
	import Button from '$lib/components/Button.svelte';

	interface SettingsForm {
		difficulty: Difficulty;
		rows: number;
		cols: number;
	}

	const { form, data, errors } = createForm<SettingsForm>({
		onSubmit: ({ difficulty, rows, cols }) => {
			difficultyStore.set(difficulty);
			mapSizeStore.set({ rows, cols });

			goto('/');
		},
		validate: (values) => {
			const errors: Partial<Record<keyof SettingsForm, string>> = {};
			if (!values.cols) {
				errors.cols = 'The Map width cannot be empty!';
			}

			if (!values.rows) {
				errors.rows = 'The Map height cannot be empty!';
			}

			return errors;
		},
		transform: (values) =>
			// FIXME: This is madness
			({
				...(typeof values === 'object' && values),
				...(typeof values === 'object' &&
					values !== null &&
					'rows' in values &&
					typeof values.rows === 'string' && { rows: parseInt(values.rows) }),
				...(typeof values === 'object' &&
					values !== null &&
					'cols' in values &&
					typeof values.cols === 'string' && { cols: parseInt(values.cols) }),
			} as SettingsForm),
	});
</script>

<form use:form class="flex flex-col m-auto gap-14 p-10 max-w-lg">
	<div class="flex flex-col gap-4">
		<h3 class="text-xl">Difficulty:</h3>
		{#each Object.entries(DIFFICULTIES) as [key, { title }]}
			{@const checked = key === ($data.difficulty ?? $difficultyStore)}
			<div class="flex justify-between">
				<label
					class={`w-full p-4 cursor-pointer shadow-button border-2 border-black ${
						checked ? 'bg-blue-200' : ''
					}`}
					for="difficulty-{title}">{title}</label
				>
				<input
					class="invisible"
					type="radio"
					name="difficulty"
					id="difficulty-{title}"
					value={key}
					{checked}
				/>
			</div>
		{/each}
	</div>

	<div class="flex flex-col gap-4">
		<div class="flex justify-between gap-2">
			<label class="py-2" for="map-width">Map width:</label>
			<input
				class="p-2 border-2 border-black max-w-number-input text-right"
				type="text"
				id="map-width"
				name="cols"
				value={$mapSizeStore.cols}
				on:input={(e) => {
					e.currentTarget.value = e.currentTarget.value
						.replace(/[^0-9.]/g, '')
						.replace(/(\..*)\./g, '$1');
				}}
			/>
		</div>
		{#if $errors.cols}
			{#each $errors.cols as errorMessage}
				<p class="text-red-600">{errorMessage}</p>
			{/each}
		{/if}

		<div class="flex align-baseline justify-between gap-2">
			<label class="py-2" for="map-height">Map height:</label>
			<input
				class="p-2 border-2 border-black max-w-number-input text-right"
				type="text"
				id="map-height"
				name="rows"
				value={$mapSizeStore.rows}
				on:input={(e) => {
					e.currentTarget.value = e.currentTarget.value
						.replace(/[^0-9.]/g, '')
						.replace(/(\..*)\./g, '$1');
				}}
			/>
		</div>
		{#if $errors.rows}
			{#each $errors.rows as errorMessage}
				<p class="text-red-600">{errorMessage}</p>
			{/each}
		{/if}
	</div>
	<Button type="submit">Save</Button>
</form>
