import { Hono } from "hono";
import { renderer } from "@/middlewares/renderer";
import { log } from "@/middlewares/log";
import { serveStatic } from "hono/bun";
import { Button } from "./components/button";

const app = new Hono();
app.get("/static/lib/*", serveStatic({ root: "./" }));
app.get("/static/styles/*", serveStatic({ root: "./" }));
app.use(log);

let counter = 0;

app
  .post("/data", (c) =>
    c.body(
      <>
        Clicked on button
        <span class="font-bold text-xl"> {++counter} </span>
        {counter !== 1 ? "times" : "time"}
      </>
    )
  )
  .delete((c) =>
    c.html(
      <>
        Clicked on button
        <span class="font-bold text-xl"> {--counter} </span>
        {counter !== 1 ? "times" : "time"}
      </>
    )
  );

app.get("/", (c) =>
  c.render(
    <div class="grid content-center h-dvh w-fit mx-auto">
      <h1 class="mx-auto text-2xl">Hello world!</h1>
      <div class="grid grid-cols-2 w-fit mx-auto gap-2">
        <Button hx-post="/data" hx-target="#container" class="bg-green-500">
          +
        </Button>
        <Button hx-delete="/data" hx-target="#container" class="bg-red-500">
          -
        </Button>
      </div>
      <div id="container">
        Clicked on button<span class="font-bold text-xl"> {counter} </span>
        {counter !== 1 ? "times" : "time"}
      </div>
    </div>,
    { title: "Home" }
  )
);

export default app;
