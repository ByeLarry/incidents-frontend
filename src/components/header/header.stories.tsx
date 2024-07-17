import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom"; 
import { Header } from "./header";

const meta: Meta<typeof Header> = {
  component: Header,
  title: "Components/Header",
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Base: Story = {};
