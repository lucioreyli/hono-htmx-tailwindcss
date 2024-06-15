import { Hono } from "hono";
import { renderer } from "@/middlewares/renderer";
import { log } from "@/middlewares/log";
import { ComponentClass, FC } from "hono/jsx";

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

const Button = ({ children, ...props }: JSX.HtmlButtonTag) => {
  return (
    <button
      hx-post="/data"
      hx-target="#container"
      class="bg-green-500 p-10"
      {...props}
    >
      {children}
    </button>
  );
};

app.get("/", (c) =>
  c.render(
    <div class="grid content-center h-dvh w-fit mx-auto">
      <h1 class="mx-auto text-2xl">Hello world!</h1>
      <div class="grid grid-cols-2 w-fit mx-auto">
        <button
          hx-post="/data"
          hx-target="#container"
          class="bg-green-500 p-10"
        >
          +
        </button>
        <button
          hx-delete="/data"
          hx-target="#container"
          class="bg-red-500 p-10"
        >
          -
        </button>
      </div>
      <div id="container">
        Clicked on button <span class="font-bold text-xl">{--counter}</span>
        {counter !== 1 ? "times" : "time"}
      </div>
    </div>,
    { title: "Home" }
  )
);

export default app;
