import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// source: https://ui.shadcn.com/docs/installation/manual
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
