import ThemeStore from "../../../stores/theme.store";
import styles from "./error-stub.module.scss";

export const ErrorStub: React.FC = () => {
  const { lightMode } = ThemeStore;

  return (
    <section
      className={`${styles.wrapper} user-select-none ${
        lightMode ? "background_slide_light" : "background_slide"
      }`}
    >
      <section className={styles.section}>
        <h2 className={styles.title}>Проблемы с сетью</h2>
        <p>Не удалось подключиться к серверу.</p>
        <p>Проверьте соединение или перезагрузите страницу.</p>
      </section>
    </section>
  );
};
