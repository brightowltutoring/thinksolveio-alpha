<!-- EXAMPLE 1: broken from alpha 111 -->
<!-- <script lang="ts">
	import { version } from '$service-worker';
	const state = $state({
		currentTarget: '',
		target: ''
	});
	function onclick(e: MouseEvent) {
		state.currentTarget = (e.currentTarget as HTMLElement).id;
		state.target = (e.target as HTMLElement).id;
	}
</script>

<div role="button" tabindex="0" onkeydown={() => {}} id="parent" {onclick}>
	Click parent
	<div id="child">Click child</div>
</div>

<p>Target: {state.target}</p>
<p>CurrentTarget: {state.currentTarget}</p>

<style>
	#parent {
		border: 2px dashed #aaa;
		padding: 16px;
		cursor: pointer;
		&:hover {
			border-color: #29fc39;
		}
	}
	
	div {
		border: 2px dashed #aaa;
		padding: 8px;
		&:hover {
			border-color: #29fc39;
		}
	}
</style> -->

<!-- EXAMPLE 2; broken from alpha 82 -->
<!-- <script>
	import { fade, fly, scale } from 'svelte/transition';
	let show = $state(false);
</script>

<button onclick={() => (show = !show)}>show</button>
{#if show}
	<h1 in:fade={{ delay: 1000, duration: 1000 }}>Hello There!</h1>
{/if}
{#if show}
	<h1 in:fly={{ delay: 1000, duration: 1000, x: '-10%' }}>Hello There!</h1>
{/if}
{#if show}
	<h1 in:scale={{ delay: 1000, duration: 1000 }}>Hello There!</h1>
{/if} -->

<!-- Bug from alpha 97 with sveltekit! -->
<!-- <script>
	import { fade } from 'svelte/transition';
	import Transitions from './Transitions.svelte';
	let count = $state(0);
	const countEven = $derived(count % 2 === 0);

	function increment() {
		count += 1;
	}
</script>

<button onclick={increment}>
	clicks: {count}
</button>

{#if countEven}
	<div transition:fade|global={{ duration: 500 }}>from App.svelte component</div>
{/if}

{#if countEven}
	<Transitions />
{/if} -->

<!-- <script>
	import { scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import Boing from './Boing.svelte';
	let boing = $state(0);
</script>

<button onclick={() => boing++}> change boing </button>
{#key boing}
<div in:scale={{ duration: 1000, easing: elasticOut }}>parent</div>
<Boing />
{/key} -->

<!-- interface props fixes -->
<!-- <script>
	import Button from './Button.svelte';
	const onclick = () => console.log('zoink');
	
</script>

<Button {onclick}>Click Me!</Button> -->

<!-- <script>
	import Component from './ConsumerIncrementStore.svelte';
	import { writable } from 'svelte/store';

	let attrs = writable({ count: 10 });
</script>

<Component {attrs} increment={() => $attrs.count++}></Component> -->
