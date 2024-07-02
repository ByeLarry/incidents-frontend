import React, { FormEventHandler } from "react";
import styles from "./button.module.scss";

interface ButtonComponentProps {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  title?: string;
  inverse?: boolean;
  textInverse?: boolean;
  noHover?: boolean;
  transparent?: boolean;
  ariaLabel?: string;
  zIndex?: number;
  modalButton?: boolean;
  onSubmit?: FormEventHandler<HTMLButtonElement>;
  form?: string;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = (
  props: ButtonComponentProps
) => {
  return (
    <button
      form={props.form}
      onSubmit={props.onSubmit}
      aria-label={props.ariaLabel}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      title={props.title}
      className={`${props.noHover ? styles.button_no_hover : styles.button} ${
        props.modalButton ? styles.button_modal : ""
      } ${props.inverse && styles.button_inverse} ${
        props.textInverse && styles.button__text_inverse
      } ${props.noHover && styles.button_no_hover} ${
        props.transparent && styles.button_transparent
      } ${props.className}`}
      style={{ zIndex: props.zIndex }}
    >
      {props.children}
    </button>
  );
};
