import type { Meta, StoryObj } from "@storybook/react";
import { TooltipComponent } from "./tooltip";

const meta: Meta<typeof TooltipComponent> = {
  component: TooltipComponent,
  title: "UI/Tooltip",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TooltipComponent>;

export const Base: Story = {
    args: {
      children: <button>Hover me</button>,
      text: "Tooltip",
      visible: true,
    },
};
