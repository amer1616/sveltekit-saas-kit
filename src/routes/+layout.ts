import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';
import type { CookieSerializeOptions } from 'cookie';

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
	depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					get: (_name: string) => {
						const cookies = document.cookie.split(';');
						const cookie = cookies.find((c) => c.trim().startsWith(`${_name}=`));
						return cookie ? decodeURIComponent(cookie.split('=')[1]) : undefined;
					},
					set: (_name: string, _value: string, _options: CookieSerializeOptions) => {
						document.cookie = `${_name}=${encodeURIComponent(_value)}; path=/; ${
							_options?.maxAge ? `max-age=${_options.maxAge};` : ''
						} ${_options?.domain ? `domain=${_options.domain};` : ''} ${
							_options?.sameSite ? `samesite=${_options.sameSite};` : ''
						} ${_options?.secure ? 'secure;' : ''}`;
					},
					remove: (_name: string, _options: CookieSerializeOptions) => {
						document.cookie = `${_name}=; path=/; ${
							_options?.domain ? `domain=${_options.domain};` : ''
						} ${_options?.sameSite ? `samesite=${_options.sameSite};` : ''} ${
							_options?.secure ? 'secure;' : ''
						} max-age=0`;
					}
				}
			})
		: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					get: (_name: string) => data?.cookies?.[_name],
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					set: (_name: string, _value: string) => {},
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					remove: (_name: string) => {}
				}
			});

	return {
		...data,
		supabase
	};
};
