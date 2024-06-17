<script lang="ts">
	import AuthorizedView from '$lib/components/authorizedView/AuthorizedView.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { CategoryResponse, UsersResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import AssignIdeaModal from './AssignIdeaModal.svelte';
	import Assignment from '~icons/ic/round-assignment';

	let showAssignmentModal: () => void;
	let closeAssignmentModal: () => void;

	let currentCategoryId: string | null = null;

	async function getMyCategories(user: UsersResponse): Promise<CategoryResponse[]> {
		return pb.collection('category').getFullList({
			filter: pb.filter('owner.id = {:userId}', { userId: user.id })
		});
	}
</script>

<Modal bind:show={showAssignmentModal} bind:close={closeAssignmentModal}>
	<AssignIdeaModal {currentCategoryId} onClose={closeAssignmentModal} />
</Modal>

<AuthorizedView showUnauthorizedMessage authDelegate={(u) => u.access_level >= 20}>
	<svelte:fragment slot="authorized" let:user>
		{#await getMyCategories(user)}
			Loading...
		{:then categories}
			<table class="w-full">
				<thead>
					<tr>
						<th> Name </th>
						<th> Assignment </th>
					</tr>
				</thead>
				<tbody>
					{#each categories as category}
						<tr>
							<td>{category.name}</td>
							<td class="w-44">
								<Button
									class="w-full"
									icon={Assignment}
									on:click={() => {
										currentCategoryId = category.id;
										showAssignmentModal();
									}}
								>
									Assign ideas
								</Button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:catch e}
			{unboxError(e).message}
		{/await}
	</svelte:fragment>
</AuthorizedView>
