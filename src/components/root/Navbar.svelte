<script context="module">
	import { exclusive } from '@/utils/utils.svelte';
	export const modals = exclusive(['homework', 'contactLink', 'navApp', 'login']);
</script>

<script lang="ts">
	let { data } = $page;

	import { getIsLoggedIn } from '@/routes/login/+page.svelte';

	import Theme, { getIsDarkMode } from '@/components/root/Theme.svelte';

	import LoginCard from '@/routes/login/+page.svelte';
	import Dropzone from '@/routes/homework/Dropzone.svelte';
	import Modal from '@/components/wrappers/Modal.svelte';
	import { debouncedScrollY } from '@/shared/scrollStore.svelte';
	import { navigating } from '$app/stores';
	import { scale, fly } from 'svelte/transition';
	import { elasticOut, quintOut } from 'svelte/easing';
	import { routes } from '@/shared/routesStore.svelte';
	import { spring } from 'svelte/motion';
	import { page } from '$app/stores';
	import { getVelY } from '@/utils/utils';
	import { isDarkMode } from '$src/shared/clientStore';

	let isLoggedIn = $derived(getIsLoggedIn());
	let scrollY = $derived(debouncedScrollY.value);
	let velY = $derived(getVelY(scrollY));

	let showHideNavFn = $derived.by(() => {
		if (scrollY < 10) {
			return 'bottom-0 md:top-0 backdrop-blur-3xl md:backdrop-blur-none';
		}
		if (scrollY > 0 && velY < -100) {
			return 'bottom-0 md:top-0 backdrop-blur-3xl duration-500';
		}

		if (velY > 10) {
			if (scrollY > 400) return '!-bottom-20  md:!-top-20  backdrop-blur-3xl duration-200';
			if (scrollY > 40) return 'backdrop-blur-3xl';
			return '';
		}
	});

	let hueRocket = $state(0);
	let scaleRocket = spring(1, { stiffness: 0.1, damping: 0.25 });

	$effect(() => {
		if (isLoggedIn && (data.isPWA === false || null)) {
			hueRocket = getIsDarkMode() ? 0.75 : 0;
			scaleRocket.set(1 + 0.5 * Math.sin(scrollY));
		}
	});

	$effect(() => {
		routes.login.name = isLoggedIn ? '🚀' : 'Login';
	});

	// logo button
	let resetLogoClick = $state(false);
	function clickLogo() {
		// modals.closeAll();
		resetLogoClick = !resetLogoClick;
	}

	// for toggling 'loader-bar' class
	// TODO: make this a $derived?
	let showLoader = $state(false);
	let showLoaderTimeout: NodeJS.Timeout;
	$effect(() => {
		if ($navigating?.from?.route.id !== $navigating?.to?.route.id) {
			showLoader = true;

			clearTimeout(showLoaderTimeout);
			showLoaderTimeout = setTimeout(() => (showLoader = false), 600);
		}
	});

	const routes_for_navbar = $derived(
		Object.values(routes)
			.slice(1, 5) //'login', 'plans', 'homework', 'classroom'
			// .filter(({ name }) =>
			// 	['login', 'plans', 'homework', 'classroom'].includes(name.toLowerCase())
			// )
			.map(({ routePath, name, icon }) => {
				// Object.keys(routes)
				// 	.filter((key) => ['login', 'plans', 'homework', 'classroom'].includes(key))
				// 	.map((key) => {
				// 		let { routePath, name, icon } = routes[key];
				let rocketStyle =
					routePath === '/login' && isLoggedIn
						? `transform:scale(${$scaleRocket}); filter:hue-rotate(${hueRocket}turn)`
						: undefined;

				let navIconClicked =
					(routePath === '/homework' && modals.homework) ||
					(routePath === '/login' && modals.contactLink);

				const onclick =
					routePath === '/homework' || routePath === '/login'
						? (e: MouseEvent | KeyboardEvent) => {
								e.preventDefault();
								modals.open(routePath.substring(1) as 'login' | 'homework');
							}
						: undefined;

				return { routePath, name, icon, rocketStyle, navIconClicked, onclick };
			})
	);
	// const routes_for_navbar = $derived(
	// 	Object.values(routes)
	// 		.slice(1, 5)
	// 		.map((val) => {
	// 			const { routePath, name, icon } = val;

	// 			let rocketStyle =
	// 				routePath === '/login' && isLoggedIn
	// 					? `transform:scale(${$scaleRocket}); filter:hue-rotate(${hueRocket}turn)`
	// 					: undefined;

	// 			let navIconClicked =
	// 				(routePath === '/homework' && modals.homework) ||
	// 				(routePath === '/login' && modals.contactLink);

	// 			const onclick =
	// 				routePath === '/homework' || routePath === '/login'
	// 					? (e: MouseEvent | KeyboardEvent) => {
	// 							e.preventDefault();
	// 							modals.open(routePath.substring(1) as 'login' | 'homework');
	// 						}
	// 					: undefined;

	// 			return {
	// 				routePath,
	// 				name,
	// 				icon,
	// 				navIconClicked,
	// 				onclick,
	// 				rocketStyle
	// 			};
	// 		})
	// );
</script>

