import { toast } from '$lib/components/toast/toast';
import { pb, unboxError } from '$lib/pocketbase/pb';

export async function vote(ideaId: string) {
	try {
		const res = await fetch(`/api/vote/${ideaId}`, {
			method: 'POST',
			headers: {
				'X-PB-Token': pb.authStore.token
			}
		});

		if (!res.ok) {
			const data = await res.json();
			let message;

			if ('message' in data) {
				message = data.message;
			} else {
				message = 'Voting failed';
			}

			throw new Error(message);
		}

		toast.success();
	} catch (e) {
		toast.error(unboxError(e).message);
	}
}
