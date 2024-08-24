import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      manifest: {
        id: "/",
        name: "Shopper",
        short_name: "Shopper",
        description: "Your shopping list app",
        display: "standalone",
        background_color: "#f3f3f3",
        theme_color: "#84cc16",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/screenshot2.png",
            sizes: "1280x720",
            type: "image/png",
            label: "Screenshot of the app in landscape mode",
          },
          {
            src: "/screenshot1.png",
            sizes: "1920x1080",
            type: "image/png",
            label: "Another screenshot",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
