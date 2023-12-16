<script lang="ts">
	import StripeCheckoutTesting from '$routes/stripe/StripeCheckout_testing.svelte';

	import PlansCard from './PlansCard.svelte';
	import { plansCards } from './plansCardStuff';
</script>

<StripeCheckoutTesting />

<plans-section
	class="mx-2 grid grid-cols-1 gap-5 overflow-x-clip sm:grid-cols-dynamic sm:overflow-visible lg:px-16"
>
	{#each plansCards as { buttonColor, payNowUrl, payLaterUrl, cardTitle, cardText }, i}
		<PlansCard index={i} {buttonColor} {payNowUrl} {payLaterUrl} {cardText} {cardTitle} />
	{/each}
</plans-section>
