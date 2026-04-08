import { LoaderFunction } from "@remix-run/node";
import { XMLBuilder } from "fast-xml-parser";
import { fetchLatest } from "~/api/lucktteryApi/api";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const latestDraw = await fetchLatest();

  if (!latestDraw || !latestDraw.draw || !latestDraw.date) {
    return new Response("Failed to fetch latest draw data", { status: 500 });
  }

  const latestDrawNumber = latestDraw.draw;
  const numberOfUrls = Math.min(latestDrawNumber, 52);

  const urls = Array.from({ length: numberOfUrls }, (_, i) => {
    const draw = latestDrawNumber - i;
    const lastmodDate = new Date(latestDraw.date);
    lastmodDate.setDate(lastmodDate.getDate() - (i * 7));
    const lastmod = lastmodDate.toISOString().split("T")[0];

    return { loc: `${baseUrl}/draws/${draw}`, lastmod };
  });

  const urlset = {
    '?xml': { '@_version': '1.0', '@_encoding': 'UTF-8' },
    urlset: {
      '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      url: urls,
    },
  };
  
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    suppressEmptyNode: true
  });
  
  const xml = builder.build(urlset);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
