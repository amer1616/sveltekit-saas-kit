<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	let { data, children } = $props();
	let { supabase } = $derived(data);

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<header class="flex h-12 items-center justify-between px-4">
			<Sidebar.Trigger />
		</header>
	</Sidebar.Inset>
	<main class="flex-1 p-4">
		{@render children?.()}
	</main>
</Sidebar.Provider>
