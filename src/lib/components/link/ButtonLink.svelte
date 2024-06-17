<script lang="ts">
	import { page } from '$app/stores';
	import { twMerge } from 'tailwind-merge';

	export let href: string;
	export let match = false;
	export let matchClass: string = '';
</script>

<a
	{href}
	{...$$restProps}
	on:click
	class={twMerge(
		'block rounded-md border-2 border-light-200 bg-light-100 px-4 py-1 text-center transition-colors hover:bg-light-200 hover:no-underline',
		$$restProps['class'],
		match && $page.route.id == href
			? twMerge('bg-light-300 border-light-400 hover:bg-light-400', matchClass)
			: null
	)}
>
	<slot />
</a>
