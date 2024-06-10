<script lang="ts">
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import DynamicPage from '$lib/components/dynamicPage/DynamicPage.svelte';
	import { page } from '$app/stores';
</script>

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
	{unboxError(e).message}
{/await}
