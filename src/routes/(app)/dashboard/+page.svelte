<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { EventHandler } from 'svelte/elements';
	import type { PageData } from './$types';

	let { data } = $props();
	let { notes, supabase, session } = $derived(data);

	const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (evt) => {
		evt.preventDefault();
		if (!evt.target) return;

		const form = evt.target as HTMLFormElement;

		const note = (new FormData(form).get('note') ?? '') as string;
		if (!note) return;

		const { error } = await supabase.from('notes').insert({ note });
		if (error) console.error(error);

		invalidate('supabase:db:notes');
		form.reset();
	};
</script>

<div class="container mx-auto p-4">
	<div class="mb-8 flex items-center justify-between">
		<h1 class="text-2xl font-bold">Dashboard</h1>
		<form action="/signout" method="POST">
			<button type="submit" class="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
				Sign Out
			</button>
		</form>
	</div>
	<br /><br />
	<h2>Notes</h2>
	<ul>
		{#each notes as note}
			<li>{note.note}</li>
		{/each}
	</ul>
	<form onsubmit={handleSubmit}>
		<label>
			Add a note
			<input name="note" type="text" />
		</label>
	</form>
	{#if session?.user}
		<div class="rounded-lg bg-white p-6 shadow">
			<h2 class="mb-4 text-xl font-semibold">Welcome, {session?.user?.email || 'User'}!</h2>
			<div class="space-y-4">
				<div class="grid gap-2">
					<p class="text-gray-600">
						<span class="font-semibold">Email:</span>
						{#if session?.user?.email}
							{session?.user?.email}
						{:else}
							<span class="text-gray-400">No email available</span>
						{/if}
					</p>

					<!-- Debug section -->
					<details class="mt-4">
						<summary class="cursor-pointer text-sm text-gray-500">Debug Info</summary>
						<pre class="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs">
							{JSON.stringify(session?.user, null, 2)}
						</pre>
					</details>
				</div>
			</div>
		</div>
	{:else}
		<div class="border-l-4 border-yellow-500 bg-yellow-100 p-4">
			<p class="text-yellow-700">Not authenticated. Please sign in first.</p>
		</div>
	{/if}
</div>
