<script>
	import DynamicPage from '$lib/components/dynamicPage/DynamicPage.svelte';
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import CreateIdeaForm from './CreateIdeaForn.svelte';
</script>

{#await pb.collection('ideas').getFullList()}
	<DynamicPage title="Loading..." />
{:then ideas}
	<DynamicPage title="Ideas">
		<ul>
			{#each ideas as idea}
				<li>
					{idea.title}
				</li>
			{/each}
		</ul>

		<svelte:fragment slot="sidebar">
			<CreateIdeaForm />
		</svelte:fragment>
	</DynamicPage>
{:catch e}
	<DynamicPage title="Error">
		{unboxError(e).message}
	</DynamicPage>
{/await}
