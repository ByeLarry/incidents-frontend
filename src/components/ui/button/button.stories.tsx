import { ButtonComponent } from "./button";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ButtonComponent> = {
  component: ButtonComponent,
  title: "UI/Button",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonComponent>;

export const Modal: Story = {
  args: {
    children: "Button",
    modalButton: true,
    onClick: () => {
      alert("clicked");
    },
  },
};

export const Base: Story = {
    args: {
      children: "Button",
      onClick: () => {
        alert("clicked");
      },
    },
  };
