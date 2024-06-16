import type { Context, Next } from "hono";

export const renderer = async (c: Context, next: Next) => {
  c.setRenderer((content, { title } = {}) => {
    const isDev = process.env.NODE_ENV === "development";
    return c.html(
      <html>
        <head>
          <link
            href={`/${isDev ? "src" : "static"}/styles/global.css`}
            rel="stylesheet"
          />
          <script
            type="module"
            src={`/${isDev ? "src" : "static"}/lib/htmx.${isDev ? "ts" : "js"}`}
          ></script>
          <title>{title}</title>
        </head>
        <body>{content}</body>
      </html>
    );
  });
  await next();
};
