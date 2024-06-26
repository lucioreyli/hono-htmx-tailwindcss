import { cn } from "@/lib/cn";
import type { JSX } from "hono/jsx";

export const Input = ({ ...props }: JSX.HTMLAttributes) => {
  return (
    <input
      {...props}
      class={cn(
        "bg-zinc-50 rounded-md bg-zinc-950 border-zinc-700 shadow-md border px-4 py-1",
        props.class
      )}
    />
  );
};
