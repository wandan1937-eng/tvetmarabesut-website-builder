import type { Config } from "@netlify/functions";
import { getStore, getDeployStore } from "@netlify/blobs";

type SiteRecord = { updatedAt?: string; allowIndex?: boolean };

function getStudentStore() {
  const netlify = (globalThis as any).Netlify;
  const deployContext = netlify?.context?.deploy?.context;
  if (deployContext === "production") {
    return getStore("student-sites", { consistency: "strong" });
  }
  return getDeployStore("student-sites");
}

function xmlEscape(value: string) {
  return value.replace(/[<>&'"]/g, (c) => ({ "<":"&lt;", ">":"&gt;", "&":"&amp;", "'":"&apos;", '"':"&quot;" }[c] || c));
}

export default async (req: Request) => {
  const origin = new URL(req.url).origin;
  const store = getStudentStore();
  const { blobs } = await store.list({ prefix: "sites/" });
  const rows: string[] = [];

  for (const blob of blobs) {
    const slug = blob.key.replace(/^sites\//, "").replace(/[^a-z0-9-]/g, "");
    if (!slug) continue;
    const record = await store.get(blob.key, { type: "json" }) as SiteRecord | null;
    if (!record?.allowIndex) continue;
    const loc = xmlEscape(`${origin}/site/${slug}`);
    const lastmod = record.updatedAt ? `<lastmod>${xmlEscape(record.updatedAt)}</lastmod>` : "";
    rows.push(`<url><loc>${loc}</loc>${lastmod}</url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${rows.join("")}</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};

export const config: Config = { path: "/sitemap.xml" };
