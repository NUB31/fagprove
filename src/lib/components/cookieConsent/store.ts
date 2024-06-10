import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { Consent } from '$lib/types/Consent';
import { LocalStorage } from '$lib/global/localStorage';

function createCookieConsentStore() {
	let consent: Consent = {
		functional: true,
		dismissed: false
	};

	if (browser) {
		const stored = localStorage.getItem(LocalStorage.cookie_consent);
		if (stored) {
			consent = JSON.parse(stored) as Consent;
		}
	}

	const { subscribe, update } = writable(consent);

	return {
		subscribe,
		set: (value: Consent) => {
			update(() => value);
			localStorage.setItem(LocalStorage.cookie_consent, JSON.stringify(value));
		}
	};
}

export const cookieConsent = createCookieConsentStore();
