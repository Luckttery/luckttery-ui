import { LoaderFunction } from "@remix-run/node";
import { XMLBuilder } from "fast-xml-parser";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const baseUrl = `${url.protocol}//${url.host}`;

  const sitemapindex = {
    '?xml': {
      '@_version': '1.0',
      '@_encoding': 'UTF-8',
    },
    sitemapindex: {
      '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
      sitemap: [
        { loc: `${baseUrl}/sitemap.xml` },
        { loc: `${baseUrl}/draws/sitemap.xml` },
      ],
    },
  };
  
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    format: true,
    suppressEmptyNode: true
  });
  
  const xml = builder.build(sitemapindex);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}