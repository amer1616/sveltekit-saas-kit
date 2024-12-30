<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	let { data } = $props();

	let { countries } = $derived(data);
</script>

<div class="flex h-screen flex-col items-center justify-center space-y-4">
	<h1 class="text-4xl font-bold">Welcome to SvelteKit</h1>

	{#if data.session}
		<p>Welcome back, {data.session.user.email}!</p>
		<a href="/dashboard">
			<Button>Go to Dashboard</Button>
		</a>
	{:else}
		<p>Please sign in to continue</p>
		<a href="/auth">
			<Button>Sign In</Button>
		</a>
	{/if}

	<br /><br />
	<h1>Welcome to Supabase!</h1>
	<ul>
		{#each countries as country}
			<li>{country.name}</li>
		{/each}
	</ul>
</div>
