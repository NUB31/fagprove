<script lang="ts" generics="T">
	import { twMerge } from 'tailwind-merge';

	export let items: T[];

	/** @description Tailwind classes for styling the button colors */
	export let buttonClass = '';

	let index = 0;

	const next = () => {
		index = (index + 1) % items.length;
	};

	const prev = () => {
		index = (index - 1 + items.length) % items.length;
	};
</script>

<div
	style={`--index: ${index}`}
	{...$$restProps}
	class={twMerge('inline-flex w-full gap-5 overflow-auto sm:overflow-hidden', $$restProps['class'])}
>
	{#each items as item, index}
		<div class="carousel transition-transform">
			<slot {item} {index} />
		</div>
	{/each}
</div>

<div class="hidden sm:block">
	{#if items.length > 1}
		<div class="mt-2 flex justify-between md:text-lg">
			<button
				class={twMerge(
					'rounded-md border-2 border-light-100 bg-dark-300 px-4 py-2 transition-colors hover:border-light-200',
					buttonClass
				)}
				on:click={prev}
			>
				Forrige
			</button>
			<button
				class={twMerge(
					'rounded-md border-2 border-light-100 bg-dark-300 px-4 py-2 transition-colors hover:border-light-200',
					buttonClass
				)}
				on:click={next}
			>
				Neste
			</button>
		</div>
	{/if}
</div>

<style>
	.carousel {
		transform: translateX(calc((-100% - 20px) * var(--index)));
	}
</style>
