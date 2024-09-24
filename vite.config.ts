/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

const vitePwa = VitePWA({
  registerType: "autoUpdate",
  outDir: "dist",
  manifest: {
    name: "Сервис происшествий",
    short_name: "Incidents",
    description:
      "Сервис предоставляющий информацию о происшествиях, и позволяющий пользователям отмечать происшествия на карте в реальном времени",
    theme_color: "#2b2d31",
    start_url: "/",
    display: "standalone",
    background_color: "#2b2d31",
    orientation: "portrait",
    lang: "Ru",
    icons: [
      {
        src: "images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "images/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "screenshots/screenshot-wide.png",
        label: "Wide screenshot",
        form_factor: "wide",
        sizes: "1679x911",
      },
      {
        src: "screenshots/screenshot-narrow.png",
        label: "Narrow screenshot",
        form_factor: "narrow",
        sizes: "372x823",
      },
    ],
  },
  workbox: {
    globDirectory: "dist/",
    globPatterns: ["**/*.{js,css,png,svg,jpg,jpeg}"],
    swDest: "dist/sw.js",
    globIgnores: ["**/node_modules/**"],
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePwa],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    css: true,
  },
  server: {
    port: 80,
  },
});
