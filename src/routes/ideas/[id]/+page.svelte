<script lang="ts">
	import Card from '$lib/components/card/Card.svelte';
	import DynamicPage from '$lib/components/dynamicPage/DynamicPage.svelte';
	import { pb } from '$lib/pocketbase/pb';
	import CommentSection from './CommentSection.svelte';
	import Sidebar from './Sidebar.svelte';
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { Routes } from '$lib/global/routes';
	import { toast } from '$lib/components/toast/toast';
	import type { PageData } from './$types';
	import Button from '$lib/components/button/Button.svelte';
	import { vote } from '$lib/util/vote';
	import type { ExpandedIdea } from './types';
	import { sanitize } from 'isomorphic-dompurify';
	import AuthorizedView from '$lib/components/authorizedView/AuthorizedView.svelte';

	export let data: PageData;

	const subscriptions: (() => void)[] = [];

	onMount(async () => {
		subscriptions.push(
			await pb.collection('ideas').subscribe($page.params.id, async (sub) => {
				switch (sub.action) {
					case 'delete':
						toast.info('The idea you are viewing was just deleted');
						goto(Routes.ideas);
						break;
					case 'update':
						data.idea = { ...data.idea, ...sub.record } as ExpandedIdea;
						break;
					default:
						invalidateAll();
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
		<DynamicPage title={`${data.idea.votes} votes - ${data.idea.title}`}>
			<svelte:fragment slot="header">
				<Button class="py-1" on:click={async () => await vote(data.idea.id)}>Add your vote</Button>
			</svelte:fragment>

			<Card title="Description">
				{@html sanitize(data.idea.description)}
			</Card>

			<CommentSection idea={data.idea} {user} />

			<svelte:fragment slot="sidebar">
				<Sidebar idea={data.idea} />
			</svelte:fragment>
		</DynamicPage>
	</svelte:fragment>
</AuthorizedView>
