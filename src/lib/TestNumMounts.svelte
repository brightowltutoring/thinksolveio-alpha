<script context="module" lang="ts">
	let mounted = 0;
	let unmounted = 0;
</script>

<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		mounted++;
		console.log('mounted', mounted, $page.route.id);
		return () => {
			unmounted++;
			console.log('unmounted', unmounted, $page.route.id);
		};
	});
</script>
