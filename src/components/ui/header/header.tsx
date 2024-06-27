import { Link } from "react-router-dom";
import styles from "./header.module.scss";
import "../../../index.scss";
import { observer } from "mobx-react-lite";
import ThemeStore from "../../../stores/theme-store";
import { useEffect } from "react";
import { ToggleComponent } from "../toggle/toggle";
import { RiCriminalFill } from "react-icons/ri";

export const Header: React.FC = observer(() => {
  const { lightMode } = ThemeStore;
  useEffect(() => {
    if (!lightMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [lightMode]);
  return (
    <header
      className={`${styles.header} ${lightMode ? styles.header_light : ""} user-select-none`}
    >
      <div className={styles.logo__wrapper}>
        <h1 className={styles.header__title}>Incidents</h1>
        <RiCriminalFill size={48} />
      </div>
      <nav className={styles.header__nav}>
        <ul className={styles.header__list}>
          <li className={styles.list__item}>
            <ToggleComponent />
          </li>
          <li className={styles.list__item}>
            <Link
              to={"signup"}
              className={`link ${styles.list__item} ${
                lightMode ? "link_light" : ""
              }`}
            >
              Регистрация
            </Link>
          </li>
          <li className={styles.list__item}>
            <Link
              to={"signin"}
              className={`link ${styles.list__item} ${
                lightMode ? "link_light" : ""
              }`}
            >
              Вход
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
});
