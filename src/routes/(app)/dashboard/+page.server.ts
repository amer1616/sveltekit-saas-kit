import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase, getSession } }) => {
	const session = await getSession();
	
	if (!session) {
		throw redirect(303, '/auth');
	}

	depends('supabase:db:notes');
	const { data: notes } = await supabase.from('notes').select('id,note').order('id');
	return {
		notes: notes ?? []
	};
};
