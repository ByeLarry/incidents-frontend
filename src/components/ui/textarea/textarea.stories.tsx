import type { Meta, StoryObj } from "@storybook/react";
import { TextareaComponent } from "./textarea";

const meta: Meta<typeof TextareaComponent> = {
  component: TextareaComponent,
  title: "UI/Textarea",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextareaComponent>;

export const Base: Story = {
  args: {
    placeholder: "Placeholder",
    width: "100%",
  },
};
