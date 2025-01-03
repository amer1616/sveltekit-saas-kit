// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
			cookies?: Record<string, string>;
		}
		// interface Error {}
		// interface Platform {}
	}
}

export {};
