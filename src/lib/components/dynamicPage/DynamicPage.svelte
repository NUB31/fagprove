<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Card from '../card/Card.svelte';

	export let title: string | null = null;
</script>

<div class={twMerge('max-w-[112ch] mx-auto', $$restProps['class'])}>
	{#if $$slots['header'] || title}
		<div class="mb-4 flex items-center justify-between">
			{#if title}
				<h1 class="text-2xl font-bold">
					{title}
				</h1>
			{:else}
				<div />
			{/if}
			<div class="flex flex-row gap-2">
				<slot name="header" />
			</div>
		</div>
	{/if}

	{#if $$slots['sidebar']}
		<div {...$$restProps} class={'relative flex gap-4'}>
			<div class="flex-grow">
				<slot />
			</div>

			<aside class="sticky top-0 h-fit w-60 flex-shrink-0">
				<Card>
					<slot name="sidebar" />
				</Card>
			</aside>
		</div>
	{:else}
		<div {...$$restProps}>
			<slot />
		</div>
	{/if}
</div>
