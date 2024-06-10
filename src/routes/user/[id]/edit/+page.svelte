<script lang="ts">
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import DynamicPage from '$lib/components/dynamicPage/DynamicPage.svelte';
	import { page } from '$app/stores';
	import UpdateUserForm from './UpdateUserForm.svelte';
	import UpdatePasswordForm from './UpdatePasswordForm.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';

	let showChangePasswordModal: () => void;
	let closeChangePasswordModal: () => void;
</script>

{#await pb.collection('users').getOne($page.params.id)}
	<DynamicPage title="Loading..." />
{:then user}
	<DynamicPage>
		<UpdateUserForm {user} />

		<svelte:fragment slot="sidebar">
			<Button on:click={showChangePasswordModal} class="w-full">Change password</Button>
		</svelte:fragment>

		<Modal bind:show={showChangePasswordModal} bind:close={closeChangePasswordModal}>
			<UpdatePasswordForm onPasswordChanged={closeChangePasswordModal} {user} />
		</Modal>
	</DynamicPage>
{:catch e}
	<DynamicPage title="Error">
		{unboxError(e).message}
	</DynamicPage>
{/await}
