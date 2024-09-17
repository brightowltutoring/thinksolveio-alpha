<script lang="ts">
	import { onMount } from 'svelte';
	//import DamSon from '@/components/DamSon.svelte';
	//import JitsiUser from './JitsiUser.svelte';

	let { isAdmin = false } = $props();

	let google_meet_link = 'https://meet.google.com/grt-fevp-hcs';

	let redirect_timer = $state(2);

	onMount(() => {
		const interval_id = setInterval(() => {
			if (redirect_timer > 0) {
				redirect_timer--;
				return;
			}
			clearInterval(interval_id);
			window.location.href = google_meet_link;
		}, 1000);

		return () => clearInterval(interval_id);
	});
</script>

<noscript>
	<meta http-equiv="refresh" content="{redirect_timer}; URL={google_meet_link}" />
</noscript>

<a
	class="{redirect_timer === 0 &&
		'opacity-100'} duration-500- flex justify-end text-sm opacity-0 transition-opacity"
	href={google_meet_link}
>
	Click here if the page does not redirect
</a>
<div
	class="grid h-[30vh] place-items-center rounded-md text-center text-3xl hover:bg-gray-200/50 hover:dark:bg-gray-800"
>
	Redirecting to Google Meet Session: {redirect_timer}
</div>
<!-- <JitsiUser {isAdmin} /> -->

<!-- <dummy-element></dummy-element> -->

<!-- <style> -->
<!-- 	:global(html.dark:has(dummy-element)) { -->
<!-- 		--bg-color: black; -->
<!-- 	} -->
<!-- </style> -->
