// import IconHome from '@/components/Icons/NavIcons/IconHome.svelte';
// import IconLogin from '@/components/Icons/NavIcons/IconLogin.svelte';
// import IconPlans from '@/components/Icons/NavIcons/IconPlans.svelte';
// import IconHomework from '@/components/Icons/NavIcons/IconHomework.svelte';
// import IconClassroom from '@/components/Icons/NavIcons/IconClassroom.svelte';

import { IconHome, IconLogin, IconPlans, IconHomework, IconClassroom } from '$src/components/icons'

import type { ComponentType } from 'svelte';
import { dev } from '$app/environment';



export type RouteData = {
	name: string;
	routePath: string;
	// isCurrent: boolean;
	description?: string;
	title?: string;
	//@ts-ignore
	icon?: ComponentType;
	meta: {
		title: string;
		description?: string;
	};
	modal?: boolean;
};

export type routesType = Record<
	'home' | 'login' | 'plans' | 'homework' | 'classroom' | 'faq' | 'stripe' | 'physics' | 'math',
	RouteData
>;




export const routes = $state<routesType>({
	home: {
		name: 'Home',
		routePath: '/',

		meta: {
			title: dev ? 'svelte_kit_so_good 💫' : 'Thinksolve.io 💫',
			description: 'Math and Physics Tutoring for the Modern Age.'
		},
		icon: IconHome
	},
	login: {
		name: 'Login',
		routePath: '/login',

		meta: {
			title: 'Login 🚀',
			description: 'Log in page.'
		},

		icon: IconLogin
	},
	plans: {
		name: 'Plans',
		routePath: '/plans',

		meta: {
			title: 'Plans 💡',
			description: 'Choose between Classic or Mock session; book a time and date; pay now or later.'
		},

		icon: IconPlans
	},

	homework: {
		name: 'Homework',
		routePath: '/homework',

		meta: {
			title: 'Homework 📚',
			description:
				'Click and submit your homework here; we accept all relevant file types for homework submission.'
		},

		icon: IconHomework
	},
	classroom: {
		name: 'Classroom',
		routePath: '/classroom',

		meta: {
			title: 'Classroom 🍎',
			description:
				'You are on the classroom page! Hit join to enter, our scheduled session will start shortly.'
		},

		icon: IconClassroom
	},
	faq: {
		name: 'FAQ',
		routePath: '/faq',

		meta: { title: 'FAQ 🙋‍♀️' }
	},
	stripe: {
		name: 'Stripe',
		routePath: '/stripe',
		meta: { title: 'Stripe 💰' }
	},
	physics: {
		name: 'physics',
		routePath: '/physics',
		meta: { title: 'physics 🚀' }
	},
	math: {
		name: 'math',
		routePath: '/math',
		meta: { title: 'math' }
	}
});

export const _routes = Object.values(routes);

export function getSeoString(url: URL) {

	const pathname = url.pathname;
	let matchingRoute = _routes[0] as RouteData;

	if (pathname !== '/')
		matchingRoute = _routes.slice(1).find((v) => {
			return pathname === v.routePath || pathname.startsWith(v.routePath + '/');
		}) as RouteData;

	if (!matchingRoute) return { seoString: '<title>Oops 💩</title>' };

	const href = url.href;
	const { title, description } = matchingRoute.meta;

	return {
		seoString: `
			<title>${title}</title> 
			<meta name="description" content="${description}"/>
			<meta property="og:description" content="${description}"/>
			<meta property="og:url" content="${href}">
			<link rel="canonical" href="${href}">
		`
	};
}
