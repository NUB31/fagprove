<script lang="ts">
	import AuthorizedView from '$lib/components/authorizedView/AuthorizedView.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Quill from '$lib/components/editor/Quill.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { toast } from '$lib/components/toast/toast';
	import type { UsersResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import { pb, unboxError } from '$lib/pocketbase/pb';

	export let onSuccess: () => void = () => {};
	export let user: UsersResponse;

	let title: string;
	let description: string;
	let loading = false;
	let files: FileList | undefined;

	async function createIdea() {
		loading = true;

		try {
			const fd = new FormData();
			fd.append('title', title);
			fd.append('description', description);
			fd.append('description', description);
			fd.append('created_by', user.id);

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

<form on:submit|preventDefault={() => createIdea()}>
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
	<Quill class="mb-2" bind:html={description} />

	<label>
		<div>Attachments</div>
		<input bind:files class="mb-4" multiple={true} type="file" />
	</label>
	<Button {loading} class="w-full">Create idea</Button>
</form>
