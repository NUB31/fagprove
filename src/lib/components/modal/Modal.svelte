<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Card from '../card/Card.svelte';

	export const toggle = () => {
		if (visible) {
			close();
		} else {
			show();
		}
	};

	export const show = () => {
		modalRef.showModal();
		onShow();
		visible = true;
	};

	export const close = () => {
		modalRef.close();
		onClose();
		visible = false;
	};

	export let onShow = () => {};
	export let onClose = () => {};

	let visible = false;

	let modalRef: HTMLDialogElement;
</script>

<dialog
	bind:this={modalRef}
	on:close={() => (visible = false)}
	class={twMerge(`fixed inset-0 z-40 flex bg-transparent`, visible ? '' : 'hidden')}
>
	<Card
		{...$$restProps}
		class={twMerge(
			'flex max-h-[calc(100vh-16rem)] flex-col rounded-lg border-light-200 p-6',
			$$restProps['class']
		)}
	>
		{#if $$slots['header']}
			<div>
				<h1 class="grow text-2xl font-semibold">
					<slot name="header" />
				</h1>
			</div>

			<hr class="my-2 border dark:border-light-200" />
		{/if}

		<div class="grow overflow-auto">
			<slot />
		</div>

		{#if $$slots['footer']}
			<div class="mt-4 flex justify-end gap-4">
				<slot name="footer" />
			</div>
		{/if}
	</Card>
</dialog>
