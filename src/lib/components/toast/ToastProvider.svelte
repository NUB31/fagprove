<script lang="ts">
	import { toast, toasts } from '$lib/components/toast/toast';
	import { fade } from 'svelte/transition';
	import Close from '~icons/ic/round-close';
	import Info from '~icons/ic/round-info';
	import Warning from '~icons/ic/round-warning';
	import Error from '~icons/ic/round-error';
	import Success from '~icons/ic/round-check-circle';
</script>

{#if $toasts.length >= 1}
	<div class="fixed bottom-0 right-0 z-50 flex w-full flex-col gap-2 p-4 text-white sm:w-96">
		{#each $toasts as toastItem}
			<div
				class:bg-red-500={toastItem.type === 'error'}
				class:bg-green-500={toastItem.type === 'success'}
				class:bg-orange-500={toastItem.type === 'warning'}
				class:bg-blue-500={toastItem.type === 'info'}
				class:border-red-700={toastItem.type === 'error'}
				class:border-green-700={toastItem.type === 'success'}
				class:border-orange-700={toastItem.type === 'warning'}
				class:border-blue-700={toastItem.type === 'info'}
				class="flex items-center gap-3 rounded-md border-2 px-4 py-3 shadow-md"
				transition:fade={{ duration: 200 }}
			>
				<div
					class:text-red-900={toastItem.type === 'error'}
					class:text-green-900={toastItem.type === 'success'}
					class:text-orange-900={toastItem.type === 'warning'}
					class:text-blue-900={toastItem.type === 'info'}
					class="shrink-0"
				>
					{#if toastItem.type === 'info'}
						<Info font-size={26} />
					{:else if toastItem.type === 'warning'}
						<Warning font-size={26} />
					{:else if toastItem.type === 'error'}
						<Error font-size={26} />
					{:else if toastItem.type === 'success'}
						<Success font-size={26} />
					{/if}
				</div>

				<p class="grow">
					{toastItem.text}
				</p>

				<button on:click={() => toast.dismiss(toastItem.id)} class="shrink-0">
					<Close />
				</button>
			</div>
		{/each}
	</div>
{/if}
