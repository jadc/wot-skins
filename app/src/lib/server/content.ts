import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { SkinData } from "$lib/types";

import { env } from "$env/dynamic/private";

export const CONTENT_DIR = env.CONTENT_DIR ?? "static/content";

let cachedSkins: SkinData[] | null = null;

export async function getAllSkins(): Promise<SkinData[]> {
    if (cachedSkins) return cachedSkins;

    const entries = await readdir(CONTENT_DIR, { withFileTypes: true });
    const results = await Promise.all(
        entries.filter((e) => e.isDirectory()).map((e) => getSkin(e.name)),
    );
    const skins = results.filter((s): s is SkinData => s !== null);

    // Sort by weight ascending, then date newest first
    skins.sort((a, b) => {
        if (a.weight !== b.weight) return a.weight - b.weight;
        const da = a.date ?? "";
        const db = b.date ?? "";
        return db.localeCompare(da);
    });

    cachedSkins = skins;
    return skins;
}

const IMAGE_EXTS = new Set([".webp", ".png", ".jpg", ".jpeg", ".gif"]);

export async function getSkin(slug: string): Promise<SkinData | null> {
    try {
        const dir = join(CONTENT_DIR, slug);
        const [raw, files] = await Promise.all([
            readFile(join(dir, "index.json"), "utf-8"),
            readdir(dir),
        ]);
        const data = JSON.parse(raw);

        const images: string[] = [];
        const downloads: string[] = [];
        for (const file of files.sort()) {
            if (file === "index.json") continue;
            const ext = file.substring(file.lastIndexOf(".")).toLowerCase();
            if (IMAGE_EXTS.has(ext)) {
                images.push(file);
            } else {
                downloads.push(file);
            }
        }

        return {
            slug,
            date: data.date ?? null,
            name: data.name ?? null,
            artist: data.artist ?? null,
            category: data.category ?? null,
            tank: data.tank ?? null,
            tier: data.tier ?? null,
            class: data.class ?? null,
            nation: data.nation ?? null,
            weight: typeof data.weight === "number" ? data.weight : 0,
            description: data.description ?? null,
            images,
            downloads,
        } satisfies SkinData;
    } catch (e) {
        console.warn(`Failed to load skin "${slug}":`, e);
        return null;
    }
}
