<!-- This code has two streams: either does things the vanilla way or the component-slot way -->
<script lang="ts">
	import { onMount } from 'svelte';
	let container: HTMLElement; // refers to container div of the <slot/>-component (i.e. when not using vanilla approach)

	export let vanilla: boolean | string = false; // IF doing intersection observer the vanilla javascript way, user specifies this parameter as the querySelectee ... i.e. vanilla = {'#someId'}
	// TODO: is the declaration of vanilla enough for queryselector to function.. i.e. without specifying value?

	export let once = false; // existence prop; when declared, observation happens once per 'element'
	export let onview = (target: Element) => console.log('i ❤️ slots'); // action taken when 'element' comes "into view"

	export let single = false; // existence prop; when declared the observation is done on the first child of <slot/>, rather than the div container of <slot/>, ... useful when modifying a single wrapped element

	export let root = null;
	export let threshold = 0;
	export let margin = '0px';

	const options = { root, threshold, rootMargin: margin };

	function handleIntersect(ENTRIES: IntersectionObserverEntry[], OBSERVER: IntersectionObserver) {
		// for loop is needed when defaulting to vanilla behaviour (see onMount choices below)
		for (const entry of ENTRIES) {
			if (entry.isIntersecting) {
				onview(entry.target); // pass element as an argument in case we need to modify element itself
				once && OBSERVER.unobserve(entry.target);
			}
		}
	}

	onMount(() => {
		const observer = new IntersectionObserver(handleIntersect, options);

		if (!vanilla && !single) observer.observe(container);
		// when viewing wrapped element(s)

		if (!vanilla && single) observer.observe(container.children[0]);
		// when viewing and modifying single wrapped element

		if (vanilla) document.querySelectorAll('vanilla').forEach((el) => observer.observe(el));
		// when vanilla javascript is needed ... such as when using external libraries/javascript
	});
</script>

{#if !vanilla}
	<div bind:this={container}>
		<slot />
	</div>
{/if}
