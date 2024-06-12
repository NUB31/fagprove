<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import DynamicPage from '$lib/components/dynamicPage/DynamicPage.svelte';
	import ButtonLink from '$lib/components/link/ButtonLink.svelte';
	import { toast } from '$lib/components/toast/toast';
	import { pb, unboxError, user } from '$lib/pocketbase/pb';
	import type { PageData } from './$types';
	import Send from '~icons/ic/round-send';
	import type { CommentsResponse, UsersResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import MessageBubble from './MessageBubble.svelte';

	export let data: PageData;

	let loading = false;
	let comment: string;
	let respondingTo: CommentsResponse | null = null;

	async function addComment() {
		loading = true;

		if ($user == null) {
			throw new Error('Not logged in');
		}

		try {
			await pb.collection('comments').create({
				body: comment,
				idea: data.idea.id,
				created_by: $user.id,
				responding_to: respondingTo?.id
			});

			toast.success();
		} catch (e) {
			toast.error(unboxError(e).message);
		} finally {
			loading = false;
		}
	}

	function sortDesc(
		data: CommentsResponse<{
			created_by: UsersResponse;
			responding_to: CommentsResponse;
		}>[]
	) {
		return [...data].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
	}
</script>

<DynamicPage title={data.idea.title}>
	<Card>
		<svelte:fragment slot="header">Description</svelte:fragment>
		{@html data.idea.description}
	</Card>

	<div>
		<h3 class="mt-4 font-semibold text-lg">Add a comment</h3>
		{#if respondingTo != null}
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

	<ul class="flex flex-col gap-2 mt-8">
		{#if data.idea.expand}
			{#each sortDesc(data.idea.expand.comments_via_idea) as comment}
				<li class="flex flex-col">
					<MessageBubble
						{comment}
						onRespondClick={(v) => {
							respondingTo = v;
						}}
					/>
				</li>
			{/each}
		{:else}
			<div>Something went wrong</div>
		{/if}
	</ul>

	<div class="flex flex-col gap-4" slot="sidebar">
		<div>
			<h4>Status</h4>
			<div
				class="w-full py-1 text-center bg-green-500 rounded-md text-black border-2 border-green-700"
			>
				{data.idea.expand?.status.name}
			</div>
		</div>

		{#if data.idea.expand?.category}
			<div>
				<h4>Category</h4>
				<div
					class="w-full py-1 text-center bg-orange-500 rounded-md text-black border-2 border-orange-700"
				>
					{data.idea.expand?.category.name}
				</div>
			</div>
		{/if}

		<div>
			<h4>Created by</h4>
			<div class="text-light-700">
				{data.idea.expand?.created_by.username}
			</div>
		</div>

		<div>
			<h4>Created at</h4>
			<div class="text-light-700">
				{new Date(data.idea.created).toDateString()}
			</div>
		</div>

		<div>
			<h4>Attachments</h4>
			<ul>
				{#each data.idea.attachments as attachment}
					<li>
						<ButtonLink
							class="truncate py-2"
							title={attachment}
							target="_blank"
							href={pb.files.getUrl(data.idea, attachment)}
							download={attachment}
						>
							{attachment}
						</ButtonLink>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</DynamicPage>
