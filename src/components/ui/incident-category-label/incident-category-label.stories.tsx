import type { Meta, StoryObj } from "@storybook/react";
import { IncidentCategoryLabel } from "./incident-category-label";

const meta: Meta<typeof IncidentCategoryLabel> = {
  component: IncidentCategoryLabel,
  title: "UI/IncidentCategoryLabel",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IncidentCategoryLabel>;

export const Base: Story = {
  args: {
    color: "red",
    name: "incident",
  },
};
