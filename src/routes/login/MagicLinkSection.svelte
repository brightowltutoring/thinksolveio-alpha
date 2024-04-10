<script lang="ts">
	import { IconEmail } from '$src/components/icons';
	import LoginButton from './LoginButton.svelte';
	import { emailInputValue$, magicLinkToEmail, regexEmailChecker } from './magicLinkLogin';
	import type { EmailType } from './magicLinkLogin';

	let magicLinkSent = false;
	// let emptyEmailInputAnimated:boolean;
	let emptyEmailInputAnimated = $state(false);

	// $:shortPing =!magicLinkSent && emptyEmailInputAnimated && 'animate-ping'
	let shortPing = $derived(!magicLinkSent && emptyEmailInputAnimated && 'animate-ping');

	// '$emailInputValue$' starts as undefined; showInputField starts as falsey
	let emailField: HTMLElement;
	let isEmail: boolean | undefined = false;
	let emailStatusMessage: HTMLElement;

	let emptyEmailInputAnimatedTimeout: NodeJS.Timeout;
	// let magicLinkInputVisible = globalThis.magicLinkInputVisible;

	function signinWithLinkAndStop(e: MouseEvent | KeyboardEvent) {
		// magicLinkInputVisible = globalThis.magicLinkInputVisible = true;

		if ($emailInputValue$ === undefined) emailInputValue$.set('');
		// if (!showInputField) emailInputValue$.set('');

		let clickOrEnterFired = (<MouseEvent>e).type === 'click' || (<KeyboardEvent>e).key === 'Enter';

		if (emptyEmailInputAnimatedTimeout) clearTimeout(emptyEmailInputAnimatedTimeout);
		if (clickOrEnterFired && $emailInputValue$ === '') {
			emptyEmailInputAnimated = true;
			let emptyEmailInputAnimatedTimeout = setTimeout(
				() => (emptyEmailInputAnimated = !emptyEmailInputAnimated),
				100
			);
		}
		if (clickOrEnterFired && isEmail) {
			magicLinkToEmail($emailInputValue$);
			magicLinkSent = true;
			// emailInputValue$ = '';
			emailInputValue$.set('');

			emailStatusMessage.style.display = 'block';

			emailStatusMessage.innerHTML = `
                  <div class="p-3 font-Poppins" style=" color: #10bb8a"> 
                      Link sent to email 🚀
                  </div>
                  `;

			emailField.style.opacity = '0.5';
			emailField.style.pointerEvents = 'none';
		}
	}

	function onInputEmailField(EMAIL: EmailType) {
		if (EMAIL === undefined) return;

		isEmail = regexEmailChecker(EMAIL);
		if (EMAIL == '') {
			emailField.style.border = '1px solid #aaa';
			emailField.style.color = '#aaa';
			emailField.style.fontSize = '16px';
		} else if (!isEmail) {
			emailField.style.border = '1.5px solid red';
			emailField.style.color = 'red';
			emailField.style.fontSize = '20px';
		} else if (isEmail) {
			emailField.style.border = '2px solid #59d0ae';
			emailField.style.backgroundColor = 'white';
			emailField.style.color = '#10bb8a'; // green-ish colour
		}
	}
</script>

<LoginButton
	onclick={(e) => signinWithLinkAndStop(e)}
	innerText={'Get Magic Link'}
	bgColorTW={'bg-emerald-500'}
	icon={IconEmail}
/>

{#if $emailInputValue$ !== undefined}
	<!-- {#if showInputField} -->
	<input
		on:keydown={signinWithLinkAndStop}
		on:paste={() => onInputEmailField($emailInputValue$)}
		on:keyup={() => onInputEmailField($emailInputValue$)}
		bind:this={emailField}
		class="mt-3 w-full p-3 text-center {shortPing} focus:outline-none"
		bind:value={$emailInputValue$}
		type="email"
		placeholder="email"
	/>
	<!-- bind:value={emailInputValue$} -->
{/if}

<span bind:this={emailStatusMessage} />
