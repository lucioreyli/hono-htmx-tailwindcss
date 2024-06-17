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
            src="https://unpkg.com/htmx.org@1.9.12"
            integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2"
            crossorigin="anonymous"
          ></script>
          <title>{title}</title>
        </head>
        <body>{content}</body>
      </html>
    );
  });
  await next();
};
