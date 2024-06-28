import { observer } from "mobx-react-lite";
import { FormComponentProps } from "../../../propses/FormComponentProps";
import styles from "./from.module.scss";
import ThemeStore from "../../../stores/theme.store";

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
