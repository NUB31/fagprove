<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import { toast } from '$lib/components/toast/toast';
	import type { IdeasResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import { onMount } from 'svelte';

	export let onClose: () => void = () => {};
	export let currentCategoryId: string | null = null;
	let loading = false;
	let ideas: IdeasResponse[] = [];

	async function getUnassignedIdeas() {
		ideas = await pb.collection('ideas').getFullList({
			filter: pb.filter('category = {:category}', { category: null })
		});
	}

	async function assignIdea(ideaId: string) {
		loading = true;

		try {
			await pb.collection('ideas').update(ideaId, {
				category: currentCategoryId
			});
			await getUnassignedIdeas();
			onClose();
			toast.success();
		} catch (e) {
			toast.error(unboxError(e).message);
		} finally {
			loading = false;
		}
	}

	onMount(async () => {
		await getUnassignedIdeas();
	});
</script>

<table class="w-96">
	<thead>
		<tr>
			<th> Name </th>
			<th> Assignment </th>
		</tr>
	</thead>
	<tbody>
		{#each ideas as idea}
			<tr>
				<td>{idea.title}</td>
				<td>
					<Button class="w-full" {loading} on:click={async () => await assignIdea(idea.id)}>
						Assign
					</Button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
