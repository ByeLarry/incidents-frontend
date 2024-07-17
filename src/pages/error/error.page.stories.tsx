import type { Meta, StoryObj } from "@storybook/react";
import { ErrorPage } from "./error.page";
import { BrowserRouter } from "react-router-dom"; 

const meta: Meta<typeof ErrorPage> = {
  component: ErrorPage,
  title: "Pages/Error",
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

export const Base: Story = {};
