import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	console.log('Dashboard server load - locals:', locals);

	if (!locals.user) {
		throw redirect(302, '/');
	}

	// Ensure we're getting all user data
	const userData = {
		...locals.user,
		email: locals.user.email ?? null
	};

	console.log('Dashboard server load - processed user data:', userData);

	return {
		user: userData
	};
};

export const actions: Actions = {
	signOut: async ({ locals }) => {
		await locals.logtoClient.signOut('http://localhost:5173/');
	}
};
