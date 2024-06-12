<script lang="ts">
	import { browser } from '$app/environment';
	import { Routes } from '$lib/global/routes';
	import ArrowLeft from '~icons/ic/round-arrow-left';
	import ArrowRight from '~icons/ic/round-arrow-right';
	import SidebarLink from './SidebarLink.svelte';
	import Home from '~icons/ic/round-home';
	import Idea from '~icons/ic/round-spoke';

	let sidebarOpen = browser ? document.body.clientWidth > 850 : true;
</script>

<aside
	class={`sidebar relative z-10 flex flex-col gap-4 bg-light-50 pb-2 transition-all ${
		sidebarOpen ? 'px-4' : 'items-center px-2'
	}`}
	style={`${!sidebarOpen ? '--sidebar-width: 4rem' : ''}`}
>
	<header style="width: var(--sidebar-width);" class:hidden={!sidebarOpen}>
		<a href={Routes.home}>
			<img src="https://placehold.co/600x300" alt="logo" />
		</a>
	</header>
	<nav class="flex-1 overflow-auto">
		<ul class="flex flex-col gap-2">
			<li>
				<SidebarLink title="Home" expanded={sidebarOpen} href={Routes.home} icon={Home} />
			</li>
			<li>
				<SidebarLink title="Ideas" expanded={sidebarOpen} href={Routes.ideas} icon={Idea} />
			</li>
		</ul>
	</nav>
	<div>
		<button
			class="cursor-pointer rounded-full border-none bg-transparent p-2 transition-colors hover:bg-light-200"
			on:click={() => (sidebarOpen = !sidebarOpen)}
		>
			{#if sidebarOpen}
				<ArrowLeft font-size={24} />
			{:else}
				<ArrowRight font-size={24} />
			{/if}
		</button>
	</div>
</aside>

<style lang="postcss">
	.sidebar::after {
		--_corner-size: 15px;

		content: '';
		width: var(--_corner-size);
		aspect-ratio: 1;
		position: absolute;
		right: 0;
		top: 0;
		transform: translate(100%);
		border-top-left-radius: 99999px;
		box-shadow: calc(var(--_corner-size) / 5 * -1) calc(var(--_corner-size) / 5 * -1) 0
			calc(var(--_corner-size) / 5) var(--clr-light-50);
		filter: drop-shadow(var(--shadow-md));
		z-index: -1;
	}
</style>
