import ThemeStore from "../../stores/theme.store";
import styles from "./error.module.scss";
import { Link } from "react-router-dom";

export const ErrorPage: React.FC = () => {
  const { lightMode } = ThemeStore;
  return (
    <main
      className={`${styles.main} user-select-none ${
        lightMode ? "background_slide_light" : "background_slide"
      }`}
    >
      <section className={styles.section}>
        <h1 className={styles.title}>404 Not Found</h1>
        <p>Страница, которую вы ищете, не существует.</p>
        <p>
          Вернитесь на{" "}
          <Link className="link link_light" to="/">
            главную страницу
          </Link>
        </p>
      </section>
    </main>
  );
};
