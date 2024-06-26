<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Send from '~icons/ic/round-send';
	import { toast } from '$lib/components/toast/toast';
	import { pb, unboxError } from '$lib/pocketbase/pb';
	import type {
		CommentsResponse,
		IdeasResponse,
		UsersResponse
	} from '$lib/pocketbase/generated/pocketbase-types';
	import { sanitize } from 'isomorphic-dompurify';
	import Quill from '$lib/components/editor/Quill.svelte';
	import AuthorizedView from '$lib/components/authorizedView/AuthorizedView.svelte';

	let comment: string;
	let loading = false;
	let files: FileList | undefined;

	export let idea: IdeasResponse;
	export let respondingTo: CommentsResponse | null;

	async function addComment(user: UsersResponse) {
		loading = true;

		try {
			const fd = new FormData();
			fd.append('body', comment);
			fd.append('idea', idea.id);
			fd.append('created_by', user.id);
			if (respondingTo) {
				fd.append('responding_to', respondingTo.id);
			}
			if (files) {
				for (let file of files) {
					fd.append('attachments', file);
				}
			}

			await pb.collection('comments').create(fd);

			comment = '';
			files = undefined;
			toast.success();
		} catch (e) {
			toast.error(unboxError(e).message);
		} finally {
			loading = false;
		}
	}
</script>

<AuthorizedView>
	<div slot="authorized" let:user>
		<h3 class="mt-4 font-semibold text-lg">Add a comment</h3>
		{#if respondingTo}
			<button on:click={() => (respondingTo = null)} class="text-dark-500 text-left">
				Responding to:
				<div class="italic hover:line-through max-w-96 truncate">
					{@html sanitize(respondingTo.body)}
				</div>
			</button>
		{/if}
		<Quill bind:html={comment} placeholder="Add a comment" />
		<input class="mt-2" type="file" bind:files multiple={true} />
		<div class="flex justify-end mt-2">
			<Button
				icon={Send}
				{loading}
				on:click={() => addComment(user)}
				class="bg-accent-400 border-accent-800 hover:bg-accent-600 text-white">Send</Button
			>
		</div>
	</div>
</AuthorizedView>
