import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals: { supabase } }) => {
	const { error } = await supabase.auth.signOut();
	
	if (error) {
		console.error('Error signing out:', error.message);
		throw redirect(303, '/dashboard?error=Failed to sign out');
	}

	throw redirect(303, '/auth');
};
