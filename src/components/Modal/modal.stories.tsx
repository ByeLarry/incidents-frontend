import type { Meta, StoryObj } from "@storybook/react";
import { ModalComponent } from "./modal";

const meta: Meta<typeof ModalComponent> = {
  component: ModalComponent,
  title: "Components/Modal",
};

export default meta;
type Story = StoryObj<typeof ModalComponent>;

export const Base: Story = {
  args: {
    children: (
      <>
        <h1>Modal</h1>
        <p>Some text</p>
      </>
    ),
    isOpen: true,
  },
};
