<script lang="ts">
	import ButtonLink from '$lib/components/link/ButtonLink.svelte';

	/** @description Icon imported through ~icons/* **/
	export let icon;
	export let title: string;
	export let expanded: boolean;
	export let href: string;
</script>

<ButtonLink
	match
	{title}
	class={`flex items-center ${expanded ? 'justify-start rounded-lg bg-light-200 border-light-300 hover:bg-light-300 hover:border-light-400' : 'justify-center bg-transparent border-none rounded-full aspect-square p-2 hover:bg-light-200'}`}
	{href}
>
	<svelte:component this={icon} font-size={24} />
	{#if expanded}
		<span class="ml-2"> {title} </span>
	{/if}
</ButtonLink>
