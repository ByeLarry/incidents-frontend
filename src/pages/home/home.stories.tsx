import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom"; 
import { Home } from "./home.page";

const meta: Meta<typeof Home> = {
  component: Home,
  title: "Pages/Home",
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Home>;

export const Base: Story = {};
