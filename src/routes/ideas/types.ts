import type {
	IdeasResponse,
	StatusResponse,
	UsersResponse
} from '$lib/pocketbase/generated/pocketbase-types';

export type ExpandedIdea = IdeasResponse<{
	status: StatusResponse | undefined;
	created_by: UsersResponse | undefined;
}>;
