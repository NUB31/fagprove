<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { toast } from '$lib/components/toast/toast';
	import { pb, unboxError, user } from '$lib/pocketbase/pb';

	export let onSuccess: () => void = () => {};

	let title: string;
	let description: string;
	let loading = false;
	let files: FileList | undefined;

	async function createIdea() {
		loading = true;

		try {
			if ($user == null) {
				throw new Error('Not logged in');
			}

			const fd = new FormData();
			fd.append('title', title);
			fd.append('description', description);
			fd.append('description', description);
			fd.append('created_by', $user.id);

			if (files) {
				for (let file of files) {
					fd.append('attachments', file);
				}
			}

			await pb.collection('ideas').create(fd);
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
	<label>
		<div>Attachments</div>
		<input bind:files class="mb-4" multiple={true} type="file" />
	</label>
	<Button {loading} class="w-full">Create idea</Button>
</form>
