import type { PageServerLoad } from './$types';
import { fetchEvents, attachCode, type CommunityEventWithCode } from '$lib/event';

export const load: PageServerLoad = async () => {
	const events = await fetchEvents();

	const formattedEvents: CommunityEventWithCode[] = events.map(attachCode);

	return { events: formattedEvents };
};
