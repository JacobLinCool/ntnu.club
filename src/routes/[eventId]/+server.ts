import { isRedirect, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchEvents, HOME, parseId } from '$lib';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const id = parseId(params.eventId);
		console.log(id);
		const events = await fetchEvents();
		const matched = events.find((e) => e.id === id);
		const url = matched?.url;
		if (!url) {
			throw new Error('Event not found');
		}
		throw redirect(301, url);
	} catch (e) {
		if (isRedirect(e)) {
			throw e;
		}
		console.error(e);
		throw redirect(302, HOME);
	}
};
