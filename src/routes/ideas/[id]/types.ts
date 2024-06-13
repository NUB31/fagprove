import type {
	CommentsResponse,
	UsersResponse,
	CategoryResponse,
	IdeasResponse,
	StatusResponse
} from '$lib/pocketbase/generated/pocketbase-types';

export type ExpandedIdea = IdeasResponse<{
	status: StatusResponse | undefined;
	category: CategoryResponse | undefined;
	created_by: UsersResponse | undefined;
}>;

export type ExpandedComment = CommentsResponse<{
	responding_to: CommentsResponse | undefined;
	created_by: UsersResponse | undefined;
}>;
