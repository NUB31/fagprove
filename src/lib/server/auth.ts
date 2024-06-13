import PocketBase from 'pocketbase';
import { env as publicEnv } from '$env/dynamic/public';
import type { TypedPocketBase } from '$lib/pocketbase/generated/pocketbase-types';

export async function checkPbAuth(token: string) {
	const tmpPb = new PocketBase(publicEnv.PUBLIC_PB_URL) as TypedPocketBase;
	tmpPb.authStore.save(token, { verified: false });

	try {
		await tmpPb.collection('users').authRefresh();
		return true;
	} catch (e) {
		return false;
	}
}
