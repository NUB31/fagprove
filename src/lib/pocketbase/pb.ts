import PocketBase, { ClientResponseError } from 'pocketbase';
import type {
	PermissionsResponse,
	TypedPocketBase,
	UsersResponse
} from './generated/pocketbase-types';
import { env } from '$env/dynamic/public';
import { writable } from 'svelte/store';

type ExpandPermissions = {
	permission: PermissionsResponse[];
};

export const pb = new PocketBase(env.PUBLIC_PB_URL) as TypedPocketBase;

export const user = writable(pb.authStore.model as UsersResponse | null);

async function refreshRoles(authModel: UsersResponse) {
	const uwp = await pb
		.collection('users')
		.getOne<UsersResponse<ExpandPermissions>>(authModel.model.id, {
			expand: 'permissions'
		});

	if (uwp.expand) {
		const permissions = uwp.expand.permission;
		console.log(permissions);
	}
}

pb.authStore.onChange(async (_, authModel) => {
	console.log('Auth state changed');
	user.set(authModel as UsersResponse);
	await refreshRoles(authModel);
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
