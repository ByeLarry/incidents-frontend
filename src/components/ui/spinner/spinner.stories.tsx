import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./spinner";

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: "UI/Spinner",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Base: Story = {
  args: { visible: true, lightMode: true },
};
