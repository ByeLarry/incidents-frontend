import type { Meta, StoryObj } from "@storybook/react";
import { SelectComponent } from "./select";

const meta: Meta<typeof SelectComponent> = {
  component: SelectComponent,
  title: "UI/Select",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SelectComponent>;

export const Base: Story = {
  args: {
    values: ["red", "green", "blue"],
    colors: [
      { name: "red", color: "red" },
      { name: "green", color: "green" },
      { name: "blue", color: "blue" },
    ],
    setCheckedValue: () => {},
  },
};
