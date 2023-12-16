<script lang="ts">
	import LoginButton from './LoginButton.svelte';
	import IconGoogle from '$lib/Icons/LoginIcons/IconGoogle.svelte';
	import { GoogleLogin } from './GoogleLogin';
</script>

<LoginButton
	onclick={() => GoogleLogin()}
	innerText={'Sign-in with Google'}
	bgColorTW={'bg-[#4285f4]'}
	icon={IconGoogle}
/>
