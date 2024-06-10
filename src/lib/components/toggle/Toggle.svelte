<script lang="ts">
	export let checked: boolean;

	export let leftIcon: string | null = null;
	export let rightIcon: string | null = null;

	export let invertColor = false;
</script>

<div class="flex items-center gap-1">
	{#if leftIcon}
		<img src={leftIcon} class={`h-6 ${invertColor && 'dark:invert'}`} alt="" />
	{/if}
	<label class="relative inline-flex cursor-pointer items-center">
		<input on:change {checked} type="checkbox" value="" class="peer sr-only" />
		<div
			class="peer-checked:bg-accent dark:peer-focus:ring-accent h-6 w-11 rounded-full border-2 border-light-100 outline-2 transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border-2 after:border-light-100 after:bg-light-900 after:transition-all after:content-[''] peer-checked:after:translate-x-full"
		/>
	</label>
	{#if rightIcon}
		<img src={rightIcon} class={`h-6 ${invertColor && 'dark:invert'}`} alt="" />
	{/if}
</div>
