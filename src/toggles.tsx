import {
  type ChangeEvent,
  type PropsWithChildren,
  useCallback,
  useId,
  useMemo,
  useState,
} from "react";
import { cn } from "./cn.js";
import { useChunked } from "./useChunked";
import { ResiduesHeader } from "./toggles/ResidueHeader";
import { residueVariants, Variant } from "./toggles/variants";

export function useResidueChangeHandler({
  selected,
  options,
  onChange,
  filter = () => true,
}: {
  options: Residue[];
  selected: ResidueSelection;
  onChange: (selected: ResidueSelection) => void;
  filter?: (resno: number) => boolean;
}) {
  const [lastChecked, setLastChecked] = useState<number | null>(null);
  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number, actpass: ActPass) => {
      const residue = parseInt(e.target.value);
      const ne = e.nativeEvent as KeyboardEvent;
      let newSelected: number[] = [];
      if (ne.shiftKey && lastChecked !== null) {
        const start = Math.min(lastChecked, index);
        const end = Math.max(lastChecked, index);
        newSelected = [...selected[actpass]];
        for (let i = start; i <= end; i++) {
          const resno = options[i]!.resno;
          if (!newSelected.includes(resno) && filter(resno)) {
            newSelected.push(resno);
          }
        }
      } else {
        if (e.target.checked) {
          newSelected = [...selected[actpass], residue];
        } else {
          newSelected = selected[actpass].filter((r) => r !== residue);
        }
      }
      if (actpass === "act") {
        // Active should take precedence over passive.
        // For example given passive is selected,
        // then selecting same residue as active should remove it from passive.
        const passiveWithoutAlsoActive = selected.pass.filter(
          (r) => !newSelected.includes(r),
        );
        onChange({
          act: newSelected,
          pass: passiveWithoutAlsoActive,
        });
      } else {
        onChange({
          pass: newSelected,
          act: selected.act,
        });
      }

      if (e.target.checked) {
        setLastChecked(index);
      }
    },
    [filter, lastChecked, onChange, options, selected],
  );

  return handler;
}

export interface Residue {
  resno: number;
  resname: string;
  seq: string;
  surface?: boolean;
}

export function FormDescription({ children }: PropsWithChildren): JSX.Element {
  return <p className="text-[0.8rem] text-muted-foreground">{children}</p>;
}

export function ResidueCheckbox({
  resno,
  resname,
  seq,
  showActive,
  showPassive,
  highlight,
  activeChecked,
  passiveChecked,
  neighbourChecked,
  activeDisabled,
  passiveDisabled,
  onHover,
  onActiveChange,
  onPassiveChange,
  theme = "light",
}: {
  resno: number;
  resname: string;
  seq: string;
  showActive: boolean;
  showPassive: boolean;
  highlight: boolean; // External component wants us to highlight this residue
  activeChecked: boolean;
  passiveChecked: boolean;
  neighbourChecked: boolean;
  activeDisabled: boolean;
  passiveDisabled: boolean;
  onHover: () => void; // We want external component to know we are hovering
  onActiveChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPassiveChange: (event: ChangeEvent<HTMLInputElement>) => void;
  theme: "light" | "dark";
}) {
  const id = useId();
  const style = { colorScheme: theme === "dark" ? "dark" : "light" };
  let htmlFor = id + "act";
  if (showPassive && !showActive) {
    htmlFor = id + "pass";
  }

  let variant: Variant = "";
  if (passiveChecked || neighbourChecked) {
    variant = "pass";
  }
  if (activeChecked) {
    variant = "act";
  }
  if (highlight) {
    variant = "highlight";
  }

  return (
    <div
      className={cn(
        "inline-block w-4 text-center font-mono hover:bg-secondary hover:text-secondary-foreground",
        residueVariants[variant],
      )}
      title={`${resno.toString()}:${resname}`}
      onMouseEnter={onHover}
    >
      <label htmlFor={htmlFor}>{seq}</label>
      {showActive && (
        <input
          type="checkbox"
          style={style}
          value={resno}
          disabled={activeDisabled}
          id={id + "act"}
          checked={activeChecked}
          onChange={onActiveChange}
        />
      )}
      {showPassive && (
        <input
          type="checkbox"
          style={style}
          value={resno}
          disabled={passiveDisabled || activeChecked || neighbourChecked}
          id={id + "pass"}
          checked={passiveChecked || neighbourChecked}
          onChange={onPassiveChange}
        />
      )}
    </div>
  );
}

