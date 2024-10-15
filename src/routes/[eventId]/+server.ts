import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types"
import { fetchEvents, HOME } from "$lib";

export const GET: RequestHandler = async ({ params }) => {
    const id = parseInt(params.eventId);
    const events = await fetchEvents();
    const matched = events.find((e) => e.id === id);
    if (!matched) {
        return redirect(302, HOME);
    }
    const url = matched.url;
    return redirect(302, url);
};
