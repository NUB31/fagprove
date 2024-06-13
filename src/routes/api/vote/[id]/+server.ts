import { error, type RequestHandler } from '@sveltejs/kit';
import { pb_service_account } from '$lib/server/pb_service_account';
import { checkPbAuth as isAuthorized } from '$lib/server/auth';

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

	const idea = await pb_service_account.collection('ideas').getOne(params.id);
	await pb_service_account.collection('ideas').update(params.id, {
		votes: idea.votes + 1
	});

	return new Response();
};
