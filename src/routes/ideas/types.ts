import type { IdeasResponse, StatusResponse } from '$lib/pocketbase/generated/pocketbase-types';

export type ExpandedIdea = IdeasResponse<{
	status: StatusResponse | undefined;
}>;
