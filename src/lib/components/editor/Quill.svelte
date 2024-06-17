<script lang="ts">
	import { onMount } from 'svelte';
	import type Quill from 'quill';
	import { twMerge } from 'tailwind-merge';

	export let placeholder: string = '';
	export let text: string = '';
	export let html: string;

	let editor: HTMLDivElement;
	let quill: Quill;

	onMount(async () => {
		const { default: Quill } = await import('quill');

		quill = new Quill(editor, {
			modules: {
				toolbar: '#toolbar'
			},
			theme: 'snow',
			placeholder: placeholder
		});

		quill.setText(html);

		quill.on('text-change', () => {
			text = quill.getText();
			html = quill.getSemanticHTML();
		});
	});
</script>

<div
	{...$$restProps}
	class={twMerge('rounded-md overflow-hidden border-2 border-dark-200', $$restProps['class'])}
>
	<div id="toolbar">
		<select class="ql-font" />

		<button class="ql-header" value="1" />
		<button class="ql-header" value="2" />
		<button class="ql-header" value="3" />

		<select class="ql-color" />
		<select class="ql-background" />

		<button class="ql-link" />
		<button class="ql-image" />
		<button class="ql-video" />
		<button class="ql-formula" />

		<button class="ql-bold" />
		<button class="ql-italic" />
		<button class="ql-script" value="sub" />
		<button class="ql-script" value="super" />
		<button class="ql-code-block" />
		<button class="ql-indent" value="-1" />
		<button class="ql-indent" value="+1" />

		<button class="ql-list" value="ordered" />

		<select class="ql-align" />

		<button class="ql-clean" />

		<slot name="toolbar" />
	</div>

	<div bind:this={editor} />
</div>

<style>
	@import 'https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css';

	:global(.ql-editor, .ql-toolbar) {
		background-color: white;
		color: black;
	}

	:global(.ql-editor) {
		min-height: 200px;
	}
</style>
