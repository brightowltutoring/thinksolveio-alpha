<script lang="ts">
	import NavIconSvg from './NavIconSVG.svelte';
	export let navIconClicked: boolean;
</script>

<NavIconSvg
	size={20}
	{navIconClicked}
	extraTW={'scale-[1.2]'}
	fillColor={'!fill-rose-400 dark:!fill-blue-400'}
>
	<path d="M14 10L8 5v3H1v4h7v3l6-5zm3 7H9v2h8c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2H9v2h8v14z" />
</NavIconSvg>
