import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const user = event.locals.user;
	console.log('User data in layout:', user); // Debug log

	return {
		user: user ?? null
	};
};
