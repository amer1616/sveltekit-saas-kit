import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabaseConfig = {
	url: PUBLIC_SUPABASE_URL,
	anonKey: PUBLIC_SUPABASE_ANON_KEY
} as const;
