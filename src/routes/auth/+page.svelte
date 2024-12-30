<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { enhance } from '$app/forms';

	type FormData = {
		error?: string;
		status?: string;
		message?: string;
	};

	let { form }: { form: FormData | undefined } = $props();
	let isLoading = false;
</script>

<div class="container flex h-screen w-screen flex-col items-center justify-center">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Welcome</h1>
			<p class="text-muted-foreground text-sm">Sign in to your account or create a new one</p>
		</div>

		<div class="grid gap-6">
			<form method="POST" use:enhance={() => {
				isLoading = true;
				return ({ update }) => {
					isLoading = false;
					update();
				};
			}} class="space-y-4">
				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input
						id="email"
						name="email"
						placeholder="name@example.com"
						required
						type="email"
						autocomplete="email"
					/>
				</div>
				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						required
						type="password"
						autocomplete="current-password"
					/>
				</div>

				{#if form?.error}
					<p class="text-destructive text-sm">{form.error}</p>
				{:else if form?.status === 'success'}
					<p class="text-green-600 text-sm">{form.message}</p>
				{/if}

				<div class="flex flex-col gap-2">
					<Button formaction="?/login" type="submit" disabled={isLoading}>
						{#if isLoading}
							Signing in...
						{:else}
							Sign In
						{/if}
					</Button>
					<Button formaction="?/signup" type="submit" variant="outline" disabled={isLoading}>
						{#if isLoading}
							Creating account...
						{:else}
							Create Account
						{/if}
					</Button>
				</div>
			</form>

			<div class="relative">
				<div class="absolute inset-0 flex items-center">
					<Separator class="w-full" />
				</div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-background px-2 text-muted-foreground">Or continue with</span>
				</div>
			</div>

			<form method="POST" action="?/login-google">
				<Button type="submit" variant="outline" class="w-full">
					<svg role="img" viewBox="0 0 24 24" class="mr-2 h-4 w-4">
						<path
							fill="currentColor"
							d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
						/>
					</svg>
					Continue with Google
				</Button>
			</form>
		</div>
	</div>
</div>
