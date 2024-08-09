import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Smartly combines multiple tailwind class names into a single string.
 *
 * @see https://github.com/lukeed/clsx
 * @see https://github.com/dcastil/tailwind-merge
 *
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
