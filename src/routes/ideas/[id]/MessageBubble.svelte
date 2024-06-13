<script lang="ts">
	import ProfilePicture from '$lib/components/profilePicture/ProfilePicture.svelte';
	import Respond from '~icons/ic/round-forum';
	import Copy from '~icons/ic/round-content-copy';
	import Button from '$lib/components/button/Button.svelte';
	import { user } from '$lib/pocketbase/pb';
	import type { CommentsResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import type { ExpandedComment } from './types';

	export let comment: ExpandedComment;
	export let onRespondClick: (comment: CommentsResponse) => void;

	function sentByMe(): boolean {
		return $user != null && $user.id == comment.expand?.created_by?.id;
	}
</script>

<div class:group={true} class={sentByMe() ? 'self-end' : 'self-start'}>
	<div
		class={`relative flex flex-col gap-1 border-2 rounded-md py-2 px-4 min-w-32 ${
			sentByMe()
				? 'rounded-br-none bg-accent-400 border-accent-700 text-white'
				: 'rounded-bl-none bg-light-200 border-light-300'
		}`}
	>
		{#if comment.expand?.responding_to}
			<div class="opacity-70 flex items-center gap-2">
				<Respond class={sentByMe() ? 'text-white' : 'text-dark-50'} />
				<div
					class:text-white={sentByMe()}
					class:text-dark-50={!sentByMe()}
					class="truncate max-w-96"
				>
					{@html comment.expand.responding_to.body}
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
			{@html comment.body}
		</div>

		<div
			class="absolute hidden bottom-0 translate-y-[110%] group-hover:flex p-2 bg-dark-200 border-dark-400 rounded-md gap-2 z-10"
			class:left-0={!sentByMe()}
			class:right-0={sentByMe()}
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

	<div class="text-dark-500">
		{new Date(comment.created).toDateString()}
	</div>
</div>
