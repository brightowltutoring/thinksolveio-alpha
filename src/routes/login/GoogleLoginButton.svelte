<script lang="ts">
	import { LoginButton } from './';
	import { IconGoogle } from '@/components/icons';
	import { googleLogin } from './googleLogin';
</script>

<LoginButton
	onclick={googleLogin}
	innerText={'Sign-in with Google'}
	bgColorTW={'bg-[#4285f4]'}
	icon={IconGoogle}
/>
