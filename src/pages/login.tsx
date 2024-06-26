import { Input } from "@/components/input";
import { Hono } from "hono";

const app = new Hono();

app
  .get("/login", (c) => {
    return c.render(
      <main class="flex h-dvh bg-blue-950">
        <form
          id="login-form"
          hx-boost="true"
          hx-post="/login"
          hx-target="this"
          class={
            "grid gap-4 bg-zinc-900 p-8 self-center mx-auto rounded-xl border border-zinc-700 shadow-md sm:w-2/5 max-w-[25rem]"
          }
        >
          <h1 class="mx-auto text-xl">Welcome back</h1>
          <div class="grid gap-2">
            <Input
              id="email"
              name="email"
              placeholder="E-mail"
              type="email"
              value="luci@gmail.com"
              required
            />
          </div>
          <div class="grid gap-2">
            <Input
              id="password"
              name="password"
              placeholder="Password"
              value="dale"
              type="password"
              required
            />
          </div>
          <button type="submit" class="bg-blue-600 py-1 shadow-md rounded-md">
            Sign in
          </button>
        </form>
        <div id="container" />
        <script type="module" src="src/scripts/validate.ts"></script>
      </main>
    );
  })
  .post(async (c) => {
    // const body = await c.req.parseBody();
    await new Promise((r) => setTimeout(r, 2000));
    return c.redirect("/login");
  });

export { app as loginPage };
