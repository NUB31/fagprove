import PocketBase from 'pocketbase';
import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import type { TypedPocketBase } from '$lib/pocketbase/generated/pocketbase-types';

export const pb_service_account = new PocketBase(publicEnv.PUBLIC_PB_URL) as TypedPocketBase;

await pb_service_account.admins.authWithPassword(
	privateEnv.PRIVATE_PB_SERVICE_ACCOUNT_USERNAME,
	privateEnv.PRIVATE_PB_SERVICE_ACCOUNT_PASSWORD
);
