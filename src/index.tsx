import { Hono } from "hono";
import { renderer } from "@/middlewares/renderer";
import { log } from "@/middlewares/log";
import { ComponentClass, FC } from "hono/jsx";
import { cn } from "./lib/cn";

const app = new Hono();

app.use(renderer, log);

let counter = 0;

app
  .post("/data", (c) =>
    c.html(
      <div id="container">
        Clicked on button
        <span class="font-bold text-xl">{++counter}</span>
        {counter !== 1 ? "times" : "time"}
      </div>
    )
  )
  .delete((c) =>
    c.html(
      <div id="container">
        Clicked on button
        <span class="font-bold text-xl">{--counter}</span>
        {counter !== 1 ? "times" : "time"}
      </div>
    )
  );

const Button = ({ children, ...props }: JSX.HtmlButtonTag) => (
  <button {...props} class={cn("p-6", props.class)}>
    {children}
  </button>
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
        Clicked on button <span class="font-bold text-xl">{counter}</span>
        {counter !== 1 ? "times" : "time"}
      </div>
    </div>,
    { title: "Home" }
  )
);

export default app;
