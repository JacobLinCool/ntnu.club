import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { HOME } from '$lib';

export const GET: RequestHandler = async () => {
	return redirect(302, HOME);
};
