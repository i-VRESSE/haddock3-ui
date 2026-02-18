import { useState } from "react";

import { NGLComponent, NGLStage, NGLSurface } from "../src/molviewer.js";
import { type ActPass, PickIn3D } from "../src/toggles.js";
import { structure } from "./structure.js";

function SurfaceViewer(
  props: Parameters<typeof NGLSurface>[0] &
    Omit<Parameters<typeof NGLStage>[0], "children">,
) {
  const { onHover, onMouseLeave, onPick, ...surfaceprops } = props;
  return (
    <div className="h-[500px] w-full">
      <NGLStage onHover={onHover} onMouseLeave={onMouseLeave} onPick={onPick}>
        <NGLComponent structure={structure} chain={"A"}>
          <NGLSurface {...surfaceprops} />
        </NGLComponent>
      </NGLStage>
      <ul>
        <li>Active: {surfaceprops.activeColor}</li>
        <li>Passive: {surfaceprops.passiveColor}</li>
        <li>Neighbours: {surfaceprops.neighboursColor}</li>
        <li>Default: {surfaceprops.defaultColor}</li>
        <li>Highlight: {surfaceprops.highlightColor}</li>
      </ul>
    </div>
  );
}

export const NoSelection = () => (
  <SurfaceViewer active={[]} passive={[]} neighbours={[]} />
);

export const WithSelection = () => (
  <SurfaceViewer
    {...{
      active: [932, 935, 936, 949, 950, 952, 958],
      activeColor: "red",
      passive: [970],
      neighbours: [971, 972],
      passiveColor: "green",
      neighboursColor: "yellow",
      defaultColor: "white",
    }}
  />
);

export const WithHighlight = () => (
  <SurfaceViewer
    {...{
      active: [932, 935, 936, 949, 950, 952, 958],
      activeColor: "red",
      passive: [970],
      neighbours: [971, 972],
      passiveColor: "green",
      neighboursColor: "orange",
      defaultColor: "white",
      highlight: 971,
      highlightColor: "red",
    }}
  />
);

export const Pickable = () => {
  const [picked, setPicked] = useState<
    [string, number, string, string] | undefined
  >(undefined);
  return (
    <>
      <div>
        <p>
          (Click on surface to select residue, only works when ngl show tooltip)
        </p>
        <p>last picked: {JSON.stringify(picked)}</p>
      </div>
      <SurfaceViewer
        {...{
          active: [932, 935, 936, 949, 950, 952, 958],
          activeColor: "red",
          passive: [970],
          neighbours: [971, 972],
          passiveColor: "green",
          neighboursColor: "yellow",
          defaultColor: "white",
          onPick: (chain, resno, comp, resname) =>
            setPicked([chain, resno, comp, resname]),
        }}
      />
    </>
  );
};

export const PickableActiveOrPassive = () => {
  const [what, setWhat] = useState<ActPass>("act");
  const [picked, setPicked] = useState<
    [string, number, string, string, string] | undefined
  >(undefined);
  return (
    <>
      <div>
        <p>
          (Click on surface to select residue, only works when ngl show tooltip)
        </p>
        <PickIn3D value={what} onChange={(newWhat) => setWhat(newWhat)} />
        <p>last picked: {JSON.stringify(picked)}</p>
      </div>
      <SurfaceViewer
        {...{
          active: [932, 935, 936, 949, 950, 952, 958],
          activeColor: "red",
          passive: [970],
          neighbours: [971, 972],
          passiveColor: "green",
          neighboursColor: "yellow",
          defaultColor: "white",
          onPick: (chain, resno, comp, resname) =>
            setPicked([chain, resno, comp, resname, what]),
        }}
      />
    </>
  );
};

export const Hoverable = () => {
  const [hovered, setHovered] = useState<
    [string, number, string, string] | undefined
  >(undefined);
  return (
    <>
      <div>
        <p>
          (Click on surface to select residue, only works when ngl show tooltip)
        </p>
        <p>last hovered: {JSON.stringify(hovered)}</p>
      </div>
      <SurfaceViewer
        {...{
          active: [932, 935, 936, 949, 950, 952, 958],
          activeColor: "red",
          passive: [970],
          neighbours: [971, 972],
          passiveColor: "green",
          neighboursColor: "yellow",
          defaultColor: "white",
          onHover: (chain, resno, comp, resname) =>
            setHovered([chain, resno, comp, resname]),
          onMouseLeave: () => setHovered(undefined),
        }}
      />
    </>
  );
};
