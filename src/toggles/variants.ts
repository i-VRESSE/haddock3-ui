export type Variant = "act" | "pass" | "highlight" | "";

/**
 * Maps residue selection variants to their respective tailwind CSS classes.
 */
export const residueVariants: Record<Variant, string> = {
	act: "bg-green-100 dark:bg-green-700",
	pass: "bg-yellow-100 dark:bg-yellow-700",
	highlight: "bg-secondary dark:bg-secondary-foreground",
	"": "bg-inherit dark:bg-inherit",
};
// TODO make overridable by package consumer
// could use a tailwind to define colors
