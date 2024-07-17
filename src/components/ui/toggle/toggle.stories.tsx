import type { Meta, StoryObj } from "@storybook/react";
import { ToggleComponent } from "./toggle";

const meta: Meta<typeof ToggleComponent> = {
  component: ToggleComponent,
  title: "UI/Toggle",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToggleComponent>;

export const Base: Story = {};
