<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { toast } from '$lib/components/toast/toast';
	import { pb, unboxError, user } from '$lib/pocketbase/pb';

	export let onSuccess: () => void = () => {};

	let title: string;
	let description: string;
	let loading = false;

	async function createIdea() {
		loading = true;

		try {
			if ($user == null) {
				throw new Error('Not logged in');
			}

			await pb.collection('ideas').create({
				title: title,
				description: description,
				created_by: $user.id
			});
			toast.success();
			onSuccess();
		} catch (e) {
			toast.error(unboxError(e).message);
		} finally {
			loading = false;
		}
	}
</script>

<form on:submit|preventDefault={createIdea}>
	<caption>Create idea</caption>
	<hr />
	<Input
		required
		class="bg-light-200"
		bind:value={title}
		label="Title"
		placeholder="Title"
		type="text"
	/>
	<Input
		required
		class="bg-light-200"
		bind:value={description}
		label="Description"
		placeholder="Description"
		type="text"
	/>
	<Button {loading} class="w-full">Create idea</Button>
</form>
