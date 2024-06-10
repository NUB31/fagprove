<script generics="T" lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Button from '../button/Button.svelte';
	import { toast } from '../toast/toast';
	import { unboxError } from '$lib/pocketbase/pb';

	export let value: T;
	export let label: string | null = null;

	let loading = false;
	let disabled = false;
	let originalValue = value;
	let id = `input-${crypto.randomUUID()}`;

	$: {
		disabled = originalValue == value;
	}

	export let onConfirm: ((value: T) => Promise<void>) | null = null;

	async function onConfirmBase() {
		loading = true;

		try {
			if (onConfirm != null) {
				await onConfirm(value);
			}
			originalValue = value;
			toast.success();
		} catch (e) {
			toast.error(unboxError(e).message);
		} finally {
			loading = false;
		}
	}
</script>

<div class="flex flex-col gap-1 mb-4">
	<label for={id}>
		{label}
		{#if $$restProps['required'] && $$restProps['required'] == true}
			<span class="text-accent-400 font-semibold">*</span>
		{/if}
	</label>
	<div class="flex flex-row gap-2">
		<input
			{...$$restProps}
			{id}
			class={twMerge(
				'px-4 py-2 rounded-md bg-light-50 border-light-200 w-full',
				$$restProps['class']
			)}
			on:input
			bind:value
		/>

		{#if onConfirm != null}
			<Button {disabled} {loading} on:click={onConfirmBase}>Confirm</Button>
		{/if}
	</div>
</div>
