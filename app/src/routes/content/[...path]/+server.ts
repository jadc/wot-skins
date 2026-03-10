// Serves content files (images, downloads) from CONTENT_DIR so that the
// content directory can live outside static.

import { resolve } from "node:path";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { CONTENT_DIR } from "$lib/server/content";

export const GET: RequestHandler = async ({ params }) => {
    const resolved = resolve(CONTENT_DIR, params.path);
    if (!resolved.startsWith(resolve(CONTENT_DIR))) {
        error(403);
    }

    const file = Bun.file(resolved);
    if (!(await file.exists())) {
        error(404);
    }

    return new Response(file, {
        headers: {
            // Tell browsers to cache results for 24h
            "cache-control": "public, max-age=86400",
        },
    });
};
