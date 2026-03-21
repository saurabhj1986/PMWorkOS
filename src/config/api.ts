declare const __API_BASE__: string;

/** Injected at bundle time (see scripts/dev.mjs / build.mjs). */
export const API_BASE: string =
  typeof __API_BASE__ !== "undefined" ? __API_BASE__ : "http://127.0.0.1:3847";
