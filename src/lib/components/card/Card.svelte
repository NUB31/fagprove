<script>
	import { twMerge } from 'tailwind-merge';
</script>

<div
	{...$$restProps}
	class={twMerge(
		'card flex flex-col gap-2 rounded-md border-2 border-light-200 bg-light-50 p-4',
		$$restProps['class']
	)}
>
	{#if $$slots['header']}
		<h3 class="text-xl font-semibold">
			<slot name="header" />
		</h3>
		<hr class="border-light-200" />
	{/if}
	<div class="grow">
		<slot />
	</div>
	{#if $$slots['footer']}
		<div class="mt-2">
			<slot name="footer" />
		</div>
	{/if}
</div>
