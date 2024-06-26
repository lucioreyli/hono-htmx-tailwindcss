import type { Context, Next } from "hono";

const isDev = process.env.NODE_ENV === "development";
const Bundle = () => (
  <>
    <link
      href={`/${isDev ? "src" : "static"}/styles/global.css`}
      rel="stylesheet"
    />
    <script
      src="https://unpkg.com/htmx.org@2.0.0"
      integrity="sha384-wS5l5IKJBvK6sPTKa2WZ1js3d947pvWXbPJ1OmWfEuxLgeHcEbjUUA5i9V5ZkpCw"
      crossorigin="anonymous"
    ></script>
    <script
      defer
      async
      type="module"
      src={`/${isDev ? "src" : "static"}/lib/valibot.${isDev ? "ts" : "js"}`}
    ></script>
  </>
);

export const renderer = async (c: Context, next: Next) => {
  c.setRenderer((content, { title } = {}) => {
    return c.html(
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Bundle />
          <title>{title}</title>
        </head>
        <body>{content}</body>
      </html>
    );
  });
  await next();
};
