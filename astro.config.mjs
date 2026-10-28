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
});
