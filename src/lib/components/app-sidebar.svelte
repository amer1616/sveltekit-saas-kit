<script lang="ts">
	import House from 'lucide-svelte/icons/house';
	import Users from 'lucide-svelte/icons/users';
	import Activity from 'lucide-svelte/icons/activity';
	import Settings from 'lucide-svelte/icons/settings';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import ChevronUp from 'lucide-svelte/icons/chevron-up';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	// Menu items based on project structure
	const items = [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: House
		},
		{
			title: 'Activity',
			url: '/dashboard/activity',
			icon: Activity
		},
		{
			title: 'Users',
			url: '/dashboard/users',
			icon: Users
		},
		{
			title: 'Billing',
			url: '/dashboard/billing',
			icon: CreditCard
		},
		{
			title: 'Settings',
			url: '/dashboard/settings',
			icon: Settings
		}
	];
</script>

<Sidebar.Root>
	<Sidebar.Header>
		<span class="text-xl font-bold">SvelteKit SaaS</span>
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Menu</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu class="space-y-2">
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props} class="flex items-center gap-2">
										<item.icon class="h-4 w-4" />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								{...props}
								class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								Username
								<ChevronUp class="ml-auto h-4 w-4" />
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content side="top" class="w-[--bits-dropdown-menu-anchor-width]">
						<DropdownMenu.Item>
							<span>Account</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<span>Billing</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<span>Sign out</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
		<p class="text-muted-foreground text-sm">2024 SvelteKit SaaS Kit</p>
	</Sidebar.Footer>
</Sidebar.Root>
