import type { User } from '@supabase/supabase-js';

export type AuthUser = User;

export type AuthSession = {
	user: AuthUser | null;
	accessToken: string | null;
};

export type AuthError = {
	message: string;
	status?: number;
};
