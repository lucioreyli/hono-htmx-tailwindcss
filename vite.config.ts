import path from "path";
import { globSync } from "glob";
import { UserConfigFnObject, defineConfig } from "vite";
import devServer from "@hono/vite-dev-server";
import { fileURLToPath } from "node:url";
import pages from "@hono/vite-cloudflare-pages";

export default defineConfig(({ mode }) => {
  const baseCfg: Partial<UserConfigFnObject> = {
    resolve: { alias: { "@": path.resolve(__dirname + "/src") } },
  };
  if (mode === "bundle") {
    return {
      ...baseCfg,
      build: {
        rollupOptions: {
          input: Object.fromEntries(
            globSync(["src/**/*.ts", "src/**/*.tsx", "src/**/*.css"]).map(
              (file) => {
                console.log(file);
                return [
                  path.relative(
                    "src",
                    file.slice(0, file.length - path.extname(file).length)
                  ),
                  fileURLToPath(new URL(file, import.meta.url)),
                ];
              }
            )
          ),
          output: {
            entryFileNames: "static/[name].js",
            assetFileNames: "static/[name].[ext]",
          },
        },
      },
    };
  }
  return {
    ...baseCfg,
    plugins: [devServer({ entry: "src/index.tsx" }), pages()],
  };
});
