import type { Meta, StoryObj } from "@storybook/react";
import { MapComponent } from "./map";

const meta: Meta<typeof MapComponent> = {
  component: MapComponent,
  title: "Map/Map",
};

export default meta;
type Story = StoryObj<typeof MapComponent>;

export const Base: Story = {};
