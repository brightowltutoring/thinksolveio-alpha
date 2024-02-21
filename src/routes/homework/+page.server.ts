import {
	submitHomeworkAction
	/*  submitHomework as submitHomeworkAction */
} from './submitHomework.server';

export const prerender = false;
export const actions = {
	default: (event) => submitHomeworkAction(event)
};
