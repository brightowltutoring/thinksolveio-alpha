<script lang="ts">
	import DamSon from '@/components/DamSon.svelte';
	import JitsiUser from './JitsiUser.svelte';
	let { isAdmin = false } = $props<{ isAdmin: boolean }>();
</script>

<DamSon />

<JitsiUser {isAdmin} />

<dummy-element />

<style>
	:global(html.dark-mode:has(dummy-element)) {
		--bg-color: black;
	}
</style>
