<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center">
	<h1 class="text-4xl font-bold text-accent-400">
		Error: {$page.status}
	</h1>
	<p class="text-lg">
		{$page.error?.message}
	</p>
</div>
