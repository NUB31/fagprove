<script lang="ts">
	import MessageBubble from './MessageBubble.svelte';
	import type {
		CommentsResponse,
		IdeasResponse,
		UsersResponse
	} from '$lib/pocketbase/generated/pocketbase-types';
	import { pb } from '$lib/pocketbase/pb';
	import AddComment from './AddComment.svelte';
	import type { ExpandedComment } from './types';
	import { onDestroy, onMount } from 'svelte';

	export let idea: IdeasResponse;
	export let user: UsersResponse;

	let respondingTo: CommentsResponse | null = null;
	let comments: ExpandedComment[] = [];

	async function getComments() {
		comments = await pb.collection('comments').getFullList<ExpandedComment>({
			filter: pb.filter('idea.id = {:ideaId}', { ideaId: idea.id }),
			expand: 'responding_to,created_by',
			sort: '-created'
		});
	}

	const subscriptions: (() => void)[] = [];

	onMount(async () => {
		await getComments();

		subscriptions.push(
			await pb.collection('comments').subscribe('*', async (sub) => {
				if (sub.record.idea != idea.id) return;

				const index = comments.findIndex((x) => x.id == sub.record.id);

				switch (sub.action) {
					case 'update':
						if (index != -1) {
							comments[index] = { ...comments[index], ...sub.record } as ExpandedComment;
							comments = comments;
						}
						break;
					case 'delete':
						if (index != -1) {
							comments = comments.filter((x) => x.id != sub.record.id);
						}
						break;
					default:
						await getComments();
						break;
				}
			})
		);
	});

	onDestroy(() => {
		subscriptions.forEach((unsubscribe) => unsubscribe());
	});
</script>

<AddComment {respondingTo} {idea} />

<ul class="flex flex-col gap-2 mt-8">
	{#each comments as comment}
		<li class="flex flex-col">
			<MessageBubble
				{user}
				{comment}
				onRespondClick={(v) => {
					respondingTo = v;
				}}
			/>
		</li>
	{/each}
</ul>
