import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handleAuth: Handle = async ({ event, resolve }) => {
	const supabase = createServerClient(
		process.env.PUBLIC_SUPABASE_URL ?? '',
		process.env.PUBLIC_SUPABASE_ANON_KEY ?? '',
		{
			cookies: {
				get: (key) => event.cookies.get(key),
				set: (key, value, options) => {
					event.cookies.set(key, value, options as CookieOptions);
				},
				remove: (key, options) => {
					event.cookies.delete(key, options as CookieOptions);
				}
			}
		}
	);

	// Refresh session if expired
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// Protect app routes
	if (event.url.pathname.startsWith('/dashboard')) {
		if (!session) {
			throw redirect(303, '/sign-in');
		}
	}

	// Add session to event.locals
	event.locals.supabase = supabase;
	event.locals.session = session;

	return resolve(event);
};

export const handle = sequence(handleAuth);
