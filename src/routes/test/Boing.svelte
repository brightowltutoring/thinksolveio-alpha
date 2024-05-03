<script>
	import { scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
</script>

<div in:scale={{ duration: 1000, easing: elasticOut }}>child</div>
