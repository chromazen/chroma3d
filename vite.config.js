import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/chroma3d/",
  plugins: [react()],
  publicDir: "public", // 👈 FORCE copy public
});
