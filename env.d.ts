/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

declare module "@remix-run/server-runtime" {
  interface Future {
    v3_singleFetch: true;
  }
}
