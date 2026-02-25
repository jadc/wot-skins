import {
	CATEGORIES,
	TIERS,
	TANK_CLASSES,
	NATIONS,
	type Category,
	type Tier,
	type TankClass,
	type Nation,
	type SkinData,
	type FilterState,
} from "$lib/types";

export function parseFilterParams(url: URL): FilterState {
	const search = url.searchParams.get("search") ?? "";

	const categories = new Set<Category>();
	for (const v of (url.searchParams.get("categories") ?? "").split(",")) {
		if ((CATEGORIES as string[]).includes(v)) categories.add(v as Category);
	}

	const tiers = new Set<Tier>();
	for (const v of (url.searchParams.get("tiers") ?? "").split(",")) {
		const n = Number(v);
		if (Number.isInteger(n) && (TIERS as number[]).includes(n)) tiers.add(n as Tier);
	}

	const classes = new Set<TankClass>();
	for (const v of (url.searchParams.get("classes") ?? "").split(",")) {
		if ((TANK_CLASSES as string[]).includes(v)) classes.add(v as TankClass);
	}

	const nations = new Set<Nation>();
	for (const v of (url.searchParams.get("nations") ?? "").split(",")) {
		if ((NATIONS as string[]).includes(v)) nations.add(v as Nation);
	}

	return { search, categories, tiers, classes, nations };
}

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
		if (terms.length > 0) {
			const tags = normalize(
				[skin.name ?? "", skin.artist ?? "", skin.tank ?? ""].join(" "),
			);
			if (!terms.every((t) => tags.includes(t))) return false;
		}

		if (state.categories.size > 0) {
			if (!skin.category || !state.categories.has(skin.category)) return false;
		}

		if (state.tiers.size > 0) {
			if (!skin.tier || !state.tiers.has(skin.tier)) return false;
		}

		if (state.classes.size > 0) {
			if (!skin.class || !state.classes.has(skin.class)) return false;
		}

		if (state.nations.size > 0) {
			if (!skin.nation || !state.nations.has(skin.nation)) return false;
		}

		return true;
	});
}
