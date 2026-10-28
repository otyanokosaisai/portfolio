// Tailwind CSS 3 through PostCSS (replaces @astrojs/tailwind, which does not support Astro 7).
// src/globals.css holds the @tailwind directives and is imported by the layout.
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [tailwindcss(), autoprefixer()],
};
