import { redirect, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
	const session = await getSession();

	// If user is already logged in, redirect to dashboard
	if (session) {
		throw redirect(303, '/dashboard');
	}
};

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { data, error } = await supabase.auth.signUp({ 
			email, 
			password,
			options: {
				emailRedirectTo: `${new URL(request.url).origin}/auth/callback`
			}
		});

		if (error) {
			return fail(400, { 
				error: error.message,
				values: { email }
			});
		}

		// If email confirmation is required
		if (data?.user?.identities?.length === 0) {
			return {
				status: 'success',
				message: 'Please check your email for the confirmation link'
			};
		}

		throw redirect(303, '/dashboard');
	},

	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		
		if (error) {
			return fail(400, { 
				error: error.message,
				values: { email }
			});
		}

		throw redirect(303, '/dashboard');
	},

	'login-google': async ({ locals: { supabase }, url }) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${new URL(url).origin}/auth/callback`
			}
		});

		if (error) {
			return fail(400, {
				error: 'Something went wrong with Google login'
			});
		}

		throw redirect(303, data.url);
	}
};
