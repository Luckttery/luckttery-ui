import { LoaderFunction } from "@remix-run/node";
import { XMLBuilder } from "fast-xml-parser";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

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
          lastmod: '2025-02-05',
        },
        {
          loc: `${baseUrl}/draws`,
          lastmod: '2025-02-05',
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