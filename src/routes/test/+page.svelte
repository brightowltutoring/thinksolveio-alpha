<!-- <svelte:head> -->
<!-- 	<script -->
<!-- 		src="https://8x8.vc/vpaas-magic-cookie-7418e57a81e64cc399b2d0620579a5bd/external_api.js" -->
<!-- 		async -->
<!-- 	></script> -->
<!-- 	<style> -->
<!-- 		html, -->
<!-- 		body, -->
<!-- 		#jaas-container { -->
<!-- 			height: 100vh; -->
<!-- 		} -->
<!-- 	</style> -->
<!-- 	<script type="text/javascript"> -->
<!-- 		window.onload = () => { -->
<!-- 			const api = new JitsiMeetExternalAPI('8x8.vc', { -->
<!-- 				roomName: -->
<!-- 					'vpaas-magic-cookie-7418e57a81e64cc399b2d0620579a5bd/SampleAppVisualSetUpsBlastDangerously', -->
<!-- 				parentNode: document.querySelector('#jaas-container') -->
<!-- 			}); -->
<!-- 		}; -->
<!-- 	</script> -->
<!-- </svelte:head> -->
<!---->
<!-- <div id="jaas-container" /> -->

<iframe
	allow="camera; microphone; display-capture"
	src="https://meet.jit.si/yourmeetingname"
	allowfullscreen
	style="height: 400px; width: 100%; border: 0px;"
></iframe>

<!-- EXAMPLE 1: broken from alpha 111 -->
<!-- <script lang="ts">
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
<!--
<script lang="ts">
	/* VERSION 1 SUBTRACTING ARRAYS */
	const A = [true, false, 1, 2, 3, true];
	const B = [true, false];

	let bIndex = 0;

	// let diff = [];
	// for (let a of A) {
	// 	let found = false;
	// 	for (let i = bIndex; i < B.length; i++) {
	// 		if (a === B[i]) {
	// 			found = true;
	// 			bIndex = i + 1;
	// 			break;
	// 		}
	// 	}
	// 	if (!found) {
	// 		diff.push(a);
	// 	}
	// }

	const diff = A.filter((a) => {
		for (let i = bIndex; i < B.length; i++) {
			if (a === B[i]) {
				bIndex = i + 1;
				return false;
			}
		}
		return true;
	});

	console.log(diff);

	/* VERSION 2 SUBTRACTING ARRAYS*/
	// const A = [true, false, 1, 2, 3, true];
	// const B = [true, false];

	// const countA = A.reduce((acc, el) => {
	// 	acc[el] = (acc[el] || 0) + 1;
	// 	return acc;
	// }, {});

	// const countB = B.reduce((acc, el) => {
	// 	acc[el] = (acc[el] || 0) + 1;
	// 	return acc;
	// }, {});

	// let diff = [];

	// for (let key in countA) {
	// 	if (countA[key] - (countB[key] || 0) > 0) {
	// 		// diff.push(eval(key)); // eval is considered unsafe
	// 		diff.push(A.find((el) => String(el) === key));
	// 	}
	// }

	// console.log(diff);

	/* VERSION 2 SUBTRACTING ARRAYS */
	// const A = [true, false, 1, 2, 3, true];
	// const B = [true, false];

	// const BB = [...B];

	// let indices = [];

	// for (let i in A) {
	// 	if (BB[0] === A[i] && !indices.includes(i)) {
	// 		BB.shift();
	// 		indices.push(i);
	// 	}
	// }

	// let diff = A.filter((_, i) => {
	// 	return !indices.includes(String(i));
	// });

	// console.log(diff);

	// function getCountObj(arr: any[]) {
	// 	return arr.reduce((acc, el) => {
	// 		acc[el] = (acc[el] || 0) + 1;
	// 		return acc;
	// 	}, {});
	// }

	// const countA = getCountObj(A);
	// const countB = getCountObj(B);

	// console.log(countA);
	// console.log(countB);
</script> -->
<!-- <script lang="ts">
	import type { Snippet } from 'svelte';
	type Props = { children: Snippet; flex: boolean };
	// let props = $props<{ children: Snippet; flex: boolean }>();
	// let props = $props<Props>();
	let props: Props = $props();

	// props.
</script>

<div class="column" class:props.flex>
	{@render props.children()}
</div> -->
