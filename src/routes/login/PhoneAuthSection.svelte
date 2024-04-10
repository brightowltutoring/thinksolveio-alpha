<script lang="ts">
	import { IconPhone } from '$src/components/icons';
	import LoginButton from './LoginButton.svelte';
	// import IconPhone from '$lib/Icons/LoginIcons/IconPhone.svelte';
	import {
		generateRecaptchaVerifier,
		regexPhoneChecker,
		sendCodeToPhone,
		verifySMSCode,
		phoneInputValue$,
		phoneCodeSent$,
		type phoneType
	} from './PhoneLogin';

	let smsCode: string;
	let countryCode = '+1';
	// $: phoneCodeSent = $phoneCodeSent$;
	// let phoneCodeSent = false;

	let emptyPhoneInputAnimated = false;
	$: shortPing = !$phoneCodeSent$ && emptyPhoneInputAnimated && 'animate-ping';
	// $: shortPing = !phoneCodeSent && emptyPhoneInputAnimated && 'animate-ping';

	let phoneField: HTMLElement;
	// let phoneStatusMessage: HTMLElement;
	let isPhoneNumber = false;
	$: phoneInputVisible = $phoneInputValue$ !== undefined;
	$: phoneFieldValue = $phoneInputValue$;

	$: phoneStatusMessage2 = ``;

	// $: formattedPhoneNumber = '';

	// $: if (is_client && $phoneCodeSent$) {
	// 	// phoneStatusMessage.style.display = 'block';
	// 	phoneStatusMessage.innerHTML = `Code sent to ${formattedPhoneNumber} `;

	// 	// phoneField.style.opacity = '0.5';
	// 	// phoneField.style.pointerEvents = 'none';
	// }

	async function submitPhoneNumber(e: MouseEvent | KeyboardEvent) {
		if (!phoneInputVisible) phoneInputValue$.set('');

		let clickOrEnterFired = (<MouseEvent>e).type == 'click' || (<KeyboardEvent>e).key == 'Enter';

		if (clickOrEnterFired && phoneFieldValue === '') {
			emptyPhoneInputAnimated = true;
			setTimeout(() => (emptyPhoneInputAnimated = !emptyPhoneInputAnimated), 100);
		}
		if (clickOrEnterFired && isPhoneNumber && phoneFieldValue !== undefined) {
			// phoneCodeSent = true;

			// formattedPhoneNumber = countryCode + phoneFieldValue.replace(/\D/g, '');
			let formattedPhoneNumber = countryCode + phoneFieldValue.replace(/\D/g, '');

			let recaptchaVerifier = await generateRecaptchaVerifier('recaptcha-container');
			sendCodeToPhone(formattedPhoneNumber, recaptchaVerifier);

			// phoneStatusMessage.style.display = 'block';
			// phoneStatusMessage.innerHTML = `Code sent to ${formattedPhoneNumber} `;

			phoneField.style.opacity = '0.5';
			phoneField.style.pointerEvents = 'none';

			phoneCodeSent$.set(true);
			phoneStatusMessage2 = `Code sent to ${formattedPhoneNumber} `;
		}
	}

	function onInputPhoneField(e: ClipboardEvent | KeyboardEvent, PHONE: phoneType) {
		if (PHONE === undefined) return;

		if (<ClipboardEvent>e || <KeyboardEvent>e) {
			isPhoneNumber = regexPhoneChecker(PHONE);
			if (PHONE == '') {
				phoneField.style.border = '1px solid #aaa';
				phoneField.style.color = '#aaa';
				phoneField.style.fontSize = '16px';
			} else if (!isPhoneNumber) {
				phoneField.style.border = '1.5px solid red';
				phoneField.style.color = 'red';
				phoneField.style.fontSize = '20px';
			} else if (isPhoneNumber) {
				phoneField.style.border = '2px solid #59d0ae';
				phoneField.style.backgroundColor = 'white';
				phoneField.style.color = '#10bb8a'; // green-ish colour
			}
		}
	}
</script>

<!-- {#if !phoneCodeSent} -->
{#if !$phoneCodeSent$}
	<LoginButton
		onclick={(e) => submitPhoneNumber(e)}
		innerText={'Get SMS Code'}
		bgColorTW={'bg-rose-400'}
		icon={IconPhone}
	/>

	<div class="grid w-full grid-cols-6 text-black">
		{#if phoneInputVisible}
			<input
				bind:value={countryCode}
				class="col-span-1 mt-3 border-r-2 p-3 text-center focus:outline-none"
			/>
			<input
				on:keydown={submitPhoneNumber}
				on:paste={(e) => onInputPhoneField(e, $phoneInputValue$)}
				on:keyup={(e) => onInputPhoneField(e, $phoneInputValue$)}
				bind:this={phoneField}
				class="col-span-5 mt-3 p-3 text-center focus:outline-none {shortPing}"
				bind:value={$phoneInputValue$}
				type="phone"
				placeholder="phone"
			/>
		{/if}
	</div>
{/if}

<!-- {#if phoneCodeSent} -->
{#if $phoneCodeSent$}
	<div class="grid grid-cols-3 pb-5">
		<input
			on:keyup={(e) => verifySMSCode(e, smsCode)}
			on:paste={(e) => verifySMSCode(e, smsCode)}
			bind:value={smsCode}
			class="col-span-3 mt-3 p-3 text-center text-black focus:outline-none"
			placeholder="enter sms code"
		/>
	</div>
{/if}

<div id="recaptcha-container" />

{#if phoneStatusMessage2}
	<div class="pt-3 font-Poppins text-rose-600 dark:text-lime-100">
		{phoneStatusMessage2}
	</div>
{/if}
<!-- <div
	bind:this={phoneStatusMessage}
	class="hidden p-3 font-Poppins text-rose-600 dark:text-lime-100"
/> -->
