import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import browserslistToEsbuild from "browserslist-to-esbuild";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    target: browserslistToEsbuild([">0.2%", "not dead", "not op_mini all"]),
  },
  server: {
    port: 3000,
  },
});
