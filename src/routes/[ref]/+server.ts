import { isRedirect, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { HOME } from '$lib/constant';
import { fetchEvents, resolveEvent } from '$lib/event';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const events = await fetchEvents();
		const matched = resolveEvent(params.ref, events);
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
