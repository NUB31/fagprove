<script lang="ts">
	import { goto } from '$app/navigation';
	import AuthorizedView from '$lib/components/authorizedView/AuthorizedView.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import ButtonLink from '$lib/components/link/ButtonLink.svelte';
	import ProfilePicture from '$lib/components/profilePicture/ProfilePicture.svelte';
	import { Routes } from '$lib/global/routes';
	import { pb } from '$lib/pocketbase/pb';
	import Account from '~icons/ic/round-person';
	import Settings from '~icons/ic/round-settings';
	import Logout from '~icons/ic/round-logout';

	let accountDialogOpen = false;

	async function logout() {
		try {
			pb.authStore.clear();
			await goto(Routes.authenticate);
		} finally {
			accountDialogOpen = false;
		}
	}
</script>

<header
	class="flex h-[var(--topbar-height)] items-center justify-end bg-light-50 px-4 py-2 shadow-md"
>
	<AuthorizedView>
		<svelte:fragment slot="authorized" let:user>
			<Button
				class="flex aspect-square h-full items-center justify-center rounded-full p-0"
				on:click={() => (accountDialogOpen = !accountDialogOpen)}
			>
				<ProfilePicture {user} />
			</Button>
			<dialog
				class="inset-auto right-0 top-[calc(var(--topbar-height)+5px)] z-40 border-none bg-transparent shadow-sm"
				open={accountDialogOpen}
			>
				<Card class="min-w-60 bg-light-50">
					<ul>
						<li>
							<ButtonLink
								href={Routes.user(user.id)}
								on:click={() => (accountDialogOpen = false)}
								class="flex items-center gap-2 py-2"
							>
								<Account font-size={18} />
								<span> Account </span>
							</ButtonLink>
						</li>
					</ul>
					<div class="mt-2 flex items-center justify-between p-2">
						<a
							href={Routes.user_edit(user.id)}
							on:click={() => (accountDialogOpen = false)}
							class="cursor-pointer"
						>
							<Settings font-size={18} />
						</a>
						<button class="cursor-pointer border-none text-accent-400" on:click={logout}>
							<Logout font-size={18} />
						</button>
					</div>
				</Card>
			</dialog>
		</svelte:fragment>

		<svelte:fragment slot="unauthorized">
			<ButtonLink
				class="border-accent-700 bg-accent-400 text-white hover:bg-accent-600"
				href={Routes.authenticate}
			>
				Authenticate
			</ButtonLink>
		</svelte:fragment>
	</AuthorizedView>
</header>
