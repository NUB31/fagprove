<script lang="ts">
	import Card from '$lib/components/card/Card.svelte';
	import DynamicPage from '$lib/components/dynamicPage/DynamicPage.svelte';
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import CommentSection from './CommentSection.svelte';
	import Sidebar from './Sidebar.svelte';
	import type { ExpandedIdea } from './types';
	import { page } from '$app/stores';
	import Button from '$lib/components/button/Button.svelte';
	import { vote } from '$lib/util/vote';

	async function loadIdea(): Promise<ExpandedIdea> {
		return await pb.collection('ideas').getOne<ExpandedIdea>($page.params.id, {
			expand: 'status,category,created_by'
		});
	}
</script>

{#await loadIdea()}
	Loading...
{:then idea}
	<DynamicPage title={idea.title}>
		<svelte:fragment slot="header">
			<Button class="py-1" on:click={async () => await vote(idea.id)}>Add your vote</Button>
		</svelte:fragment>

		<Card>
			<svelte:fragment slot="header">Description</svelte:fragment>
			{@html idea.description}
		</Card>

		<CommentSection {idea} />

		<svelte:fragment slot="sidebar">
			<Sidebar {idea} />
		</svelte:fragment>
	</DynamicPage>
{:catch e}
	{unboxError(e).message}
{/await}
