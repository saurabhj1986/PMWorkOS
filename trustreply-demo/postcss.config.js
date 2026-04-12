// Stub PostCSS config.
//
// Why this file exists even though we don't need PostCSS:
// PostCSS searches UP the directory tree from the project root looking for a
// config file. The parent `PMWorkOS/` repo (the workspace this demo lives
// inside during development) has its own legacy `postcss.config.js` at the
// root that references `tailwindcss` as a Tailwind v3 PostCSS plugin. When
// Vite runs from `trustreply-demo/`, PostCSS finds that parent config and
// tries to load a `tailwindcss` plugin entrypoint that does not exist in
// Tailwind v4, which crashes the dev server.
//
// This empty stub stops the walk-up dead and tells PostCSS "no plugins."
// Tailwind itself is still wired up correctly via `@tailwindcss/vite` in
// `vite.config.js` -- that path does not go through PostCSS at all.
export default {
  plugins: {},
};
