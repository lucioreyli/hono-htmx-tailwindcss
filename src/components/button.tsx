import { cn } from "@/lib/cn";

export const Button = ({ children, ...props }: JSX.HtmlButtonTag) => (
  <button {...props} class={cn("p-6", props.class)}>
    {children}
  </button>
);
