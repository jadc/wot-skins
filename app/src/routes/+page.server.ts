import { getAllSkins } from "$lib/server/content";
import { parseFilterParams, filterSkins } from "$lib/server/filter";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const allSkins = await getAllSkins();
	const state = parseFilterParams(url);
	return {
		skins: filterSkins(allSkins, state),
		initialFilters: {
			search: state.search,
			categories: [...state.categories],
			tiers: [...state.tiers],
			classes: [...state.classes],
			nations: [...state.nations],
		},
	};
};
