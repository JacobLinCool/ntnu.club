export const HOME = "https://gdg.community.dev/gdg-on-campus-national-taiwan-normal-university-taipei-taiwan/";

export async function fetchEvents() {
    const res = await fetch("https://gdg.community.dev/api/chapter/1652/event/");
    const { results } = await res.json() as { results: { id: number, url: string }[] };
    return results;
}
