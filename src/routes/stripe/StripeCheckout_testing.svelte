<!-- http://localhost:5173/stripe?answer_2=0.3hr&invitee_full_name=jew&invitee_email=jonag@pm.me&event_type_name=classico&answer_1=joe@blow.com&answer_3=true -->

<!-- http://localhost:4173/stripe?answer_2=0.3hr&invitee_full_name=jew&invitee_email=jonag@pm.me&event_type_name=classico&answer_1=joe@blow.com&answer_3=true -->

<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { dev } from '$app/environment';

	// don't need to wrap in derived: $derived($page.data);
	let { stripeCheckoutUrl, sessionName, incomplete_stripe_checkout } = $page.data;

	// console.log('incomplete_stripe_checkout ', incomplete_stripe_checkout);
	// TODO: why doesnt this work?
	// let showElement = $derived(stripeCheckoutUrl && incomplete_stripe_checkout == 'true' && dev);

	// $inspect($page.url.pathname.includes('/plans'), incomplete_stripe_checkout, dev);
	let showElement = $derived($page.url.pathname.includes('/plans') && stripeCheckoutUrl && dev);
</script>

{#if showElement}
	<div class="topRightCornerPage">
		<!-- in:scale|global={{ duration: 1000, easing: elasticOut }} -->
		<a href={stripeCheckoutUrl} class="relative cursor-pointer rounded-md bg-teal-500 p-5">
			<form
				class="absolute -right-1 -top-1 flex h-5 w-5 place-items-center justify-center rounded-full bg-rose-300 p-1"
				method="POST"
				use:enhance
			>
				<!-- in:scale|global={{ delay: 300, duration: 1000, easing: elasticOut }} -->
				<button class=" text-black" formaction="?/deleteSession">𝕏</button>
			</form>
			<span> Finish checkout ({sessionName})</span>
		</a>
	</div>
{/if}

<style lang="postcss">
	.topRightCornerPage {
		@apply absolute left-20 right-20 top-20 z-50 grid scale-105 place-content-center p-5 backdrop-blur-lg;
	}
</style>
