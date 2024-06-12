<script lang="ts">
	import Spinner from '~icons/ic/round-sync';
	import { twMerge } from 'tailwind-merge';

	/** @description Disallow clicking and reduce opacity **/
	export let disabled = false;
	/** @description Show a loading spinner **/
	export let loading = false;
	/** @description Icon imported through ~icons/* **/
	export let icon: any | null = null;
	export let iconSize = 16;
</script>

<button
	on:click
	{...$$restProps}
	disabled={disabled || loading}
	class:opacity-50={disabled || loading}
	class:cursor-not-allowed={disabled || loading}
	class={twMerge(
		'relative rounded-lg border-2 border-light-200 bg-light-100 px-4 py-2 transition-colors hover:bg-light-200 flex gap-2 items-center',
		$$restProps['class']
	)}
>
	{#if loading}
		<span class="text-transparent"><slot /></span>
		<span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<Spinner class="h-6" />
		</span>
	{:else}
		{#if icon}
			<svelte:component this={icon} class="inline" font-size={iconSize} />
		{/if}
		<slot />
	{/if}
</button>
