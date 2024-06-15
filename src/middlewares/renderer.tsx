import type { Context, Next } from "hono";

export const renderer = async (c: Context, next: Next) => {
  c.setRenderer((content, { title } = {}) => {
    return c.html(
      <html>
        <head>
          <link href="/src/styles/global.css" rel="stylesheet" />
          <script type="module" src="/src/lib/htmx.ts"></script>
          {/* <script
            defer="true"
            async="true"
            src="https://unpkg.com/htmx.org@1.9.12/dist/ext/json-enc.js"
          ></script> */}
          <title>{title}</title>
        </head>
        <body>{content}</body>
      </html>
    );
  });
  await next();
};
