<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Send from '~icons/ic/round-send';
	import { toast } from '$lib/components/toast/toast';
	import { pb, unboxError, user } from '$lib/pocketbase/pb';
	import type { CommentsResponse, IdeasResponse } from '$lib/pocketbase/generated/pocketbase-types';

	let comment: string;
	let loading = false;

	export let idea: IdeasResponse;
	export let respondingTo: CommentsResponse | null;

	async function addComment() {
		loading = true;

		if ($user == null) {
			throw new Error('Not logged in');
		}

		try {
			await pb.collection('comments').create({
				body: comment,
				idea: idea.id,
				created_by: $user.id,
				responding_to: respondingTo?.id
			});

			comment = '';
			toast.success();
		} catch (e) {
			toast.error(unboxError(e).message);
		} finally {
			loading = false;
		}
	}
</script>

<div>
	<h3 class="mt-4 font-semibold text-lg">Add a comment</h3>
	{#if respondingTo}
		<button on:click={() => (respondingTo = null)} class="text-dark-500 text-left">
			Responding to:
			<div class="italic hover:line-through max-w-96 truncate">
				{@html respondingTo.body}
			</div>
		</button>
	{/if}
	<textarea
		bind:value={comment}
		placeholder="Add a comment"
		class="min-h-40 w-full mt-2 p-2 rounded-md border-2 border-light-300 bg-light-200"
	/>
	<div class="flex justify-end mt-2">
		<Button
			icon={Send}
			{loading}
			on:click={addComment}
			class="bg-accent-400 border-accent-800 hover:bg-accent-600 text-white">Send</Button
		>
	</div>
</div>