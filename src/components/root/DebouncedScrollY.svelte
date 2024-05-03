<!-- this logic could've been js module, but <svelte:window> does auto cleanup   -->
<script context="module" lang="ts">
	import { debounce } from '@/utils/';

	let debouncedScrollY = $state(0);
	export const getDebouncedScrollY = () => debouncedScrollY;
</script>

<svelte:window onscroll={debounce(() => (debouncedScrollY = window.scrollY), 40)} />
