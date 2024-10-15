import { EVENT_LIST_URL } from './constant';
import { parseId } from './utils';

export interface CommunityEvent {
	id: number;
	url: string;
	title: string;
	start_date: string;
	end_date: string;
}

interface CacheData {
	events: CommunityEvent[];
	timestamp: number;
}

let cache: CacheData | null = null;
let fetchPromise: Promise<CommunityEvent[]> | null = null;

export async function fetchEvents(): Promise<CommunityEvent[]> {
	const now = Date.now();

	// Check if cache is valid (less than 60 seconds old)
	if (cache && now - cache.timestamp < 60_000) {
		return cache.events;
	}

	// If there's an ongoing fetch, return its promise
	if (fetchPromise) {
		return fetchPromise;
	}

	// Create a new fetch promise
	fetchPromise = (async () => {
		try {
			const res = await fetch(EVENT_LIST_URL, {
				headers: {
					'User-Agent': 'Mozilla/5.0 GDG',
					Accept: 'application/json'
				}
			});
			const { results } = (await res.json()) as { results: CommunityEvent[] };

			// Update cache
			cache = {
				events: results,
				timestamp: now
			};

			return results;
		} finally {
			// Clear the fetch promise
			fetchPromise = null;
		}
	})();

	return fetchPromise;
}

export function resolveEvent(ref: string, events: CommunityEvent[]): CommunityEvent | null {
	// for id ref like 'abc', '123', etc.
	try {
		const id = parseId(ref);
		const event = events.find((e) => e.id === id);
		if (event) return event;
	} catch {
		// do nothing
	}

	// for ref as date like '20241230' or '2024-12-30'
	const date = ref.match(/\d/g)?.join('');
	if (date) {
		const event = events.find((e) => {
			// parse date to +8 timezone YYYYMMDD with intl
			const start = new Date(e.start_date)
				.toLocaleDateString('en-CA', { timeZone: 'Asia/Taipei' })
				.replace(/\//g, '')
				.replace(/-/g, '');
			return start === date;
		});
		if (event) return event;
	}

	return null;
}
