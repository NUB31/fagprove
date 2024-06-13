<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/button/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { toast } from '$lib/components/toast/toast';
	import { Routes } from '$lib/global/routes';
	import { pb, unboxError } from '$lib/pocketbase/pb';

	let name: string;
	let email: string;
	let password: string;
	let passwordConfirm: string;
	let username: string;

	let loading = false;

	async function signup() {
		try {
			loading = true;
			await pb.collection('users').create({
				name: name,
				username: username,
				email: email,
				password: password,
				passwordConfirm: passwordConfirm
			});
			await pb.collection('users').authWithPassword(email, password);
			await goto(Routes.home);
			toast.success();
		} catch (e) {
			toast.error(unboxError(e).message);
		} finally {
			loading = false;
		}
	}
</script>

<form on:submit|preventDefault={signup}>
	<caption>Sign up</caption>
	<hr />

	<Input label="Name" bind:value={name} placeholder="Name" autocomplete="name" />
	<Input label="Username" bind:value={username} placeholder="Username" autocomplete="username" />
	<Input label="Email" bind:value={email} placeholder="Email" autocomplete="email" required />
	<Input
		label="Password"
		type="password"
		bind:value={password}
		placeholder="Password"
		autocomplete="new-password"
		required
	/>
	<Input
		label="Confirm password"
		type="password"
		bind:value={passwordConfirm}
		placeholder="Confirm password"
		autocomplete="new-password"
		required
	/>

	<Button class="hover:bg-light-50 bg-light-100 w-full" {loading}>Sign up</Button>
</form>
