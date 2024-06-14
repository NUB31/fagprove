import { error, type RequestHandler } from '@sveltejs/kit';
import { pb_service_account } from '$lib/server/pb_service_account';
import { checkPbAuth as isAuthorized } from '$lib/server/auth';
import { unboxError } from '$lib/pocketbase/pb';

export const POST: RequestHandler = async ({ params, request }) => {
	if (!params.id) {
		return error(422, { message: 'Missing parameter' });
	}

	const token = request.headers.get('X-PB-Token');
	if (!token) {
		return error(403, { message: 'Missing header: X-PB-Token' });
	}

	if ((await isAuthorized(token)) == false) {
		return error(403, { message: 'PB authorization failed' });
	}

	try {
		const idea = await pb_service_account.collection('ideas').getOne(params.id);
		await pb_service_account.collection('ideas').update(params.id, {
			votes: idea.votes + 1
		});
	} catch (e) {
		const unboxed = unboxError(e);
		console.error(`status: ${unboxed.status} - message: ${unboxed.message}`);
		return error(unboxed.status, { message: 'Something went wrong' });
	}

	return new Response();
};
