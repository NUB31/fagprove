<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import type { UsersResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import Input from '$lib/components/form/Input.svelte';
	import { toast } from '$lib/components/toast/toast';

	export let user: UsersResponse;

	let files: FileList | null = null;

	async function updateAvatar() {
		const fd = new FormData();

		if (files && files.length >= 1) {
			fd.append('avatar', files[0]);
		}

		try {
			await pb.collection('users').update(user.id, fd);
			toast.success();
		} catch (e) {
			toast.error(unboxError(e).message);
		}
	}
</script>

<form>
	<caption>Update {user.username}</caption>
	<hr />

	<Input
		value={user.username}
		label="Username"
		type="text"
		placeholder="Username"
		autocomplete="username"
		onConfirm={async (v) => await pb.collection('users').update(user.id, { username: v })}
	/>

	<Input
		value={user.name}
		label="Name"
		type="text"
		placeholder="Name"
		autocomplete="name"
		onConfirm={async (v) => await pb.collection('users').update(user.id, { name: v })}
	/>

	<div class="form-group">
		<label for="profile-picture"> Profile picture </label>
		<input id="profile-picture" type="file" multiple={false} bind:files />
		<Button on:click={updateAvatar}>Change avatar</Button>
	</div>
</form>
