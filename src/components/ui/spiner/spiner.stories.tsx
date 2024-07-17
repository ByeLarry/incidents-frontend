import type { Meta, StoryObj } from "@storybook/react";
import { Spiner } from "./spiner";

const meta: Meta<typeof Spiner> = {
  component: Spiner,
  title: "UI/Spiner",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Spiner>;

export const Base: Story = {
  args: { visible: true, lightMode: true },
};
