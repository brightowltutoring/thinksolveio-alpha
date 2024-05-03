<script>
	let { attrs, increment } = $props();
	const _increment = () => {
		// Doesnt work
		// $attrs.count++;

		// Works
		attrs.update(({ ...o }) => {
			o.count++;
			return o;
		});

		// Works (uses $attrs.count++ in parent)
		// increment()
	};
</script>

<button onclick={_increment}>
	clicks: {$attrs.count}
</button>
