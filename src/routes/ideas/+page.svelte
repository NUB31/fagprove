<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import DynamicPage from '$lib/components/dynamicPage/DynamicPage.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { Routes } from '$lib/global/routes';
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import CreateIdeaForm from './CreateIdeaForm.svelte';
	import type { ExpandedIdea } from './types';
	import { toast } from '$lib/components/toast/toast';
	import { debounce } from '$lib/util/debounce';
	import IdeasFilter from './IdeasFilter.svelte';
	import Descending from '~icons/ic/round-keyboard-arrow-down';
	import Ascending from '~icons/ic/round-keyboard-arrow-up';
	import { onDestroy, onMount } from 'svelte';
	import { sanitize } from 'isomorphic-dompurify';
	import AuthorizedView from '$lib/components/authorizedView/AuthorizedView.svelte';

	let showCreateIdeaModal: () => void;
	let closeCreateIdeaModal: () => void;

	let ideas: ExpandedIdea[] = [];
	let filter = '';
	let loading = true;
	let sort: 'votes' | 'created' = 'votes';
	let ascending = false;

	const getIdeas = debounce(
		async (filter: string, orderBy: string, asc: boolean, silent: boolean = false) => {
			if (!silent) loading = true;

			try {
				ideas = await pb.collection('ideas').getFullList<ExpandedIdea>({
					filter: filter,
					expand: 'status,created_by',
					sort: `${asc ? '' : '-'}${orderBy}`
				});
			} catch (e) {
				toast.error(unboxError(e).message);
			} finally {
				loading = false;
			}
		},
		200
	);

	// Block runs each time filter changes
	$: {
		getIdeas(filter, sort, ascending);
	}

	const subscriptions: (() => void)[] = [];

	onMount(async () => {
		subscriptions.push(
			await pb.collection('ideas').subscribe('*', async (sub) => {
				const index = ideas.findIndex((x) => x.id == sub.record.id);

				switch (sub.action) {
					case 'update':
						if (index != -1) {
							ideas[index] = { ...ideas[index], ...sub.record } as ExpandedIdea;
							ideas = ideas;
						}
						break;
					case 'delete':
						if (index != -1) {
							ideas = ideas.filter((x) => x.id != sub.record.id);
						}
						break;
					default:
						await getIdeas(filter, sort, ascending, true);
						break;
				}
			})
		);
	});

	onDestroy(() => {
		subscriptions.forEach((unsubscribe) => unsubscribe());
	});
</script>

<AuthorizedView showUnauthorizedMessage authDelegate={(u) => u.access_level >= 10}>
	<svelte:fragment slot="authorized" let:user>
		<Modal bind:show={showCreateIdeaModal} bind:close={closeCreateIdeaModal}>
			<CreateIdeaForm onSuccess={closeCreateIdeaModal} {user} />
		</Modal>

		<DynamicPage title="Ideas">
			<svelte:fragment slot="header">
				<Button
					class="bg-accent-400 hover:bg-accent-600 py-1 border-accent-800 text-white"
					on:click={showCreateIdeaModal}>New idea</Button
				>
			</svelte:fragment>

			<svelte:fragment slot="sidebar">
				<div class="mb-4">
					<label for="sort-select">
						<div>Sort by</div>
					</label>
					<div class="flex gap-2">
						<select
							class="grow py-2 px-4 rounded-md bg-light-100"
							id="sort-select"
							bind:value={sort}
						>
							<option value="votes">Votes</option>
							<option value="created">Created</option>
						</select>
						<Button
							title={ascending ? 'ascending' : 'descending'}
							icon={ascending ? Ascending : Descending}
							on:click={() => (ascending = !ascending)}
						/>
					</div>
				</div>

				<IdeasFilter bind:filter {user} />
			</svelte:fragment>

			{#if loading}
				Loading...
			{:else}
				<div class="flex flex-wrap gap-4">
					{#each ideas as idea}
						<a href={Routes.idea(idea.id)}>
							<Card
								title={idea.title}
								class="w-full lg:w-64 h-full hover:bg-light-100 transition-colors"
							>
								<svelte:fragment slot="header">
									<div class="flex items-center gap-2 flex-wrap">
										<div
											class="text-sm px-2 text-black rounded-md border-2 bg-yellow-500 border-yellow-700"
										>
											{idea.votes} votes
										</div>
										{#if idea.expand?.created_by}
											<div
												class="text-sm px-2 text-black rounded-md border-2 bg-blue-500 border-blue-700"
											>
												By {idea.expand.created_by.username}
											</div>
										{/if}
										<div
											class="text-sm px-2 text-black rounded-md border-2 bg-green-500 border-green-700"
										>
											Status: {idea.expand?.status?.name || 'New'}
										</div>
									</div>
								</svelte:fragment>

								<div class="text-light-500">
									{new Date(idea.created).toDateString()}
								</div>
								<div class="line-clamp-2 lg:line-clamp-3">
									{@html sanitize(idea.description)}
								</div>
							</Card>
						</a>
					{/each}
				</div>
			{/if}
		</DynamicPage>
	</svelte:fragment>
</AuthorizedView>
