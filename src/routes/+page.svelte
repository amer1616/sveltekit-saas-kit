<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	let { data } = $props();
</script>

<div class="flex h-screen flex-col items-center justify-center space-y-4">
	<h1 class="text-4xl font-bold">Welcome to SvelteKit</h1>

	{#if data.user}
		<p>Welcome back, {data.user.name}!</p>
		<a href="/dashboard">
			<Button>Go to Dashboard</Button>
		</a>
	{:else}
		<p>Please sign in to continue</p>
		<form method="POST" action="?/signIn">
			<Button type="submit">Sign In</Button>
		</form>
	{/if}
</div>
