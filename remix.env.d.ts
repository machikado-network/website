/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />

import type {AptosBrowserExtension} from "~/lib/aptos/browser";

declare global {
    interface Window {
        martian?: AptosBrowserExtension
    }
}
