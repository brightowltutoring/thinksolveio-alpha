<script>
	import IconTwitter from '@/components/Icons/LoginIcons/IconTwitter.svelte';
	import { isDarkMode } from '@/shared/clientStore';
	import { TwitterLogin } from './TwitterLogin';
</script>

<button
	onclick={TwitterLogin}
	class="group rounded-md bg-[#1d9bf0] p-4 duration-200 hover:scale-[1.01] hover:shadow-md {$isDarkMode
		? 'group-hover:bg-opacity-90'
		: 'group-hover:bg-opacity-90'} flex w-full items-center justify-center gap-5 text-white"
>
	<span class="duration-500 group-hover:scale-[1.15]">
		<IconTwitter />
	</span>
	<!-- <span class="font-bold">Sign-in with Twitter</span> -->
	<span>Sign-in with Twitter</span>
</button>
