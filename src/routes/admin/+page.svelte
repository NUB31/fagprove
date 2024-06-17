<script lang="ts">
	import AuthorizedView from '$lib/components/authorizedView/AuthorizedView.svelte';
</script>

<AuthorizedView showUnauthorizedMessage authDelegate={(u) => u.access_level >= 30}>
	Not implemented yet
</AuthorizedView>