<nav class={showHideNavFn}>
	<span
		class="absolute bottom-0 left-0 h-[4px] w-full sm:top-0 {showLoader && 'loader-bar-fireship'}"
	/>

	{#key resetLogoClick}
		<a class="logo" in:scale={{ duration: 1200, easing: elasticOut }} onclick={clickLogo} href="/">
			🧪
		</a>
	{/key}

	<ul class="background-animate">
		<li class={data.isIOS ? 'block pwa:hidden' : 'hidden'}>
			<button class="app_button" onclick={() => modals.open('navApp')}> App </button>
		</li>

		{#each routes_for_navbar as { routePath, name, icon, navIconClicked, onclick, rocketStyle }}
			<li style={rocketStyle}>
				<a href={routePath} {onclick}>
					<div class="hidden h-10 w-10 flex-col items-center justify-between pwa:flex">
						<svelte:component this={icon} {navIconClicked} />
						<span class="scale-[0.95] text-center text-xs">{name}</span>
					</div>

					<div class="text-2xl md:text-xl pwa:hidden">{name}</div>
				</a>
			</li>
		{/each}

		<li class="px-3 py-2 md:scale-100 pwa:scale-100 notpwa:translate-y-1">
			<Theme />
		</li>
	</ul>
</nav>

<section>
	<Modal
		all
		isOpen={data.isIOS && modals.navApp}
		close={modals.closeAll}
		class={'bg-gradient-to-br from-[#6c79f4] to-rose-400 text-white'}
	>
		<ul class="flex w-[85vw] flex-col gap-y-8 font-Poppins text-3xl sm:text-6xl">
			<li in:scale={{ duration: 1300, easing: elasticOut }}>
				<div class="text-6xl">1.</div>
				Open Safari
			</li>
			<li in:fly={{ x: 100, delay: 1200, duration: 1000, easing: quintOut }}>
				<div class="text-6xl">2.</div>
				<div class="flex flex-row items-center justify-center gap-x-2 pt-2">
					<span> Click share icon</span>
					<img
						class="h-7 w-7 -translate-y-1 invert"
						src="/safari-share-icon.png"
						alt="safari share icon"
					/>
				</div>
			</li>

			<li class="text-black" in:fly={{ x: 200, delay: 2000, duration: 1200, easing: quintOut }}>
				<div class="text-6xl">3.</div>
				Click 'Add to Home Screen' 🚀
			</li>
		</ul>
	</Modal>

	<Modal
		close={modals.closeAll}
		isOpen={modals.login}
		class={'bg-[rgba(0,0,0,0.1)] backdrop-blur-md'}
	>
		<LoginCard />
	</Modal>

	<!-- transitionsOff -->
	<Modal body isOpen={modals.homework} close={modals.closeAll} class={'bg-[rgba(0,0,0,0.1)]'}>
		<Dropzone
			textSizeTW={'text-6xl'}
			dimensionsTW={'w-[80vw] h-[85vh]'}
			brightnessTW={'brightness-95'}
		/>
	</Modal>
</section>

<style lang="postcss">
	nav {
		@apply fixed bottom-0 z-50 flex h-fit w-full items-center justify-center ease-in sm:h-[60px] md:top-0 md:justify-between md:px-[7%] md:py-10 pwa:bottom-0 pwa:translate-y-0 pwa:pt-1;
	}
	nav li > a {
		@apply block px-2 py-1 font-Nunito font-thin duration-100 ease-in hover:rounded notpwa:hover:bg-red-300;
		:global(html.dark-mode) & {
			@apply hover:bg-indigo-400;
		}
	}
	.logo {
		@apply hidden p-2 font-Poppins text-xl transition-transform selection:bg-transparent hover:scale-110
			active:text-red-600 md:block md:translate-x-3 md:translate-y-[0.1rem] md:text-[min(5.5vw,40px)];
	}
	.app_button {
		@apply rounded border-b-2 px-3 py-1 font-Nunito text-2xl font-thin duration-300 hover:rounded hover:bg-indigo-400 hover:text-white hover:shadow-lg active:animate-pulse md:text-xl;
	}
	nav ul {
		@apply grid w-full grid-flow-col place-items-center gap-1 overflow-y-hidden overflow-x-scroll rounded-md bg-gradient-to-r from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0)] to-red-200 text-xl scrollbar-hide  md:ml-24 md:w-auto md:rounded-xl pwa:m-0 pwa:pb-0;
		:global(html.dark-mode) & {
			@apply to-[#25235b];
		}
		/* @apply dark:to-[#25235b]; */
	}
	.loader-bar-fireship {
		--gradient-from: #f97316;
		--gradient-via: #a855f7;
		--gradient-to: #ec4899;
		background-image: linear-gradient(
			to right,
			var(--gradient-from),
			var(--gradient-via),
			var(--gradient-to)
		);
		background-size: 200% 200%;
		animation:
			gradient-move 1.8s infinite,
			grow-width 0.1s forwards ease-in;
	}

	@keyframes gradient-move {
		0% {
			background-position: left;
		}

		50% {
			background-position: right;
		}

		100% {
			background-position: left;
		}
	}

	@keyframes grow-width {
		0% {
			width: 0%;
			height: 1px;
		}
		80% {
			width: 80%;
			height: 6px;
		}
		100% {
			width: 100%;
			height: 4px;
		}
	}
</style>
