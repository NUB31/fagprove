<script lang="ts">
	import MessageBubble from './MessageBubble.svelte';
	import type { CommentsResponse, IdeasResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import AddComment from './AddComment.svelte';
	import type { ExpandedComment } from './types';

	export let idea: IdeasResponse;

	let respondingTo: CommentsResponse | null = null;

	async function getComments(): Promise<ExpandedComment[]> {
		return await pb.collection('comments').getFullList<ExpandedComment>({
			filter: pb.filter('idea.id = {:ideaId}', { ideaId: idea.id }),
			expand: 'responding_to,created_by',
			sort: '-created'
		});
	}
</script>

<AddComment {respondingTo} {idea} />

{#await getComments()}
	Loading...
{:then comments}
	<ul class="flex flex-col gap-2 mt-8">
		{#each comments as comment}
			<li class="flex flex-col">
				<MessageBubble
					{comment}
					onRespondClick={(v) => {
						respondingTo = v;
					}}
				/>
			</li>
		{/each}
	</ul>
{:catch e}
	{unboxError(e).message}
{/await}
