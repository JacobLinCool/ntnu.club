import { EVENT_LIST_URL } from './constant';

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
					'User-Agent': 'Mozilla/5.0',
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
