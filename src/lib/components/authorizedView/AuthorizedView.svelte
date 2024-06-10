<script lang="ts">
	import type { UsersResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import { user } from '$lib/pocketbase/pb';

	export let authDelegate: () => boolean = () => true;

	let nonNullUser: UsersResponse;

	user.subscribe((u) => {
		nonNullUser = u as UsersResponse;
	});
</script>

{#if authDelegate() && $user != null}
	<slot name="authorized" user={nonNullUser} />
{:else}
	<slot name="unauthorized" />
{/if}
