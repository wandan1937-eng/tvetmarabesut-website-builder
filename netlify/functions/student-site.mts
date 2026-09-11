import type { Config } from "@netlify/functions";
import { getStore, getDeployStore } from "@netlify/blobs";

type SiteRecord = {
  html: string;
  publishKey: string;
  businessName?: string;
  updatedAt: string;
};

function getStudentStore() {
  const netlify = (globalThis as any).Netlify;
  const deployContext = netlify?.context?.deploy?.context;
  if (deployContext === "production") {
    return getStore("student-sites", { consistency: "strong" });
  }
  return getDeployStore("student-sites");
}

export default async (req: Request) => {
  const pathname = new URL(req.url).pathname;
  const rawSlug = pathname.replace(/^\/site\//, "").split("/")[0];
  const slug = rawSlug.replace(/[^a-z0-9-]/g, "").slice(0, 60);

  if (!slug) {
    return new Response("Website tidak ditemui.", { status: 404 });
  }

  const store = getStudentStore();
  const record = await store.get(`sites/${slug}`, { type: "json" }) as SiteRecord | null;

  if (!record?.html) {
    return new Response("Website tidak ditemui. Semak URL atau publish semula.", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(record.html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
};

export const config: Config = {
  path: "/site/*",
};
