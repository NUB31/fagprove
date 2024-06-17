<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import type { CategoryResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import { pb, unboxError, user } from '$lib/pocketbase/pb';
	import AssignIdeaModal from './AssignIdeaModal.svelte';
	import Assignment from '~icons/ic/round-assignment';

	let showAssignmentModal: () => void;
	let closeAssignmentModal: () => void;

	let currentCategoryId: string | null = null;

	async function getMyCategories(): Promise<CategoryResponse[]> {
		if (!$user) {
			throw new Error('Not logged in');
		}

		return pb.collection('category').getFullList({
			filter: pb.filter('owner.id = {:userId}', { userId: $user.id })
		});
	}
</script>

<Modal bind:show={showAssignmentModal} bind:close={closeAssignmentModal}>
	<AssignIdeaModal {currentCategoryId} onClose={closeAssignmentModal} />
</Modal>

{#await getMyCategories()}
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
							class="w-full justify-center"
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
