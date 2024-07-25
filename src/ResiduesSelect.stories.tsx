import { useLadleContext, type Story, action } from "@ladle/react";
import { ResidueNeighbourSelection, ResidueSelection, ResiduesSelect } from "./toggles";
import { useState } from "react";

export const Surface: Story = () => {
  const { globalState} = useLadleContext();
  return (
    <ResiduesSelect 
      showPassive={true}
      disabledPassive={true}
      highlight={undefined}
      options={[
        {
          resno: 1,
          resname: "A",
          seq: "A",
          surface: true,
        },
        {
          resno: 2,
          resname: "T",
          seq: "T",
          surface: false,
        },
      ]}
      selected={{act: [], pass: [1], neighbours: []}}
      onChange={action("onChange")}
      onHover={action("onHover")}
      theme={globalState.theme === "dark" ? "dark" : "light"}
    />
)};

export const ActiveOnly: Story = () => {
  const { globalState} = useLadleContext();
  const [selected, setSelected] = useState<ResidueNeighbourSelection>({
    act: [3],
    pass: [],
    neighbours: [],
  });

  const onChange = (selected: ResidueSelection) => {
    setSelected({
      ...selected,
      neighbours: [],
    });
  };

  return (
    <ResiduesSelect 
      showActive={true}
      showPassive={false}
      highlight={undefined}
      options={[
        {
          resno: 1,
          resname: "A",
          seq: "A",
          surface: true,
        },
        {
          resno: 2,
          resname: "T",
          seq: "T",
          surface: false,
        },
        {
          resno: 3,
          resname: "G",
          seq: "G",
          surface: true,
        },
      ]}
      selected={selected}
      onChange={onChange}
      onHover={action("onHover")}
      theme={globalState.theme === "dark" ? "dark" : "light"}
    />
  )
}

export const PassiveOnly: Story = () => {
  const { globalState} = useLadleContext();
  const [selected, setSelected] = useState<ResidueNeighbourSelection>({
    act: [],
    pass: [3],
    neighbours: [],
  });

  const onChange = (selected: ResidueSelection) => {
    setSelected({
      ...selected,
      neighbours: [],
    });
  };

  return (
    <ResiduesSelect 
      showActive={false}
      showPassive={true}
      highlight={undefined}
      options={[
        {
          resno: 1,
          resname: "A",
          seq: "A",
          surface: true,
        },
        {
          resno: 2,
          resname: "T",
          seq: "T",
          surface: false,
        },
        {
          resno: 3,
          resname: "G",
          seq: "G",
          surface: true,
        },
      ]}
      selected={selected}
      onChange={onChange}
      onHover={action("onHover")}
      theme={globalState.theme === "dark" ? "dark" : "light"}
    />
  )
}

export const ActiveAndNeigbours: Story = () => {
  const { globalState} = useLadleContext();
  const [selected, setSelected] = useState<ResidueNeighbourSelection>({
    act: [3],
    pass: [],
    neighbours: [1, 2],
  });

  const onChange = (selected: ResidueSelection) => {
    // Use inverse of selected as fake neighbours computation 
    const neighbours = [1, 2, 3].filter((resno) => !selected.act.includes(resno) && !selected.pass.includes(resno))
    setSelected({
      ...selected,
      neighbours
    });
  };

  return (
    <ResiduesSelect 
      showActive={true}
      showPassive={true}
      disabledPassive={true}
      highlight={undefined}
      options={[
        {
          resno: 1,
          resname: "A",
          seq: "A",
          surface: true,
        },
        {
          resno: 2,
          resname: "T",
          seq: "T",
          surface: false,
        },
        {
          resno: 3,
          resname: "G",
          seq: "G",
          surface: true,
        },
      ]}
      selected={selected}
      onChange={onChange}
      onHover={action("onHover")}
      theme={globalState.theme === "dark" ? "dark" : "light"}
    />
  )
}

export const ActiveDisabledAndPassive = () => (
  <div className="text-red-500 text-xl">Unwanted combination</div>
)

export const ActiveAndPassive: Story = () => {
  const { globalState} = useLadleContext();
  const [selected, setSelected] = useState<ResidueNeighbourSelection>({
    act: [3],
    pass: [1],
    neighbours: [],
  });

  const onChange = (selected: ResidueSelection) => {
    setSelected({
      ...selected,
      neighbours:[]
    });
  };

  return (
    <ResiduesSelect 
      showActive={true}
      showPassive={true}
      highlight={undefined}
      options={[
        {
          resno: 1,
          resname: "A",
          seq: "A",
          surface: true,
        },
        {
          resno: 2,
          resname: "T",
          seq: "T",
          surface: true,
        },
        {
          resno: 3,
          resname: "G",
          seq: "G",
          surface: true,
        },
        {
          resno: 4,
          resname: "C",
          seq: "C",
          surface: true,
        },
      ]}
      selected={selected}
      onChange={onChange}
      onHover={action("onHover")}
      theme={globalState.theme === "dark" ? "dark" : "light"}
    />
  )
}

export const LongList: Story = () => {
  const { globalState} = useLadleContext();
  return (
    <ResiduesSelect 
      showActive={true}
      showPassive={true}
      disabledPassive={true}
      disabledActive={true}
      highlight={undefined}
      options={Array.from({ length: 400 }, (_, i) => ({
        resno: i + 42,
        resname: "XXX",
        seq: "X",
        surface: true,
      }))}
      selected={{
        act: [43, 111],
        pass: [51, 78],
        neighbours: [],
      }}
      onChange={action("onChange")}
      onHover={action("onHover")}
      theme={globalState.theme === "dark" ? "dark" : "light"}
    />
  )
}