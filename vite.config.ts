import path from "path";
import { defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";

export default defineConfig({
  plugins: [devServer({ entry: "src/index.tsx" })],
  resolve: { alias: { "@": path.resolve(__dirname + "/src") } },
});
