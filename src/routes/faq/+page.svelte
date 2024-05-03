<script lang="ts">
	let { closemodal }: { closemodal: () => void } = $props();

	// import { modals } from '@/components/root/Navbar.svelte';
	import { modals } from '@/components/root/';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';

	let faqContainer: HTMLElement;
	onMount(() => {
		faqContainer.querySelectorAll('SUMMARY').forEach((el, index) => {
			el.insertAdjacentHTML('afterbegin', `Q${index + 1}. `);
		});

		// using 'event delegation'
		faqContainer.addEventListener('click', (event) => {
			let target = event.target as HTMLElement;
			if (target.tagName === 'A' || target.tagName === 'BUTTON') {
				// dispatch('closeFaqModal');
				closemodal();
			}
			if (target.tagName !== 'SUMMARY') return;

			highlightAndKeepOpen(target);
		});
	});

	let selectedTd: HTMLElement;
	function highlightAndKeepOpen(td: HTMLElement) {
		// remove the existing highlight if any
		if (selectedTd) selectedTd.classList.remove('highlight');

		selectedTd = td;

		// highlight the new td
		selectedTd.classList.add('highlight');

		// this disables closing the details element going forward
		(selectedTd.parentElement as HTMLDetailsElement).open = false;
	}

	function closeFaqs() {
		faqContainer.querySelectorAll('details').forEach((el) => (el.open = false));
	}

	const inFlyFAQ = {
		y: 50,
		duration: 800,
		easing: quintOut
	};
	const inFlyFAQContainer = { y: -50, duration: 500 };

	function openHomeworkModal() {
		// homeworkModalOpen.set(true);
		modals.open('homework');
	}
	function openLoginModal() {
		// loginModalOpen.set(true);
		modals.open('login');
	}
</script>

<!-- BROKEN MODAL in svelte5 -->
<main class="h-full overflow-scroll scrollbar-hide">
	<button ondblclick={closeFaqs} in:fly={inFlyFAQ} class="w-full py-16">
		<span in:fade class="font-Poppins text-5xl font-bold"> FAQ </span>
	</button>

	<div in:fly={inFlyFAQContainer} bind:this={faqContainer} class="grid place-content-center">
		<details>
			<!-- ?: I have to add 'highlight' class to at least one summary element before the css/js logic can work -->
			<summary class="highlight"> How are we screen-sharing? Zoom? </summary>

			Nope, our sessions happen on-site

			<a href="/classroom"> in the classroom</a>.
		</details>

		<details>
			<summary> Is it possible to access all my session content in one place? </summary>

			<!-- onclick={() => loginModalOpen.set(true)} -->
			<p>
				Sure can! Contact us directly to set up a personalized page, or check the option when
				booking! You will be <button class="text-rose-500" onclick={openLoginModal}
					>redirected to your personal page upon logging in
				</button>.
			</p>
		</details>

		<details>
			<summary> How do I share homework? </summary>

			<p>
				Click on "<button class="text-rose-500" onclick={openHomeworkModal}> Homework</button>" in
				the navbar and submit screenshots/ PDFs/ etc.
			</p>

			<p>
				For added convenience in future submissions, consider downloading the app on your mobile
				device. Using Safari on iOS devices:
			</p>
			<span class="flex flex-col items-center justify-center gap-x-2">
				<span class="flex flex-row gap-x-1">
					Click share icon
					<img class="h-5 w-5" src="/safari-share-icon.png" alt="safari share icon" />
				</span>

				<span> Click "Add to Homescreen"</span>
			</span>
			<p>
				Using Chrome on Android devices, you should be prompted automatically (usually at the bottom
				of the screen).
			</p>
		</details>

		<details>
			<summary> How do I pay? </summary>
			<p>
				On the <a href="/plans">plans page</a> you can either "pay now" or "pay later", per service.
			</p>
			<p>
				After booking details have been confirmed the "pay now" option will redirect you to a
				checkout page. With "pay later" we send a custom STRIPE invoice to the preferred email. In
				both cases you will have the option to pay with credit card, Apple Pay, or Google Pay!
			</p>
		</details>

		<details>
			<summary> How do I book multiple sessions at once? </summary>

			<p>
				We will book the remaining times for you at the beginning / end of the scheduled session.
			</p>
		</details>

		<details>
			<summary> What subjects do you cover? </summary>

			<p>
				<span class="font-Poppins font-bold">MATHEMATICS</span>&nbsp; Calculus • Trigonometry •
				Advanced Functions • Complex Numbers • Linear Algebra • Probability and Statistics
				&nbsp;&nbsp;<span class="font-Poppins font-bold">PHYSICS</span>
				&nbsp;Kinematics • Mechanics • Thermodynamics • Fluids • Electricity & Magnetism • Circuit Analysis
				• Waves • Optics • Atomic & Quantum Physics • Special Relativity &nbsp;&nbsp;

				<!-- <span class="font-Poppins font-bold">SPANISH</span>
				&nbsp; Pronunciation • Grammatical Rules • Practical Examples -->

				<br /><br />
				<b>Levels:</b> IB / AP / OSSD (9-12) / College & University
			</p>
		</details>

		<details>
			<summary> How are mock tests administered? </summary>
			<p>
				After booking a "Mock" session on <a href="/plans">plans</a>, the student attends a live
				session where a prepared examination — in the form of a Google Forms link — will be shared
				at the beginning of the session. The topics are chosen based on input during booking, as
				well as prior discussion with the student.
			</p>
			<p>
				<span class="font-Poppins font-bold">In regards to completed questions only:</span> answers are
				discussed during session time. A detailed, digital solution key is also available at a premium,
				to be populated on your personal page.
			</p>
		</details>

		<details class="group">
			<summary>
				I am looking to refer a friend, do you offer any discounts based on referrals?
			</summary>
			<p>
				Great question! You can enter your referral as an input when booking; for this initiative we
				are pleased to offer a
				<!-- group-active:animate-ping -->
				<span
					class="bg-gradient-to-b from-rose-700 via-rose-600 to-yellow-300 bg-clip-text text-transparent opacity-0 hover:opacity-100 group-active:opacity-100"
				>
					25%
				</span>
				discount on the next applicable session!
			</p>
		</details>
	</div>
