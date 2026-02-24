import { getAllSkins } from "$lib/server/content";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const skins = await getAllSkins();
	return { skins };
};
