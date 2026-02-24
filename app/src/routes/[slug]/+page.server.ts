import { error } from "@sveltejs/kit";
import { getSkin } from "$lib/server/content";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const skin = await getSkin(params.slug);
	if (!skin) throw error(404, "Skin not found");
	return { skin };
};
