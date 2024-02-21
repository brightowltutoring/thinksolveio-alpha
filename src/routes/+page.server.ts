export const prerender = false;
import { submitHomeworkAction } from './homework/submitHomework.server';

export const actions = {
	default: (event) => submitHomeworkAction(event)
};
