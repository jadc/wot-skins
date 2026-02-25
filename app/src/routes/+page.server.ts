import { getAllSkins } from "$lib/server/content";
import { parseFilterParams, filterSkins, paginateSkins } from "$lib/server/filter";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const allSkins = await getAllSkins();
	const state = parseFilterParams(url);
	const filtered = filterSkins(allSkins, state);
	const { skins, hasMore } = paginateSkins(filtered, 1);
	return {
		skins,
		hasMore,
		initialFilters: {
			search: state.search,
			categories: [...state.categories],
			tiers: [...state.tiers],
			classes: [...state.classes],
			nations: [...state.nations],
		},
	};
};
