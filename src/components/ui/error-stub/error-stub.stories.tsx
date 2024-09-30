import type { Meta, StoryObj } from "@storybook/react";
import { ErrorStub } from "./error-stub";

const meta: Meta<typeof ErrorStub> = {
  component: ErrorStub,
  title: "UI/ErrorStub",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ErrorStub>;

export const Base: Story = {};
