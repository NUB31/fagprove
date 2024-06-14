<script lang="ts">
	import ButtonLink from '$lib/components/link/ButtonLink.svelte';
	import { pb } from '$lib/pocketbase/pb';
	import type { ExpandedIdea } from './types';

	export let idea: ExpandedIdea;
</script>

<div class="flex flex-col gap-4">
	<div>
		<h4>Status</h4>
		<div
			class="w-full py-1 text-center bg-green-500 rounded-md text-black border-2 border-green-700"
		>
			{idea.expand?.status?.name ?? 'New'}
		</div>
	</div>

	{#if idea.expand?.category}
		<div>
			<h4>Category</h4>
			<div
				class="w-full py-1 text-center bg-orange-500 rounded-md text-black border-2 border-orange-700"
			>
				{idea.expand.category.name}
			</div>
		</div>
	{/if}

	{#if idea.expand?.created_by}
		<div>
			<h4>Created by</h4>
			<div class="text-light-700">
				{idea.expand.created_by.username}
			</div>
		</div>
	{/if}

	<div>
		<h4>Created at</h4>
		<div class="text-light-700">
			{new Date(idea.created).toDateString()}
		</div>
	</div>

	<div>
		<h4>Attachments</h4>
		<ul>
			{#each idea.attachments as attachment}
				<li class="mb-2">
					<ButtonLink
						class="truncate py-2"
						title={attachment}
						target="_blank"
						href={pb.files.getUrl(idea, attachment)}
						download={attachment}
					>
						{attachment}
					</ButtonLink>
				</li>
			{/each}
		</ul>
	</div>
</div>
