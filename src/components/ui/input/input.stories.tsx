import type { Meta, StoryObj } from "@storybook/react";
import { InputComponent } from "./input";

const meta: Meta<typeof InputComponent> = {
  component: InputComponent,
  title: "UI/Input",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputComponent>;

export const Base: Story = {
  args: {
    placeholder: "Placeholder",
  },
};
