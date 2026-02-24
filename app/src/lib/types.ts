export type Category = "2D" | "3D" | "MOD";
export type TankClass = "LT" | "MT" | "HT" | "TD" | "SPG";
export type Nation =
	| "US"
	| "BR"
	| "RU"
	| "GR"
	| "FR"
	| "IT"
	| "CZ"
	| "JP"
	| "CH"
	| "PO"
	| "SW";
export type Tier = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface SkinData {
	slug: string;
	date: string | null;
	name: string | null;
	artist: string | null;
	category: Category | null;
	tank: string | null;
	tier: Tier | null;
	class: TankClass | null;
	nation: Nation | null;
	weight: number;
	description: string | null;
	images: string[];
	downloads: string[];
}

export interface FilterState {
	search: string;
	categories: Set<Category>;
	tiers: Set<Tier>;
	classes: Set<TankClass>;
	nations: Set<Nation>;
}

export const CATEGORIES: Category[] = ["3D", "2D", "MOD"];
export const TIERS: Tier[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const TANK_CLASSES: TankClass[] = ["LT", "MT", "HT", "TD", "SPG"];
export const NATIONS: Nation[] = [
	"US",
	"BR",
	"RU",
	"GR",
	"FR",
	"IT",
	"CZ",
	"JP",
	"CH",
	"PO",
	"SW",
];

export function categoryIcon(c: Category): string {
	return `/icons/${c.toLowerCase()}.webp`;
}

export function tierIcon(t: Tier): string {
	return `/icons/tier/${t}.webp`;
}

export function classIcon(c: TankClass): string {
	return `/icons/class/${c.toLowerCase()}.webp`;
}

export function nationIcon(n: Nation): string {
	return `/icons/nation/${n.toLowerCase()}.webp`;
}
