import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types"
import { fetchEvents } from "$lib";

export const GET: RequestHandler = async () => {
    const events = await fetchEvents();
    return json(events);
};
