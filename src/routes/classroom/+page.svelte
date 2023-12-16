<script lang="ts">
	import JitsiUser from './JitsiUser.svelte';
	let { isAdmin = false } = $props<{ isAdmin: boolean }>();

	// disableScrollingOnPage($page.url.pathname);

	// onMount(() => {
	// 	document.documentElement.classList.add('classroom');
	// 	return () => document.documentElement.classList.remove('classroom');
	// });
</script>

<JitsiUser {isAdmin} />

<dummy-element />

<!-- Used to be: :global(html.dark-mode):has(dummy-element) {   -->
<style>
	:global(html.dark-mode:has(dummy-element)) {
		--bg-color: black;
	}
</style>
