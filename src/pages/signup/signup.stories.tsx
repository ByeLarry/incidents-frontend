import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { SignUp } from "./signup.page";

const meta: Meta<typeof SignUp> = {
  component: SignUp,
  title: "Pages/SignUp",
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SignUp>;

export const Base: Story = {};