</main>

<!-- The markdown of this component being repetitive, makes vanilla css a better choice for styling (also the event delegation classList add logic works easiest with vanilla css).  It's also possible to abstract the details/summary elements into a components and use tailwind directly in those components ... -->
<style lang="postcss">
	:root {
		--light-green: rgb(230, 255, 249);
		--green: rgb(89, 208, 174);
		--red: rgb(230, 59, 96);
		--light-red: rgb(243, 186, 198);
		--borderRadius: 15px;
	}

	summary {
		margin: -0.5em -0.5em 0;
		padding: 0.5em;
		border-radius: var(--borderRadius) var(--borderRadius) 0 0;

		/* removes arrow */
		list-style: none;
		&::-webkit-details-marker {
			display: none;
		}
	}

	details {
		@apply font-Nunito;
		border: 0px solid #eee;
		border-radius: var(--borderRadius);
		padding: 0.5em 0.5em 0;
		font-size: 18px;
		@media screen and (min-width: 768px) {
			& {
				width: 60vw;
			}
		}
		@media screen and (max-width: 768px) {
			& {
				width: 90vw;
			}
		}
		& p {
			padding: 10px;
		}
		& a {
			color: var(--red);
		}
		& a:hover {
			color: rgb(46, 126, 253);
		}

		:global(html.dark) &:hover {
			background: #211f51;
		}
		&:hover {
			background: #ddd;
		}

		:global(html.dark) &[open] {
			background: var(--light-green);
		}
		&[open] {
			padding: 0.5em;
			background: var(--light-green);
			animation: sweep 0.25s ease-in-out;
			margin-bottom: 10px;
			color: black;

			&:has(summary.highlight) {
				background: var(--light-red);
				transition: 0.2s ease-in-out;
			}

			& summary {
				border-bottom: 1px solid #aaa;
				margin-bottom: 0.5em;
				background-color: var(--green);
				outline: none;
			}
			& summary.highlight {
				background: var(--red);
				color: white;
				transition: 0.2s ease-in-out;
			}
		}
	}

	/* opacity seems to not do much */
	@keyframes sweep {
		0% {
			opacity: 0;
			margin-top: -15px;
		}

		100% {
			opacity: 1;
			margin-top: 0px;
		}
	}
</style>
