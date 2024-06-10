<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { toast } from '$lib/components/toast/toast';
	import type { UsersResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import { pb, unboxError } from '$lib/pocketbase/pb';

	export let user: UsersResponse;
	export let onPasswordChanged: () => void = () => {};

	let loading = false;
	let oldPassword: string;
	let password: string;
	let passwordConfirm: string;

	async function update() {
		loading = true;
		try {
			await pb.collection('users').update(user.id, {
				oldPassword: oldPassword,
				password: password,
				passwordConfirm: passwordConfirm
			});
			toast.success();
			pb.authStore.clear();
			await pb.collection('users').authWithPassword(user.email, password);
			onPasswordChanged();
		} catch (e) {
			toast.error(unboxError(e).message);
		} finally {
			loading = false;
		}
	}
</script>

<form on:submit|preventDefault={update}>
	<Input
		label="Current password"
		type="password"
		placeholder="Current password"
		autocomplete="current-password"
		class="bg-light-100"
		bind:value={oldPassword}
		required
	/>

	<Input
		label="New password"
		type="password"
		placeholder="New password"
		autocomplete="new-password"
		class="bg-light-100"
		bind:value={password}
		required
	/>

	<Input
		label="Confirm password"
		type="password"
		placeholder="Confirm password"
		autocomplete="new-password"
		class="bg-light-100"
		bind:value={passwordConfirm}
		required
	/>

	<Button class="w-full" {loading}>Submit</Button>
</form>
