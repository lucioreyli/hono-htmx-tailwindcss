import type { Context, Next } from "hono";

export const renderer = async (c: Context, next: Next) => {
  c.setRenderer((content, { title } = {}) => {
    const env = process.env.NODE_ENV;
    return c.html(
      <html>
        <head>
          <link
            href={`/${
              env === "PRODUCTION" ? "static" : "src"
            }/styles/global.css`}
            rel="stylesheet"
          />
          <script
            type="module"
            src={`/${env === "PRODUCTION" ? "static" : "src"}/lib/htmx.js`}
          ></script>
          <title>{title}</title>
        </head>
        <body>{content}</body>
      </html>
    );
  });
  await next();
};
