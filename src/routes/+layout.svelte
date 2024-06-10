<script lang="ts">
	import '../app.css';
	import Topbar from './Topbar.svelte';
	import Sidebar from './Sidebar.svelte';
	import CookieConsent from '$lib/components/cookieConsent/CookieConsent.svelte';
	import ToastProvider from '$lib/components/toast/ToastProvider.svelte';
	import { onMount } from 'svelte';
	import { pb } from '$lib/pocketbase/pb';

	onMount(async () => {
		const list = await pb.collection('ideas').getFullList();
		console.log(list);
	});
</script>

<Topbar />

<div class="relative flex h-[calc(100%-var(--topbar-height))] overflow-hidden">
	<Sidebar />
	<main class="grow overflow-auto p-6">
		<slot />
	</main>
</div>

<CookieConsent />
<ToastProvider />
