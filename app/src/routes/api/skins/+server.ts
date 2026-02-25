import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getAllSkins } from "$lib/server/content";
import { parseFilterParams, filterSkins, parsePage, paginateSkins } from "$lib/server/filter";

export const GET: RequestHandler = async ({ url }) => {
	const allSkins = await getAllSkins();
	const state = parseFilterParams(url);
	const filtered = filterSkins(allSkins, state);
	const page = parsePage(url);
	return json(paginateSkins(filtered, page));
};
