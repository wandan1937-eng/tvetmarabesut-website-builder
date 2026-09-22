import type { Config } from "@netlify/functions";
import { getStore, getDeployStore } from "@netlify/blobs";

type StatRecord = { count: number; updatedAt: string };

function getStatsStore() {
  const netlify = (globalThis as any).Netlify;
  const deployContext = netlify?.context?.deploy?.context;
  if (deployContext === "production") {
    return getStore("student-site-stats", { consistency: "strong" });
  }
  return getDeployStore("student-site-stats");
}

function cleanSlug(value: string) {
  return (value || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 60);
}

export default async (req: Request) => {
  const url = new URL(req.url);
  const slug = cleanSlug(url.searchParams.get("slug") || "");
  if (!slug) return Response.json({ error: "Slug tidak sah." }, { status: 400 });

  const store = getStatsStore();
  const key = `stats/${slug}`;
  const current = await store.get(key, { type: "json" }) as StatRecord | null;
  let count = Number(current?.count || 0);

  if (req.method === "POST") {
    count += 1;
    await store.setJSON(key, { count, updatedAt: new Date().toISOString() });
  } else if (req.method !== "GET") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  return Response.json({ ok: true, slug, count });
};

export const config: Config = { path: "/api/site-stats" };
