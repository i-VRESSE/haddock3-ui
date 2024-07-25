import type { Story } from "@ladle/react";

export const MyStory: Story<{
  onClick: () => void;
}> = ({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
};

MyStory.argTypes = {
  onClick: {
    action: "clicked",
  },
};