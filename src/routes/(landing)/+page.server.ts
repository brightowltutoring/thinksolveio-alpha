export const prerender = false;
import type { Actions } from '@sveltejs/kit';
import { submitHomeworkAction } from '../homework/submitHomework.server';

export const actions = {
	default: (event) => submitHomeworkAction(event)
} satisfies Actions;
