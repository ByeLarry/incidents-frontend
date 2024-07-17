import type { Meta, StoryObj } from "@storybook/react";
import { FormComponent } from "./form";
import { ButtonComponent } from "../button/button";
import { InputComponent } from "../input/input";

const meta: Meta<typeof FormComponent> = {
  component: FormComponent,
  title: "UI/Form",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormComponent>;

export const Base: Story = {
  args: {
    title: "Title",
    children: (
      <>
        <InputComponent />
        <ButtonComponent type="button">Button</ButtonComponent>
      </>
    ),
  },
};

export const NoStyles: Story = {
  args: {
    noStyle: true,
    children: (
      <>
        <InputComponent />
        <ButtonComponent type="button">Button</ButtonComponent>
      </>
    ),
  },
};
