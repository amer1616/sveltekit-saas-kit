import type { PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect to home if user is already logged in
	if (locals.session) {
		throw redirect(303, '/');
	}
	return {};
};
