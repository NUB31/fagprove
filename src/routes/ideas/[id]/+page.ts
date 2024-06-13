import { pb, unboxError } from '$lib/pocketbase/pb';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { ExpandedIdea } from './types';

export const load: PageLoad = async ({ params }) => {
	let idea: ExpandedIdea;

	try {
		idea = await pb.collection('ideas').getOne<ExpandedIdea>(params.id, {
			expand: 'status,category,created_by'
		});
	} catch (e) {
		const unboxed = unboxError(e);
		return error(unboxed.status, unboxed.message);
	}

	return { idea: idea };
};
