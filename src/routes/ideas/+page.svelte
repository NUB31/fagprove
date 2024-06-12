<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import DynamicPage from '$lib/components/dynamicPage/DynamicPage.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import { Routes } from '$lib/global/routes';
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import CreateIdeaForm from './CreateIdeaForm.svelte';

	let showCreateIdeaModal: () => void;
	let closeCreateIdeaModal: () => void;
</script>

<Modal bind:show={showCreateIdeaModal} bind:close={closeCreateIdeaModal}>
	<CreateIdeaForm onSuccess={closeCreateIdeaModal} />
</Modal>

<DynamicPage title="Ideas">
	<svelte:fragment slot="header">
		<Button
			class="bg-accent-400 hover:bg-accent-600 border-accent-800"
			on:click={showCreateIdeaModal}>New idea</Button
		>
	</svelte:fragment>

	{#await pb.collection('ideas').getFullList()}
		Loading...
	{:then ideas}
		<ul>
			{#each ideas as idea}
				<li>
					<a href={Routes.idea(idea.id)}>{idea.title}</a>
				</li>
			{/each}
		</ul>
	{:catch e}
		{unboxError(e).message}
	{/await}
</DynamicPage>
