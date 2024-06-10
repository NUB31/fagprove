<script lang="ts" generics="T">
	import { onMount } from 'svelte';
	import { getListboxContext, type ListboxItemAbstract } from './context';
	import { twMerge } from 'tailwind-merge';

	export let item: T;
	export let onClick: (e: MouseEvent, item: ListboxItemAbstract<T>) => void;
	export let onKeyDown: (e: KeyboardEvent, item: ListboxItemAbstract<T>) => void;

	const id: string = `listbox-item-${
		crypto.randomUUID
			? crypto.randomUUID()
			: Math.floor(Date.now() * Math.random() * 100).toString()
	}`;

	const itemAbstract: ListboxItemAbstract<T> = { id: id, item: item };

	let {
		selectedItems: selectedItems,
		registerItem: register,
		unregisterItem: unregister,
		focusedItem: focusedItem
	} = getListboxContext<T>();

	onMount(() => {
		register(itemAbstract);

		return () => {
			unregister(itemAbstract);
		};
	});
</script>

<li
	{id}
	role="option"
	aria-selected={$selectedItems.includes(itemAbstract)}
	on:click={(e) => onClick(e, itemAbstract)}
	on:keydown={(e) => onKeyDown(e, itemAbstract)}
	tabindex={$focusedItem && $focusedItem === itemAbstract ? 0 : -1}
	class={twMerge(
		`shrink-0 cursor-pointer overflow-hidden rounded-md border-2 border-light-200 bg-light-50 p-2 opacity-80 transition-colors hover:border-light-500 hover:bg-light-200 ${
			$selectedItems.includes(itemAbstract) ? 'border-light-300 bg-light-200 opacity-100' : ''
		}`,
		$$restProps['class']
	)}
>
	<slot />
</li>
