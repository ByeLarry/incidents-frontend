import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom"; 
import { SignIn } from "./signin.page";

const meta: Meta<typeof SignIn> = {
  component: SignIn,
  title: "Pages/SignIn",
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignIn>;

export const Base: Story = {};
