import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';

type ListboxContext<T> = {
	registerItem: (item: ListboxItemAbstract<T>) => void;
	unregisterItem: (item: ListboxItemAbstract<T>) => void;
	selectedItems: Writable<ListboxItemAbstract<T>[]>;
	focusedItem: Writable<ListboxItemAbstract<T> | null>;
};

export type ListboxItemAbstract<T> = {
	id: string;
	item: T;
};

export function setListboxContext<T>(context: ListboxContext<T>): void {
	setContext('listbox', context);
}

export function getListboxContext<T>(): ListboxContext<T> {
	return getContext('listbox') as ListboxContext<T>;
}
