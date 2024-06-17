<script lang="ts">
	import AuthorizedView from '$lib/components/authorizedView/AuthorizedView.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import ButtonLink from '$lib/components/link/ButtonLink.svelte';
	import { toast } from '$lib/components/toast/toast';
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import type { ExpandedIdea } from './types';
	import Edit from '~icons/ic/round-edit';
	import Cancel from '~icons/ic/round-cancel';

	export let idea: ExpandedIdea;
	let editing = false;

	async function updateStatus(id: string) {
		try {
			pb.collection('ideas').update(idea.id, {
				status: id
			});
			toast.success();
		} catch (e) {
			toast.error(unboxError(e).message);
		}
	}

	async function updateCategory(id: string) {
		try {
			pb.collection('ideas').update(idea.id, {
				category: id
			});
			toast.success();
		} catch (e) {
			toast.error(unboxError(e).message);
		}
	}
</script>

<div class="flex flex-col gap-4">
	<AuthorizedView authDelegate={(u) => u.access_level >= 20}>
		<svelte:fragment slot="authorized">
			<Button on:click={() => (editing = !editing)} icon={editing ? Cancel : Edit}>
				{editing ? 'Stop editing' : 'Edit'}
			</Button>
		</svelte:fragment>
	</AuthorizedView>

	<div>
		<h4>Status</h4>
		<AuthorizedView
			authDelegate={(u) =>
				editing &&
				(u.access_level >= 30 || (u.access_level >= 20 && idea.expand?.category?.owner == u.id))}
		>
			<svelte:fragment slot="authorized">
				{#await pb.collection('status').getFullList()}
					Loading...
				{:then statuses}
					<select
						class="w-full px-4 py-2 rounded-md bg-light-100 border-2 border-light-200"
						value={idea.status}
						on:change={(e) => updateStatus(e.currentTarget.value)}
					>
						{#each statuses as status}
							<option value={status.id}>
								{status.name}
							</option>
						{/each}
					</select>
				{:catch e}
					{unboxError(e).message}
				{/await}
			</svelte:fragment>

			<svelte:fragment slot="unauthorized">
				<div
					class="w-full py-1 text-center bg-green-500 rounded-md text-black border-2 border-green-700"
				>
					{idea.expand?.status?.name ?? 'New'}
				</div>
			</svelte:fragment>
		</AuthorizedView>
	</div>

	<div>
		<h4>Category</h4>
		<AuthorizedView
			authDelegate={(u) =>
				editing && (u.access_level >= 30 || (u.access_level >= 20 && idea.category == null))}
		>
			<svelte:fragment slot="authorized">
				{#await pb.collection('category').getFullList()}
					Loading...
				{:then categories}
					<select
						class="w-full px-4 py-2 rounded-md bg-light-100 border-2 border-light-200"
						value={idea.category}
						on:change={(e) => updateCategory(e.currentTarget.value)}
					>
						{#each categories as category}
							<option value={category.id}>
								{category.name}
							</option>
						{/each}
					</select>
				{:catch e}
					{unboxError(e).message}
				{/await}
			</svelte:fragment>

			<svelte:fragment slot="unauthorized">
				<div
					class="w-full py-1 text-center bg-orange-500 rounded-md text-black border-2 border-orange-700"
				>
					{idea.expand?.category?.name ?? 'Uncategorized'}
				</div>
			</svelte:fragment>
		</AuthorizedView>
	</div>

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
