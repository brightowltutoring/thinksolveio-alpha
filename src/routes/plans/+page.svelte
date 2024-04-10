<script lang="ts">
	import PlansCard from './PlansCard.svelte';
	import { plansCards } from './plansCardStuff';
</script>

<plans-section class="mx-2 overflow-x-clip sm:overflow-visible lg:px-16">
	{#each plansCards as { buttonColor, payNowUrl, payLaterUrl, cardTitle, cardText }, i}
		<PlansCard index={i} {buttonColor} {payNowUrl} {payLaterUrl} {cardText} {cardTitle} />
	{/each}
</plans-section>

<style>
	/* grid gap-5 grid-cols-1  */
	/* sm:grid-cols-dynamic used to be custom extension in tailwind config */
	plans-section {
		display: grid;
		gap: 1.25rem;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	}
</style>
