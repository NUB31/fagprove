<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '../button/Button.svelte';
	import Modal from '../modal/Modal.svelte';
	import { cookieConsent } from './store';
	import Cookie from '~icons/ic/round-cookie';

	let modal: Modal;

	onMount(() => {
		if (!$cookieConsent.dismissed) {
			modal.show();
		}
	});
</script>

<Modal bind:this={modal}>
	<svelte:fragment slot="header">This site uses cookies</svelte:fragment>
	<p>
		This site uses cookies for required functionality such as authorization, theming, language etc.
		<br />
		We do not conduct any form for tracking through cookies or fingerprinting.
	</p>

	<svelte:fragment slot="footer">
		<Button
			class="border-accent-700 bg-accent-400 px-3 py-1 text-light-50 text-white hover:bg-accent-600"
			on:click={() => {
				$cookieConsent.dismissed = true;
				modal.close();
			}}
		>
			Acknowledge
		</Button>
	</svelte:fragment>
</Modal>

<button
	on:click={() => {
		$cookieConsent.dismissed = false;
		modal.show();
	}}
	class="fixed inset-auto bottom-4 right-4 block aspect-square cursor-pointer rounded-full border-2 border-light-200 bg-light-100 p-1.5 transition-colors hover:bg-light-200"
>
	<Cookie font-size={20} />
</button>