export interface ResidueSelection {
  act: number[];
  pass: number[];
}

export interface ResidueNeighbourSelection extends ResidueSelection {
  neighbours: number[];
}

export function ResiduesSelect({
  options,
  selected,
  onChange,
  disabledPassive = false,
  disabledActive = false,
  showPassive = false,
  showActive = false,
  showNeighbours = false,
  onHover,
  highlight,
  theme = "light",
}: {
  options: Residue[];
  selected: ResidueNeighbourSelection;
  onChange: (selected: ResidueSelection) => void;
  disabledPassive?: boolean;
  disabledActive?: boolean;
  showPassive?: boolean;
  showActive?: boolean;
  showNeighbours?: boolean;
  onHover: (resno: number | undefined) => void;
  highlight: number | undefined;
  theme: "light" | "dark";
}) {
  const surface = useMemo(
    () => options.filter((r) => r.surface).map((r) => r.resno),
    [options],
  );
  const handleChange = useResidueChangeHandler({
    options,
    selected,
    onChange,
    filter: (resno: number) => surface.includes(resno),
  });
  const chunkSize = 10;
  const chunks = useChunked(options, chunkSize);

  return (
    <>
      <div className="flex flex-row flex-wrap">
        <ResiduesHeader
          showActive={showActive}
          showPassive={showPassive || showNeighbours}
        />
        {chunks.map((chunk, cindex) => (
          <div key={cindex}>
            <p
              className="text-[0.5rem] text-muted-foreground"
              title={chunk[0]!.resno.toString()}
            >
              {chunk[0]!.resno}
            </p>
            <div onMouseLeave={() => onHover(undefined)}>
              {chunk.map((r, index) => (
                <ResidueCheckbox
                  key={r.resno}
                  resno={r.resno}
                  resname={r.resname}
                  seq={r.seq}
                  highlight={highlight === r.resno}
                  activeChecked={selected.act.includes(r.resno)}
                  passiveChecked={selected.pass.includes(r.resno)}
                  activeDisabled={
                    disabledActive ? true : !surface.includes(r.resno)
                  }
                  passiveDisabled={
                    disabledPassive ? true : !surface.includes(r.resno)
                  }
                  onHover={() => onHover(r.resno)}
                  onActiveChange={(e) =>
                    handleChange(e, cindex * chunkSize + index, "act")
                  }
                  onPassiveChange={(e) =>
                    handleChange(e, cindex * chunkSize + index, "pass")
                  }
                  showActive={showActive}
                  showPassive={showPassive || showNeighbours}
                  neighbourChecked={selected.neighbours.includes(r.resno)}
                  theme={theme}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <FormDescription>
        (Hold Shift to select a range of residues. Click residue in 3D viewer to
        select.)
      </FormDescription>
    </>
  );
}

export type ActPass = "act" | "pass";

export function PickIn3D({
  value,
  onChange,
}: {
  value: ActPass;
  onChange: (value: ActPass) => void;
}) {
  return (
    <div className="flex flex-row items-center gap-1">
      <div>3D viewer picks</div>
      {/* TODO implement not using shadcn/ui */}
      {/* <ToggleGroup type="single" defaultValue={value} onValueChange={onChange}>
        <ToggleGroupItem
          value="act"
          className="data-[state=on]:bg-green-100"
          aria-label="Picking in 3D viewer will select active"
          title="Picking in 3D viewer will select active"
        >
          A
        </ToggleGroupItem>
        <ToggleGroupItem
          value="pass"
          className="data-[state=on]:bg-yellow-100"
          aria-label="Picking in 3D will viwer select passive"
          title="Picking in 3D will viwer select passive"
        >
          P
        </ToggleGroupItem>
      </ToggleGroup> */}
    </div>
  );
}