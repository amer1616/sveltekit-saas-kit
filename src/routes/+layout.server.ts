import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession }, cookies }) => {
	const session = await getSession();

	return {
		session,
		cookies: cookies.getAll().reduce((acc: Record<string, string>, { name, value }) => {
			acc[name] = value;
			return acc;
		}, {})
	};
};
