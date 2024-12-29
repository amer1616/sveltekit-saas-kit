import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '$lib/config/supabase';
import type { AuthError } from './types';

// Create Supabase client
export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

// Helper functions
export async function signInWithEmail(email: string, password: string) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});

	if (error) {
		throw { message: error.message, status: error.status } satisfies AuthError;
	}

	return data;
}

export async function signUpWithEmail(email: string, password: string) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password
	});

	if (error) {
		throw { message: error.message, status: error.status } satisfies AuthError;
	}

	return data;
}

export async function signOut() {
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw { message: error.message, status: error.status } satisfies AuthError;
	}
}

export async function getSession() {
	const { data: { session }, error } = await supabase.auth.getSession();

	if (error) {
		throw { message: error.message, status: error.status } satisfies AuthError;
	}

	return session;
}

export async function updateUser(attributes: { email?: string; password?: string; data?: Record<string, any> }) {
	const { data, error } = await supabase.auth.updateUser(attributes);

	if (error) {
		throw { message: error.message, status: error.status } satisfies AuthError;
	}

	return data;
}
