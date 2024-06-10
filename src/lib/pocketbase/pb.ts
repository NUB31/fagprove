import PocketBase, { ClientResponseError } from 'pocketbase';
import type { TypedPocketBase, UsersResponse } from './generated/pocketbase-types';
import { env } from '$env/dynamic/public';
import { writable } from 'svelte/store';

export const pb = new PocketBase(env.PUBLIC_PB_URL) as TypedPocketBase;

export const user = writable(pb.authStore.model as UsersResponse | null);

pb.authStore.onChange((_, authModel) => {
	user.set(authModel as UsersResponse);
});

export function unboxError(e: unknown): {
	message: string;
	status: number;
} {
	if (e instanceof ClientResponseError) {
		if ('data' in e.data) {
			let message = '';
			for (const [key, value] of Object.entries(e.data.data)) {
				if (typeof value == 'object' && value && 'message' in value) {
					message += `${key}: ${value.message}\n`;
				}
			}

			if (message) {
				return {
					message: message,
					status: e.status
				};
			}
		}

		return {
			message: e.message,
			status: e.status
		};
	}

	if (e instanceof Error) {
		return {
			message: e.message,
			status: 500
		};
	}

	return {
		message: e?.toString() ?? 'An error occurred',
		status: 500
	};
}
