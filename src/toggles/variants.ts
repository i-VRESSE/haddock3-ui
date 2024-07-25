export type Variant = "act" | "pass" | "highlight" | "";

export const residueVariants: Record<Variant, string> = {
  act: "bg-green-100 dark:bg-green-700",
  pass: "bg-yellow-100 dark:bg-yellow-700",
  highlight: "bg-secondary dark:bg-secondary-foreground",
  "": "bg-inherit dark:bg-inherit",
};