<script lang="ts">
	import { goto } from '$app/navigation';
	import { Routes } from '$lib/global/routes';
	import { onMount } from 'svelte';
	import { user } from '$lib/pocketbase/pb';

	onMount(() => {
		if ($user == null) {
			goto(Routes.authenticate);
		} else {
			goto(Routes.ideas);
		}
	});
</script>
