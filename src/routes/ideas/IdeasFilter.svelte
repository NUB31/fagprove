<script lang="ts">
	import Input from '$lib/components/form/Input.svelte';
	import type { UsersResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import { pb } from '$lib/pocketbase/pb';

	export let filter: string;
	export let user: UsersResponse;

	let statusFilter: string[] = [];
	let categoryFilter: string[] = [];
	let search: string = '';
	let creator: 'you' | 'everyone' = 'everyone';

	function createFilter(
		statusFilter: string[],
		categoryFilter: string[],
		search: string,
		creator: string
	) {
		let filter: string[] = [];
		filter.push(
			statusFilter.map((x) => pb.filter('status.id ?= {:status}', { status: x })).join(' || ')
		);

		filter.push(
			categoryFilter
				.map((x) => pb.filter('category.id ?= {:category}', { category: x }))
				.join(' || ')
		);

		if (search) {
			filter.push(pb.filter('title ~ {:search} || description ~ {:search}', { search: search }));
		}

		if (creator == 'you' && user) {
			filter.push(pb.filter('created_by.id = {:user}', { user: user.id }));
		}

		return filter
			.filter((x) => x) // Removes empty entries
			.map((x) => `(${x})`)
			.join(' && ');
	}

	$: {
		filter = createFilter(statusFilter, categoryFilter, search, creator);
	}
</script>

<div class="flex flex-col gap-4">
	<Input class="bg-light-100 mb-0" bind:value={search} placeholder="Search" label="Search" />
	<div>
		<label>
			Creator
			<select class="w-full py-2 px-4 rounded-md bg-light-100" bind:value={creator}>
				<option value="everyone">Everyone</option>
				<option value="you">You</option>
			</select>
		</label>
	</div>
	<div>
		{#await pb.collection('status').getFullList()}
			Loading...
		{:then statuses}
			<div class="font-semibold">Status</div>
			<ul>
				{#each statuses as status}
					<li>
						<label>
							{status.name}
							<input
								on:click={(e) => {
									if (e.currentTarget?.checked) {
										statusFilter.push(status.id);
										statusFilter = statusFilter;
									} else {
										statusFilter = statusFilter.filter((x) => x != status.id);
									}
								}}
								type="checkbox"
							/>
						</label>
					</li>
				{/each}
			</ul>
		{/await}
	</div>
	<div>
		{#await pb.collection('category').getFullList()}
			Loading...
		{:then statuses}
			<div class="font-semibold">Category</div>
			<ul>
				{#each statuses as status}
					<li>
						<label>
							{status.name}
							<input
								on:click={(e) => {
									if (e.currentTarget?.checked) {
										categoryFilter.push(status.id);
										categoryFilter = categoryFilter;
									} else {
										categoryFilter = categoryFilter.filter((x) => x != status.id);
									}
								}}
								type="checkbox"
							/>
						</label>
					</li>
				{/each}
			</ul>
		{/await}
	</div>
</div>
