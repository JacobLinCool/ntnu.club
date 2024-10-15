import type { PageServerLoad } from './$types';
import { fetchEvents, number2alphabet } from '$lib';

export const load: PageServerLoad = async () => {
	const events = await fetchEvents();
	const currentDate = new Date();

	const formattedEvents = events
		.filter((event) => new Date(event.end_date) >= currentDate)
		.map((event) => ({
			...event,
			code: number2alphabet(event.id)
		}));

	return { events: formattedEvents };
};
