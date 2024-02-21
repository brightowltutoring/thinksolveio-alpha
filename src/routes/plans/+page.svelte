<script lang="ts">
	import StripeCheckoutTesting from '$routes/stripe/StripeCheckout_testing.svelte';

	import PlansCard from './PlansCard.svelte';
	import { plansCards } from './plansCardStuff';
</script>

<!-- TODO: should this still be here? -->
<!-- <StripeCheckoutTesting /> -->

<!-- {#if $page.url.pathname === '/plans'}
	<iframe
		class="absolute z-50 h-full w-full"
		src="https://cal.com/thinksolveio/classico?month=2024-02&layout=month_view"
		title="calcom thinksolveio"
	>
	</iframe>
{/if} -->

<plans-section
	class="mx-2 grid grid-cols-1 gap-5 overflow-x-clip sm:grid-cols-dynamic sm:overflow-visible lg:px-16"
>
	{#each plansCards as { buttonColor, payNowUrl, payLaterUrl, cardTitle, cardText }, i}
		<PlansCard index={i} {buttonColor} {payNowUrl} {payLaterUrl} {cardText} {cardTitle} />
	{/each}
</plans-section>
