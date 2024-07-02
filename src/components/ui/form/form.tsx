import { observer } from "mobx-react-lite";
import styles from "./from.module.scss";
import ThemeStore from "../../../stores/theme.store";

interface FormComponentProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
  action?: string;
  title: string;
}

export const FormComponent: React.FC<FormComponentProps> = observer(
  (props: FormComponentProps) => {
    const { lightMode } = ThemeStore;
    return (
      <form className={`${styles.form} ${lightMode ? styles.form_light : ""}`}>
        <h2 className={styles.form__title}>{props.title}</h2>
        {props.children}
      </form>
    );
  }
);
