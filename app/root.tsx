import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
import { useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDehydratedState } from "use-dehydrated-state";
import globalStyles from "~/styles/global.scss?url";
import nprogressStyles from "~/styles/nprogress.scss?url";
import AppBar from "./components/AppBar";
import Container from "./components/Container";
import DesktopSidebarAds from "./components/DesktopSidebarAds";
import BottomAd from "./components/BottomAd";
import Footer from "./components/Footer";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: nprogressStyles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();

  NProgress.configure({ showSpinner: false, speed: 250 });
  
  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [navigation.state]);

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1293594318302254" crossOrigin="anonymous"></script>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <AppBar />
        </header>
        <DesktopSidebarAds />
        <Container>
          {children}
        </Container>
        <BottomAd />
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  const dehydratedState = useDehydratedState();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <SkeletonTheme
          baseColor="var(--skeleton-base)"
          highlightColor="var(--skeleton-highlight)"
        >
          <Outlet />
        </SkeletonTheme>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
