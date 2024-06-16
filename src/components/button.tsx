import { cn } from "@/lib/cn";
import type { JSX } from "hono/jsx";

export const Button = ({ children, ...props }: JSX.HTMLAttributes) => (
  <button {...props} class={cn("p-6", props.class)}>
    {children}
  </button>
);
