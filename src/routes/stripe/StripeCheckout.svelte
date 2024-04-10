<!-- http://localhost:5173/stripe?answer_2=0.3hr&invitee_full_name=jew&invitee_email=jonag@pm.me&event_type_name=classico&answer_1=joe@blow.com&answer_3=true -->

<!-- http://localhost:4173/stripe?answer_2=0.3hr&invitee_full_name=jew&invitee_email=jonag@pm.me&event_type_name=classico&answer_1=joe@blow.com&answer_3=true -->

<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { dev } from '$app/environment';

	let { stripeCheckoutUrl, sessionName } = $derived($page.data);
	let showElement = $derived($page.url.pathname.includes('/plans') && stripeCheckoutUrl && dev);
	// dev at end makes this a boolean

	// // this component gets data from '/plans/+page.server.ts'
	// $: ({ stripeCheckoutUrl, sessionName } = $page.data);

	// // currently want this component to work in development .. idea not complete
	// $: showElement = dev && $page.url.pathname.includes('/plans') && stripeCheckoutUrl;
	// // $: showElement =  $page.url.pathname.includes('/plans') && stripeCheckoutUrl;
	// // $: showElement = stripeCheckoutUrl;
</script>

{#if showElement}
	<!-- animate-bounce -->
	<div class="topRightCornerPage z-50 grid h-44 w-44 scale-[1.5] place-content-center">
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
			<span> Checkout for {sessionName} </span>
		</a>
	</div>
{/if}

<!-- <style lang="postcss">
	.topRightCornerPage {
		@apply relative right-20 top-20 z-50;
	}
</style> -->
