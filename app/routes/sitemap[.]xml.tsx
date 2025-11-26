import { LoaderFunction } from "@remix-run/node";
import { XMLBuilder } from "fast-xml-parser";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;
  const today = new Date().toISOString().split('T')[0];

  const urlset = {
    '?xml': {
      '@_version': '1.0',
      '@_encoding': 'UTF-8',
    },
    urlset: {
      '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      url: [
        {
          loc: `${baseUrl}`,
          lastmod: today,
        },
        {
          loc: `${baseUrl}/draws`,
          lastmod: today,
        },
      ],
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
}