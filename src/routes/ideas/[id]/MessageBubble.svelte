<script lang="ts">
	import ProfilePicture from '$lib/components/profilePicture/ProfilePicture.svelte';
	import Respond from '~icons/ic/round-forum';
	import Copy from '~icons/ic/round-content-copy';
	import Button from '$lib/components/button/Button.svelte';
	import { pb } from '$lib/pocketbase/pb';
	import type { CommentsResponse, UsersResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import type { ExpandedComment } from './types';
	import ButtonLink from '$lib/components/link/ButtonLink.svelte';
	import File from '~icons/ic/round-image';
	import { sanitize } from 'isomorphic-dompurify';

	export let comment: ExpandedComment;
	export let user: UsersResponse;
	export let onRespondClick: (comment: CommentsResponse) => void;

	let sentByMe = false;

	$: {
		sentByMe = user != null && user.id == comment.expand?.created_by?.id;
	}
</script>

<div class:group={true} class={sentByMe ? 'self-end' : 'self-start'}>
	<div
		class={`relative flex flex-col gap-1 border-2 rounded-md py-2 px-4 min-w-32 ${
			sentByMe
				? 'rounded-br-none bg-accent-400 border-accent-700 text-white'
				: 'rounded-bl-none bg-light-200 border-light-300'
		}`}
	>
		{#if comment.expand?.responding_to}
			<div class="opacity-70 flex items-center gap-2">
				<Respond class={sentByMe ? 'text-white' : 'text-dark-50'} />
				<div
					class:text-white={sentByMe}
					class:text-dark-50={!sentByMe}
					class="line-clamp-1 max-w-96"
				>
					{@html sanitize(comment.expand.responding_to.body)}
				</div>
			</div>
		{/if}

		{#if comment.expand?.created_by}
			<div class="flex gap-2">
				<ProfilePicture
					class="w-7 h-7 p-0 border-2 border-light-700"
					user={comment.expand.created_by}
				/>
				<span class="font-medium">{comment.expand.created_by.username}</span>
			</div>
		{/if}

		<div>
			{@html sanitize(comment.body)}
		</div>

		<div
			class={`pb-2 absolute opacity-0 top-0 -translate-y-full group-hover:opacity-100 transition-opacity ${sentByMe ? 'right-0' : 'left-0'}`}
		>
			<div
				class="p-2 bg-dark-200 border-dark-400 rounded-md gap-2 z-10 flex"
				class:left-0={!sentByMe}
				class:right-0={sentByMe}
			>
				<Button
					class="p-0 bg-transparent border-none hover:bg-transparent ml-auto text-light-50"
					icon={Respond}
					on:click={() => onRespondClick(comment)}
				/>
				<Button
					class="p-0 bg-transparent border-none hover:bg-transparent ml-auto text-light-50"
					icon={Copy}
					on:click={() => navigator.clipboard.writeText(comment.body)}
				/>
			</div>
		</div>
	</div>

	{#if comment.attachments.length >= 1}
		<ul class={`flex gap-1 pt-1 ${sentByMe ? 'justify-end' : 'justify-start'}`}>
			{#each comment.attachments as attachment}
				<li class="mb-2">
					<ButtonLink
						class="truncate py-2 p-1 after:hidden"
						title={attachment}
						target="_blank"
						href={pb.files.getUrl(comment, attachment)}
						download={attachment}
					>
						<File />
					</ButtonLink>
				</li>
			{/each}
		</ul>
	{/if}

	<div class="text-dark-500">
		{new Date(comment.created).toDateString()}
	</div>
</div>
