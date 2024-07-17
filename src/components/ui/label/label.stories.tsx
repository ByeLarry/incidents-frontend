import type { Meta, StoryObj } from "@storybook/react";
import { LabelComponent } from "./label";

const meta: Meta<typeof LabelComponent> = {
  component: LabelComponent,
  title: "UI/Label",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LabelComponent>;

export const Base: Story = {
  args: {
    children: "Label",
  },
};
