<script lang="ts" generics="T">
	import ListboxItem from './ListboxItem.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { setListboxContext, type ListboxItemAbstract } from './context';
	import { twMerge } from 'tailwind-merge';

	/** @description Determine if multiple items can be selected */
	export let allowMultiple = true;

	/** @description Determine if multiple items can be selected */
	export let items: T[];

	/** @description Determine if multiple items can be selected */
	export let defaultSelectedItems: T[] = [];

	/** @description Function called when the selected items changes */
	export let onChange: (items: T[]) => void = () => {};

	let selectedItems: Writable<ListboxItemAbstract<T>[]> = writable([]);
	let registeredItems: Writable<ListboxItemAbstract<T>[]> = writable([]);
	let focusedItem: Writable<ListboxItemAbstract<T> | null> = writable(null);

	function toggleItemSelected(item: ListboxItemAbstract<T>): void {
		if (item) {
			setFocus(item);
			if ($selectedItems.includes(item)) {
				if (allowMultiple) {
					$selectedItems = $selectedItems.filter((x) => x !== item);
				} else {
					$selectedItems = [];
				}
			} else {
				if (allowMultiple) {
					$selectedItems.push(item);
					$selectedItems = $selectedItems;
				} else {
					$selectedItems = [item];
				}
			}
		}

		onChange($selectedItems.map((x) => x.item));
	}

	function setFocus(item: ListboxItemAbstract<T>) {
		const itemEl = document.getElementById(item.id);
		$focusedItem = item;
		itemEl?.focus();
	}

	function onKeyDown(e: KeyboardEvent, item: ListboxItemAbstract<T>) {
		const index = $registeredItems.findIndex((x) => x === item);
		if (index === -1) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if ($registeredItems.length - 1 === index) {
					setFocus($registeredItems[0]);
				} else {
					setFocus($registeredItems[index + 1]);
				}
				break;
			case 'ArrowUp':
				e.preventDefault();
				if (index === 0) {
					setFocus($registeredItems[$registeredItems.length - 1]);
				} else {
					setFocus($registeredItems[index - 1]);
				}
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				toggleItemSelected(item);
				break;
			case 'Home':
				setFocus($registeredItems[0]);
				break;
			case 'End':
				setFocus($registeredItems[$registeredItems.length - 1]);
				break;
		}
	}

	function registerItem(item: ListboxItemAbstract<T>): void {
		$registeredItems.push(item);
		$registeredItems = $registeredItems;
		if (defaultSelectedItems.includes(item.item)) {
			$selectedItems.push(item);
			$selectedItems = $selectedItems;
		}
		if ($registeredItems.length === 1) {
			$focusedItem = $registeredItems[0];
		}
	}

	function unregisterItem(item: ListboxItemAbstract<T>): void {
		$registeredItems = $registeredItems.filter((x) => x.id !== item.id);
		$selectedItems = $selectedItems.filter((x) => x.id !== item.id);
	}

	setListboxContext<T>({
		registerItem: registerItem,
		unregisterItem: unregisterItem,
		selectedItems: selectedItems,
		focusedItem: focusedItem
	});
</script>

<ul
	class={twMerge('flex flex-col gap-2', $$restProps['class'])}
	role="listbox"
	aria-activedescendant={$focusedItem?.id}
	aria-multiselectable={allowMultiple}
	tabindex={0}
>
	{#each items as item}
		<ListboxItem {onKeyDown} onClick={(e, x) => toggleItemSelected(x)} {item}>
			<slot {item} />
		</ListboxItem>
	{/each}
</ul>
