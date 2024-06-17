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
            src="https://unpkg.com/htmx.org@2.0.0"
            integrity="sha384-wS5l5IKJBvK6sPTKa2WZ1js3d947pvWXbPJ1OmWfEuxLgeHcEbjUUA5i9V5ZkpCw"
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
