<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { toast } from '$lib/components/toast/toast';
	import { Routes } from '$lib/global/routes';
	import { pb, unboxError } from '$lib/pocketbase/pb';

	let loading = false;
	let email: string;
	let password: string;

	async function login() {
		loading = true;

		try {
			await pb.collection('users').authWithPassword(email, password);
			await goto(Routes.root);
		} catch (e) {
			toast.error(unboxError(e).message);
		} finally {
			loading = false;
		}
	}
</script>

<form on:submit|preventDefault={login}>
	<caption>Log in</caption>
	<hr />

	<Input bind:value={email} label="Email" placeholder="Email" autocomplete="email" required />
	<Input
		bind:value={password}
		label="Password"
		type="password"
		placeholder="Password"
		autocomplete="current-password"
		required
	/>

	<Button class="hover:bg-light-50 bg-light-100 w-full" {loading}>Log in</Button>
</form>
