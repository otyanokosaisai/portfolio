// @ts-check
import { defineConfig } from "astro/config";
import astroIcon from "astro-icon";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://portfolio-5nv.pages.dev",

  integrations: [
    mdx(),
    astroIcon({
      include: {
        mdi: ["*"],
        ri: ["*"],
        "simple-icons": ["*"],
      },
    }),
    sitemap(),
  ],

  output: "static",

  // Content Security Policy as a <meta> tag: Astro hashes every inline script,
  // so only the site's own scripts run. Inline styles stay allowed because the
  // markup uses a few style="" attributes (icon colours, background mask).
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      styleDirective: {
        resources: ["'self'", "'unsafe-inline'"],
      },
    },
  },
});
