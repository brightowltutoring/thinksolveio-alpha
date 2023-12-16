<!-- <script>
	import { page } from '$app/stores';

	// $: pageStatus = $page.status;
</script> -->

<!-- <h1>{$page.status}: {$page.error.message}</h1> -->

<!-- <svelte:head>
	{#if $page.status === 404}
		<title>Oops 💩</title>
	{/if}
</svelte:head> -->

<div class="flex flex-col items-center justify-center gap-10">
	<p>Oops ... looks like that page doesn't exist.</p>
	<div class="animate-bounce text-4xl">🙈</div>
</div>
