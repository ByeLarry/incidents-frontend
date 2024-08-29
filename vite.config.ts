import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

const vitePwa = VitePWA({
  registerType: "autoUpdate",
  outDir: "dist",
  manifest: {
    name: "Incidents Service",
    short_name: "Incidents",
    description: "Incident analysis service",
    theme_color: "#2b2d31",
    start_url: "/",
    display: "standalone",
    background_color: "#2b2d31",
    orientation: "portrait",
    lang: "Ru",
    icons: [
      {
        src: "./public/images/favicon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "./public/images/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "./public/images/favicon-57.png",
        sizes: "57x57",
        type: "image/png",
      },
      {
        src: "./public/images/favicon-60.png",
        sizes: "60x60",
        type: "image/png",
      },
      {
        src: "./public/images/favicon-70.png",
        sizes: "70x70",
        type: "image/png",
      },
      {
        src: "./public/images/favicon-72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "./public/images/favicon-76.png",
        sizes: "76x76",
        type: "image/png",
      },
      {
        src: "./public/images/favicon-96.png",
        sizes: "96x96",
        type: "image/png",
      }
    ],
  },
  workbox: {
    globDirectory: "dist/",
    globPatterns: ["**/*.{js,css,html,png,svg,jpg,jpeg}"],
    swDest: "dist/sw.js",
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePwa],
  server: {
    port: 80,
  },
});
