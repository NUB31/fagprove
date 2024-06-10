<script lang="ts">
	import type { UsersResponse } from '$lib/pocketbase/generated/pocketbase-types';
	import { pb } from '$lib/pocketbase/pb';
	import { twMerge } from 'tailwind-merge';
	import Face from '~icons/ic/round-face';

	export let user: UsersResponse | null = null;
</script>

<div class={twMerge('overflow-hidden rounded-full aspect-square', $$restProps['class'])}>
	{#if user && user.avatar}
		<img
			{...$$restProps}
			src={pb.files.getUrl(user, user.avatar, { thumb: '256x256' })}
			alt="avatar"
			class="h-full object-cover"
		/>
	{:else}
		<Face class="h-full" font-size={20} />
	{/if}
</div>
