import { cn } from "../cn";
import { residueVariants, Variant } from "./variants";

export function ResiduesHeader({
    showActive,
    showPassive,
  }: {
    showActive: boolean;
    showPassive: boolean;
  }) {
    return (
      <div>
        <p className="text-[0.5rem]">&nbsp;</p>
        <div className="inline-block text-start font-mono">
          <div title="Sequence">
            {/* use non breaking whitespace to prevent layout shifts */}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          {showActive && <ResidueHeaderItem variant="act" label="Active" />}
          {showPassive && <ResidueHeaderItem variant="pass" label="Passive" />}
        </div>
      </div>
    );
  }
  
  export function ResidueHeaderItem({
    variant,
    label,
  }: {
    variant: Variant;
    label: string;
  }) {
    return <div className={cn("pr-1", residueVariants[variant])}>{label}</div>;
  }
  