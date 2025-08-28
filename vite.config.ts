import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/app": path.resolve(__dirname, "./src/app"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/widgets": path.resolve(__dirname, "./src/widgets"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/entities": path.resolve(__dirname, "./src/entities"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
    },
  },
});
