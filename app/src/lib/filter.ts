import type { SkinData, FilterState } from "./types";

function normalize(s: string): string {
	return s
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

export function filterSkins(skins: SkinData[], state: FilterState): SkinData[] {
	const terms =
		state.search.trim() === ""
			? []
			: normalize(state.search.trim())
					.split(/\s+/)
					.filter(Boolean);

	return skins.filter((skin) => {
		// Text search: all terms must appear in name+artist+tank
		if (terms.length > 0) {
			const tags = normalize(
				[skin.name ?? "", skin.artist ?? "", skin.tank ?? ""].join(" "),
			);
			if (!terms.every((t) => tags.includes(t))) return false;
		}

		// Category filter (OR within group)
		if (state.categories.size > 0) {
			if (!skin.category || !state.categories.has(skin.category)) return false;
		}

		// Tier filter (OR within group)
		if (state.tiers.size > 0) {
			if (!skin.tier || !state.tiers.has(skin.tier)) return false;
		}

		// Class filter (OR within group)
		if (state.classes.size > 0) {
			if (!skin.class || !state.classes.has(skin.class)) return false;
		}

		// Nation filter (OR within group)
		if (state.nations.size > 0) {
			if (!skin.nation || !state.nations.has(skin.nation)) return false;
		}

		return true;
	});
}
