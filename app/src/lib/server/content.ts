import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { SkinData } from "$lib/types";

const CONTENT_DIR = "static/content";

export async function getAllSkins(): Promise<SkinData[]> {
	const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
	const skins: SkinData[] = [];

	for (const entry of entries) {
		if (!entry.isDirectory()) continue;
		const skin = await getSkin(entry.name);
		if (skin) skins.push(skin);
	}

	// Sort by weight ascending, then date newest first
	skins.sort((a, b) => {
		if (a.weight !== b.weight) return a.weight - b.weight;
		const da = a.date ?? "";
		const db = b.date ?? "";
		return db.localeCompare(da);
	});

	return skins;
}

export async function getSkin(slug: string): Promise<SkinData | null> {
	try {
		const jsonPath = join(CONTENT_DIR, slug, "index.json");
		const raw = await readFile(jsonPath, "utf-8");
		const data = JSON.parse(raw);
		return { slug, ...data } as SkinData;
	} catch {
		return null;
	}
}
