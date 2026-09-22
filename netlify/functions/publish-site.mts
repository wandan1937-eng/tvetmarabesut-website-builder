import type { Config } from "@netlify/functions";
import { getStore, getDeployStore } from "@netlify/blobs";

type SiteRecord = {
  html: string;
  publishKey: string;
  businessName?: string;
  updatedAt: string;
  allowIndex?: boolean;
};

function getStudentStore() {
  const netlify = (globalThis as any).Netlify;
  const deployContext = netlify?.context?.deploy?.context;

  if (deployContext === "production") {
    return getStore("student-sites", { consistency: "strong" });
  }

  return getDeployStore("student-sites");
}

function cleanSlug(input: string) {
  return (input || "website")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50) || "website";
}

function randomSuffix() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 6);
}

export default async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Data publish tidak sah." }, { status: 400 });
  }

  const html = typeof body.html === "string" ? body.html : "";
  const businessName = typeof body.businessName === "string" ? body.businessName.slice(0, 120) : "";
  const suppliedKey = typeof body.publishKey === "string" ? body.publishKey : "";
  const allowIndex = body.allowIndex === true;
  let slug = cleanSlug(typeof body.requestedSlug === "string" ? body.requestedSlug : businessName);

  if (!html || html.length < 50) {
    return Response.json({ error: "Kandungan website kosong." }, { status: 400 });
  }

  if (new TextEncoder().encode(html).byteLength > 5_000_000) {
    return Response.json(
      { error: "Website terlalu besar untuk dipublish. Kurangkan saiz gambar dan cuba lagi." },
      { status: 413 },
    );
  }

  const store = getStudentStore();
  const existing = await store.get(`sites/${slug}`, { type: "json" }) as SiteRecord | null;

  let publishKey = suppliedKey;

  if (existing) {
    if (!suppliedKey || suppliedKey !== existing.publishKey) {
      slug = `${slug.slice(0, 42)}-${randomSuffix()}`;
      publishKey = crypto.randomUUID();
    }
  } else {
    publishKey = publishKey || crypto.randomUUID();
  }

  const record: SiteRecord = {
    html,
    publishKey,
    businessName,
    updatedAt: new Date().toISOString(),
    allowIndex,
  };

  await store.setJSON(`sites/${slug}`, record);

  const origin = new URL(req.url).origin;
  const url = `${origin}/site/${slug}`;

  return Response.json({ ok: true, slug, publishKey, url });
};

export const config: Config = {
  path: "/api/publish-site",
};
