<script lang="ts">
	import DamSon from '@/components/DamSon.svelte';
	import JitsiUser from './JitsiUser.svelte';
	let { isAdmin = false }: { isAdmin: boolean } = $props();
</script>

<DamSon />

<JitsiUser {isAdmin} />

<dummy-element />

<style>
	:global(html.dark:has(dummy-element)) {
		--bg-color: black;
	}
</style>
