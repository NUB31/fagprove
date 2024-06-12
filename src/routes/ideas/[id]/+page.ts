import { pb } from '$lib/pocketbase/pb';
import type {
	CategoryResponse,
	CommentsResponse,
	IdeasResponse,
	StatusResponse,
	UsersResponse
} from '$lib/pocketbase/generated/pocketbase-types.js';

type ExpandedIdea = IdeasResponse<{
	status: StatusResponse;
	category: CategoryResponse | null;
	created_by: UsersResponse;
	comments_via_idea:
		| CommentsResponse<{
				created_by: UsersResponse;
				responding_to: CommentsResponse;
		  }>[]
		| undefined;
}>;

export async function load({ params }) {
	const idea = await pb.collection('ideas').getOne<ExpandedIdea>(params.id, {
		expand:
			'comments_via_idea.created_by,comments_via_idea.responding_to,status,category,created_by'
	});

	return {
		idea: idea
	};
}
