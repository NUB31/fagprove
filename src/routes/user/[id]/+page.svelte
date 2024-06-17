<script lang="ts">
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import DynamicPage from '$lib/components/dynamicPage/DynamicPage.svelte';
	import { page } from '$app/stores';
	import AuthorizedView from '$lib/components/authorizedView/AuthorizedView.svelte';
</script>

<AuthorizedView
	showUnauthorizedMessage
	authDelegate={(u) => $page.params.id == u.id || u.access_level >= 30}
>
	<svelte:fragment slot="authorized" let:user>
		{#await pb.collection('users').getOne($page.params.id)}
			loading...
		{:then user}
			<DynamicPage title={user.username}>
				<pre>{JSON.stringify(user, null, 4)}</pre>
			</DynamicPage>
		{:catch e}
			<DynamicPage title="Error">
				{unboxError(e).message}
			</DynamicPage>
		{/await}
	</svelte:fragment>
</AuthorizedView>
