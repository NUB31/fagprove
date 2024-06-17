<script lang="ts">
	import { pb, unboxError, user } from '$lib/pocketbase/pb';
	import DynamicPage from '$lib/components/dynamicPage/DynamicPage.svelte';
	import { page } from '$app/stores';
	import UpdateUserForm from './UpdateUserForm.svelte';
	import UpdatePasswordForm from './UpdatePasswordForm.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Modal from '$lib/components/modal/Modal.svelte';
	import AuthorizedView from '$lib/components/authorizedView/AuthorizedView.svelte';

	let showChangePasswordModal: () => void;
	let closeChangePasswordModal: () => void;
</script>

<AuthorizedView
	showUnauthorizedMessage
	authDelegate={(u) => $page.params.id == u.id || u.access_level >= 30}
>
	<svelte:fragment slot="authorized" let:user>
		{#await pb.collection('users').getOne($page.params.id)}
			<DynamicPage title="Loading..." />
		{:then fetchedUser}
			<DynamicPage>
				<UpdateUserForm user={fetchedUser} />

				<svelte:fragment slot="sidebar">
					{#if user.id == fetchedUser.id}
						<Button on:click={showChangePasswordModal} class="w-full">Change password</Button>
					{/if}
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
	</svelte:fragment>
</AuthorizedView>
